<script>
	import router from "page"
	import Index from './pages/Index.svelte'
	import Edit from './pages/Edit.svelte'

	let page
	router('/', () => page = Index)
	router('/app/edit', () => page = Edit)
	router.start()
</script>

<svelte:component this={page} />