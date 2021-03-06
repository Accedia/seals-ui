import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
  ElementRef
} from '@angular/core';
import { MapService } from '../../../services/map.service';
import * as mapboxgl from 'mapbox-gl';
import BeachMeasurementModel from '../../../models/beach-measurement.model';
import { BeachMeasurementsService } from '../../../services/beach-measurements.service';
import { Subscription } from 'rxjs';
import { DatePipe } from '@angular/common';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { ModalController } from '@ionic/angular';
import { BeachDetailsPage } from 'src/app/beach-details/beach-details.page';

@Component({
  selector: 'app-mapbox',
  templateUrl: './mapbox.component.html',
  styleUrls: ['./mapbox.component.scss']
})
export class MapboxComponent implements AfterViewInit, OnInit, OnDestroy {
  public readonly POOR_THRESHOLD = 100;
  public readonly MEDIUM_THRESHOLD = 40;
  public readonly ECOLI_ACCEPTABLE_VALUE = 500;
  public readonly COCCI_ACCEPTABLE_VALUE = 200;

  @ViewChild('map')
  mapElement: ElementRef;

  map: mapboxgl.Map;
  style = 'mapbox://styles/sterziev/cjwxbq1r10lki1co3wk0fmcff';
  lat = 42.590584;
  lng = 25.324575;

  beachMeasurements: BeachMeasurementModel[];
  // data
  source: any;
  markers: any;

  constructor(
    private mapService: MapService,
    private beachMeasurementsService: BeachMeasurementsService,
    private datePipe: DatePipe,
    private geolocation: Geolocation,
    public modalController: ModalController
  ) {}

  private placeObservable: Subscription;
  private coordinatesSubs: Subscription;

  ngOnInit() {
    this.placeObservable = this.mapService
      .onPlaceChange()
      .subscribe(coordinates => {
        this.map.flyTo({
          center: coordinates,
          zoom: 13
        });
      });
  }

  ngAfterViewInit() {
    this.buildMap();
    this.locateUser();
    this.seedMap();
  }

  buildMap() {
    this.map = new mapboxgl.Map({
      container: 'map',
      style: this.style,
      center: [this.lng, this.lat],
      zoom: 5,
      country: 'BG'
    });

    // disable map rotation using right click + drag
    this.map.dragRotate.disable();

    /// Add map controls
    // this.map.addControl(new mapboxgl.NavigationControl());

    this.map.on('load', () => {
      this.map.resize();
    });
  }

  locateUser() {
    const marker = new mapboxgl.Marker(this.getMarkerEl());

    // TODO fix filter
    this.coordinatesSubs = this.geolocation
      .watchPosition()
      // .filter((p) => p.coords !== undefined) //Filter Out Errors
      .subscribe(resp => {
        if (resp) {
          this.lat = resp.coords.latitude;
          this.lng = resp.coords.longitude;
          marker.setLngLat([this.lng, this.lat]).addTo(this.map);
        }
      });
  }

  seedMap() {
    // TODO: Bug fix beggining of map loading
    this.beachMeasurements = this.beachMeasurementsService.getLatestBeachMeasurements();
    if (this.beachMeasurements.length !== 0) {
      this.setMapPoints();
    } else {
      this.beachMeasurementsService
        .onBeachMeasurementChange()
        .subscribe(measurements => {
          this.beachMeasurements = measurements;
          this.setMapPoints();
        });
    }
  }

  flyTo(coo: [], offsetLat: number) {
    this.map.flyTo({
      center: coo,
      offset: [0, offsetLat],
      zoom: 13
    });
  }

  flyToMe() {
    this.map.flyTo({
      center: [this.lng, this.lat],
      // offset: [0, offsetLat],
      zoom: 13
    });
  }

