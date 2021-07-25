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
			prevEl: ".swiper-preview-navigation-prevEl",
			nextEl: ".swiper-preview-navigation-nextEl",
		},
		loop: true,
		plugins: plugins,
	};

	function slideToSelected() {
		if (swiper) {
			swiper.update();
			let newIndex = $blogList.findIndex(
				(b) => b.id == $blogId
			);
			if (newIndex >= 0) {
				swiper.slideTo(newIndex);
			}
		} else {
			setTimeout(() => slideToSelected(), 300);
		}
	}

	function setBlogId() {
		setTimeout(() => {
			$blogId = document.getElementsByClassName(
				"preview-slide swiper-slide-active"
			)[0]?.id;
		}, 300);
	}

	$: $blogId, $blogList, slideToSelected();
	onMount(() => {
		swiper = new Swiper(container, swiperConfig);
		slideToSelected();
		swiper.on("after-slide", () => {
			setBlogId();
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
		<div class="swiper-slide preview-slide" id="{blog.id}">
			<div class="fadeout-overlay" />
			<div class="swiper-text">
				<h1 on:click="{() => navigate('/blog')}">
					{ blog.title }
				</h1>

				{@html marked(blog.content ?? "")}
			</div>
		</div>
		{ /each }
	</div>

	<button class="swiper-preview-navigation-prevEl">
		&lt;
	</button>

	<button class="swiper-preview-navigation-nextEl">
		&gt;
	</button>
</div>

<style>
	.fadeout-overlay {
		content: "";
		display: block;
		position: absolute;
		width: 100%;
		height: 100%;
		padding-bottom: 10px;
		background-image: linear-gradient(
			to bottom,
			transparent 50%,
			white 90%,
			white 100%
		);
		z-index: 30;
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
	}

	.swiper-slide {
		position: relative;
		display: flex;
		flex-shrink: 0;
		justify-content: center;
		height: 12rem;
		align-items: center;
		width: 100vw;
		cursor: grab;
	}

	.swiper-text {
		flex-direction: column;
		overflow: hidden;
		margin: 1rem;
		max-width: 30rem;
		max-height: 6rem;
		padding-left: 3rem;
		padding-right: 3rem;
	}

	.swiper-text h1 {
		font-size: 1.5rem;
	}

	.swiper-preview-navigation-prevEl,
	.swiper-preview-navigation-nextEl {
		top: 50%;
		transform: translateY(-50%);
		display: block;
		position: absolute;
		padding: 0.5rem;
		font-size: 2rem;
		font-weight: bold;
		color: lightgrey;
		border: none;
		outline: none;
		background: transparent;
		cursor: pointer;
	}
	:global(.swiper-button-disabled) {
		opacity: 0.5;
		cursor: not-allowed;
	}

	.swiper-preview-navigation-prevEl {
		left: 20px;
	}

	.swiper-preview-navigation-nextEl {
		right: 20px;
	}
</style>
