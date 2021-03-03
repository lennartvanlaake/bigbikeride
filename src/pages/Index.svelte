<script>
    import {
        getBlogs, blogList
    } from "../javascript/bloglist.js";
    let list = [];
    import TextBlog from "../components/TextBlog.svelte";
    import NavBar from "../components/Navbar.svelte";
    import VirtualList from '@sveltejs/svelte-virtual-list';
    blogList.subscribe(foundList => { console.log(foundList); list = foundList} );
    getBlogs();
</script>
<main>
    <div class="bg-gray-100 m-0 p-0 z-0 h-screen">
        <NavBar></NavBar>
        <div class="container mx-auto max-w-5xl	w-full h-full pt-20 pb-2 px-2 flex-auto">
            <VirtualList items={list} itemHeight={100} let:item>
                { #if item.type == "text" }  
                <TextBlog data = {item}/>
                { /if }
            </VirtualList>
        </div>
</main>
