import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable, Subject } from 'rxjs';
import BeachMeasurementModel from '../models/beach-measurement.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BeachMeasurementsService {
  private headers: HttpHeaders;
  private baseUrl: string;

  beachMeasurements: BeachMeasurementModel[];

  beachMeasurementsSubject: Subject<BeachMeasurementModel[]> = new Subject();

  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders().set('Content-Type', 'application/json');
    this.baseUrl = environment.serverUrl;

    this.fetchLatestMeasurements().subscribe(measurements => {
      this.beachMeasurementsSubject.next(measurements);
      this.beachMeasurements = measurements;
    });
  }

  private fetchLatestMeasurements(): Observable<any> {
    return this.http.get(`${this.baseUrl}/beaches`).pipe(
      map((x: any) =>
        x.map(obj =>
          new BeachMeasurementModel(
            obj._id,
            obj.name,
            obj.coord_x,
            obj.coord_y,
            obj.measurement_date,
            obj.intestinal_enterococci,
            obj.ecoli)
        )
      )
    );
  }

  getLatestBeachMeasurements() {
    return [...this.beachMeasurements];
  }

  onBeachMeasurementChange() {
    return this.beachMeasurementsSubject.asObservable();
  }
}