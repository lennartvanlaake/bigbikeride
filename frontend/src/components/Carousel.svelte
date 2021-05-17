<script lang="ts">
	import type { Image } from "../../../types/types";
	export let images: Array<Image>;
	let index = 0;
	$: currentImage = images[index % images.length];
	function next() {
		index++;
	}
</script>
<div class="image-container" on:click="{next}">
	<img class="image" src=/{currentImage.path}
	alt={currentImage.description ?? ""}/> { #if currentImage.description }
	<p class="description">{currentImage.description}</p>
	{ /if }
</div>

<style>
	.image-container {
		position: relative;
	}

	.image {
		width: 100%;
	}

	.description {
		text-align: center;
		padding: 1em;
	}
</style>
