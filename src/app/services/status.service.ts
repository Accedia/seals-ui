import { Injectable } from '@angular/core';

import BeachMeasurementModel from '../models/beach-measurement.model';

@Injectable({
  providedIn: 'root'
})
export class StatusService {
  escherichiaRefenet = 500;
  enterocociReferent = 200;

  midThreashold = 0.20;
  highThreashold = 0.50;

  constructor() { }

  calculateIntHealthIndex(beachMeasurement: BeachMeasurementModel) {
    const esherichiaRatio = beachMeasurement.ecoli / this.escherichiaRefenet;
    const enterocociRatio = beachMeasurement.intestinalEnterococci / this.enterocociReferent;

    return Math.max(esherichiaRatio, enterocociRatio);
  }

  getStatusForBeach(beachMeasurement: BeachMeasurementModel) {
    const healtIndex = this.calculateIntHealthIndex(beachMeasurement);

    if (healtIndex > this.highThreashold) {
      return 'STATUS_POOR';
    } else if (healtIndex > this.midThreashold) {
      return 'STATUS_MEDIUM';
    } else {
      return 'STATUS_OK';
    }
  }
}
