import { Injectable } from '@angular/core';

import * as mapboxgl from 'mapbox-gl';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MapService {

  private readonly accessToken: string;
  private readonly mapBoxBaseUrl = 'https://api.mapbox.com/';

  placeSubject: Subject<[]> = new Subject();

  constructor(private http: HttpClient) {
    this.accessToken = environment.mapbox.accessToken;
    mapboxgl.accessToken = this.accessToken;
  }

  searchPlaces(searchTerm: string) {
    return this.http.get(`${this.mapBoxBaseUrl}geocoding/v5/mapbox.places/${searchTerm}.json`, {
      params: {
        access_token: this.accessToken,
        country: 'BG',
        language: 'BG',
        types: 'place',
        autocomplete: 'true'
      }
    });
  }

  onPlaceChange() {
    return this.placeSubject.asObservable();
  }

  cyrlat(text: string) {
    let car = text;
    car = car.replace(/а/g, 'a');
    car = car.replace(/б/g, 'b');
    car = car.replace(/в/g, 'v');
    car = car.replace(/г/g, 'g');
    car = car.replace(/д/g, 'd');
    car = car.replace(/е/g, 'e');
    car = car.replace(/ж/g, 'j');
    car = car.replace(/з/g, 'z');
    car = car.replace(/и/g, 'i');
    car = car.replace(/й/g, 'i');
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
    car = car.replace(/ч/g, 'ch');
    car = car.replace(/ш/g, 'sh');
    car = car.replace(/щ/g, 'sht');
    car = car.replace(/ъ/g, 'y');
    car = car.replace(/ы/g, 'io');
    car = car.replace(/Ь/g, 'io');
    car = car.replace(/ю/g, 'iu');
    car = car.replace(/я/g, 'ia');

    car = car.replace(/А/g, 'A');
    car = car.replace(/Б/g, 'B');
    car = car.replace(/В/g, 'V');
    car = car.replace(/Г/g, 'G');
    car = car.replace(/Д/g, 'D');
    car = car.replace(/Е/g, 'E');
    car = car.replace(/Ж/g, 'J');
    car = car.replace(/З/g, 'Z');
    car = car.replace(/И/g, 'I');
    car = car.replace(/Й/g, 'I');
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
    car = car.replace(/Ч/g, 'Ch');
    car = car.replace(/Ш/g, 'Sh');
    car = car.replace(/Щ/g, 'Sht');
    car = car.replace(/Ъ/g, 'Y');
    car = car.replace(/Ы/g, 'Io');
    car = car.replace(/Ь/g, 'Io');
    car = car.replace(/Ю/g, 'Iu');
    car = car.replace(/Я/g, 'Ia');
    return car;
  }
}
