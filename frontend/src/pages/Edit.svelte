<script lang="ts">
 import * as api from '../javascript/api'
 import * as utils from '../javascript/utils'
 import { blogId } from "../javascript/storage";
 import PlacePicker from "../components/PlacePicker.svelte";
 import ImageUpload from "../components/ImageUpload.svelte";
 import MarkdownEditor from "../components/MarkdownEditor.svelte";
 import NavBar from "../components/Navbar.svelte";
 import type { Blog, BlogType, Coordinates } from "../../../types/types.js";
 import { onMount } from 'svelte';

    let simplemde: any;
    let blog: Omit<Blog, "id" | "created">;

    async function fill(blogId: string) {
	blog = await api.getBlog(blogId);
    }

    async function create(type: BlogType) {
        const coordinates = await getLocation();
	blog = {
		title: "",
		content: "",
		type: type,
		coordinates: coordinates,
		images: [],
	}
    }

    async function submit() {
	blog.content = simplemde?.value()
	let id;
	if ($blogId) {
		id = $blogId;
		await api.updateBlog(blog, id);
	} else {
		id = await api.createBlog(blog);
		blogId.set(id);
	}
	if (blog.images) {
	    blog.images.forEach( img => api.changeImageDescription(
		    img.id, { description: img.description } 
	    ))
	}
	fill(id);
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
	await submit();
	upload.removeFiles([upload.id]);
	await fill($blogId);
    }

    // callback for map select
    function selectLocation(loc: any) {
        blog.coordinates = {
	    long: loc.detail.location.lng,
	    lat: loc.detail.location.lat
	}
    }

    onMount(async () => {
        if ($blogId) {
	   await fill($blogId);
	}
    })
</script>
<div class="container pt-20 pb-2 m-2 block">
    {#if blog}
	{#if blog.type == "images"}
		<ImageUpload uploadCallback={uploadCallback}/>
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
            coordinates={blog.coordinates}
            on:selectLocation={selectLocation}
        />
    {/if}
    <button
        id="newBlog"
        class="bg-gray-100 hover:bg-gray-300"
        on:click={() => create('text') }>New text blog</button
    >
    <button
        id="newImage"
        class="bg-gray-100 hover:bg-gray-300"
	on:click={() => create('images') }>New image blog</button
    >
    <button
        id="submit"
        class="bg-gray-100 hover:bg-gray-300"
	on:click={() => submit() }>Submit blog</button
    >
</div>
