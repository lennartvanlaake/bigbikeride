<script lang="ts">
 import * as api from '../javascript/api'
 import * as utils from '../javascript/utils'
 import { blogId } from "../javascript/storage";
 import PlacePicker from "../components/PlacePicker.svelte";
 import ImageUpload from "../components/ImageUpload.svelte";
 import MarkdownEditor from "../components/MarkdownEditor.svelte";
 import type { Blog, Coordinates } from "../../../types/types.js";
 import { onMount } from 'svelte';

    let simplemde: any;
    let blog: Omit<Blog, "id" | "created" | "type">;

    async function fill(blogId: string) {
	blog = await api.getBlog(blogId);
    }

    async function create() {
        const coordinates = await getLocation();
	blog = {
		title: "",
		content: "",
		coordinates: coordinates,
		images: [],
	}
	blogId.set(null);
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
	alert("Post success!")
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
	await api.linkImageToBlog(upload.serverId, $blogId!!);
	await fill($blogId!!);
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
<div class="white-rounded">
    {#if blog}
        <form>
            <label for="title">Title:</label><br />
            <input
                type="text"
                id="title"
                name="title"
                bind:value={blog.title}
            /><br />
	    <MarkdownEditor bind:content={blog.content} bind:simplemde={simplemde} />

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
	<ImageUpload uploadCallback={uploadCallback}/>
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
    {/if}
    <button
        id="newBlog"
        on:click={create}>New blog</button
    >
    <button
        id="submit"
	on:click={submit}>Submit blog</button
    >
</div>
