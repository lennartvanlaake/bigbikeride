<script lang="ts">
	import createMap from "../javascript/maps";
	import { nlCoordinates } from "../javascript/consts";
	import { createEventDispatcher } from "svelte";
	import * as L from "leaflet";
	import "leaflet/dist/leaflet.css";
	import type { Coordinates } from "../../../types/types";

	let bikeIcon = L.icon({
		iconUrl: "api/assets/orange-bike.png",
		shadowUrl: "api/assets/marker-shadow.png",
		iconSize: [55, 70], // size of the icon
		shadowSize: [40, 50], // size of the shadow
		iconAnchor: [16, 80], // point of the icon which will correspond to marker's location
		shadowAnchor: [4, 62], // the same for the shadow
		popupAnchor: [-3, -76], // point from which the popup should open relative to the iconAnchor
	});

	// default coordinates are in the Netherlands
	export let coordinates: Coordinates = nlCoordinates;
	let map: any;
	let marker: any;
	const dispatch = createEventDispatcher();

	$: {
		// if there is a marker already, remove it, we want only one
		if (marker) {
			marker.remove();
		}
		// wait until the map is created to do stuff
		if (map) {
			marker = L.marker([coordinates.lat, coordinates.long], {
				icon: bikeIcon,
			});
			marker.addTo(map);
			// center with a reasonable zoom factor to coordinates
			map.setView([coordinates.lat, coordinates.long], 8);
		}
	}

	function initPlacePicker(container: HTMLElement) {
		map = createMap(container, coordinates, 8);
		marker = L.marker([coordinates.lat, coordinates.long]);
		marker.addTo(map);
		map.on("click", (e: any) => {
			marker.remove();
			marker = L.marker([e.latlng.lat, e.latlng.lng]);
			marker.addTo(map);
			dispatch("selectLocation", {
				location: e.latlng,
			});
		});
	}
</script>

<div id="container" use:initPlacePicker />

<style>
	#container {
		height: 500px;
		width: 80%;
	}
</style>
