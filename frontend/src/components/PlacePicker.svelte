<script lang="ts">
	import createMap from "../javascript/maps";
	import { createEventDispatcher } from "svelte";
	import * as L from "leaflet";
	import "leaflet/dist/leaflet.css";
	import type { Coordinates } from "../../../types/types";

	// default coordinates are in the Netherlands
	export let coordinates: Coordinates = {
		lat: 52.1326,
		long: 5.2913,
	};
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
			marker = L.marker([coordinates.lat, coordinates.long]);
			marker.addTo(map);
			// center with a reasonable zoom factor to coordinates
			map.setView([coordinates.lat, coordinates.long], 8);
		}
	}

	function initPlacePicker(container: string) {
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
