import { Injectable } from '@angular/core';

import * as mapboxgl from 'mapbox-gl';
import { environment } from 'src/environments/environment';
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
    let esherichiaRatio = beachMeasurement.ecoli / this.escherichiaRefenet
    let enterocociRatio = beachMeasurement.intestinalEnterococci / this.enterocociReferent
    console.log(esherichiaRatio, enterocociRatio, Math.max(esherichiaRatio, enterocociRatio));

    return Math.max(esherichiaRatio, enterocociRatio);
  }

  getStatusForBeach(beachMeasurement: BeachMeasurementModel) {
    let healtIndex = this.calculateIntHealthIndex(beachMeasurement);

    if (healtIndex > this.highThreashold) {
      return "STATUS_POOR"
    }
    else if (healtIndex > this.midThreashold) {
      return "STATUS_MEDIUM"
    }
    else {
      return "STATUS_OK"
    }
  }
}
