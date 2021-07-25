<script lang="ts">
	import ExpandButton from "./ExpandButton.svelte";
	import { tick, onDestroy } from "svelte";
	import { showImageOverlay, overlayImages } from "../javascript/storage";
	import Swiper, { SwiperPluginLazyload } from "tiny-swiper";

	$: $showImageOverlay, init();
	let container: HTMLElement;
	let swiper: any;
	const swiperConfig = { plugins: [SwiperPluginLazyload], loop: true };

	async function init() {
		if ($showImageOverlay && $overlayImages) {
			await tick();
			swiper = new Swiper(container, swiperConfig);
		}
	}
	onDestroy(() => {
		swiper?.destroy();
	});
</script>

<div
	class="swiper-container"
	bind:this="{container}"
	class:overlay="{$showImageOverlay}"
>
	{ #if $showImageOverlay }
	<div class="swiper-wrapper">
		{ #each $overlayImages as currentImage }
		<div class="swiper-slide">
			<div
				class="swiper-img-container"
				class:full-length-image="{!currentImage.description}"
				class:description-cropped-image="{currentImage.description}"
			>
				<img class="image" src={currentImage.path}
				alt={currentImage.description ?? ""}/>
			</div>
		</div>
		{ /each }
	</div>

	<div id="expand" on:click="{() => $showImageOverlay = false}">
		<ExpandButton isPlus="{false}" />
	</div>
	{ /if }
</div>

<style>
	#expand {
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

	.swiper-slide {
		position: relative;
		display: flex;
		flex-shrink: 0;
		height: 100%;
		justify-content: center;
		font-size: 0.75rem;
		align-items: center;
		cursor: grab;
	}
	.swiper-img-container {
		width: 100vw;
		height: 100vh;
		position: absolute;
		top: 0;
		width: 100%;
		background-color: lightgrey;
	}
	.swiper-slide img {
		position: absolute;
		top: 0;
		width: 100%;
		height: 100%;
		object-fit: scale-down;
		object-position: center;
	}

	.swiper-img-overlay-navigation-prevEl,
	.swiper-img-overlay-navigation-nextEl {
		text-shadow: 2px 1px rgba(0, 0, 0, 0.4);
		display: block;
		position: absolute;
		top: 50%;
		transform: translateY(-50%);
		padding: 0.2rem;
		font-size: 1.75rem;
		font-weight: bold;
		color: white;
		border: none;
		outline: none;
		background: transparent;
		cursor: pointer;
	}
	.swiper-img-overlay-navigation-prevEl {
		left: 2rem;
	}

	.swiper-img-overlay-navigation-nextEl {
		right: 2rem;
	}
</style>
