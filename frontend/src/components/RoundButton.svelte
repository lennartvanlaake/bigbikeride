<script lang="ts">
	export let icon: string;
</script>
<div id="button">
	<i class="fa {icon}"></i>
</div>

<style>
	#button {
		box-shadow: 5px 5px 15px -3px rgba(0, 0, 0, 0.4);
		border-radius: 50%;
		width: 4rem;
		height: 4rem;
		text-align: center;
		line-height: 4rem;
		background-color: white;
		font-size: 1.5rem;
	}
</style>
