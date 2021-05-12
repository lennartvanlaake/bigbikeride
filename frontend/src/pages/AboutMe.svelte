<script lang="ts">
	import type { Image } from "../../../types/types";

	import Carousel from "../components/Carousel.svelte";

	const images: Image[] = [
		{
			id: "_",
			path: "/uploads/profile1.jpg",
			description: null,
			created: new Date(),
			updated: new Date(),
		},
	];
</script>

<div class="white-rounded">
	<div class="title-wrapper">
		<h1 class="title">Hello!</h1>
	</div>
	<div class="text">
		<p>
			I am Lennart and I will be cycling around Europe for a
			year. I am really bad in telling about myself. Selfies
			are not my thing and I used to be one of those teenagers
			that was always "fine" and to whom nothing happened. To
			help motivate me to actually write things I will be
			writing a story about someone I have met on the road
			every week (or so). Because my trip has not started yet
			this site is still pretty empty.
		</p>
		<p>
			This website is built from scratch by me. Obviously a
			WordPress website would also have done the trick, but my
			pride as a geeky developer could not come to terms with
			that fact. Feel free to poke around the source code on
			<li class="github">
				<a
					href="https://github.com/lennartvanlaake/bigbikeride"
					><strong>github</strong>
					<svg
						version="1.1"
						width="16"
						height="16"
						viewBox="0 0 16 16"
						class="octicon octicon-mark-github"
						aria-hidden="true"
					>
						<path
							fill-rule="evenodd"
							d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z"
						></path>
					</svg>
				</a>
			</li>
			if that is your thing.
		</p>
	</div>
	<Carousel images="{images}" />
</div>

<style>
	.github {
		display: inline;
		list-style: none;
	}

	p {
		margin: 1rem;
	}

	a {
		text-decoration: none;
	}
</style>
