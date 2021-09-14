<script lang="ts">
	import { getLink } from "../javascript/imagesize";
	import Swiper from "tiny-swiper";
	import type { Image } from "../../../types/types";
	import { onDestroy, onMount } from "svelte";
	import { v4 } from "uuid";

	export let height = "40vw";
	export let maxHeight = "30rem";
	export let width = "100%";
	export let container: HTMLElement;
	export let images: Image[];

	const id = v4();
	let elements = {};
	let swiper: any;

	const slideClass = `${id}-slide`;
	const activeClass = `${id}-active`;
	const swiperConfig = {
		loop: true,
		slideClass: slideClass,
		slideActiveClass: activeClass,
	};

	function init() {
		setTimeout(() => {
			if (container && elements) {
				swiper = new Swiper(container, swiperConfig);
				images.forEach(async (image) => {
					const element: HTMLImageElement =
						elements[image.id];
					const link = await getLink(
						element.height,
						image
					);
					element.src = link;
				});
			} else {
				init();
			}
		}, 200);
	}

	onMount(() => {
		init();
	});

	onDestroy(() => {
		swiper?.destroy();
	});
</script>

{ #if images }
<div class="swiper-wrapper">
	{ #each images as currentImage }
	<div
		class="swiper-slide {slideClass}"
		style="--max-slide-height: {maxHeight}; --slide-height: {height}; --slide-width: {width}"
	>
		<div
			class="swiper-img-container"
			class:full-length-image="{!currentImage.description}"
			class:description-cropped-image="{currentImage.description}"
		>
			<img class="image" bind:this={elements[currentImage.id]}
			src="" alt={currentImage.description ?? ""}/>
		</div>
		{ #if currentImage.description }
		<div class="description">
			<em>{currentImage.description}</em>
		</div>
		{ /if }
	</div>
	{ /each }
</div>
{ /if }

<style>
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
		height: var(--slide-height);
		max-height: var(--max-slide-height);
		width: var(--slide-width);
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
