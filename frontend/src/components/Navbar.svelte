<script lang="ts">
	import { loggedIn } from "../javascript/storage";
	import * as api from "../javascript/api";

	let isLoggedIn = false;
	loggedIn.subscribe((foundLoggedIn) => {
		isLoggedIn = foundLoggedIn;
	});
	api.isLoggedIn()
		.then(() => {
			isLoggedIn = true;
		})
		.catch(() => {
			isLoggedIn = false;
		});
</script>

<!-- This example requires Tailwind CSS v2.0+ -->
<nav class="bg-gray-800 bg-opacity-100 fixed z-50 w-full m-0 p-0">
	<div class="px-2 sm:px-6 lg:px-8">
		<div
			class="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start h-16"
		>
			<div class="flex-shrink-0 flex items-center">
				{#if isLoggedIn}
				<a
					href="/edit"
					class="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
					>Edit</a
				>
				{/if}
				<a
					href="/"
					class="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
					>Blog</a
				>
			</div>
		</div>
	</div>
</nav>
