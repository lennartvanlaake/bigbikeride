<script lang="ts">
	import marked from "marked";
	import type { Blog } from "../../../types/types";
	import Carousel from "../components/Carousel.svelte";

	export let data: Blog;
</script>

<div class="white-rounded">
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