  private setMapPoints() {
    this.map.on('load', () => {
      const features = this.generateFeatures();

      this.map.addSource('readBeaches', {
        type: 'geojson',
        data: {
          type: 'FeatureCollection',
          features
        }
      });

      this.map.addLayer({
        id: 'readBeaches',
        type: 'circle',
        source: 'readBeaches',
        paint: {
          'circle-radius': 15,
          'circle-opacity': 0.7,
          'circle-color': [
            'match',
            ['get', 'status'],
            Status.POOR, '#fb192b',
            Status.MEDIUM, '#FBB03B',
            Status.OK, '#58e539',
            /* other */ '#ccc'
          ]
        },
        filter: ['==', '$type', 'Point']
      });

      this.setPopovers();
    });
  }

  private generateFeatures() {
    return this.beachMeasurements.map(measurement => {
      const status = this.calculateStatus(measurement);

      const featureDescription = `
      <div>
        <strong style="display: block">${measurement.name}</strong>
        <span style="display: block">Ентерококи: ${
          measurement.intestinalEnterococci
        }
          <span style="font-size: 10px"> MPN/100 cm3</span>
        </span>
        <span style="display: block">Eшерихия коли: ${
          measurement.ecoli
        } <span style="font-size: 10px">MPN/100 cm3</span></span>
        <span style="display: block">${this.datePipe.transform(
          measurement.measurementDate,
          'yyyy-MM-dd'
        )}</span>
      </div>`;

      return {
        type: 'Feature',
        properties: {
          description: featureDescription,
          status,
          beachId: measurement.id,
          coci: measurement.intestinalEnterococci,
          coli: measurement.ecoli
        },
        geometry: {
          type: 'Point',
          coordinates: [measurement.coordY, measurement.coordX]
        }
      };
    });
  }

  private setPopovers() {
    this.map.on('click', 'readBeaches', (e: any) => {
      const coordinates = e.features[0].geometry.coordinates.slice();
      const beachId = e.features[0].properties.beachId;
      const coli = e.features[0].properties.coli;
      const coci = e.features[0].properties.coci;

      // Ensure that if the map is zoomed out such that multiple
      // copies of the feature are visible, the popup appears
      // over the copy being pointed to.
      while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
        coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
      }
      const offsetLat = -(this.mapElement.nativeElement.offsetHeight / 3);
      this.flyTo(coordinates, offsetLat);
      this.presentModal(beachId, coli, coci);
    });
  }

  private calculateStatus(measurement) {
    const percentOfCocci = 100 * (measurement.intestinalEnterococci / this.COCCI_ACCEPTABLE_VALUE);
    const percentOfColi = 100 * (measurement.ecoli / this.ECOLI_ACCEPTABLE_VALUE);
    const healthIndex = Math.max(percentOfCocci, percentOfColi);

    if (healthIndex >= this.POOR_THRESHOLD) {
      return Status.POOR;
    } else if (healthIndex >= this.MEDIUM_THRESHOLD) {
      return Status.MEDIUM;
    }
    return Status.OK;
  }

  private getMarkerEl() {
    const markerEl = document.createElement('div');
    markerEl.className = 'marker';
    const pulse = document.createElement('div');
    pulse.className = 'pulse';

    const c1 = document.createElement('div');
    c1.className = 'pulse-circle circle1';

    const c2 = document.createElement('div');
    c2.className = 'pulse-circle circle2';

    const c3 = document.createElement('div');
    c3.className = 'pulse-circle circle3';

    const c4 = document.createElement('div');
    c4.className = 'pulse-circle circle4';

    markerEl.appendChild(pulse);
    markerEl.appendChild(c1);
    markerEl.appendChild(c2);
    markerEl.appendChild(c3);
    markerEl.appendChild(c4);

    return markerEl;
  }

  async presentModal(beachId: string, coli: number, coci: number) {
    const modal = await this.modalController.create({
      component: BeachDetailsPage,
      componentProps: {
        id: beachId,
        coli,
        coci
      },
      cssClass: 'select-modal'
    });
    return await modal.present();
  }

  ngOnDestroy() {
    this.placeObservable.unsubscribe();
    this.coordinatesSubs.unsubscribe();
  }
}

enum Status {
  OK,
  MEDIUM,
  POOR
}
