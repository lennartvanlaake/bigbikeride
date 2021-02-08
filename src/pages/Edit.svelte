<script>
    import {
        getBlogId,
        setBlogId,
        removeBlogId,
    } from "../javascript/storage.js";
    import axios from "axios";
    import { tick } from "svelte";
    import FilePond, { registerPlugin } from "svelte-filepond";
    import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
    import FilePondPluginImagePreview from "filepond-plugin-image-preview";
    import FilePondPluginImageResize from 'filepond-plugin-image-resize';
    let simplemde;
    let blog = {
        title: "",
        content: "",
        longitude: 0.0,
        latitude: 0.0,
        type: "text",
    };
    $: isText = blog.type == "text";
    $: isPictures = blog.type == "images";
    let upload;
    let uploadName = "images";
    let editor;

    registerPlugin(
        FilePondPluginImageExifOrientation,
        FilePondPluginImagePreview,
        FilePondPluginImageResize
    );

    async function fillBlog(blogId) {
        try {
            const returnValue = await fetch("/api/blogs/" + blogId);
            blog = await returnValue.json();
            console.log(blog);
            if (isText) {
                simplemde.value(blog.content);
            }
        } catch (error) {
            console.error(error);
        }
    }

    function submit() {
        if (getBlogId()) {
            axios
                .put("/api/blogs/" + getBlogId(), {
                    title: blog.title,
                    content: simplemde.value(),
                    type: blog.type,
                    latitude: blog.latitude,
                    longitude: blog.longitude,
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
            axios
                .post("/api/blogs", {
                    title: blog.title,
                    content: simplemde.value(),
                    type: blog.type,
                    latitude: blog.latitude,
                    longitude: blog.longitude,
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
    }

    function printcontent() {
        console.log(simplemde.value());
    }

    function fillIfId() {
        if (getBlogId()) {
            fillBlog(getBlogId());
        } else {
            blog = {
                title: "",
                content: "",
                longitude: 0.0,
                latitude: 0.0,
                type: blog.type,
            };
            if (simplemde) {
                simplemde.value("");
            }
        }
    }

    async function newTextBlog() {
        blog.type = "text";
        removeBlogId();
        editor.destroy();
        await tick();
        if (isText && !simplemde) {
            createMd();
        }
        fillIfId();
    }

    async function newImageBlog() {
        blog.type = "images";
        if (simplemde) {
            simplemde.toTextArea();
            simplemde = null;
        }

        removeBlogId();
        fillIfId();
    }

    function createMd() {
        simplemde = new SimpleMDE({
            element: document.getElementById("content"),
        });
    }

    const initMd = () => {
        createMd();
        fillIfId();
    };
</script>

<svelte:head>
    <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/simplemde/latest/simplemde.min.css"
    /><script
        src="https://cdn.jsdelivr.net/simplemde/latest/simplemde.min.js"
        on:load={initMd}></script>
        <link href="https://unpkg.com/filepond/dist/filepond.css" rel="stylesheet" />
</svelte:head>


<form>
    <label for="title">Title:</label><br />
    <input type="text" id="title" name="title" bind:value={blog.title} /><br />
    {#if isText}
        <label for="content">Content {blog.type}:</label><br />
        <textarea id="content" />
    {/if}

    {#if isPictures}
        <FilePond
            bind:this={upload}
            {uploadName}
            server="/api/images"
            allowMultiple={true}
        />
    {/if}

    <label for="longitude">Longitude:</label><br />
    <input
        type="text"
        id="longitude"
        name="longitude"
        bind:value={blog.longitude}
    /><br />
    <label for="latitude">Latitude:</label><br />
    <input
        type="text"
        id="latitude"
        name="latitude"
        bind:value={blog.latitude}
    /><br />
</form>
<button id="newBlog" on:click={newTextBlog}>New text blog</button>
<button id="newImage" on:click={newImageBlog}>New image blog</button>
<button id="submit" on:click={submit}>Submit blog</button>
<button id="printcontent" on:click={printcontent}>Click me</button>
