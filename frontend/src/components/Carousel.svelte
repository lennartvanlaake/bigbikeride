<script lang="ts">
	import type { Image } from "../../../types/types";
	// Import Swiper styles
	import "swiper/swiper.scss";

	import "swiper/components/pagination/pagination.min.css";
	import "swiper/components/navigation/navigation.min.css";

	import "./style.css";
	import { Swiper, SwiperSlide } from "swiper/svelte";
	// import Swiper core and required modules
	import SwiperCore, { Pagination, Navigation } from "swiper/core";

	export let images: Array<Image>;
	SwiperCore.use([Pagination, Navigation]);
</script>

<Swiper
	pagination="{{
  'type': 'fraction'
}}"
	navigation="{true}"
	class="mySwiper"
>
	{ #each images as currentImage }
	<SwiperSlide>
		<img class="image" src=/{currentImage.path}
		alt={currentImage.description ?? ""}/> { #if
		currentImage.description }
		<p class="description">{currentImage.description}</p>
		{ /if }
	</SwiperSlide>
	{ /each }
</Swiper>
