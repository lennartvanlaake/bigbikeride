<script lang="ts">
	import ExpandButton from "./ExpandButton.svelte";
	import AboutMe from "../components/AboutMe.svelte";
	import Gear from "../components/Gear.svelte";
	import Contact from "../components/Contact.svelte";
	import BlogText from "./BlogText.svelte";
	import { showOverlay } from "../javascript/storage";
	import { onMount, onDestroy } from "svelte";
	import { overlayTypeUrls } from "../javascript/consts";
	import type { OverlayType } from "../../../types/types";
	export let type: OverlayType;

	onMount(() => {
		if (type) {
			history.pushState({}, "", overlayTypeUrls[type]);
		} else {
			$showOverlay = false;
			location.replace("/");
			location.reload();
		}

		window.addEventListener("popstate", (ev: PopStateEvent) => {
			$showOverlay = false;
		});
	});
	onDestroy(() => {
		history.pushState({}, "", "/");
	});
</script>
<div id="overlay">
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
		<ExpandButton
			bind:isEnabled="{$showOverlay}"
			isPlus="{false}"
		/>
	</div>
</div>

<style>
	#expand {
		position: fixed;
		right: 2rem;
		top: 2rem;
	}
	#overlay {
		position: relative;
		width: 100vw;
		height: 100vh;
		z-index: 888;
		background-color: white;
	}
</style>
