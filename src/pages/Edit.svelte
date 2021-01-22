<script>
    import { blog } from "../javascript/blog.js";
    import { getBlogId, setBlogId } from "../javascript/storage.js";
    import axios from "axios";

    async function fillBlog(blogId) {
        try {
            const returnValue = await fetch("/api/blogs/" + blogId);
            console.log("Blogid is " + blogId)
            const blogResponse = await returnValue.json();
            blog.title = blogResponse.title;
            console.log(blogResponse)
            console.log("Title is " + blogResponse)
        } catch (error) {
            console.error(error);
        }
    }

    function submit() {
        if (getBlogId()) {
            console.log("Putting...")
            axios
                .put("/api/blogs/" + getBlogId(), {
                    title: blog.title
                })
                .then(function (response) {
                    alert("Blog updated!");
                    console.log(response);
                })
                .catch(function (error) {
                    alert("Blog update failed!");
                });
        } else {
            console.log("Posting...")
            axios
                .post("/api/blogs", {
                    title: blog.title
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
    <input type="text" id="title" name="title" bind:value={blog.title}/><br />
    <p>{blog.title}</p>
</form>
<button id="submit" on:click|once={submit}>Click me</button>
