import { Component } from '@angular/core';
import BeachModel from '../models/beach.model';
import { NavController } from '@ionic/angular';
import { BeachMeasurementsService } from '../services/beach-measurements.service';
import BeachMeasurementModel from '../models/beach-measurement.model';
import { StatusService } from '../services/status.service';
import { FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-list',
  templateUrl: 'list.page.html',
  styleUrls: ['list.page.scss']
})
export class ListPage {
  beachMeasurements: BeachMeasurementModel[];
  beachMeasurementsFiltered: BeachMeasurementModel[];

  classNameMaps = new Map();
  filterForm: FormGroup;
  constructor(
    private navCtrl: NavController,
    private beachServiceService: BeachMeasurementsService,
    private statusService: StatusService,
    private formBuilder: FormBuilder) {

    this.filterForm = this.formBuilder.group({
      input: ''
    });
  }

  ngOnInit() {
    this.beachMeasurements = this.beachServiceService.getLatestBeachMeasurements()
    this.beachMeasurementsFiltered = this.beachServiceService.getLatestBeachMeasurements()

    this.populateMapWithClassNames()
    console.log(this.beachMeasurements);
    console.log(this.classNameMaps);
    this.onChanges();

  }

  onChanges(): void {
    this.filterForm.get('input').valueChanges.subscribe(filter => {
      this.beachMeasurementsFiltered = this.beachMeasurements.filter(
        b => new String(b.name.toLocaleLowerCase()).includes(filter.toLocaleLowerCase())
      )
    });
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
