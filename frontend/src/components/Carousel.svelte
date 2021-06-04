<script lang="ts">
	import Swiper, {
		SwiperPluginLazyload,
		SwiperPluginNavigation,
	} from "tiny-swiper";
	import type { Image } from "../../../types/types";
	import { onDestroy, onMount } from "svelte";

	export let images: Array<Pick<Image, "path" | "description">>;
	let container: HTMLElement;
	let swiper: any;

	onMount(() => {
		Swiper.use([SwiperPluginLazyload, SwiperPluginNavigation]);
		swiper = new Swiper(container, {
			navigation: {
				prevEl: ".swiper-plugin-navigation-prevEl",

				nextEl: ".swiper-plugin-navigation-nextEl",
			},
		});
	});

	onDestroy(() => {
		if (swiper) {
			swiper.destroy();
		}
	});
</script>

{ #if images }
<div class="swiper-container" bind:this="{container}">
	<div class="swiper-wrapper">
		{ #each images as currentImage }
		<div class="swiper-slide">
			<img class="image" src=/{currentImage.path}
			alt={currentImage.description ?? ""}/> { #if
			currentImage.description }
			<p class="description">{currentImage.description}</p>
			{ /if }
		</div>
		{ /each }
	</div>

	<button class="swiper-plugin-navigation-prevEl">
		&lt;
	</button>

	<button class="swiper-plugin-navigation-nextEl">
		&gt;
	</button>
</div>
{ /if }

<style>
	.swiper-container {
		position: relative;
		overflow: hidden;
	}

	.swiper-container,
	.swiper-wrapper {
		padding: 0;
		margin: 0;
		width: 100%;
		height: 100%;
	}

	.swiper-slide {
		position: relative;
		display: flex;
		flex-shrink: 0;
		justify-content: center;
		width: 100%;
		height: 100%;
		font-size: 18px;
		align-items: center;
		cursor: grab;
	}

	.swiper-slide img {
		display: block;
		width: 100%;
		height: 100%;
		object-fit: cover;
		object-position: top;
	}

	.swiper-plugin-navigation-prevEl,
	.swiper-plugin-navigation-nextEl {
		display: block;
		position: absolute;
		top: 50%;
		padding: 0;
		font-size: 24px;
		font-weight: bold;
		color: #fff;
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
		left: 20px;
	}

	.swiper-plugin-navigation-nextEl {
		right: 20px;
	}
</style>
