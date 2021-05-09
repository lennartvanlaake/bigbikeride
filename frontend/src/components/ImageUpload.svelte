<script lang="ts">
	// @ts-ignore
	import { baseUrl } from "../javascript/api";
	let filepondElement: any;
	export let uploadCallback: any;

	function createFilepond() {
		// @ts-ignore
		pond = FilePond.create(filepondElement);
		// @ts-ignore
		FilePond.setOptions({
			server: `${baseUrl}/api/images`,
		});
		// @ts-ignore
		window.FilePond.onprocessfile(uploadCallback);
	}

	function registerPlugin() {
		createFilepond();
		// @ts-ignore
		window.FilePond.registerPlugin(FilePondPluginImagePreview);
	}
</script>
<svelte:head>
	<link
		rel="stylesheet"
		href="https://unpkg.com/filepond/dist/filepond.css"
	/>
	<script
		src="https://unpkg.com/filepond-plugin-image-preview/dist/filepond-plugin-image-preview.js"
	></script>
	<script
		src="https://unpkg.com/filepond/dist/filepond.js"
		on:load="{registerPlugin}"
	></script>
</svelte:head>

<div bind:this="{filepondElement}" id="filepond" />
