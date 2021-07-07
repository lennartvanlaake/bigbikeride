<script lang="ts">
	import ExpandButton from "./ExpandButton.svelte";
	import AboutMe from "../components/AboutMe.svelte";
	type OverlayType = "AboutMe" | "Gear" | "Blog";
	export let isVisible: boolean = false;
	export let type: OverlayType;
</script>
<div id="overlay" class:invisible="{!isVisible}">
	<div class="page-content">
		{ #if type == "AboutMe" }
		<AboutMe />
		{ :else }
		<div>GEAR POST THING</div>
		{ /if }
	</div>
	<div id="expand">
		<ExpandButton bind:isEnabled="{isVisible}" />
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
		width: 100%;
		height: 100%;
		z-index: 9999;
		background-color: white;
	}
</style>
