<script lang="ts">
	import Swiper, {
		SwiperPluginLazyload,
		SwiperPluginNavigation,
	} from "tiny-swiper";
	import { navigate } from "svelte-routing";
	import type { Blog } from "../../../types/types";
	import { onDestroy, onMount, afterUpdate } from "svelte";
	import marked from "marked";
	import type { Writable } from "svelte/store";
	export let blogId: Writable<string>;
	export let blogList: Writable<Blog[]>;

	const plugins = [SwiperPluginLazyload, SwiperPluginNavigation];
	let container: HTMLElement;
	let swiper: any;

	const swiperConfig = {
		navigation: {
			prevEl: ".swiper-plugin-navigation-prevEl",

			nextEl: ".swiper-plugin-navigation-nextEl",
		},
		loop: true,
	};

	$: $blogList, swiper?.update();
	$: swiper?.slideTo($blogList.findIndex((b) => b.id == $blogId));

	onMount(() => {
		Swiper.use(plugins);
		swiper = new Swiper(container, swiperConfig);
		swiper.on("before-slide", (i, _) => {
			let selectedBlogId = $blogList[i]?.id;
			if (selectedBlogId) {
				$blogId = selectedBlogId;
			}
		});
	});

	onDestroy(() => {
		if (swiper) {
			swiper.destroy();
		}
	});

	afterUpdate(() => swiper?.update());
</script>

<div class="swiper-container" bind:this="{container}">
	<div class="swiper-wrapper">
		{ #each $blogList as blog }
		<div class="swiper-slide">
			<div class="swiper-text">
				<h1 on:click="{() => navigate('/blog')}">
					{ blog.title }
				</h1>

				{@html marked(blog.content ?? "")}
			</div>
			{ #if blog.images }

			<div class="images-container">
				{ #each blog.images.slice(0, 3) as image } <img
				class="image" src=/{image.path}
				alt="{image.description ?? ''}"> { /each }
			</div>
			{/if }
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
		height: 10rem;
		align-items: center;
		width: 100vw;
		cursor: grab;
	}

	.swiper-text {
		flex-direction: column;
		overflow: hidden;
		margin: 1rem;
		max-width: 30rem;
		max-height: 8rem;
	}

	.swiper-text h1 {
		font-size: 1, 25rem;
	}

	.swiper-slide img {
		width: 6rem;
		height: 6rem;
		background-color: black;
		object-fit: scale-down;
		margin: 0.5rem;
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
</style>
