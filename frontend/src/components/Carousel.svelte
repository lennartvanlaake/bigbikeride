<script lang="ts">
	import type { Image } from "../../../types/types";
	export let images: Array<Image>;
	let index = 0;
	$: currentImage = images[index % images.length];
	function next() {
		index++;
	}
</script>
<div class="relative" on:click="{next}">
	<img class="object-cover w-full" src={currentImage.path}
	alt={currentImage.description ?? ""}/> { #if currentImage.description }
	<p class="text-gray-800 py-2 text-center">{currentImage.description}</p>
	{ /if }
</div>
