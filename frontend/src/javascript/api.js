"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isLoggedIn = exports.login = exports.changeImageDescription = exports.linkImageToBlog = exports.deleteBlog = exports.getBlog = exports.getAllBlogs = exports.updateBlog = exports.createBlog = exports.baseUrl = void 0;
const axios_1 = __importDefault(require("axios"));
const uuid = __importStar(require("uuid"));
// @ts-ignore
const { VITE_PUBLIC_BASE_URL } = import.meta.env;
exports.baseUrl = VITE_PUBLIC_BASE_URL;
const request = axios_1.default.create();
function checkId(id) {
    if (!uuid.validate(id)) {
        throw new Error(`id is invalid: ${id}`);
    }
}
const createBlog = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield request.post(`${VITE_PUBLIC_BASE_URL}/blogs`, req);
    checkId(result.data.id);
    return result.data.id;
});
exports.createBlog = createBlog;
const updateBlog = (req, id) => __awaiter(void 0, void 0, void 0, function* () {
    checkId(id);
    return request.put(`${VITE_PUBLIC_BASE_URL}/blogs/${id}`, req);
});
exports.updateBlog = updateBlog;
const getAllBlogs = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield request.get(`${VITE_PUBLIC_BASE_URL}/blogs`);
    return result.data;
});
exports.getAllBlogs = getAllBlogs;
const getBlog = (id) => __awaiter(void 0, void 0, void 0, function* () {
    checkId(id);
    const result = yield request.get(`${VITE_PUBLIC_BASE_URL}/blogs/${id}`);
    return result.data;
});
exports.getBlog = getBlog;
const deleteBlog = (id) => __awaiter(void 0, void 0, void 0, function* () {
    checkId(id);
    return yield request.delete(`${VITE_PUBLIC_BASE_URL}/blogs/${id}`);
});
exports.deleteBlog = deleteBlog;
const linkImageToBlog = (imageId, blogId) => __awaiter(void 0, void 0, void 0, function* () {
    checkId(imageId);
    checkId(blogId);
    return yield request.post(`${VITE_PUBLIC_BASE_URL}/images/${imageId}/post/${blogId}`);
});
exports.linkImageToBlog = linkImageToBlog;
const changeImageDescription = (imageId, req) => __awaiter(void 0, void 0, void 0, function* () {
    checkId(imageId);
    return yield request.patch(`${VITE_PUBLIC_BASE_URL}/images/${imageId}/description`, req);
});
exports.changeImageDescription = changeImageDescription;
const login = (req) => __awaiter(void 0, void 0, void 0, function* () {
    return yield request.post(`${VITE_PUBLIC_BASE_URL}/login`, req);
});
exports.login = login;
const isLoggedIn = () => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield request.get(`${VITE_PUBLIC_BASE_URL}/login`);
    return response.status == 200;
});
exports.isLoggedIn = isLoggedIn;
//# sourceMappingURL=api.js.map