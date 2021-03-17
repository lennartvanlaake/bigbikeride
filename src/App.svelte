<script>
	import router from "page";
	import Index from "./pages/Index.svelte";
	import Edit from "./pages/Edit.svelte";
	import Login from "./pages/Login.svelte";
	import Styles from './components/Styles.svelte';

	let page;
	router("/", () => (page = Index));
	router("/app/edit", () => (page = Edit));
	router("/app/login", () => (page = Login));
	router.start();
</script>

<svelte:component this={page} />
