<script lang="ts">
	import { nlCoordinates } from "../javascript/consts";
	import { blogList } from "../javascript/bloglist";
	import createMap from "../javascript/maps";
	import { blogId } from "../javascript/storage";
	import type { Blog, Coordinates } from "../../../types/types";
	import * as L from "leaflet";

	let selectedBlog = $blogList.filter((b) => b.id == $blogId);
	let map: any;

	function getFirstCoordinates(): Coordinates {
		if (selectedBlog.length > 0) return selectedBlog[0].coordinates;
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
		}, 500);
	}

	function addPointer(blog: Blog) {
		L.marker([blog.coordinates.lat, blog.coordinates.long])
			.addTo(map)
			.on("click", (_e) => {
				blogId.set(blog.id);
				map.setView(
					[
						blog.coordinates.lat,
						blog.coordinates.long,
					],
					8
				);
			});
	}
</script>

<div id="map" use:mapInit></div>

<style>
	#map {
		width: 100vw;
		height: 100%;
		flex-grow: 1;
		position: relative;
	}
</style>
