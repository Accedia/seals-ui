import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BeachMeasurementsService } from '../services/beach-measurements.service';
import BeachMeasurementModel from '../models/beach-measurement.model';
import { DatePipe } from '@angular/common'
@Component({
  selector: 'app-beach-details',
  templateUrl: './beach-details.page.html',
  styleUrls: ['./beach-details.page.scss']
})
export class BeachDetailsPage implements OnInit {
  dataArray: any[];
  beachMeasurements: BeachMeasurementModel[];
  beachName: string;
  beachShortName: string

  constructor(
    private route: ActivatedRoute,
    private beachService: BeachMeasurementsService,
    public datepipe: DatePipe) { }

  ngOnInit() {
    this.beachService.fetchMeasurementsById(this.route.snapshot.paramMap.get('id')).subscribe(
      data => {
        this.beachMeasurements = data;
        this.beachName = data[0].name;
        this.beachShortName = data[0].shortName;

        var multi: any[] = [
          this.seedColi(),
          this.seedEntero()
        ]
        this.dataArray = multi;
      },
      error => {
        console.log(error);
      }
    )
  }

  seedColi() {
    var s = [];
    for (var beach of this.beachMeasurements) {
      s.push(
        {
          name: this.datepipe.transform(beach.measurementDate, 'yyyy-MM-dd'),
          value: beach.ecoli
        })
    }

    return {
      name: 'Eшерихия коли',
      series: s
    }
  }

  seedEntero() {
    var s = [];
    for (var beach of this.beachMeasurements) {
      s.push(
        {
          name: this.datepipe.transform(beach.measurementDate, 'yyyy-MM-dd'),
          value: beach.intestinalEnterococci
        })
    }

    return {
      name: 'Ентерококи',
      series: s
    }
  }
}
