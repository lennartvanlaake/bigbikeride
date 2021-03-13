import { writable } from 'svelte/store';

export const blogList = writable([]);

export async function getBlogs() {
    const call = await fetch("/api/blogs");
    const list = await call.json();
    blogList.set(list)
}
