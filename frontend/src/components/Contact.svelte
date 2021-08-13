<script lang="ts">
	import * as api from "../javascript/api";
	let captchaCompleted = false;
	let sender = "";
	let message = "";
	let name = "";
	let email = "";

	window.addEventListener(
		"message",
		function (e) {
			if (e.origin.indexOf("vivirenremoto.github.io") > -1) {
				captchaCompleted = true;
			}
		},
		false
	);

	async function sendForm() {
		try {
			await api.fillContactForm({
				sender: sender,
				message: message,
			});
			alert("Message sent!");
		} catch (_) {
			alert("Sending message failed!");
		} finally {
			captchaCompleted = false;
		}
	}

	async function subscribe() {
		try {
			api.subscribe({
				name: name,
				email: email,
			});
			alert("Subscription succesful!");
		} catch (_) {
			alert(
				"Something went wrong. Maybe your are already subscribed to the blog?"
			);
		}
	}
</script>
<div class="white-rounded">
	<div class="title-wrapper">
		<h1 class="title">Contact me</h1>
	</div>

	<p>
		If you want to get in contact with me, please fill first kill
		some zombies to prove you are worthy (and human). Especially
		offers for a place to sleep on the road or a place to work for
		room and board would be amazing. I would gladly do a detour to
		meet some lovely people.
	</p>

	<br />
	{ #if !captchaCompleted }
	<iframe
		title="DOOM captcha"
		id="doom_captcha"
		src="https://vivirenremoto.github.io/doomcaptcha/captcha.html?version=17&countdown=offenemies=4"
	></iframe>

	{ :else }
	<label for="sender">Your email or phone number:</label>
	<input type="text" id="sender" name="sender" bind:value="{sender}" />
	<label for="message">The message you want to send to Lennart:</label>
	<textarea cols="50" rows="6" bind:value="{message}" />
	<button on:click="{sendForm}">Send!</button>
	<br />

	<h2>Subscribe for notifications!</h2>
	<label for="name">Name:</label>
	<input type="text" id="name" name="name" bind:value="{name}" />
	<label for="email">Email:</label>
	<input type="text" id="email" name="email" bind:value="{email}" />
	<button on:click="{subscribe}">Subscribe!</button>

	{ /if }
</div>

<style>
	input,
	label,
	textarea,
	button {
		display: block;
		margin-top: 0.5rem;
	}
	#doom_captcha {
		width: 20rem;
		height: 12rem;
	}
</style>
