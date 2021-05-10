<script lang="ts">
	import { baseUrl } from "../javascript/api";
	let filepondElement: HTMLElement;
	export let uploadCallback: any;
	let filePondLib: any;
	let previewPlugin: any;
	let filePondInstance: any;

	function createFilepond() {
		filePondInstance = filePondLib.create(filepondElement);
		filePondLib.setOptions({
			server: `${baseUrl}/images`,
		});
		filePondInstance.onprocessfile = uploadCallback;
	}

	function registerPlugin() {
		filePondLib = (window as any).FilePond;
		previewPlugin = (window as any).FilePondPluginImagePreview;
		createFilepond();
		filePondLib.registerPlugin(previewPlugin);
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
<div>
	<div bind:this="{filepondElement}" id="filepond" />
</div>
