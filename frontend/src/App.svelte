<script lang="ts">
	import Index from "./pages/Index.svelte";
	import Edit from "./pages/Edit.svelte";
	import Login from "./pages/Login.svelte";
	import AboutMe from "./pages/AboutMe.svelte";
	import Map from "./pages/Map.svelte";
	import { Router, Route, Link } from "svelte-routing";
	import { loggedIn } from "./javascript/storage";
	import * as api from "./javascript/api";
	import { onMount } from "svelte";
	import { fillBlogList } from "./javascript/bloglist";
	onMount(async () => {
		const result: boolean = await api.isLoggedIn()
		loggedIn.set(result);
		await fillBlogList();
	})
</script>
<Router url="">	
      
 <header>
 <nav>
	<Link to="/">About</Link>
	<Link to="blog">Blog</Link>
	<Link to="map">Map</Link>
	{ #if $loggedIn }
	<Link to="edit">Edit</Link>
	{ /if }
  </nav>
 </header>
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
	  <Route path="/">
		<div class="page-content">
			<AboutMe />
		</div>
	  </Route>
	<Route path="blog">
		<div class="page-content">
			<Index />
		</div>
	</Route>
	  <Route path="map">
		<Map />
	  </Route >
</Router>


<style>
	nav {
		color: white;
		padding: 1em;
		background: darkgreen;
	}

	:global(nav a) {
		color: white;
		padding: 0.5em;
		text-decoration: none;
	}

	:global(body) {
		font-family: ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji";
		line-height: 1.5;
		background-color: #e5e5e5;
	}

	:global(.title-wrapper) {
		text-align: center;
		width: 100%;
	}

	:global(.title) {
		color: #574f4e;
	    	margin-bottom: 1rem;
		padding: .5rem;
		font-size: 1.125rem;
    		line-height: 1.75rem;
	}

	:global(.text) {
	    	margin-bottom: 2rem;
		padding: .5rem;
		font-size: .875rem;
    		line-height: 1.25rem;
	}

	:global(.page-content) {
	    	margin-bottom: 1rem;
		padding: .5rem;
		max-width: 64rem;
		margin-right: auto;
		margin-left: auto;
	}

	:global(.white-rounded) {
		background-color: white;
		border-radius: .25rem;
		margin-top: .5rem;
   		margin-bottom: .5rem;
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
		padding: .375rem .75rem;
		font-size: 1rem;
		line-height: 1.5;
		border-radius: .25rem;
		transition: color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out;
		color: #000;
		background-color: #6c757d;
		border-color: #6c757d;
	}

	:global(nav a:first-child) {
		margin-left: 2em;
	}

</style>


