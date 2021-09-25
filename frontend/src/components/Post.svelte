<script lang="ts">
	import marked from "marked";
	import type { Blog } from "../../../types/types";
	import ThumbnailCarousel from "../components/ThumbnailCarousel.svelte";
	import { blogId } from "../javascript/storage";
	import { onMount } from "svelte";
	export let data: Blog;
	let element: HTMLElement;

	let intersectionObserver = new IntersectionObserver((entries) => {
		if (entries[0].isIntersecting) {
			$blogId = data.id;
		}
	});

	onMount(() => {
		intersectionObserver.observe(element);
	});
</script>

<div class="white-rounded" bind:this="{element}">
	<div class="title-wrapper">
		<h1 class="title">{data.title}</h1>
		<em class="date">{new Date(data.created).toDateString()}</em>
	</div>
	<div class="text blog-content">
		<div class="actual-content">
			{@html marked(data.content ?? "")}
		</div>
		{ #if data.images }
		<ThumbnailCarousel images="{data.images}" />
		{ /if }
	</div>
</div>
<style>
	.date {
		color: #574f4e;
		font-size: 0.9em;
	}

	.title {
		margin-bottom: 0.5rem;
	}
	.blog-content {
		position: relative;
	}
	.actual-content {
		margin-bottom: 1rem;
	}
</style>
