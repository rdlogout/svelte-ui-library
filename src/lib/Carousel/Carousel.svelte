<script lang="ts">
	export let autoPlay: boolean = false;
</script>

<div data-hs-carousel={'{  "loadingClasses": "opacity-0",   "isAutoPlay":' + autoPlay + " }"} class="relative">
	<div class="hs-carousel relative overflow-hidden w-full min-h-[350px]">
		<div class="hs-carousel-body absolute top-0 bottom-0 start-0 flex flex-nowrap transition-transform duration-700 opacity-0">
			<div class="hs-carousel-slide">1</div>
			<div class="hs-carousel-slide">2</div>
			<div class="hs-carousel-slide">3</div>
		</div>
	</div>

	<button type="button" class="hs-carousel-prev">
		<span aria-hidden="true">«</span>
		<span class="sr-only">Previous</span>
	</button>
	<button type="button" class="hs-carousel-next">
		<span class="sr-only">Next</span>
		<span aria-hidden="true">»</span>
	</button>
</div>
