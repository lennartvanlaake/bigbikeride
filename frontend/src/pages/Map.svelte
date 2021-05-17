<script lang="ts">
	import { nlCoordinates } from "../javascript/consts";
	import { blogList } from "../javascript/bloglist";
	import createMap from "../javascript/maps";
	import { blogId } from "../javascript/storage";
	import type { Blog, Coordinates } from "../../../types/types";
	import * as L from "leaflet";

	let selectedBlog = $blogList.find((b) => b.id == $blogId);
	let map: any;

	blogId.subscribe((id) => {
		selectedBlog = $blogList.find((b) => b.id == id);
	});

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
			map = createMap(element, getFirstCoordinates(), 8);
			$blogList.forEach((b) => addPointer(b));

			map.on("click", (e: any) => {
				blogId.set(null);
			});
		}, 500);
	}

	function addPointer(blog: Blog) {
		L.marker([blog.coordinates.lat, blog.coordinates.long])
			.addTo(map)
			.on("click", (_e) => {
				select(blog);
			});
	}

	function select(blog: Blog) {
		blogId.set(blog.id);
		map.setView([blog.coordinates.lat, blog.coordinates.long], 8);
	}
</script>

<div id="map" use:mapInit></div>
{ #if selectedBlog }
<div id="selected">
	<div id="selectedText" class="white-rounded">
		<h1 class="title">{ selectedBlog?.title }</h1>
	</div>
</div>
{ /if }

<style>
	#map {
		width: 100vw;
		height: 100%;
		flex-grow: 1;
		position: relative;
	}
	#selected {
		border-radius: 1em 1em 0 0;
		width: 100vw;
		height: 14em;
		position: relative;
		background-color: #e5e5e5;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	#selectedText {
		height: 80%;
		width: 90%;
		margin: 1em;
		text-align: center;
	}
</style>
