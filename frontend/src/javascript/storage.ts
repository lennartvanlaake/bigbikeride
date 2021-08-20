import { writable } from "svelte/store";
import type { Image } from "../../../types/types";

export const blogId = writable<string | null>(localStorage.blogId);
export const loggedIn = writable<boolean>(false);
export const firstVisit = writable<boolean>(localStorage.firstVisit);
export const showImageOverlay = writable<boolean>(false);
export const showOverlay = writable<boolean>(false);
export const overlayImages = writable<Image[]>([]);

firstVisit.subscribe((visit) => (localStorage.firstVisit = visit));
blogId.subscribe((id) => (localStorage.blogId = id));
