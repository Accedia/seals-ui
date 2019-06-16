import { Component, EventEmitter, OnInit } from '@angular/core';
import { MapService } from '../services/map.service';
import { BeachMeasurementsService } from '../services/beach-measurements.service';
import { TitleCasePipe } from '@angular/common';
import { map } from 'rxjs/operators';
import { Subject } from 'rxjs';
@Component({
  selector: 'app-map',
  templateUrl: 'map.page.html',
  styleUrls: ['map.page.scss'],
  providers: [MapService]
})
export class MapPage implements OnInit {
  searchText: string;
  geoPlaces: any = [];

  geoPlaceChange: Subject<[]> = new Subject();

  placeChangeEmitter = new EventEmitter();
  constructor(
    private mapService: MapService,
    private beachServiceService: BeachMeasurementsService,
    private titleCasePipe: TitleCasePipe) {}

  ngOnInit() {
  }

  addFocus() {

  }

  cyrlat(text: string) {
    let car = text;
    car = car.replace(/а/g, 'a');
    car = car.replace(/б/g, 'b');
    car = car.replace(/в/g, 'v');
    car = car.replace(/г/g, 'g');
    car = car.replace(/д/g, 'd');
    car = car.replace(/е/g, 'e');
    car = car.replace(/ж/g, 'ž');
    car = car.replace(/з/g, 'z');
    car = car.replace(/и/g, 'i');
    car = car.replace(/й/g, 'j');
    car = car.replace(/к/g, 'k');
    car = car.replace(/л/g, 'l');
    car = car.replace(/м/g, 'm');
    car = car.replace(/н/g, 'n');
    car = car.replace(/о/g, 'o');
    car = car.replace(/п/g, 'p');
    car = car.replace(/р/g, 'r');
    car = car.replace(/с/g, 's');
    car = car.replace(/т/g, 't');
    car = car.replace(/у/g, 'u');
    car = car.replace(/ф/g, 'f');
    car = car.replace(/х/g, 'h');
    car = car.replace(/ц/g, 'c');
    car = car.replace(/ч/g, 'č');
    car = car.replace(/ш/g, 'š');
    car = car.replace(/щ/g, 'št');
    car = car.replace(/ъ/g, 'ǎ');
    car = car.replace(/ы/g, 'y');
    car = car.replace(/Ь/g, 'ʹ');
    car = car.replace(/ю/g, 'ju');
    car = car.replace(/я/g, 'ja');

    car = car.replace(/А/g, 'A');
    car = car.replace(/Б/g, 'B');
    car = car.replace(/В/g, 'V');
    car = car.replace(/Г/g, 'G');
    car = car.replace(/Д/g, 'D');
    car = car.replace(/Е/g, 'E');
    car = car.replace(/Ж/g, 'Ž');
    car = car.replace(/З/g, 'Z');
    car = car.replace(/И/g, 'I');
    car = car.replace(/Й/g, 'J');
    car = car.replace(/К/g, 'K');
    car = car.replace(/Л/g, 'L');
    car = car.replace(/М/g, 'M');
    car = car.replace(/Н/g, 'N');
    car = car.replace(/О/g, 'O');
    car = car.replace(/П/g, 'P');
    car = car.replace(/Р/g, 'R');
    car = car.replace(/С/g, 'S');
    car = car.replace(/Т/g, 'T');
    car = car.replace(/У/g, 'U');
    car = car.replace(/Ф/g, 'F');
    car = car.replace(/Х/g, 'H');
    car = car.replace(/Ц/g, 'C');
    car = car.replace(/Ч/g, 'Č');
    car = car.replace(/Ш/g, 'Š');
    car = car.replace(/Щ/g, 'Št');
    car = car.replace(/Ъ/g, 'Ǎ');
    car = car.replace(/Ы/g, 'Y');
    car = car.replace(/Ь/g, '’');
    car = car.replace(/Ю/g, 'Ju');
    car = car.replace(/Я/g, 'Ja');
    return car;
  }


  search() {
    const s = this.titleCasePipe.transform(this.cyrlat(this.searchText));
    this.mapService.searchPlaces(s).pipe(map((x: any) => x.features.map(obj => {
      return {
        label: obj.place_name_BG,
        coordinates: obj.geometry.coordinates
      };
    }))).subscribe(result => {
      this.geoPlaces = result;
    });
  }

  removeFocus() {

  }

  goToGeoPlace(coordinates: []) {
    this.mapService.placeSubject.next(coordinates);
    this.geoPlaces = [];
    this.searchText = '';
  }
}

