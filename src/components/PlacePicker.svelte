<script>
import createMap from "../javascript/maps.js";
import { createEventDispatcher } from 'svelte';
import * as L from 'leaflet';

// import * as L from 'leaflet';
import 'leaflet/dist/leaflet.css';
export let longitude = 5.2913;
export let latitude = 52.1326;
let map;
let marker;
const dispatch = createEventDispatcher();

$: {
    if (marker) {
        marker.remove();
    }
    if (map) {
        marker = L.marker([latitude, longitude]);
        marker.addTo(map);
        map.setView([latitude, longitude], 8);
    }
}

function initPlacePicker(container) {
    map = createMap(container, latitude, longitude, 8);
    marker = L.marker([latitude, longitude]);
    marker.addTo(map);
    map.on('click', e => {
        marker.remove();
        marker = L.marker([e.latlng.lat, e.latlng.lng]);
        marker.addTo(map)
        dispatch('selectLocation', {
            location: e.latlng
        })
    });
}
</script>


<div id='container' use:initPlacePicker>
</div>

<style>
    #container {
        height: 500px;
        width: 80%;
    }
</style>