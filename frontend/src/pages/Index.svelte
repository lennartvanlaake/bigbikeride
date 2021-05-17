<script lang="ts">
	import { blogList } from "../javascript/bloglist";
	import Post from "../components/Post.svelte";

	const endObserver = new IntersectionObserver((entries) => {
		if (entries[0].isIntersecting) {
			console.log("this the end");
		}
	});

	function initEnd(end: Element) {
		endObserver.observe(end);
	}

	const startObserver = new IntersectionObserver((entries) => {
		if (entries[0].isIntersecting) {
			console.log("this the start");
		}
	});

	function initStart(end: Element) {
		startObserver.observe(end);
	}
</script>

<div class="listContainer">
	<div use:initStart />
	{#each $blogList as blog }
	<Post data="{blog}" />
	{/each}
	<div use:initEnd />
</div>

<style>
	.listContainer {
		overflow-y: auto;
		height: 85vh;
		width: 100%;
	}
</style>
