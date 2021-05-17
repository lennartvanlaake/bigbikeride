<script lang="ts">
	import { blogList } from "../javascript/bloglist";
	import Post from "../components/Post.svelte";
</script>
{#each $blogList as blog }
<Post data="{blog}" />
{/each}
