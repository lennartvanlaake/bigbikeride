import { writable } from "svelte/store";
import * as api from "./api";
export const blogList = writable([]);
export async function fillBlogList() {
    blogList.set(await api.getAllBlogs());
}
//# sourceMappingURL=bloglist.js.map