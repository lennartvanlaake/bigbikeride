<script>
	import router from "page"
	import Index from './pages/Index.svelte'
	let page
	router('/', () => page = Index)
	router('/cavia', () => page = Index)

	router.start()
</script>

<svelte:component this={page} />