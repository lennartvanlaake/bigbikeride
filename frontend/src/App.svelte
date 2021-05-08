<script lang="ts">
	import router from "page";
	import Index from "./pages/Index.svelte";
	import Edit from "./pages/Edit.svelte";
	import Login from "./pages/Login.svelte";

	let page: any;
	function loadPage() {
		router("/", () => (page = Index));
		router("/app/edit", () => (page = Edit));
		router("/app/login", () => (page = Login));
		router.start();
	}
</script>
<svelte:head>
<link on:load={loadPage} href="https://unpkg.com/tailwindcss@^2/dist/tailwind.min.css" rel="stylesheet">
</svelte:head>


<svelte:component this="{page}" />
