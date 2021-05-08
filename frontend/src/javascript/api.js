import axios from "axios";
import * as uuid from "uuid";
// @ts-ignore
const { SNOWPACK_PUBLIC_BASE_URL } = import.meta.env;
export const baseUrl = SNOWPACK_PUBLIC_BASE_URL;
function checkId(id) {
    if (!uuid.validate(id)) {
        throw new Error(`id is invalid: ${id}`);
    }
}
export const createBlog = async (req) => {
    const result = await axios.post(`${SNOWPACK_PUBLIC_BASE_URL}/blogs`, req);
    checkId(result.data.id);
    return result.data.id;
};
export const updateBlog = async (req, id) => {
    checkId(id);
    return axios.put(`${SNOWPACK_PUBLIC_BASE_URL}/blogs/${id}`, req);
};
export const getAllBlogs = async () => {
    const result = await axios.get(`${SNOWPACK_PUBLIC_BASE_URL}/blogs`);
    return result.data;
};
export const getBlog = async (id) => {
    checkId(id);
    const result = await axios.get(`${SNOWPACK_PUBLIC_BASE_URL}/blogs/${id}`);
    return result.data;
};
export const deleteBlog = async (id) => {
    checkId(id);
    return await axios.delete(`${SNOWPACK_PUBLIC_BASE_URL}/blogs/${id}`);
};
export const linkImageToBlog = async (imageId, blogId) => {
    checkId(imageId);
    checkId(blogId);
    return await axios.post(`${SNOWPACK_PUBLIC_BASE_URL}/images/${imageId}/post/${blogId}`);
};
export const changeImageDescription = async (imageId, req) => {
    checkId(imageId);
    return await axios.patch(`${SNOWPACK_PUBLIC_BASE_URL}/images/${imageId}/description`, req);
};
export const login = async (req) => {
    return await axios.post(`${SNOWPACK_PUBLIC_BASE_URL}/login`, req);
};
export const isLoggedIn = async () => {
    const response = await axios.get(`${SNOWPACK_PUBLIC_BASE_URL}/login`);
    return response.status == 200;
};
//# sourceMappingURL=api.js.map