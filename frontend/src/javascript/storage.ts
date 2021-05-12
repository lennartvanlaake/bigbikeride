import { writable } from "svelte/store";

export const blogId = writable<string | null>(localStorage.blogId);
export const loggedIn = writable<boolean>(false);
export const firstVisit = writable<boolean>(localStorage.firstVisit);

firstVisit.subscribe((visit) => (localStorage.firstVisit = visit));
blogId.subscribe((id) => (localStorage.blogId = id));
