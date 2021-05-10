import { writable } from "svelte/store";

export const blogId = writable<string | null>(localStorage.blogId);
export const loggedIn = writable<boolean>(false);

blogId.subscribe((id) => (localStorage.blogId = id));
