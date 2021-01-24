<svelte:head>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/simplemde/latest/simplemde.min.css">
    <script src="https://cdn.jsdelivr.net/simplemde/latest/simplemde.min.js" on:load={initMd}></script>
</svelte:head>

<script>
    import { getBlogId, setBlogId } from "../javascript/storage.js";
    import axios from "axios";

    let simplemde;

    const initMd = () => {
		simplemde = new SimpleMDE({ element: document.getElementById("content") });
	}

    let blog = {
        title: "",
        content: "",
        longitude: 0.0,
        latitude: 0.0,
    };

    async function fillBlog(blogId) {
        try {
            const returnValue = await fetch("/api/blogs/" + blogId);
            console.log("Blogid is " + blogId);
            const blogResponse = await returnValue.json();
            blog.title = blogResponse.title;
        } catch (error) {
            console.error(error);
        }
    }

    function submit() {
        if (getBlogId()) {
            console.log("Putting...");
            console.log(blog.content);
            axios
                .put("/api/blogs/" + getBlogId(), {
                    title: blog.title,
                    content: simplemde.value(),
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

    if (getBlogId()) {
        fillBlog(getBlogId());
    }
</script>

<form>
    <label for="title">Title:</label><br />
    <input type="text" id="title" name="title" bind:value={blog.title} /><br />
    <label for="content">Content:</label><br />
    <textarea id="content"></textarea>

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
<button id="submit" on:click={submit}>Click me</button>
