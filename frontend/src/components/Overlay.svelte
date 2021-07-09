<script lang="ts">
	import ExpandButton from "./ExpandButton.svelte";
	import AboutMe from "../components/AboutMe.svelte";
	import Gear from "../components/Gear.svelte";
	import Contact from "../components/Contact.svelte";
	import BlogText from "./BlogText.svelte";
	type OverlayType = "AboutMe" | "Gear" | "Blog" | "Contact";
	export let isVisible: boolean = false;
	export let type: OverlayType;
</script>
<div id="overlay" class:invisible="{!isVisible}">
	<div class="page-content">
		{ #if type == "AboutMe" }
		<AboutMe />
		{ :else if type == "Blog" }
		<BlogText />
		{ :else if type == "Contact" }
		<Contact />
		{ :else if type == "Gear" }
		<Gear />
		{ :else }
		<div>Ooops..</div>
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
		position: fixed;
		right: 2rem;
		top: 2rem;
	}
	#overlay {
		position: relative;
		width: 100vw;
		height: 100%;
		z-index: 9999;
		background-color: white;
	}
</style>
