<script lang="ts">
	import ExpandButton from "./ExpandButton.svelte";
	import Carousel from "./Carousel.svelte";
	import { showImageOverlay, overlayImages } from "../javascript/storage";
	import type { Image } from "../../../types/types";
	export let images: Image[];
	let container: HTMLElement;
	function expand() {
		$showImageOverlay = true;
		$overlayImages = images;
	}
</script>
<div class="swiper-container" bind:this="{container}">
	<Carousel
		height="100vh"
		width="100vw"
		images="{images}"
		container="{container}"
	></Carousel>

	<div id="expand" on:click="{expand}">
		<ExpandButton isPlus="{true}" />
	</div>
</div>

<style>
	#expand {
		position: absolute;
		right: 2rem;
		top: 2rem;

	}
	
	.swiper-container {
		border-radius: 2rem;
		position: relative;
		overflow: hidden;
		padding: 0;
		margin: 0;
		width: 100%;
		height: 100%;
		background-color: white;
	}
</style>
