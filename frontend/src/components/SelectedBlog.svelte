<script lang="ts">
	import { onMount } from "svelte";
	let element: Element;
	onMount(() => element.scrollIntoView());
</script>

<div bind:this="{element}" />
