<script lang="ts">
    import { loggedIn } from "../javascript/storage";
    import NavBar from "../components/Navbar.svelte";
    import * as api from "../javascript/api";
    let password: string;

    function login() {
	api.login({ password }).then(function (_response) {
                alert("Login success!");
                loggedIn.set(true);
            })
            .catch(function (_error) {
                alert("Login failed!");
            });
    }
</script>

<NavBar></NavBar>
<div class="container mx-auto max-w-5xl	w-full h-full pt-20 pb-2 px-2 flex-auto">
<input type="password" bind:value={password} />
<button class="bg-gray-100 hover:bg-gray-300" on:click={login} >Login</button>
</div>
