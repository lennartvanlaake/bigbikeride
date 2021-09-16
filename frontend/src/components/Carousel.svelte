<script lang="ts">
	import { getLink } from "../javascript/imagesize";
	import { Swiper, SwiperSlide } from "swiper/svelte";
	import type { Image } from "../../../types/types";
	import { onDestroy, onMount } from "svelte";
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
	export let container: HTMLElement;
	export let images: Image[];

	let elements = {};

	function isWrongWayUp(element: HTMLImageElement) {
		return (
			element.clientHeight < element.height &&
			element.clientHeight < element.clientWidth
		);
	}

	function init() {
		setTimeout(() => {
			if (
				container &&
				images.every((image) => elements[image.id])
			) {
				images.forEach(async (image) => {
					const element: HTMLImageElement =
						elements[image.id];
					const link = await getLink(
						element.height,
						image
					);
					element.src = link;
					if (isWrongWayUp(element)) {
						element.classList.add(
							"rotated"
						);
					}
				});
			} else {
				init();
			}
		}, 200);
	}

	onMount(() => {
		init();
	});
</script>

{ #if images }
<Swiper class="swiper-wrapper" navigation="{true}" pagination="{true}" style="--swiper-theme-color: orange">
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
				bind:this={elements[currentImage.id]} src=""
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
