<script lang="ts">
	import ExpandButton from "./ExpandButton.svelte";
	import AboutMe from "../components/AboutMe.svelte";
	import BlogText from "./BlogText.svelte";
	type OverlayType = "AboutMe" | "Gear" | "Blog";
	export let isVisible: boolean = false;
	export let type: OverlayType;
</script>
<div id="overlay" class:invisible="{!isVisible}">
	<div class="page-content">
		{ #if type == "AboutMe" }
		<AboutMe />
		{ :else if type == "Blog" }
		<BlogText />
		{ :else }
		<div>GEAR POST THING</div>
		{ /if }
	</div>
	<div id="expand">
		<ExpandButton bind:isEnabled="{isVisible}" isPlus="{false}" />
	</div>
</div>

<style>
	.invisible {
		display: none;
	}

	#expand {
		position: absolute;
		right: 2rem;
		top: 2rem;
	}
	#overlay {
		position: relative;
		width: 100vw;
		height: 100vh;
		z-index: 9999;
		background-color: white;
	}
</style>
