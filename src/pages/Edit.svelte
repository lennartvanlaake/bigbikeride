<script>
    import {
        getBlogId,
        setBlogId,
        removeBlogId,
    } from "../javascript/storage.js";
    import PlacePicker from "../components/PlacePicker.svelte";
    import axios from "axios";
    import { tick } from "svelte";
    import FilePond, { registerPlugin } from "svelte-filepond";
    import FilePondPluginImagePreview from "filepond-plugin-image-preview";
    let simplemde;
    let blog;
    let location = {};
    let upload;
    let uploadName = "images";

    registerPlugin(FilePondPluginImagePreview);

    async function fillBlog(blogId) {
        try {
            const returnValue = await fetch("/api/blogs/" + blogId);
            blog = await returnValue.json();
            if (blog.type == "text") {
                simplemde.value(blog.content);
            }
        } catch (error) {
            console.error(error);
        }
    }

    async function submit() {
        if (getBlogId()) {
            await axios
                .put("/api/blogs/" + getBlogId(), {
                    title: blog.title,
                    content: simplemde ? simplemde.value() : null,
                    type: blog.type,
                    latitude: location.latitude,
                    longitude: location.longitude,
                })
                .then(function (response) {
                    alert("Blog updated!");
                    console.log(response);
                })
                .catch(function (error) {
                    alert("Blog update failed!");
                });
        } else {
            console.log("Posting...");
            await axios
                .post("/api/blogs", {
                    title: blog.title,
                    content: simplemde ? simplemde.value() : null,
                    type: blog.type,
                    latitude: location.latitude,
                    longitude: location.longitude,
                })
                .then(function (response) {
                    alert("Blog posted!");
                    const id = response.data.id;
                    if (id) {
                        setBlogId(response.data.id);
                    } else {
                        alert("No Id");
                    }
                })
                .catch(function (error) {
                    alert("Blog post failed!");
                });
        }
        if (blog.images) {
            for (let i = 0; i < blog.images.length; i++) {
                const image = blog.images[i];
                await axios
                    .put("/api/images/" + image.id + "/description", {
                        description: image.description,
                    })
                    .catch(function (error) {
                        console.debug(error);
                    });
            }
        }
    }

    async function submitAndFill() {
        await submit();
        fillIfId();
    }

    function fillIfId() {
        if (getBlogId()) {
            fillBlog(getBlogId());
        }
    }

    function fillLocation() {
        navigator.geolocation.getCurrentPosition((pos) => {
            if (!blog) {
                return;
            }
            location.longitude = pos.coords.longitude;
            location.latitude = pos.coords.latitude;
        });
    }

    async function newTextBlog() {
        blog = { type: "text" };
        await tick();
        removeBlogId();
        createMd();
        fillIfId();
        fillLocation();
    }

    async function newImageBlog() {
        blog = { type: "images" };
        if (simplemde) {
            simplemde.toTextArea();
            simplemde = null;
        }
        await tick();
        removeBlogId();
        fillIfId();
        fillLocation();
    }

    async function uploadCallback(err, upload) {
        if (err) {
            console.log(err);
        }
        await submit();
        await axios
            .post("/api/images/" + upload.serverId + "/post/" + getBlogId())
            .catch(function (error) {
                console.debug(error);
                alert("Blog post failed!");
            });
        fillIfId();
        upload.removeFiles([upload.id]);
    }

    function createMd() {
        simplemde = new SimpleMDE({
            element: document.getElementById("content"),
        });
    }

    function selectLocation(loc) {
        location.longitude = loc.detail.location.lng;
        location.latitude = loc.detail.location.lat;
    }

    fillIfId();
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
    <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/simplemde/latest/simplemde.min.css"
    /><script
        src="https://cdn.jsdelivr.net/simplemde/latest/simplemde.min.js"></script></svelte:head
>
<div class="container" p-2 m-2>
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
                    <img src={"/" + image.path} alt={image.description} /><br />
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
                <label for="content">Content {blog.type}:</label><br />
                <textarea id="content" />
            {/if}

            <label for="longitude">Longitude:</label><br />
            <input
                type="text"
                id="longitude"
                name="longitude"
                bind:value={location.longitude}
            /><br />
            <label for="latitude">Latitude:</label><br />
            <input
                type="text"
                id="latitude"
                name="latitude"
                bind:value={location.latitude}
            /><br />
        </form>
        <PlacePicker
            latitude={location.latitude}
            longitude={location.longitude}
            on:selectLocation={selectLocation}
        />
    {/if}
    <button id="newBlog" on:click={newTextBlog}>New text blog</button>
    <button id="newImage" on:click={newImageBlog}>New image blog</button>
    <button id="submit" on:click={submitAndFill}>Submit blog</button>
</div>
