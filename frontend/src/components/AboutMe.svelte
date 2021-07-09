<script lang="ts">
	import type { Image } from "../../../types/types";

	import Carousel from "../components/Carousel.svelte";

	const images = [
		{
			path: "api/assets/me-working.jpg",
			description: null,
		},
		{
			path: "api/assets/me-climbing.jpeg",
			description: null,
		},
	];
</script>

<div class="white-rounded">
	<div class="title-wrapper">
		<h1 class="title">Hello!</h1>
	</div>
	<div class="text">
		<p>
			I am Lennart and welcome to the blog of my big bike
			ride! I am planning to do a tour around Europe for a
			year. Before corona hit I wanted to do "travel around
			the world" to experience freedom, meet awesome people
			and challenge myself. Partially forced by the pandemic,
			I got excited about the hassle-free travel I can get in
			Europe. Not having to deal with visa or remote scary
			places allows me to plan less and be more random in my
			travels.
		</p>

		<p>
			My plans so far are to travel from my home in the
			Netherlands towards Istanbul and then find my way back.
			I am planning to camp when possible, use hospitality
			exchange networks and allow myself the 'luxury' of a
			hostel once in a while. If I see some amazing place on
			the road, I want to take the time stay there for a
			while. I hope to find the peace of mind to take it slow
			and fully enjoy what I discover.
		</p>

		<p>
			While not making any promises, I hope to update this
			blog about once a week. This blog will not be a full
			day-by-day diary of my trip. Instead, I want to
			highlight surprising events and the special people I
			meet on the road. I am still a beginner at photography,
			but I hope to add some interesting portraits of people
			and places I see while travelling.
		</p>

		<p>
			As you might have noticed, this website is not your
			typical WordPress blog. While preparing for my bike ride
			I got really into stories from bicycle-travellers. I
			discovered many lovely books and vlogs, but most blogs
			did not motivate me to keep on reading them. This site
			is an attempt to make reading the story of a
			bicycle-adventure more entertaining by creating a more
			interactive interface and visibly linking the posts to
			the places visited.
		</p>

		<p>
			Because this blog is a piece of custom software some
			bugs might occur. You can create an issue about the bug
			(or even a PR) in this
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
			repository.
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
		margin-bottom: 1rem;
	}

	a {
		text-decoration: none;
	}
</style>
