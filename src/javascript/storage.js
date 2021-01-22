export function getBlogId() {
    return localStorage.getItem("blogId")
}

export function setBlogId(blogId) {
    return localStorage.setItem("blogId", blogId)
}