import { Component } from '@angular/core';
import BeachModel from '../models/beach.model';
import { NavController } from '@ionic/angular';
import { BeachMeasurementsService } from '../services/beach-measurements.service';
import BeachMeasurementModel from '../models/beach-measurement.model';
import { StatusService } from '../services/status.service';

@Component({
  selector: 'app-list',
  templateUrl: 'list.page.html',
  styleUrls: ['list.page.scss']
})
export class ListPage {
  beachMeasurements: BeachMeasurementModel[];
  classNameMaps = new Map();

  constructor(
    private navCtrl: NavController,
    private beachServiceService: BeachMeasurementsService,
    private statusService: StatusService) { }

  ngOnInit() {
    this.beachMeasurements = this.beachServiceService.getLatestBeachMeasurements()
    this.populateMapWithClassNames()
    console.log(this.beachMeasurements);
    console.log(this.classNameMaps);
    
  }

  goToBeach(beach: BeachModel) {
    this.navCtrl.navigateForward(`/beach/${beach.id}`);
  }

  getClassName(beach: BeachMeasurementModel) {
    let status = this.statusService.getStatusForBeach(beach);
    if (status === 'STATUS_POOR') {
      return ['fail', 'fa fa-2x fa-times-circle text-danger']
    }
    else if (status === 'STATUS_MEDIUM') {
      return ['warning', 'fa fa-2x fa-exclamation-triangle text-warning']
    }
    else {
      return ['success', 'fa fa-2x fa-check-circle text-success']
    }
  }

  populateMapWithClassNames() {
    for (let beach of this.beachMeasurements) {
      this.classNameMaps.set(beach.id, this.getClassName(beach));
    }
  }

  getIndexForBeach(beach: BeachMeasurementModel) {
    return this.statusService.calculateIntHealthIndex(beach);
  }
}
