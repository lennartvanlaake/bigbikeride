import { writable } from "svelte/store";
import type { Blog } from "../../../types/types";
import * as api from "./api";

export const blogList = writable<Blog[]>([]);

export async function fillBlogList() {
	blogList.set(await api.getAllBlogs());
}
