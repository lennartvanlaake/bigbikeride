import { writable } from 'svelte/store';

export function getBlogId() {
    const blogId = localStorage.getItem("blogId"); 
    if (blogId == "undefined") return null;
    return blogId;
}

export function setBlogId(blogId) {
    return localStorage.setItem("blogId", blogId);
}

export function removeBlogId() {
    return localStorage.removeItem("blogId");
}

export const loggedIn = writable(false);

