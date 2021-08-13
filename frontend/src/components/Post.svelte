<script lang="ts">
	import marked from "marked";
	import type { Blog } from "../../../types/types";
	import Carousel from "../components/Carousel.svelte";
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
	</div>
	<div class="text blog-content">
		<div class="actual-content">
			{@html marked(data.content ?? "")}
		</div>
		{ #if data.images }
		<Carousel images="{data.images}" />
		{ /if }
	</div>
</div>
<style>
	.blog-content {
		position: relative;
	}

	.actual-content {
		margin-bottom: 1rem;
	}
</style>
