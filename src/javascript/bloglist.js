import { writable } from 'svelte/store';
const { SNOWPACK_PUBLIC_BASE_URL } = import.meta.env

export const blogList = writable([]);

export async function getBlogs() {
    const call = await fetch(SNOWPACK_PUBLIC_BASE_URL + "/blogs");
    const list = await call.json();
    blogList.set(list)
}
