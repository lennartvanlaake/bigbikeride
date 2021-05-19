"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.firstVisit = exports.loggedIn = exports.blogId = void 0;
const store_1 = require("svelte/store");
exports.blogId = store_1.writable(localStorage.blogId);
exports.loggedIn = store_1.writable(false);
exports.firstVisit = store_1.writable(localStorage.firstVisit);
exports.firstVisit.subscribe((visit) => (localStorage.firstVisit = visit));
exports.blogId.subscribe((id) => (localStorage.blogId = id));
//# sourceMappingURL=storage.js.map