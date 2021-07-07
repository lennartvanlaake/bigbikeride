<script lang="ts">
	import { blogList } from "../javascript/bloglist";
	import { blogId } from "../javascript/storage";
	import Post from "../components/Post.svelte";
	import SelectedBlog from "../components/SelectedBlog.svelte";
	import type { Blog } from "../../../types/types";
	import { tick } from "svelte";

	const pageSize = 4;
	const sliceList = (list: Blog[]) => {
		const selectedBlogIndex = list.find((b) => b.id == $blogId)
			?.index;
		const startIndex =
			selectedBlogIndex - pageSize > 0
				? selectedBlogIndex - pageSize
				: 0;
		const endIndex = selectedBlogIndex
			? selectedBlogIndex + pageSize
			: list.length - 1;
		return [...list.slice(startIndex, endIndex)];
	};
	let initialList = true;
	let listElement: HTMLElement;
	let displayedBlogList = sliceList($blogList);
	blogList.subscribe((list) => (displayedBlogList = sliceList(list)));

	const isAddable = (entries: Array<any>, index: number | undefined) =>
		entries[0].isIntersecting && index;

	const endObserver = new IntersectionObserver(async (entries) => {
		initialList = false;
		let currentScrollPosition = listElement.scrollTop;
		let oldScroll =
			listElement.scrollHeight - listElement.clientHeight;

		let lastDisplayedIndex =
			displayedBlogList[displayedBlogList.length - 1]?.index;

		if (
			isAddable(entries, lastDisplayedIndex) &&
			lastDisplayedIndex != $blogList.length - 1
		) {
			const nextBlogs = $blogList.slice(
				lastDisplayedIndex + 1,
				lastDisplayedIndex + 1 + pageSize
			);
			if (nextBlogs) {
				displayedBlogList = [
					...displayedBlogList,
					...nextBlogs,
				];
			}
		}

		await tick();
		let newScroll =
			listElement.scrollHeight - listElement.clientHeight;
		listElement.scrollTop =
			currentScrollPosition + (newScroll - oldScroll);
	});

	function initEnd(end: Element) {
		endObserver.observe(end);
	}

	const startObserver = new IntersectionObserver(async (entries) => {
		initialList = false;

		let currentScrollPosition = listElement.scrollTop;
		let oldScroll =
			listElement.scrollHeight - listElement.clientHeight;

		let firstDisplayedIndex = displayedBlogList[0]?.index;
		if (
			isAddable(entries, firstDisplayedIndex) &&
			firstDisplayedIndex != 0
		) {
			const previousBlogs = $blogList.slice(
				firstDisplayedIndex - (1 + pageSize) > 0
					? firstDisplayedIndex - (1 + pageSize)
					: 0,
				firstDisplayedIndex
			);
			if (previousBlogs) {
				displayedBlogList = [
					...previousBlogs,
					...displayedBlogList,
				];
			}
		}

		await tick();
		let newScroll =
			listElement.scrollHeight - listElement.clientHeight;
		listElement.scrollTop =
			currentScrollPosition + (newScroll - oldScroll);
	});

	function initStart(start: Element) {
		startObserver.observe(start);
	}
</script>

<div class="listContainer" bind:this="{listElement}">
	<div class="limiter" use:initStart />
	{#each displayedBlogList as blog } {#if blog.id == $blogId &&
	initialList }
	<SelectedBlog />
	<Post data="{blog}" />
	{:else }
	<Post data="{blog}" />
	{/if } {/each}
	<div class="limiter" use:initEnd />
</div>

<style>
	.limiter {
		height: 3em;
	}
	.listContainer {
		overflow-y: auto;
		height: 85vh;
		width: 100%;
	}
</style>
