<script lang="ts">
	import Swiper, {
		SwiperPluginLazyload,
		SwiperPluginNavigation,
	} from "tiny-swiper";
	import type { Image } from "../../../types/types";
	import { onDestroy, onMount } from "svelte";

	export let images: Array<Pick<Image, "path" | "description">>;
	const hasMoreThanOneImage = images.length > 1;
	const plugins = hasMoreThanOneImage
		? [SwiperPluginLazyload, SwiperPluginNavigation]
		: [SwiperPluginLazyload];
	let container: HTMLElement;
	let swiper: any;
	const swiperConfig = hasMoreThanOneImage
		? {
				navigation: {
					prevEl:
						".swiper-plugin-navigation-prevEl",

					nextEl:
						".swiper-plugin-navigation-nextEl",
				},
				loop: true,
		  }
		: {};

	onMount(() => {
		Swiper.use(plugins);
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
				<img class="image" src=/{currentImage.path}
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

	{ #if hasMoreThanOneImage }
	<button class="swiper-plugin-navigation-prevEl">
		&lt;
	</button>

	<button class="swiper-plugin-navigation-nextEl">
		&gt;
	</button>
	{ /if }
</div>
{ /if }

<style>
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

	.swiper-plugin-navigation-prevEl,
	.swiper-plugin-navigation-nextEl {
		text-shadow: 2px 1px rgba(0, 0, 0, 0.4);
		display: block;
		position: absolute;
		top: 50%;
		transform: translateY(-50%);
		padding: 0.2rem;
		font-size: 1.5rem;
		font-weight: bold;
		color: white;
		border: none;
		outline: none;
		background: transparent;
		cursor: pointer;
	}
	:global(.swiper-button-disabled) {
		opacity: 0.5;
		cursor: not-allowed;
	}

	.swiper-plugin-navigation-prevEl {
		left: 2rem;
	}

	.swiper-plugin-navigation-nextEl {
		right: 2rem;
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
