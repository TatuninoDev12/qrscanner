import { environment } from './../../../environments/environment';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

declare var mapboxgl: any;

@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
})
export class MapPage implements OnInit {
  lat: number = 0
  lng: number = 0
  key = environment.mapKey
  constructor( private router: ActivatedRoute) { }

  ngOnInit() {
    let geo: any = this.router.snapshot.paramMap.get('geo')
    let geoArr = geo.substring(4).split(',');
    this.lat = Number(geoArr[0]);
    this.lng =  Number(geoArr[1]);
  }

  ngAfterViewInit() {
    mapboxgl.accessToken = this.key;
    let maps = new mapboxgl.Map({
      style: 'mapbox://styles/mapbox/light-v11',
      center: [this.lng, this.lat],
      zoom: 15.5,
      pitch: 45,
      bearing: -17.6,
      container: 'map',
      antialias: true
    });
    
    maps.on('load', () => {

      // marker
      const marker = new mapboxgl.Marker().setDraggable(false)
          .setLngLat([this.lng, this.lat])
          .addTo(maps);
      maps.resize();
      // Insert the layer beneath any symbol layer.
      const layers = maps.getStyle().layers;
       
      let labelLayerId;
      for (let i = 0; i < layers.length; i++) {
        if (layers[i].type === 'symbol' && layers[i].layout['text-field']) {
          labelLayerId = layers[i].id;
          break;
        }
      }
       
      maps.addLayer(
      {
        'id': 'add-3d-buildings',
        'source': 'composite',
        'source-layer': 'building',
        'filter': ['==', 'extrude', 'true'],
        'type': 'fill-extrusion',
        'minzoom': 15,
        'paint': {
        'fill-extrusion-color': '#aaa',
        
        // use an 'interpolate' expression to add a smooth transition effect to the
        // buildings as the user zooms in
        'fill-extrusion-height': [
          'interpolate',
          ['linear'],
          ['zoom'],
          15,
          0,
          15.05,
          ['get', 'height']
        ],
        'fill-extrusion-base': [
          'interpolate',
          ['linear'],
          ['zoom'],
          15, 
          0,
          15.05,
          ['get', 'min_height']
        ],
        'fill-extrusion-opacity': 0.6
        }
      },
      labelLayerId
      );
    });
  }

}
