<script>
	import router from "page"
	import Index from './pages/Index.svelte'
	import Edit from './pages/Edit.svelte'

	let page
	router('/', () => page = Index)
	router('/app/edit', () => page = Edit)
	router.start()
</script>

<style global lang="postcss">

	/* only apply purgecss on utilities, per Tailwind docs */
	/* purgecss start ignore */
	@tailwind base;

	@layer base {
  h1 {
    @apply text-2xl;
  }
  h2 {
    @apply text-xl;
  }
  h3 {
    @apply text-lg;
  }
  a {
    @apply text-blue-600 underline;
  }
  button {
    @apply m-2 p-2 rounded;
  }
}
	@tailwind components;
	/* purgecss end ignore */
  
	@tailwind utilities;
  
  </style>

<svelte:component this={page} />