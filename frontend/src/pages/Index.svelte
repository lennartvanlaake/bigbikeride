<script lang="ts">
	import { blogList } from "../javascript/bloglist";
	import { blogId } from "../javascript/storage";
	import Post from "../components/Post.svelte";
	import type { Blog } from "../../../types/types";
	import { writable } from "svelte/store";

	const pageSize = 4;
	let startIndex = 0;
	const sliceList = (list: Blog[]) => {
		return list.slice(startIndex, startIndex + pageSize);
	};
	let displayedBlogList = writable<Blog[]>(sliceList($blogList));
	const isAddable = (entries: Array<any>, index: number | undefined) =>
		entries[0].isIntersecting &&
		$blogList.length >= pageSize &&
		index;

	blogId.subscribe((id) => {
		if (id) {
			let foundIndex = $blogList.findIndex(
				(blog) => blog.id == id
			);
			startIndex = foundIndex == -1 ? 0 : foundIndex;
		}
	});

	blogList.subscribe((list) => {
		$displayedBlogList = sliceList(list);
	});

	const endObserver = new IntersectionObserver((entries) => {
		let lastDisplayedIndex =
			$displayedBlogList[$displayedBlogList.length - 1]
				?.index;
		if (
			isAddable(entries, lastDisplayedIndex) &&
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
		let firstDisplayedIndex = $displayedBlogList[0]?.index;
		if (
			isAddable(entries, firstDisplayedIndex) &&
			firstDisplayedIndex != 0
		) {
			const previousBlog = $blogList[firstDisplayedIndex - 1];
			if (previousBlog) {
				$displayedBlogList = [
					previousBlog,
					...$displayedBlogList,
				];
			}
		}
	});

	function initStart(start: Element) {
		startObserver.observe(start);
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
