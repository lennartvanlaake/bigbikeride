<script lang="ts">
	export let content: string | null;
	export let simplemde: any;
	let contentElement: HTMLElement;
	$: simplemde?.value(content ?? "");
	function createMd() {
		// @ts-ignore
		simplemde = new SimpleMDE({
			element: contentElement,
		});
		simplemde.value(content ?? "");
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
<div>
	<label for="content">Content</label><br />
	<textarea bind:this="{contentElement}" id="content" />
</div>
