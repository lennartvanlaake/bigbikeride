<script lang="ts">
	import { navigate } from "svelte-routing";
	import type { Blog } from "../../../types/types";
	import marked from "marked";
	import type { Writable } from "svelte/store";
	export let blogId: Writable<string>;
	export let blogList: Writable<Blog[]>;

	import SwiperCore, { Navigation, Pagination } from "swiper";
	import { Swiper, SwiperSlide } from "swiper/svelte";
	let swiper;

	// install Swiper modules
	SwiperCore.use([Navigation, Pagination]);
	function slideToSelected() {
		if (swiper) {
			let newIndex = $blogList.findIndex(
				(b) => b.id == $blogId
			);
			if (newIndex >= 0) {
				swiper.slideTo(newIndex, 1000, false);
			}
		} else {
			setTimeout(() => slideToSelected(), 300);
		}
	}

	function swiperInit(e: any) {
		swiper = e.detail[0];
	}

	function setBlogIdAfterSlide(e: any) {
		console.log(e);
		const selectedIndex = e.detail[0][0].activeIndex;
		const selectedBlog = $blogList.find(
			(b) => b.index == selectedIndex
		);
		$blogId = selectedBlog.id;
	}

	$: $blogId, $blogList, slideToSelected();
</script>

<Swiper
	class="swiper-wrapper"
	on:slideChange="{setBlogIdAfterSlide}"
	on:swiper="{swiperInit}"
	navigation="{true}"
	pagination='{{
  "type": "progressbar"
}}'
	style="--swiper-theme-color: orange;"
>
	{ #each $blogList as blog }
	<SwiperSlide>
		<div class="swiper-slide preview-slide" id="{blog.id}">
			<div class="fadeout-overlay" />
			<div class="swiper-text">
				<h1 on:click="{() => navigate('/blog')}">
					{ blog.title }
				</h1>

				{@html marked(blog.content ?? "")}
			</div>
		</div>
	</SwiperSlide>
	{ /each }
</Swiper>

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
