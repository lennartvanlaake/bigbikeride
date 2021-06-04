import axios from "axios";
import type {
	Blog,
	CreateBlogRequest,
	LoginRequest,
	LoginResponse,
	UpdateImageDescriptionRequest,
} from "../../../types/types";
import * as uuid from "uuid";
// @ts-ignore

export const baseUrl: string = "/api";

const request = axios.create();

function checkId(id: string) {
	if (!uuid.validate(id)) {
		throw new Error(`id is invalid: ${id}`);
	}
}

export function isId(id: string | undefined) {
	return uuid.validate(id);
}

export const createBlog = async (req: CreateBlogRequest): Promise<string> => {
	const result = await request.post(`${baseUrl}/blogs`, req);
	checkId(result.data.id);
	return result.data.id;
};

export const updateBlog = async (req: CreateBlogRequest, id: string) => {
	checkId(id);
	return request.put(`${baseUrl}/blogs/${id}`, req);
};

export const getAllBlogs = async (): Promise<Blog[]> => {
	const result = await request.get(`${baseUrl}/blogs`);
	return result.data;
};

export const getBlog = async (id: string): Promise<Blog> => {
	checkId(id);
	const result = await request.get(`${baseUrl}/blogs/${id}`);
	return result.data;
};

export const deleteBlog = async (id: string) => {
	checkId(id);
	return await request.delete(`${baseUrl}/blogs/${id}`);
};

export const linkImageToBlog = async (imageId: string, blogId: string) => {
	checkId(imageId);
	checkId(blogId);
	return await request.post(
		`${baseUrl}/images/${imageId}/post/${blogId}`
	);
};

export const changeImageDescription = async (
	imageId: string,
	req: UpdateImageDescriptionRequest
) => {
	checkId(imageId);
	return await request.patch(
		`${baseUrl}/images/${imageId}/description`,
		req
	);
};

export const login = async (req: LoginRequest) => {
	return await request.post(`${baseUrl}/login`, req);
};

export const isLoggedIn = async (): Promise<boolean> => {
	const response = (await (await request.get(`${baseUrl}/login`))
		.data) as LoginResponse;
	return response.loggedIn;
};
