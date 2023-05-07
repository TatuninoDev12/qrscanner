import { Injectable } from '@angular/core';
import { Keyboard } from '@capacitor/keyboard';
import { UtilsService } from './utils.service';
import mapboxgl from 'mapbox-gl';
// import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import { environment } from 'src/environments/environment';

// declare var mapboxgl: any
declare var MapboxGeocoder: any;

@Injectable({
  providedIn: 'root'
})
export class MapQrService {

  countInitial = 0;
  geocoder : any;
  finishSearch = true;
  key = environment.mapKey

  constructor( private utils: UtilsService ) { }

  getMap() {
    this.finishSearch = true;
    mapboxgl.accessToken = this.key;
    var map = new mapboxgl.Map({
      container: 'map1',
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [-79.4512, 43.6568],
      zoom: 13
    });

    map.on('load', () => {
      map.resize();
    });

    map.on('zoomstart', () => {

      this.finishSearch = false;
      Keyboard.hide();

    });
     
    this.geocoder = new MapboxGeocoder({
      accessToken: mapboxgl.accessToken,
      mapboxgl: mapboxgl,
      mapMarker: {_draggable: false}
    });
    document.getElementById('geocoder')?.appendChild(this.geocoder.onAdd(map));
  }

  obtenerCordenadas() {
    return 'geo:'+ this.geocoder.mapMarker._lngLat.lat + ',' + this.geocoder.mapMarker._lngLat.lng;
  }

  obtenerLocationName() {
    return this.geocoder._inputEl.value.split(',')[0] + ',' + this.geocoder._inputEl.value.split(',')[1] + ',' + this.geocoder._inputEl.value.split(',')[2];
  }
}
