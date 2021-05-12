<script lang="ts">
	import { loggedIn } from "../javascript/storage";
	import * as api from "../javascript/api";
	let password: string;

	function login() {
		api.login({ password })
			.then(function (_response) {
				alert("Login success!");
				loggedIn.set(true);
			})
			.catch(function (_error) {
				alert("Login failed!");
			});
	}
</script>

<div class="white-rounded">
	<input type="password" bind:value="{password}" />
	<button class="button" on:click="{login}">
		Login
	</button>
</div>
<style>
	.page-container {
		padding-top: 1em;
		padding-bottom: 1em;
	}
</style>
