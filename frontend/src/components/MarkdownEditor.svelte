<script lang="ts">
	export let content: string | null;
	export let simplemde: any;
	$: simplemde?.value(content);
	function createMd() {
		// @ts-ignore
		simplemde = new SimpleMDE({
			element: document.getElementById("content"),
		});
		simplemde.value(content);
	}
</script>
<svelte:head>
	<link
		rel="stylesheet"
		href="https://cdn.jsdelivr.net/simplemde/latest/simplemde.min.css"
	/>
	<script
		src="https://cdn.jsdelivr.net/simplemde/latest/simplemde.min.js"
		on:load="{createMd}"
	></script>
</svelte:head>

<label for="content">Content</label><br />
<textarea id="content" />
