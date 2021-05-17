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
		// hack to ensure height is set correctly
		// this method can be called before the previous component has been destroyed
		// that messes with the height set to the flexbox here
		setTimeout(
			() => createMap(element, getFirstCoordinates(), 8),
			500
		);
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
