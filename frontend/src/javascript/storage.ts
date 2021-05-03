import { writable } from 'svelte/store';

export const blogId = writable<string>("");
export const loggedIn = writable<boolean>(false);

