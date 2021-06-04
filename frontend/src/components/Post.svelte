<script lang="ts">
	import marked from "marked";
	import { afterUpdate } from "svelte";
	import { fade } from "svelte/transition";
	import type { Blog } from "../../../types/types";
	import Carousel from "../components/Carousel.svelte";

	export let data: Blog;

	let overflows = false;
	let hideOverflow = true;
	let blogContent: HTMLElement;

	afterUpdate(() => {
		if (overflows) return;
		overflows = contentOverflows();
	});

	function contentOverflows() {
		if (!blogContent) return false;
		if (
			blogContent.scrollHeight - blogContent.clientHeight >
				20 ||
			data.images
		) {
			return true;
		} else {
			return false;
		}
	}

	function toggleShowContent() {
		hideOverflow = !hideOverflow;
	}
</script>

<div class="white-rounded">
	<div class="title-wrapper">
		<h1 class="title">{data.title}</h1>
	</div>
	{ #if data.content }

	<div
		class="text blog-content"
		class:hide-overflow="{hideOverflow}"
		class:display-overflow="{!hideOverflow}"
		bind:this="{blogContent}"
	>
		{ #if overflows && hideOverflow }
		<div class="fadeout-overlay" transition:fade />
		{ /if }
		<div class="actual-content">
			{@html marked(data.content ?? "")}
		</div>
		{ #if overflows }
		<div class="toggle-container">
			<strong class="toggle" on:click="{toggleShowContent}">
				{ #if hideOverflow } + { :else } - { /if }
			</strong>
		</div>
		{ /if }
	</div>
	{ /if } { #if data.images }
	<Carousel images="{data.images}"></Carousel>
	{ /if }
</div>

<style>
	.toggle-container {
		text-align: center;
		position: absolute;
		bottom: 0;
		left: 0;
		z-index: 999;
		width: 100%;
	}

	.toggle {
		font-size: large;
		color: darkgray;
	}

	.hide-overflow {
		overflow: hidden;
		max-height: 9rem;
		transition: max-height 1s ease-out;
	}
	.display-overflow {
		max-height: 1000rem;
		transition: max-height 2s ease-in;
	}
	.blog-content {
		position: relative;
		padding-bottom: 2rem;
	}
	.fadeout-overlay {
		content: "";
		display: block;
		position: absolute;
		width: 100%;
		height: 100%;
		padding-bottom: 10px;
		background-image: linear-gradient(
			to bottom,
			transparent 10%,
			white 75%,
			white 100%
		);
		z-index: 30;
	}
</style>
