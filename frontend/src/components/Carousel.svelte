<script lang="ts">
	import ExpandButton from "../components/ExpandButton.svelte";
	import { showImageOverlay, overlayImages } from "../javascript/storage";
	import Swiper from "tiny-swiper";
	import type { Image } from "../../../types/types";
	import { onDestroy, onMount } from "svelte";

	export let images: Array<Pick<Image, "path" | "description">>;
	let container: HTMLElement;
	let swiper: any;
	const swiperConfig = {
		loop: true,
	};

	function expand() {
		$showImageOverlay = true;
		$overlayImages = images;
	}

	onMount(() => {
		swiper = new Swiper(container, swiperConfig);
	});

	onDestroy(() => {
		swiper?.destroy();
	});
</script>

{ #if images }
<div class="swiper-container" bind:this="{container}">
	<div class="swiper-wrapper">
		{ #each images as currentImage }
		<div class="swiper-slide">
			<div
				class="swiper-img-container"
				class:full-length-image="{!currentImage.description}"
				class:description-cropped-image="{currentImage.description}"
			>
				<img class="image" src={currentImage.path}
				alt={currentImage.description ?? ""}/>
			</div>
			{ #if currentImage.description }
			<div class="description">
				<em>{currentImage.description}</em>
			</div>
			{ /if }
		</div>
		{ /each }
	</div>

	<div id="expand" on:click="{expand}">
		<ExpandButton isPlus="{true}" />
	</div>
</div>
{ /if }

<style>
	#expand {
		position: absolute;
		top: 2vh;
		right: 2vh;
	}

	.swiper-container {
		border-radius: 1rem;
		position: relative;
		overflow: hidden;
	}

	.swiper-container,
	.swiper-wrapper {
		padding: 0;
		margin: 0;
		width: 100%;
		height: 100%;
		background-color: white;
	}

	.swiper-slide {
		position: relative;
		display: flex;
		flex-shrink: 0;
		justify-content: center;
		height: 40vw;
		max-height: 30rem;
		font-size: 0.75rem;
		align-items: center;
		cursor: grab;
	}
	.swiper-img-container {
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
		object-position: top;
	}

	.full-length-image {
		height: 100%;
	}

	.description-cropped-image {
		height: 90%;
	}
	.description {
		position: absolute;
		width: 100%;
		height: 10%;
		bottom: 0;
		background-color: white;
		color: black;
		text-align: center;
	}
	.description em {
		margin-top: 0.2rem;
	}
</style>
