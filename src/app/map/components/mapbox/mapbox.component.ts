import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { GeoJson, FeatureCollection } from '../../map';
import { MapService } from '../../../services/map.service';
import * as mapboxgl from 'mapbox-gl';
import BeachMeasurementModel from '../../../models/beach-measurement.model';
import { BeachMeasurementsService } from '../../../services/beach-measurements.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-mapbox',
  templateUrl: './mapbox.component.html',
  styleUrls: ['./mapbox.component.scss'],
})
export class MapboxComponent implements AfterViewInit, OnInit, OnDestroy {
  private STATUS_OK = 'OK';
  private STATUS_MEDIUM = 'MEDIUM';
  private STATUS_POOR = 'POOR';

  map: mapboxgl.Map;
  style = 'mapbox://styles/sterziev/cjwxbq1r10lki1co3wk0fmcff';
  lat = 42.590584;
  lng = 25.324575;

  beachMeasurements: BeachMeasurementModel[];
  // data
  source: any;
  markers: any;

  constructor(private mapService: MapService, private beachMeasurementsService: BeachMeasurementsService) {
  }

  private placeObservable: Subscription;

  ngOnInit() {
    this.placeObservable = this.mapService.onPlaceChange().subscribe(coodinates => {
      this.map.flyTo({
        center: coodinates,
        zoom: 13
      });
    });
  }

  ngAfterViewInit() {
    this.initializeMap();

    this.beachMeasurementsService.onBeachMeasurementChange().subscribe(measurements => {
      this.beachMeasurements = measurements;
      this.setMapPoints();
    });
  }

  private initializeMap() {
    /// locate the user
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        this.lat = position.coords.latitude;
        this.lng = position.coords.longitude;
        this.map.flyTo({
          center: [this.lng, this.lat],
          zoom: 13
        });
      });
    }

    this.buildMap();
  }

  buildMap() {
    this.map = new mapboxgl.Map({
      container: 'map',
      style: this.style,
      center: [this.lng, this.lat],
      zoom: 5,
      country: 'BG'
    });


    /// Add map controls
    this.map.addControl(new mapboxgl.NavigationControl());


    /// Add realtime firebase data on map load
    this.map.on('load', (event) => {
      this.map.resize();
    });

  }

  flyTo(data: GeoJson) {
    this.map.flyTo({
      center: data.geometry.coordinates
    });
  }

  private setMapPoints() {
    this.map.on('load', (event) => {
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
            this.STATUS_POOR, '#fb192b',
            this.STATUS_MEDIUM, '#FBB03B',
            this.STATUS_OK, '#58e539',
            /* other */ '#ccc'
          ]
        },
        filter: ['==', '$type', 'Point'],
      });

      this.setPopovers();
    });
  }

  private generateFeatures() {
    return this.beachMeasurements.map(measurement => {
      const averageMeasurement = (measurement.intestinalEnterococci + measurement.ecoli) / 2;
      const status = averageMeasurement >= 30 ? this.STATUS_MEDIUM : this.STATUS_OK;

      const featureDescription = `
      <div>
        <strong style="display: block">${measurement.name}</strong>
        <span style="display: block">Ентерококи: ${measurement.intestinalEnterococci}</span>
        <span style="display: block">Eшерихия коли: ${measurement.ecoli}</span>
      </div>`;

      return ({
        type: 'Feature',
        properties: {
          description: featureDescription,
          status
        },
        geometry: {
          type: 'Point',
          coordinates: [measurement.coordY, measurement.coordX]
        }
      });
    });
  }

  private setPopovers() {
    this.map.on('click', 'readBeaches', (e: any) => {
      const coordinates = e.features[0].geometry.coordinates.slice();
      const description = e.features[0].properties.description;

      // Ensure that if the map is zoomed out such that multiple
      // copies of the feature are visible, the popup appears
      // over the copy being pointed to.
      while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
        coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
      }

      new mapboxgl.Popup()
        .setLngLat(coordinates)
        .setHTML(description)
        .addTo(this.map);
    });
  }

  ngOnDestroy() {
    this.placeObservable.unsubscribe();
  }
}

