<script lang="ts">
	import { blogList, fillBlogList } from "../javascript/bloglist";
	import Post from "../components/Post.svelte";
	import NavBar from "../components/Navbar.svelte";
	import type { Blog } from "../../../types/types";
	let list: Array<Blog> = [];
	blogList.subscribe((foundList) => {
		console.log(foundList);
		list = foundList;
	});
	fillBlogList();
</script>
<main>
	<div class="bg-gray-100 m-0 p-0 z-0 h-full">
		<NavBar></NavBar>
		<div
			class="container mx-auto max-w-5xl w-full h-full pt-20 pb-2 px-2 flex-auto"
		>
			{#each list as blog }
			<Post data="{blog}" />
			{/each}
		</div>
	</div>
</main>
