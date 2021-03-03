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
    <body class="bg-gray-100 m-0 p-0">
        <a href="/app/edit">Edit stuff!</a>
        <div class="container mx-auto max-w-5xl	w-full h-screen p-10">
            <VirtualList items={list} itemHeight={100} let:item>
                { #if item.type == "text" }  
                <TextBlog data = {item}/>
                { /if }
            </VirtualList>
        </div>
    </body>
</main>
