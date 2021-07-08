<script lang="ts">
	import Edit from "./pages/Edit.svelte";
	import Login from "./pages/Login.svelte";
	import BlogMap from "./pages/Map.svelte";
	import { Router, Route } from "svelte-routing";
	import { loggedIn } from "./javascript/storage";
	import * as api from "./javascript/api";
	import { onMount } from "svelte";
	import { fillBlogList } from "./javascript/bloglist";
	onMount(async () => {
		let isLoggedIn = await api.isLoggedIn();
		loggedIn.set(isLoggedIn);
		await fillBlogList();
	});
</script>
<Router url="">
	<Route path="/">
		<BlogMap />
	</Route>
	<Route path="edit">
		<div class="page-content">
			<Edit />
		</div>
	</Route>
	<Route path="login">
		<div class="page-content">
			<Login />
		</div>
	</Route>
</Router>

<style>
	:global(body) {
		font-family: ui-sans-serif, system-ui, -apple-system,
			BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue",
			Arial, "Noto Sans", sans-serif, "Apple Color Emoji",
			"Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
		line-height: 1.5;
	}

	:global(.title-wrapper) {
		text-align: center;
		width: 100%;
	}

	:global(.title) {
		color: #574f4e;
		margin-bottom: 1rem;
		padding: 0.5rem;
		font-size: 1.125rem;
		line-height: 1.75rem;
	}

	:global(.text) {
		margin-bottom: 2rem;
		padding: 0.5rem;
		font-size: 0.875rem;
		line-height: 1.25rem;
	}

	:global(.page-content) {
		margin-bottom: 1rem;
		margin-right: auto;
		margin-left: auto;
		width: 100%;
		max-width: 64rem;
		box-sizing: border-box;
		padding: 0.5rem;
	}

	:global(.white-rounded) {
		background-color: white;
		border-radius: 1rem;
		margin-top: 1rem;
		margin-bottom: 1rem;
		padding: 1rem;
		width: 100%;
		border-color: lightgrey;
		border-style: dotted;
		border-width: medium;
		box-sizing: border-box;
	}

	:global(button) {
		display: inline-block;
		font-weight: 400;
		text-align: center;
		white-space: nowrap;
		vertical-align: middle;
		-webkit-user-select: none;
		-moz-user-select: none;
		-ms-user-select: none;
		user-select: none;
		border: 1px solid transparent;
		padding: 0.375rem 0.75rem;
		font-size: 1rem;
		line-height: 1.5;
		border-radius: 0.25rem;
		transition: color 0.15s ease-in-out,
			background-color 0.15s ease-in-out,
			border-color 0.15s ease-in-out,
			box-shadow 0.15s ease-in-out;
		color: #000;
		background-color: #6c757d;
		border-color: #6c757d;
	}

	:global(nav a:first-child) {
		margin-left: 2em;
	}
</style>
