<script lang="ts">
	import { getLink } from "../javascript/imagesize";
	import { Swiper, SwiperSlide } from "swiper/svelte";
	import type { Image } from "../../../types/types";
	import { onMount, afterUpdate } from "svelte";
	import SwiperCore, { Navigation, Pagination } from "swiper";

	// install Swiper modules
	SwiperCore.use([Navigation, Pagination]);
	import "swiper/css/navigation";
	import "swiper/css/pagination";
	import "swiper/css/scrollbar";
	import "swiper/css";

	export let height = "40vw";
	export let maxHeight = "30rem";
	export let width = "100%";
	export let images: Image[];

	let elements = {};
	let links = {};
	images.forEach((image) => (links[image.id] = ""));

	onMount(() => {
		images.forEach(async (image) => {
			const element = elements[image.id];
			links[image.id] = await getLink(element.height, image);
			element.onload = function () {
				if (links[image.id] == image.path) {
					return;
				} else if (image.turn == "right") {
					element.style.transform =
						"rotate(90deg)";
				} else if (image.turn == "left") {
					element.style.transform =
						"rotate(270deg)";
				} else {
					return;
				}
			};
		});
	});
</script>

{ #if images }
<Swiper
	class="swiper-wrapper"
	navigation="{true}"
	pagination="{true}"
	style="--swiper-theme-color: orange;"
>
	{ #each images as currentImage }
	<SwiperSlide>
		<div
			class="slide"
			style="--max-slide-height: {maxHeight}; --slide-height: {height}; --slide-width: {width}"
		>
			<div
				class="swiper-img-container"
				class:full-length-image="{!currentImage.description}"
				class:description-cropped-image="{currentImage.description}"
			>
				<img class="image"
				bind:this={elements[currentImage.id]}
				src={links[currentImage.id]}
				alt={currentImage.description ?? ""}/>
			</div>
			{ #if currentImage.description }
			<div class="description">
				<em>{currentImage.description}</em>
			</div>
			{ /if }
		</div>
	</SwiperSlide>
	{ /each }
</Swiper>
{ /if }

<style>
	.rotated {
		transform: rotate(90deg);
	}

	.slide {
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
	.image {
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
