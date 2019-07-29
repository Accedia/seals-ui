import { Component, EventEmitter, OnInit } from '@angular/core';
import { TitleCasePipe } from '@angular/common';
import { map } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { MapService } from 'src/app/services/map.service';
import { BeachMeasurementsService } from 'src/app/services/beach-measurements.service';

@Component({
  selector: 'search-box',
  templateUrl: 'searchbox.page.html',
  styleUrls: ['searchbox.page.scss'],
})
export class SearchboxPage implements OnInit {
  searchText: string;
  geoPlaces: any = [];

  geoPlaceChange: Subject<[]> = new Subject();

  placeChangeEmitter = new EventEmitter();
  constructor(
    private mapService: MapService,
    private titleCasePipe: TitleCasePipe,
    private beachMeasurementsService: BeachMeasurementsService) { }

  ngOnInit() {
  }

  addFocus() {
  }

  removeFocus() {
  }

  clear() {
    this.geoPlaces = [];
  }

  search() {
    if (!this.searchText.length) {
      return;
    }
    const s = this.titleCasePipe.transform(this.mapService.cyrlat(this.searchText));
    this.mapService.searchPlaces(s).pipe(map((x: any) => x.features.map(obj => {
      return {
        label: obj.place_name_BG,
        coordinates: obj.geometry.coordinates
      };
    }))).subscribe(result => {
      this.geoPlaces = result;
      Array.prototype.push.apply(this.geoPlaces, this.getLocalPlaces(this.searchText));
    });
  }

  goToGeoPlace(coordinates: []) {
    this.mapService.placeSubject.next(coordinates);
    this.geoPlaces = [];
    this.searchText = '';
  }

  getLocalPlaces(search: string) {
    if (search.length < 3) {
      return [];
    }

    return this.beachMeasurementsService
        .getAllbeachesAsGeoCodingPlaces()
        .filter(b => b.name.includes(search.toLocaleLowerCase()));
  }
}

