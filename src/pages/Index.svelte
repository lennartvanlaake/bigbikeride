<script>
    import {
        getBlogs, blogList
    } from "../javascript/bloglist.js";
    let list = [];
    import TextBlog from "../components/TextBlog.svelte";
    import VirtualList from '@sveltejs/svelte-virtual-list';
    blogList.subscribe(foundList => { console.log(foundList); list = foundList} );
    getBlogs();
</script>
<main>
	<a href="/app/edit">Edit stuff!</a>

    <VirtualList items={list} height="1000px" let:item>
        { #if item.type == "text" }  
        <TextBlog data = {item}/>
        { /if }
    </VirtualList>
</main>
