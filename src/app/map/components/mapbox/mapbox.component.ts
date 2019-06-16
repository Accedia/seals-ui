import { AfterViewInit, Component, Input } from '@angular/core';
import { GeoJson, FeatureCollection } from '../../map';
import { MapService } from '../../../services/map.service';
import * as mapboxgl from 'mapbox-gl';
import BeachMeasurementModel from '../../../models/beach-measurement.model';

@Component({
  selector: 'app-mapbox',
  templateUrl: './mapbox.component.html',
  styleUrls: ['./mapbox.component.scss'],
  providers: [MapService]
})
export class MapboxComponent implements AfterViewInit {
  map: mapboxgl.Map;
  style = 'mapbox://styles/sterziev/cjwxbq1r10lki1co3wk0fmcff';
  lat: number;
  lng: number;

  @Input() beachMeasurements: BeachMeasurementModel[];
  // data
  source: any;
  markers: any;

  constructor(private mapService: MapService) {
  }

  ngAfterViewInit() {
    this.initializeMap();
  }

  private initializeMap() {
    /// locate the user
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        this.lat = position.coords.latitude;
        this.lng = position.coords.longitude;
        this.map.flyTo({
          center: [this.lng, this.lat]
        });
      });
    }

    this.buildMap();
  }

  buildMap() {
    this.map = new mapboxgl.Map({
      container: 'map',
      style: this.style,
      zoom: 13,
    });


    /// Add map controls
    this.map.addControl(new mapboxgl.NavigationControl());


    /// Add realtime firebase data on map load
    this.map.on('load', (event) => {
      this.map.resize();


      this.map.addSource('readBeaches', {
        type: 'geojson',
        data: {
          type: 'FeatureCollection',
          features: [{
            type: 'Feature',
            properties: {
              description: '<strong>Make it Mount Pleasant2</strong>',
              status: 'Medium'
            },
            geometry: {
              type: 'Point',
              coordinates: [27.804599, 42.212821]
            }
          }, {
            type: 'Feature',
            properties: {
              description: '<strong>Make it Mount Pleasant1</strong>',
              status: 'Ok'
            },
            geometry: {
              type: 'Point',
              coordinates: [27.789708, 42.217179]
            },
          }, {
            type: 'Feature',
            properties: {
              description: '<strong>Make it Mount Pleasant3</strong>',
              status: 'Poor'
            },
            geometry: {
              type: 'Point',
              coordinates: [27.819352, 42.200759]
            },
          }]
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
            'Poor', '#fbb03b',
            'Medium', '#223b53',
            'Ok', '#e55e5e',
            /* other */ '#ccc'
          ]
        },
        filter: ['==', '$type', 'Point'],
      });

      // tslint:disable-next-line:no-shadowed-variable
      this.map.on('click', 'readBeaches', (event: any) => {
        const features = this.map.queryRenderedFeatures(event.id, { layers: ['readBeaches'] });
        console.log(features);
        const description = features[0].properties.description;
        new mapboxgl.Popup()
          .setLngLat(event.lngLat)
          .setHTML(description)
          .addTo(this.map);
      });

      this.map.on('load', () => {
        this.map.resize();
      });
    });

  }

  flyTo(data: GeoJson) {
    this.map.flyTo({
      center: data.geometry.coordinates
    });
  }
}
