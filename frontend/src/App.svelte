<script lang="ts">
	import Index from "./pages/Index.svelte";
	import Edit from "./pages/Edit.svelte";
	import Login from "./pages/Login.svelte";
	import { Router, Route, Link } from "svelte-routing";
</script>
<svelte:head>
<link href="https://unpkg.com/tailwindcss@^2/dist/tailwind.min.css" rel="stylesheet">
</svelte:head>
<Router url="">	
     

  <nav>
    <Link to="/">Blog</Link>
    <Link to="edit">Edit</Link>
    <Link to="login">Edit</Link>
  </nav>
  <div>
    <Route path="/" component="{Index}" />
    <Route path="edit" component="{Edit}" />
    <Route path="login" component="{Login}" />
  </div>
</Router>
