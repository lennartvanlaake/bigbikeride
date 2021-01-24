export function getBlogId() {
    const blogId = localStorage.getItem("blogId") 
    if (blogId == "undefined") return null
    return blogId
}

export function setBlogId(blogId) {
    return localStorage.setItem("blogId", blogId)
}