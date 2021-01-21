<script>
	async function fillBlog(e) {
        try {
            const blogId = getBlogId()
            if (!blogId) {
                const returnValue = await fetch(`/api/blogs/` + blogId);
                const blog = await returnValue.json();
            }
        } catch (error) {
            console.error(error);
        }
    }
    
    function getBlogId() {
        return localStorage.getItem("blogId")
    }
</script>
