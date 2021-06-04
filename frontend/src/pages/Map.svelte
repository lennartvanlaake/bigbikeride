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

	// javascript native modulo sucks with negative numbers
	function mod(n: number, m: number) {
		return ((n % m) + m) % m;
	}

	function getFirstCoordinates(): Coordinates {
		if (selectedBlog) return selectedBlog.coordinates;
		if ($blogList.length > 0) return $blogList[0].coordinates;
		return nlCoordinates;
	}

	function switchSelectedBlog(increment: number) {
		if (!$blogList) {
			return;
		}
		if (!selectedBlog) {
			select($blogList[0]);
			return;
		}
		const currentBlogPosition = $blogList.indexOf(selectedBlog!!);
		const newIndex = mod(
			currentBlogPosition + increment,
			$blogList.length
		);
		select($blogList[newIndex]);
	}

	function mapInit(element: HTMLElement) {
		// hack to ensure height is set correctly
		// this method can be called before the previous component has been destroyed
		// that messes with the height set to the flexbox here
		setTimeout(() => {
			//@ts-ignore
			map = createMap(element, getFirstCoordinates(), 8);
			$blogList.forEach((b) => addPointer(b));

			const leftArrow: any = createArrow(
				"bottomleft",
				"<",
				() => switchSelectedBlog(-1)
			);
			const rightArrow: any = createArrow(
				"bottomright",
				">",
				() => switchSelectedBlog(1)
			);
			map.addControl(new leftArrow());
			map.addControl(new rightArrow());
		}, 500);
	}

	function createArrow(
		position: string,
		text: string,
		callback: Function
	) {
		return L.Control.extend({
			options: {
				position: position,
			},

			onAdd: function (map: any) {
				var container = L.DomUtil.create(
					"a",
					"arrowButton"
				);
				L.DomEvent.disableClickPropagation(container);
				container.style.color = "black";
				container.style.fontSize = "1.5em";
				container.textContent = text;
				container.onclick = () => {
					callback();
				};
				return container;
			},
		});
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
		selectedBlog = blog;
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
	:global(.arrowButton) {
		background-color: green;
		padding: 1em;
		border-radius: 3px;
		border-color: black;
		display: inline-block;
		text-decoration: none;
		top: -2em;
	}

	#map {
		width: 100vw;
		height: 100%;
		flex-grow: 1;
		position: relative;
	}
	#selected {
		width: 100vw;
		height: 14em;
		position: relative;
		background-color: white;
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
