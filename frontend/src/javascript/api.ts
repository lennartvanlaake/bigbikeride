import axios from "axios";
import { Blog, CreateBlogRequest, LoginRequest } from "../../../types/types";
import * as uuid from "uuid";
// @ts-ignore
const { SNOWPACK_PUBLIC_BASE_URL } = import.meta.env;

function checkId(id: string) {
	if (!uuid.validate(id)) {
		throw new Error(`id is invalid: ${id}`);
	}
}

export const createBlog = async (req: CreateBlogRequest) => {
	return axios.post(`${SNOWPACK_PUBLIC_BASE_URL}/blogs`, req);
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

export const login = async (req: LoginRequest) => {
	return await axios.post(`${SNOWPACK_PUBLIC_BASE_URL}/login`, req);
};

export const isLoggedIn = async () => {
	return await axios.get(`${SNOWPACK_PUBLIC_BASE_URL}/login`);
};
