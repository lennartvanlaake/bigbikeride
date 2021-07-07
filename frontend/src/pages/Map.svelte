<script lang="ts">
	import { nlCoordinates } from "../javascript/consts";
	import { blogList } from "../javascript/bloglist";
	import createMap from "../javascript/maps";
	import { blogId } from "../javascript/storage";
	import RoundButton from "../components/RoundButton.svelte";
	import type { Blog, Coordinates } from "../../../types/types";
	import * as L from "leaflet";
	import BlogPreview from "../components/BlogPreview.svelte";
	import Overlay from "../components/Overlay.svelte";
	import ExpandButton from "../components/ExpandButton.svelte";

	let selectedBlog = $blogList.find((b) => b.id == $blogId);
	let map: any;
	let pointers = [];
	let bikeIcon = L.icon({
		iconUrl: "api/assets/orange-bike.png",
		shadowUrl: "api/assets/marker-shadow.png",
		iconSize: [55, 70], // size of the icon
		shadowSize: [40, 50], // size of the shadow
		iconAnchor: [16, 80], // point of the icon which will correspond to marker's location
		shadowAnchor: [4, 62], // the same for the shadow
		popupAnchor: [-3, -76], // point from which the popup should open relative to the iconAnchor
	});

	let overlayVisible = false;
	let overlayType;

	$: select($blogList.find((b) => b.id == $blogId));
	$: $blogList, reinitMap();

	function select(blog: Blog) {
		map?.setView([blog.coordinates.lat, blog.coordinates.long], 8);
	}

	function reinitMap() {
		pointers.forEach((p) => map?.removeLayer(p));
		$blogList.forEach((b) => addPointer(b));
	}

	function getFirstCoordinates(): Coordinates {
		if (selectedBlog) return selectedBlog.coordinates;
		if ($blogList.length > 0) return $blogList[0].coordinates;
		return nlCoordinates;
	}

	function mapInit(element: HTMLElement) {
		// hack to ensure height is set correctly
		// this method can be called before the previous component has been destroyed
		// that messes with the height set to the flexbox here
		setTimeout(() => {
			//@ts-ignore
			map = createMap(element, getFirstCoordinates(), 8);
			$blogList.forEach((b) => addPointer(b));
		}, 500);
	}

	function addPointer(blog: Blog) {
		if (!map) {
			return;
		}
		pointers.push(
			L.marker(
				[blog.coordinates.lat, blog.coordinates.long],
				{ icon: bikeIcon }
			)
				.addTo(map)
				.on("click", (_e) => {
					blogId.set(blog.id);
				})
		);
	}

	function selectOverlay(type: string) {
		console.log("Selecting overlay");
		overlayVisible = true;
		overlayType = type;
	}
</script>

<div id="bikeIcon" class="iconButton" on:click="{() => selectOverlay('Gear')}">
	<RoundButton icon="fa-bicycle"></RoundButton>
</div>
<div id="meIcon" class="iconButton" on:click="{() => selectOverlay('AboutMe')}">
	<RoundButton icon="fa-user"></RoundButton>
</div>
<Overlay bind:isVisible="{overlayVisible}" bind:type="{overlayType}" />
<div id="map" use:mapInit></div>
<div class:invisible="{overlayVisible}">
	<BlogPreview blogId="{blogId}" blogList="{blogList}" />
	<div id="previewExpand" on:click="{() => selectOverlay('Blog')}">
		<ExpandButton />
	</div>
</div>
<style>
	#previewExpand {
		position: absolute;
		bottom: 4rem;
		right: 1rem;
	}

	.invisible {
		display: none;
	}

	#meIcon {
		top: 3rem;
	}

	#bikeIcon {
		top: 9rem;
	}
	.iconButton {
		z-index: 500;
		position: absolute;
		right: 3rem;
	}

	#map {
		width: 100vw;
		height: 100%;
		flex-grow: 1;
		position: relative;
	}
</style>
