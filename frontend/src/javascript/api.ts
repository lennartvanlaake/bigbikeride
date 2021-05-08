import axios from "axios";
import type { Blog, CreateBlogRequest, LoginRequest, UpdateImageDescriptionRequest } from "../../../types/types";
import * as uuid from "uuid";
// @ts-ignore
const { SNOWPACK_PUBLIC_BASE_URL } = import.meta.env;

export const baseUrl: string = SNOWPACK_PUBLIC_BASE_URL;

function checkId(id: string) {
	if (!uuid.validate(id)) {
		throw new Error(`id is invalid: ${id}`);
	}
}

export const createBlog = async (req: CreateBlogRequest): Promise<string> => {
	const result = await axios.post(
		`${SNOWPACK_PUBLIC_BASE_URL}/blogs`,
		req
	);
	checkId(result.data.id);
	return result.data.id;
};

export const updateBlog = async (req: CreateBlogRequest, id: string) => {
	checkId(id);
	return axios.put(`${SNOWPACK_PUBLIC_BASE_URL}/blogs/${id}`, req);
};

export const getAllBlogs = async (): Promise<Blog[]> => {
	const result = await axios.get(`${SNOWPACK_PUBLIC_BASE_URL}/blogs`);
	return result.data;
};

export const getBlog = async (id: string): Promise<Blog> => {
	checkId(id);
	const result = await axios.get(
		`${SNOWPACK_PUBLIC_BASE_URL}/blogs/${id}`
	);
	return result.data;
};

export const deleteBlog = async (id: string) => {
	checkId(id);
	return await axios.delete(`${SNOWPACK_PUBLIC_BASE_URL}/blogs/${id}`);
};

export const linkImageToBlog = async (imageId: string, blogId: string) => {
	checkId(imageId);
	checkId(blogId);
	return await axios.post(
		`${SNOWPACK_PUBLIC_BASE_URL}/images/${imageId}/post/${blogId}`
	);
};

export const changeImageDescription = async (
	imageId: string,
	req: UpdateImageDescriptionRequest
) => {
	checkId(imageId);
	return await axios.patch(
		`${SNOWPACK_PUBLIC_BASE_URL}/images/${imageId}/description`,
		req
	);
};

export const login = async (req: LoginRequest) => {
	return await axios.post(`${SNOWPACK_PUBLIC_BASE_URL}/login`, req);
};

export const isLoggedIn = async (): Promise<Boolean> => {
	const response = await axios.get(`${SNOWPACK_PUBLIC_BASE_URL}/login`);
	return response.status == 200;
};
