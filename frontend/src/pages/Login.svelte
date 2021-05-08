<script lang="ts">
    import axios from "axios";
    import { loggedIn } from "../javascript/storage";
    import NavBar from "../components/Navbar.svelte";
    let password: string;

    function login() {
        axios
            .post("/api/login", {
                password: password,
            })
            .then(function (response) {
                alert("Login success!");
                loggedIn.set(true);
            })
            .catch(function (error) {
                alert("Login failed!");
            });
    }
</script>

<NavBar></NavBar>
<div class="container mx-auto max-w-5xl	w-full h-full pt-20 pb-2 px-2 flex-auto">
<input type="password" bind:value={password} />
<button class="bg-gray-100 hover:bg-gray-300" on:click={login} >Login</button>
</div>
