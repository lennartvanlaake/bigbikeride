<script lang="ts">
	// @ts-ignore
	import { baseUrl } from '../javascript/api'
	let filepondElement: any;
	let pond: any;
	let FilePond: any;
	let FilePondPluginImagePreview: any;
	export let uploadCallback: any;

	function createFilepond() {
		pond = FilePond.create(filepondElement);
		FilePond.setOptions({
			server: `${baseUrl}/api/images`
		});
		FilePond.onprocessfile(uploadCallback);
	}

	function registerPlugin() {
		FilePond.registerPlugin(FilePondPluginImagePreview);
	}
</script>
<svelte:head>
	<link
		rel="stylesheet"
		href="https://unpkg.com/filepond/dist/filepond.css"
	/>
	<script
		src="https://unpkg.com/filepond/dist/filepond.js"
		on:load="{createFilepond}"
	></script>
	<script
		src="https://unpkg.com/filepond-plugin-image-preview/dist/filepond-plugin-image-preview.js"
	></script>
	<script
		src="https://unpkg.com/filepond/dist/filepond.js"
		on:load="{registerPlugin}"
	></script>
</svelte:head>

<div bind:this="{filepondElement}" id="filepond" />
