<script>
	import router from "page"
	import Index from './pages/Index.svelte'
	import Edit from './pages/Edit.svelte'
	import Login from './pages/Login.svelte'

	let page
	router('/', () => page = Index)
	router('/app/edit', () => page = Edit)
	router('/app/login', () => page = Login)

	router.start()
</script>

<style global lang="postcss">

	/* only apply purgecss on utilities, per Tailwind docs */
	/* purgecss start ignore */
	@tailwind base;

	@layer base {
  button {
    @apply m-2 p-2 rounded;
  }
}
	@tailwind components;
	/* purgecss end ignore */
  
	@tailwind utilities;
  
  </style>

<svelte:component this={page} />