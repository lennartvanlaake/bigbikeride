<script lang="ts">
 import * as api from '../javascript/api'
 import * as utils from '../javascript/utils'
  import { blogId } from "../javascript/storage.js";
    import PlacePicker from "../components/PlacePicker.svelte";
    import MarkdownEditor from "../components/MarkdownEditor.svelte";
    import NavBar from "../components/Navbar.svelte";
    import { tick } from "svelte";
    //@ts-ignore
    import FilePond, { registerPlugin } from "svelte-filepond";
    import FilePondPluginImagePreview from "filepond-plugin-image-preview";
    import { Blog, BlogType, Coordinates, CreateBlogRequest } from "../../../types/types.js";
    import Post from '../components/Post.svelte';
    import { onMount } from 'svelte';
    let simplemde: any;
    let blog: Blog;
    let upload: any;
    let uploadName = "images";
    let foundBlogId: string;

    // sync the set blog id between pages/components
    blogId.subscribe((value) => {
       foundBlogId = value
    })

    registerPlugin(FilePondPluginImagePreview);

    async function fill(blogId: string) {
	blog = await api.getBlog(blogId);
    }

    async function create(type: BlogType) {
        const coordinates = await getLocation();
	const request = {
		title: "",
		content: "",
		type: type,
 	        coordinates: coordinates 
	}
	const id: string = await api.createBlog(request); 
	blogId.set(id);
    }

    async function update(blogToUpdate: Blog, id: string) {
        blogToUpdate.content = simplemde?.value()
	await api.updateBlog(blogToUpdate, id);
	if (blogToUpdate.images) {
	    blogToUpdate.images.forEach( img => api.changeImageDescription(
		    img.id, { description: img.description } 
	    ))
	}
    }

    async function getLocation(): Promise<Coordinates> {
	const position = await utils.getPosition();
	return {
           long: position.coords.longitude,
	   lat: position.coords.latitude
	}
    }

    // callback after image upload success
    async function uploadCallback(_err: any, upload: any) {
	await update(blog, foundBlogId);
        upload.removeFiles([upload.id]);
    }

    // callback for map select
    function selectLocation(loc: any) {
        blog.coordinates = {
	    long: loc.detail.location.lng,
	    lat: loc.detail.location.lat
	}
    }

    // callback to fill blog
    async function fillIfId() { 
        if (foundBlogId) {
	   await fill(foundBlogId);
	}
    }

</script>

<svelte:head>
    <link
        href="https://unpkg.com/filepond/dist/filepond.css"
        rel="stylesheet"
    />
    <link
        rel="stylesheet"
        href="https://unpkg.com/filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css"
    />

</svelte:head>
<NavBar />
<div class="container pt-20 pb-2 m-2 block">
    {#if blog}
        {#if blog.type == "images"}
            <FilePond
                bind:this={upload}
                {uploadName}
                server="/api/images"
                onprocessfile={uploadCallback}
            />
        {/if}
        {#if blog.images}
            {#each blog.images as image}
                <span>
                    <p>
                        Image: <a href={"/" + image.path}>{"/" + image.path}</a>
                    </p>
                    <img src={"/" + image.path} alt={image.description ?? ""} /><br />
                    <label for={"content_" + image.id}>Description:</label><br
                    />
                    <textarea
                        bind:value={image.description}
                        id={"content_" + image.id}
                    />
                </span>
            {/each}
        {/if}
        <form>
            <label for="title">Title:</label><br />
            <input
                type="text"
                id="title"
                name="title"
                bind:value={blog.title}
            /><br />
	    {#if blog.type == "text"}
		<MarkdownEditor bind:content={blog.content} bind:simplemde={simplemde} />
            {/if}

            <label for="longitude">Longitude:</label><br />
            <input
                type="text"
                id="longitude"
                name="longitude"
                bind:value={blog.coordinates.long}
            /><br />
            <label for="latitude">Latitude:</label><br />
            <input
                type="text"
                id="latitude"
                name="latitude"
                bind:value={blog.coordinates.lat}
            /><br />
        </form>
        <PlacePicker
            latitude={blog.coordinates.lat}
            longitude={blog.coordinates.long}
            on:selectLocation={selectLocation}
        />
    {/if}
    <button
        id="newBlog"
        class="bg-gray-100 hover:bg-gray-300"
        on:click={() => create('text') }>>New text blog</button
    >
    <button
        id="newImage"
        class="bg-gray-100 hover:bg-gray-300"
	on:click={() => create('images') }>New image blog</button
    >
    <button
        id="submit"
        class="bg-gray-100 hover:bg-gray-300"
	on:click={() => update(blog, foundBlogId) }>>Submit blog</button
    >
</div>
