<script lang="ts">
	import ExpandButton from "./ExpandButton.svelte";
	import Carousel from "./Carousel.svelte";
	import { showImageOverlay, overlayImages } from "../javascript/storage";
	$: $showImageOverlay;
	let overlay: HTMLElement;
</script>

<div class:overlay="{$showImageOverlay}" bind:this="{overlay}">
	{ #if $showImageOverlay }
	<Carousel
		container="{overlay}"
		height="100vh"
		maxHeight="100vh"
		width="100vw"
		images="{$overlayImages}"
	></Carousel>
	<div id="expand" on:click="{() => $showImageOverlay = false}">
		<ExpandButton isPlus="{false}" />
	</div>
	{ /if }
</div>

<style>
	#expand {
		z-index: 600;
		position: fixed;
		right: 2rem;
		top: 2rem;
	}
	.overlay {
		position: fixed;
		width: 100vw;
		height: 100vh;
		z-index: 999;
		background-color: white;
	}
</style>
