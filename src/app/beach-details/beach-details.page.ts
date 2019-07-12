import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BeachMeasurementsService } from '../services/beach-measurements.service';
import BeachMeasurementModel from '../models/beach-measurement.model';
import { DatePipe } from '@angular/common';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-beach-details',
  templateUrl: './beach-details.page.html',
  styleUrls: ['./beach-details.page.scss']
})
export class BeachDetailsPage implements OnInit {
  @Input() id: string;
  @Input() coci: number;
  @Input() coli: number;
  
  dataArray: any[];
  beachMeasurements: BeachMeasurementModel[];
  beachName: string;
  beachShortName: string;

  constructor(
    private beachService: BeachMeasurementsService,
    public datepipe: DatePipe,
    public modalController: ModalController) { }

  ngOnInit() {
    this.beachService.fetchMeasurementsById(this.id).subscribe(
      data => {
        this.beachMeasurements = data;
        this.beachName = data[0].name;
        this.beachShortName = data[0].shortName;

        this.dataArray = [
          this.seedColi(),
          this.seedEntero()
        ];
      },
      error => {
        console.log(error);
      }
    );
  }

  seedColi() {
    const s = [];
    for (const beach of this.beachMeasurements) {
      s.push(
        {
          name: this.datepipe.transform(beach.measurementDate, 'yyyy-MM-dd'),
          value: beach.ecoli
        });
    }

    return {
      name: 'Eшерихия коли',
      series: s
    };
  }

  seedEntero() {
    const s = [];
    for (const beach of this.beachMeasurements) {
      s.push(
        {
          name: this.datepipe.transform(beach.measurementDate, 'yyyy-MM-dd'),
          value: beach.intestinalEnterococci
        });
    }

    return {
      name: 'Ентерококи',
      series: s
    };
  }

  dismiss() {
    this.modalController.dismiss();
  }
}
