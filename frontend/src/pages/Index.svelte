<script lang="ts">
	import { blogList } from "../javascript/bloglist";
	import { blogId } from "../javascript/storage";
	import Post from "../components/Post.svelte";
	import type { Blog } from "../../../types/types";
	import { writable } from "svelte/store";

	let displayedBlogList = writable<Blog[]>([]);
	let startIndex = 0;
	blogId.subscribe((id) => {
		if (id) {
			startIndex = $blogList.findIndex(
				(blog) => blog.id == id
			);
		}
	});

	blogList.subscribe(
		(list) =>
			($displayedBlogList = list.slice(
				startIndex,
				startIndex + 4
			))
	);

	const endObserver = new IntersectionObserver((entries) => {
		console.log("this the end");
		let lastDisplayedIndex =
			$displayedBlogList[$displayedBlogList.length - 1]
				?.index;
		if (
			entries[0].isIntersecting &&
			$displayedBlogList.length >= 3 &&
			lastDisplayedIndex &&
			lastDisplayedIndex != $blogList.length - 1
		) {
			const nextBlog = $blogList[lastDisplayedIndex + 1];
			if (nextBlog) {
				$displayedBlogList = [
					...$displayedBlogList,
					nextBlog,
				];
			}
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
	{#each $displayedBlogList as blog }
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
