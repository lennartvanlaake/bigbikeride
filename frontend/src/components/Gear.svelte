<script lang="ts">
	import Carousel from "../components/Carousel.svelte";

	const images = [
		{
			path: "api/assets/me-working.jpg",
			description: "bla",
		},
	];
</script>

<div class="white-rounded">
	<div class="title-wrapper">
		<h1 class="title">Practicalities</h1>
	</div>
	<div class="text">
		<p>
			This page is about the practical side of going on a long
			bicycle tour. While perparing/obsessing about my own
			tour I found videos and pages about gear, finance and
			travel tips very helpful. I hope that if you are
			planning a long trip that you find this page helpful.
		</p>

		<h2>Gear</h2>
		<p>
			I try to only buy top brand items when I can point to a
			specific reason why they are better then a cheaper
			alternative. For instance, I have more faith that my
			Ortlieb bags keep my essentials dry compared to an
			off-brand set of panniers. But I do not care that much
			if some less important things gets a little damp, so I
			am happy to store them in chepaer alternatives.
		</p>
		<p>
			Some of the stuff I am taking is not strictly necessary.
			I don't mind adding a bit of weight when that allows me
			to do something that I enjoy a lot, such as making good
			coffee in the morning or going climbing. I try to keep
			the base-weight from exploding by looking for savings
			when possible, for instance by not having front panniers
			and a front rack.
		</p>
		<h3>Bags</h3>
		<ul>
			<li>
				Ortlieb Back Rollers 20L back panniers (majority
				of gear)
			</li>
			<li>
				Topeak Versacage + no-brand 5L drybags as
				replacement for front panniers (rain clothes and
				climbing shoes)
			</li>
			<li>
				Decathlon Itiwit 30L drybag backpack (tent and
				extra food, strapped onto back rack)
			</li>
			<li>
				Decathlon Riverside 900 saddle bag 2.5L (repair
				kit and spares)
			</li>
			<li>
				Decathlon Riverside 520 frame bag 2L (snacks,
				phone and other quick-access items)
			</li>
		</ul>
		<h3>Camping gear</h3>
		<ul>
			<li>
				Decathlon Trek 900 2-person tent
			</li>
			<li>
				Down sleeping bag (forgot brand)
			</li>
			<li>
				Silk sleeping bag liner (forgot brand)
			</li>
			<li>
				Thermarest Xlite sleeping mat
			</li>
			<li>
				Nemo Fillo Elite pillow
			</li>
			<li>
				Helinox Chair Zero
			</li>
			<li>
				Trangia cooking pot and non-stick pan (for
				pancakes)
			</li>
			<li>
				Insulated water bottle
			</li>
			<li>
				Bamboo cup
			</li>
		</ul>
		<h3>Clothes</h3>
		<ul>
			<li>
				Lowa Locarno Gore-Tex shoes
			</li>
			<li>
				Teva sandals
			</li>
			<li>
				Agu strato helmet
			</li>
			<li>
				Patagonia torrentshell rain jacket
			</li>
			<li>
				Decathlon Forclaz Trek 500 down jacket
			</li>
			<li>
				Reflective saftey vest
			</li>
			<li>
				Decathlon Quecha MH500 rain trousers
			</li>
			<li>
				Decathlon Kalenji gaiters (closes gap between
				rain trowsers and shoes)
			</li>
			<li>
				Buff neck gaiter (as replacement for cap or
				scarf)
			</li>
			<li>
				Decathlon Kimjaly Yoga pants (cheap, light,
				comfy and quick-drying!)
			</li>
			<li>
				Decathlon Artengo Tennis pants
			</li>
			<li>
				Decathlon Kalenji light modular trail hat
			</li>
			<li>
				Light button-down shirt
			</li>
			<li>
				2 sets of padded bike underwear
			</li>
			<li>
				2 sets of shorts
			</li>
			<li>
				A few t-shirts, normal underwear and socks
			</li>
		</ul>
		<h3>Electronics</h3>
		<ul>
			<li>
				Chromebook, USB-C chargeable and set-up for
				programming
			</li>
			<li>Aukey high-speed charger</li>
			<li>Power bank (off-brand)</li>
			<li>Kobo E-reader</li>
			<li>Decathlon Trek 500 solar panel</li>
		</ul>
		<h3>Misc</h3>
		<ul>
			<li>
				Light my fire titanium spork
			</li>
			<li>
				Opinel knife
			</li>
			<li>
				Leyzne strip drive rear light
			</li>
			<li>
				Sunscreen
			</li>
			<li>
				Decathlon Nabaiji ribbed towel
			</li>
			<li>
				Decathlon isotonic drink mix (to prevent
				dehydration)
			</li>
			<li>
				Climbing shoes
			</li>
			<li>
				Bialetti Venus 2 cup coffee maker
			</li>
			<li>
				Set of playing cards
			</li>
			<li>
				Pen and paper
			</li>
			<li>
				Toiletries
			</li>
		</ul>

		<h2>Bike</h2>
		<p>
			I bought my bike a few years ago secondhand for 250
			euros, mostly because of the high-end components already
			on it. By now the bike is adjusted to my tastes. In
			adjusting the bike I chose easily accessible components
			over fancy super-durable components, because I would
			rather assume that things will break and be able to fix
			the problems that can occur then assume that things
			won't break and have a massive problem when that
			assumption fails.
		</p>
		<li>
			Stevens steel MTB frame
		</li>
		<li>
			Shimano XT hubs and breaks
		</li>
		<li>
			Tubus rear rack
		</li>
		<li>
			Microshift Advent 1x9 drivetrain (sold by Decathlon as
			'Rockrider')
		</li>
		<li>
			Koga Dali handlebar with leather padding
		</li>
		<li>
			Selle Royal Respiro Moderate saddle
		</li>
	</div>
	<Carousel images="{images}" />
</div>
<style>
	ul {
		margin-left: 1rem;
	}

	p,
	ul {
		margin-bottom: 0.75rem;
	}
	h2,
	h3 {
		color: #574f4e;
		margin-bottom: 1rem;
	}
	h2 {
		font-size: 1.1rem;
	}
	h3 {
		font-style: italic;
		font-size: 1rem;
	}
</style>
