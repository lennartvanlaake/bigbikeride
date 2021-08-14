<script lang="ts">
	import { blogList } from "../javascript/bloglist";
	import createMap from "../javascript/maps";
	import { blogId, showOverlay } from "../javascript/storage";
	import RoundButton from "../components/RoundButton.svelte";
	import type { Blog, OverlayType } from "../../../types/types";
	import * as L from "leaflet";
	import BlogPreview from "../components/BlogPreview.svelte";
	import { onMount } from "svelte";
	import Overlay from "../components/Overlay.svelte";
	import ImageOverlay from "../components/ImageOverlay.svelte";
	import ExpandButton from "../components/ExpandButton.svelte";

	export let overlayType;

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

	$: select($blogList.find((b) => b.id == $blogId));
	$: $blogList, reinitMap();

	function getSelectedBlog() {
		return $blogList.find((b) => b.id == $blogId);
	}

	onMount(() => {
		if (overlayType) {
			selectOverlay(overlayType);
		}
	});

	function select(blog: Blog) {
		if (!blog) {
			return;
		}
		if (map) {
			map?.setView(
				[blog.coordinates.lat, blog.coordinates.long],
				8
			);
		} else {
			setTimeout(() => select(blog), 300);
		}
	}

	function reinitMap() {
		pointers.forEach((p) => map?.removeLayer(p));
		$blogList.forEach((b) => addPointer(b));
	}

	function mapInit(element: HTMLElement) {
		// hack to ensure height is set correctly
		// this method can be called before the previous component has been destroyed
		// that messes with the height set to the flexbox here
		setTimeout(() => {
			if ($blogList) {
				if (!$blogId) {
					$blogId = $blogList[0].id;
				}
				map = createMap(
					element,
					getSelectedBlog().coordinates,
					8
				);
				$blogList.forEach((b) => addPointer(b));
			} else {
				setTimeout(() => mapInit(element), 300);
			}
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
					if ($blogId == blog.id) {
						selectOverlay("Blog");
					} else {
						$blogId = blog.id;
					}
				})
		);
	}

	function selectOverlay(type: OverlayType) {
		$showOverlay = true;
		overlayType = type;
	}
</script>

<div id="meIcon" class="iconButton" on:click="{() => selectOverlay('AboutMe')}">
	<RoundButton icon="fa-user"></RoundButton>
</div>
<div id="bikeIcon" class="iconButton" on:click="{() => selectOverlay('Gear')}">
	<RoundButton icon="fa-bicycle"></RoundButton>
</div>
<div
	id="contactIcon"
	class="iconButton"
	on:click="{() => selectOverlay('Contact')}"
>
	<RoundButton icon="fa-comment-alt"></RoundButton>
</div>

{ #if $showOverlay }
<Overlay bind:type="{overlayType}" />
{ /if }
<ImageOverlay />
<div id="map" use:mapInit></div>

{ #if !$showOverlay }
<BlogPreview blogId="{blogId}" blogList="{blogList}" />
<div id="previewExpand" on:click="{() => selectOverlay('Blog')}">
	<ExpandButton isPlus="{true}" />
</div>
{ /if }
<style>
	#previewExpand {
		position: absolute;
		bottom: 1vh;
		left: 50%;
		transform: translate(-50%, 0);
	}

	#meIcon {
		top: 3rem;
	}

	#bikeIcon {
		top: 9rem;
	}
	#contactIcon {
		top: 15rem;
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
