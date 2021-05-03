import * as L from 'leaflet';
import {Coordinates} from '../../../types/types';

export default function createMap(container: string, coords: Coordinates, zoom: number) {
    let m = L.map(container).setView([coords.lat, coords.long], zoom);
    L.tileLayer(
      'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
      {
        attribution: `&copy;<a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a>,
          &copy;<a href="https://carto.com/attributions" target="_blank">CARTO</a>`,
        subdomains: 'abcd',
      }
    ).addTo(m);
    return m;
  }


