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
