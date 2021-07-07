<script lang="ts">
	export let isEnabled: boolean = false;
</script>
<div id="button" on:click="{() => isEnabled = !isEnabled}">
	{ #if isEnabled } - { :else } + { /if }
</div>

<style>
	#button {
		box-shadow: 5px 5px 15px -3px rgba(0, 0, 0, 0.4);
		border-radius: 50%;
		width: 2rem;
		height: 2rem;
		text-align: center;
		line-height: 2rem;
		background-color: white;
	}
</style>
