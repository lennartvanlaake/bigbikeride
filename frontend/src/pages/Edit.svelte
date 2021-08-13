<script lang="ts">
 import * as api from '../javascript/api'
 import * as utils from '../javascript/utils'
 import { blogId, loggedIn } from "../javascript/storage";
 import { nlCoordinates } from "../javascript/consts";
 import PlacePicker from "../components/PlacePicker.svelte";
 import MarkdownEditor from "../components/MarkdownEditor.svelte";
 import type { Blog, Coordinates, CreateImageRequest } from "../../../types/types.js";
 import { onMount } from 'svelte';

 let simplemde: any;
 let blog: Omit<Blog, "id" | "type" | "index">;
 let dateElement;
 let newImage: CreateImageRequest = { path: "", description: "", blogId: "" }

    async function fill(blogId: string) {
	blog = await api.getBlog(blogId);
	setMdeValue();
	setDateValue();
    }

    function setDateValue() {
	if (dateElement && blog.created) {
		dateElement.value = blog.created.toString().substring(0, 10);
	} else {
		setTimeout(setDateValue, 500);
	}
    }

    function setMdeValue() {
	if (simplemde && blog.content) {
		simplemde.value(blog.content);
	} else {
		setTimeout(setMdeValue, 500);
	}
    };

    async function create() {
        const coordinates = await getLocation();
	blog = {
		title: "",
		content: "",
		coordinates: coordinates,
		images: [],
		created: new Date()
	}
	simplemde?.value("");
	setDateValue();
	newImage = { path: "", description: "", blogId: "" }
	blogId.set(undefined);
	alert("Blog fields reset");
    }

    async function submit() {
	blog.content = simplemde?.value()
	let id;
	if ($blogId) {
		blog.created = new Date(dateElement.value); 
		await api.updateBlog(blog, $blogId);
	} else {
		id = await api.createBlog(blog);
		blogId.set(id);
	}
	newImage.blogId = id ?? $blogId;
	if (newImage.path) {
	    await api.createImage(newImage);
	}
	if (blog.images) {
	    blog.images.forEach( img => api.changeImageDescription(
		    img.id, { description: img.description } 
	    ))
	}
	newImage = { path: "", description: "", blogId: "" }
	fill($blogId);
	alert("Post success!")
    }

    async function submitIfEnter(event: KeyboardEvent) {
	if (event.charCode == 13) {
		await submit();
	}
    }

    async function remove() {
    	if (!confirm("Are you really sure you want to delete this post?")) {
		return;
	}
	await api.deleteBlog($blogId);
	create();
	alert("Blog deleted!")
    }

    async function getLocation(): Promise<Coordinates> {
    	try {
		const position = await utils.getPosition();
		return {
		   long: position.coords.longitude,
		   lat: position.coords.latitude
		}
	} catch (e) {
		console.error(e);
		return nlCoordinates;
	}
    }


    async function deleteImage(imageId: string) {
    	if (!confirm("Are you really sure you want to delete this image?")) {
		return;
	}
	try {
	   await api.deleteImage(imageId);
	   await fill($blogId);
	   alert("Image deleted!");
	} catch (e) {
	   alert("Image deletion failed!");
	}

    }

    // callback for map select
    function selectLocation(loc: any) {
        blog.coordinates = {
	    long: loc.detail.location.lng,
	    lat: loc.detail.location.lat
	}
    }

    async function notify() {
    	if (!confirm("Are you sure you want to send an email to the mailing list?")) {
		return;
	}
	await api.notify();
	alert("Notification sent!");
    }

    onMount(async () => {
	setTimeout(() =>  {
		if (!$loggedIn) {
			location.replace("/login");
		}
	}, 500)

	if ($blogId) {
		if (!api.isId($blogId)) {
		   blogId.set(undefined);
		   return
		}
	   await fill($blogId);
	}
    })
</script>

<div class="white-rounded">
    {#if blog}
        <form>
            <label for="title">Date:</label><br />
            <input
                type="date"
                id="created"
                name="created"
		bind:this={dateElement}
            /><br />
            <label for="title">Title:</label><br />
            <input
                type="text"
                id="title"
                name="title"
                bind:value={blog.title}
            /><br />
	    <MarkdownEditor bind:simplemde={simplemde} />

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



    <label for="title">New image path:</label><br />
    <input
	type="text"
	id="path"
	name="path"
	bind:value={newImage.path}
    /><br />
    <label for="title">New image description:</label><br />
    <textarea
	id="description"
	name="description"
	bind:value={newImage.description}
	/><br />
    <strong>preview</strong><br />
    <img src={newImage.path} alt={newImage.description ?? ""} /><br />

	{#if blog.images}
            {#each blog.images as image}
                <span>
                    <p>
                        Image: <a href={image.path}>{image.path}</a>
                    </p>
                    <img src={image.path} alt={image.description ?? ""} /><br />
                    <label for={"content_" + image.id}>Description:</label><br
                    />
                    <textarea
                        bind:value={image.description}
                        id={"content_" + image.id}
                    />
		    <button
			    on:click={() => deleteImage(image.id)}>Delete</button
		    >
		    <br/>
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
	on:click={submit}
	on:keypress={submitIfEnter}>Submit blog</button
    >
    <button
        id="delete"
	on:click={remove}>Delete blog</button
>
<button
	   id="notify"
	   on:click={notify}>Notify</button>
</div>


<style>

	img {
		object-fit: scale-down;
		height: 20rem;
	}
</style>
