<script lang="ts">
	import { blogList } from "../javascript/bloglist";
	import { blogId } from "../javascript/storage";
	import Post from "../components/Post.svelte";
	import SelectedBlog from "../components/SelectedBlog.svelte";
	const firstBlogId = $blogId;
</script>

<div class="listContainer">
	<div class="limiter" />
	{#each $blogList as blog } {#if blog.id == firstBlogId }
	<SelectedBlog />
	<Post data="{blog}" />
	{:else }
	<Post data="{blog}" />
	{/if } {/each}
	<div class="limiter"></div>

	<style>
		.limiter {
			height: 3em;
		}
		.listContainer {
			overflow-y: auto;
			height: 100vh;
			width: 100%;
		}
	</style>
</div>
