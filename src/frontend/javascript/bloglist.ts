import { writable } from 'svelte/store';
// @ts-ignore
const { SNOWPACK_PUBLIC_BASE_URL } = import.meta.env

export const blogList = writable([]);

export async function getBlogs() {
    const call = await fetch(SNOWPACK_PUBLIC_BASE_URL + "/blogs");
    const list: Array<Blog> = await call.json();
    blogList.set(list)     
}
