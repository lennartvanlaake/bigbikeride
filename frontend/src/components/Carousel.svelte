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
		  }
		: {};
	onMount(() => {
		Swiper.use(plugins);
		swiper = new Swiper(container, swiperConfig);
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
			<div class="swiper-img-container">
				<img class="image" src=/{currentImage.path}
				alt={currentImage.description ?? ""}/>
			</div>
			{ #if currentImage.description }
			<div class="description">
				<p>{currentImage.description}</p>
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
	}

	.swiper-slide {
		position: relative;
		display: flex;
		flex-shrink: 0;
		justify-content: center;
		height: 30rem;
		font-size: 18px;
		align-items: center;
		cursor: grab;
	}
	.swiper-img-container {
		position: absolute;
		top: 0;
		width: 100%;
		height: 27rem;
		background-color: black;
	}
	.swiper-slide img {
		position: absolute;
		top: 0;
		width: 100%;
		height: 27rem;
		object-fit: scale-down;
		object-position: top;
	}

	.swiper-plugin-navigation-prevEl,
	.swiper-plugin-navigation-nextEl {
		display: block;
		position: absolute;
		top: 50%;
		padding: 0.5rem;
		font-size: 2rem;
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

	.description {
		position: absolute;
		width: 100%;
		height: 3rem;
		bottom: 0;
		background-color: white;
		color: black;
		text-align: center;
	}
	.description p {
		margin-top: 0.2rem;
	}
</style>
