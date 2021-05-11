<script lang="ts">
	import { blogList, fillBlogList } from "../javascript/bloglist";
	import Post from "../components/Post.svelte";
	fillBlogList();
</script>
<main>
		<div
			class="container mx-auto max-w-5xl w-full h-full pb-2 px-2 flex-auto"
		>
			{#each $blogList as blog }
			<Post data="{blog}" />
			{/each}
		</div>
</main>
