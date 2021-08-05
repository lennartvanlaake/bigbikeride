<script lang="ts">
	import { loggedIn } from "../javascript/storage";
	import * as api from "../javascript/api";
	import { navigate } from "svelte-routing";
	import { onMount } from "svelte";
	let password: string;

	function redirect() {
		navigate("/edit", { replace: true });
		location.reload();
	}

	onMount(() => {
		if ($loggedIn) {
			redirect();
		}
	});

	function login() {
		api.login({ password })
			.then(function (_response) {
				alert("Login success!");
				loggedIn.set(true);
				redirect();
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
