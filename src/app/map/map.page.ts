import { Component, OnInit } from '@angular/core';
import { MapService } from '../services/map.service';
import { BeachMeasurementsService } from '../services/beach-measurements.service';
@Component({
  selector: 'app-map',
  templateUrl: 'map.page.html',
  styleUrls: ['map.page.scss'],
  providers: [MapService]
})
export class MapPage implements OnInit {

  constructor(
    private mapService: MapService,
    private beachServiceService: BeachMeasurementsService) {}

  ngOnInit() {
    this.beachServiceService.onBeachMeasurementChange().subscribe(measurements => {
      console.log(measurements);
    }, (error) => {
      console.log(error);
    });
  }
}
