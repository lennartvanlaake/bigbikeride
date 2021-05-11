<script lang="ts">
	import Index from "./pages/Index.svelte";
	import Edit from "./pages/Edit.svelte";
	import Login from "./pages/Login.svelte";
	import { Router, Route, Link } from "svelte-routing";
	import { loggedIn } from "./javascript/storage";
	import * as api from "./javascript/api";
	import { onMount } from "svelte"
	onMount(async () => {
		const result: boolean = await api.isLoggedIn()
		loggedIn.set(result);
	})
</script>
<Router url="">	
  <nav>
	<Link to="/">Blog</Link>
	{ #if $loggedIn }
	<Link to="edit">Edit</Link>
	{ /if }
  </nav>
  <div>
    <Route path="/" component="{Index}" />
    <Route path="edit" component="{Edit}" />
    <Route path="login" component="{Login}" />
  </div>
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
		background: gray 0.5;
	}

	:global(nav a:first-child) {
		margin-left: 2em;
	}

</style>


