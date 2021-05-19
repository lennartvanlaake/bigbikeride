import type { Blog, CreateBlogRequest, LoginRequest, UpdateImageDescriptionRequest } from "../../../types/types";
export declare const baseUrl: string;
export declare const createBlog: (req: CreateBlogRequest) => Promise<string>;
export declare const updateBlog: (req: CreateBlogRequest, id: string) => Promise<import("axios").AxiosResponse<any>>;
export declare const getAllBlogs: () => Promise<Blog[]>;
export declare const getBlog: (id: string) => Promise<Blog>;
export declare const deleteBlog: (id: string) => Promise<import("axios").AxiosResponse<any>>;
export declare const linkImageToBlog: (imageId: string, blogId: string) => Promise<import("axios").AxiosResponse<any>>;
export declare const changeImageDescription: (imageId: string, req: UpdateImageDescriptionRequest) => Promise<import("axios").AxiosResponse<any>>;
export declare const login: (req: LoginRequest) => Promise<import("axios").AxiosResponse<any>>;
export declare const isLoggedIn: () => Promise<boolean>;
//# sourceMappingURL=api.d.ts.map