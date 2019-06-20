import { Injectable } from '@angular/core';

import * as mapboxgl from 'mapbox-gl';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable()
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
        language: 'BG'
      }
    });
  }

  onPlaceChange(){
    return this.placeSubject.asObservable();
  }
}
