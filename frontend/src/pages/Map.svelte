<script lang="ts">
	import { nlCoordinates } from "../javascript/consts";
	import { blogList } from "../javascript/bloglist";
	import createMap from "../javascript/maps";
	import { blogId } from "../javascript/storage";
	import type { Coordinates } from "../../../types/types";

	let selectedBlog = $blogList.filter((b) => b.id == $blogId);

	function getFirstCoordinates(): Coordinates {
		if (selectedBlog.length > 0) return selectedBlog[0].coordinates;
		if ($blogList.length > 0) return $blogList[0].coordinates;
		return nlCoordinates;
	}

	function mapInit(element: HTMLElement) {
		createMap(element, getFirstCoordinates(), 8);
	}
</script>

<div id="map" use:mapInit></div>

<style>
	#map {
		width: 100vw;
		height: 100vh;
	}
</style>
