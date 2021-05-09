import axios from "axios";
import type {
	Blog,
	CreateBlogRequest,
	LoginRequest,
	UpdateImageDescriptionRequest,
} from "../../../types/types";
import * as uuid from "uuid";
// @ts-ignore
const { VITE_PUBLIC_BASE_URL } = import.meta.env;

export const baseUrl: string = VITE_PUBLIC_BASE_URL;

const request = axios.create();

function checkId(id: string) {
	if (!uuid.validate(id)) {
		throw new Error(`id is invalid: ${id}`);
	}
}

export const createBlog = async (req: CreateBlogRequest): Promise<string> => {
	const result = await request.post(`${VITE_PUBLIC_BASE_URL}/blogs`, req);
	checkId(result.data.id);
	return result.data.id;
};

export const updateBlog = async (req: CreateBlogRequest, id: string) => {
	checkId(id);
	return request.put(`${VITE_PUBLIC_BASE_URL}/blogs/${id}`, req);
};

export const getAllBlogs = async (): Promise<Blog[]> => {
	const result = await request.get(`${VITE_PUBLIC_BASE_URL}/blogs`);
	return result.data;
};

export const getBlog = async (id: string): Promise<Blog> => {
	checkId(id);
	const result = await request.get(`${VITE_PUBLIC_BASE_URL}/blogs/${id}`);
	return result.data;
};

export const deleteBlog = async (id: string) => {
	checkId(id);
	return await request.delete(`${VITE_PUBLIC_BASE_URL}/blogs/${id}`);
};

export const linkImageToBlog = async (imageId: string, blogId: string) => {
	checkId(imageId);
	checkId(blogId);
	return await request.post(
		`${VITE_PUBLIC_BASE_URL}/images/${imageId}/post/${blogId}`
	);
};

export const changeImageDescription = async (
	imageId: string,
	req: UpdateImageDescriptionRequest
) => {
	checkId(imageId);
	return await request.patch(
		`${VITE_PUBLIC_BASE_URL}/images/${imageId}/description`,
		req
	);
};

export const login = async (req: LoginRequest) => {
	return await request.post(`${VITE_PUBLIC_BASE_URL}/login`, req);
};

export const isLoggedIn = async (): Promise<Boolean> => {
	const response = await request.get(`${VITE_PUBLIC_BASE_URL}/login`);
	return response.status == 200;
};
