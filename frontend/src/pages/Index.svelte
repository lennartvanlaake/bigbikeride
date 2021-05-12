<script lang="ts">
	import { blogList, fillBlogList } from "../javascript/bloglist";
	import Post from "../components/Post.svelte";
	import { firstVisit } from "../javascript/storage";
	import { navigate } from "svelte-routing";

	if ($firstVisit) {
		navigate("/about");
		firstVisit.set(false);
	}

	fillBlogList();
</script>
<div>
	{#each $blogList as blog }
	<Post data="{blog}" />
	{/each}
</div>
