<script lang="ts">
	export let carousel;
	export let isInfiniteLoop: boolean = true;
	export let duration: number = 4000;
	export let autoPlay: boolean = true;
	export let currentIndex: number = 0;

	const init = (element: HTMLElement) => {
		carousel = new (window as any).HSCarousel(element, {
			isInfiniteLoop,
			speed: duration,
			isAutoPlay: autoPlay,
			currentIndex,
		});
	};

	const onMouseEnter = () => {
		carousel = new (window as any).HSCarousel(carousel.el, {
			isAutoPlay: false,
		});
		console.log("onMouseEnter", carousel);
	};
</script>

<div on:mouseenter={onMouseEnter} use:init class="relative">
	<div class="hs-carousel relative overflow-hidden w-full min-h-[350px] bg-white rounded-lg">
		<div class="hs-carousel-body absolute top-0 bottom-0 start-0 flex flex-nowrap transition-transform duration-700 opacity-0">
			<div class="hs-carousel-slide">
				<div class="flex justify-center h-full bg-gray-100 p-6">
					<span class="self-center text-4xl transition duration-700">First slide</span>
				</div>
			</div>
			<div class="hs-carousel-slide">
				<div class="flex justify-center h-full bg-gray-200 p-6">
					<span class="self-center text-4xl transition duration-700">Second slide</span>
				</div>
			</div>
			<div class="hs-carousel-slide">
				<div class="flex justify-center h-full bg-gray-300 p-6">
					<span class="self-center text-4xl transition duration-700">Third slide</span>
				</div>
			</div>
		</div>
	</div>

	<button
		type="button"
		class="hs-carousel-prev hs-carousel:disabled:opacity-50 disabled:pointer-events-none absolute inset-y-0 start-0 inline-flex justify-center items-center w-[46px] h-full text-gray-800 hover:bg-gray-800/[.1]"
	>
		<span class="text-2xl" aria-hidden="true">
			<svg
				class="flex-shrink-0 w-5 h-5"
				xmlns="http://www.w3.org/2000/svg"
				width="24"
				height="24"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				stroke-width="2"
				stroke-linecap="round"
				stroke-linejoin="round"><path d="m15 18-6-6 6-6" /></svg
			>
		</span>
		<span class="sr-only">Previous</span>
	</button>
	<button
		type="button"
		class="hs-carousel-next hs-carousel:disabled:opacity-50 disabled:pointer-events-none absolute inset-y-0 end-0 inline-flex justify-center items-center w-[46px] h-full text-gray-800 hover:bg-gray-800/[.1]"
	>
		<span class="sr-only">Next</span>
		<span class="text-2xl" aria-hidden="true">
			<svg
				class="flex-shrink-0 w-5 h-5"
				xmlns="http://www.w3.org/2000/svg"
				width="24"
				height="24"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				stroke-width="2"
				stroke-linecap="round"
				stroke-linejoin="round"><path d="m9 18 6-6-6-6" /></svg
			>
		</span>
	</button>

	<div class="hs-carousel-pagination flex justify-center absolute bottom-3 start-0 end-0 space-x-2">
		<span class="hs-carousel-active:bg-blue-700 hs-carousel-active:border-blue-700 w-3 h-3 border border-gray-400 rounded-full cursor-pointer" />
		<span class="hs-carousel-active:bg-blue-700 hs-carousel-active:border-blue-700 w-3 h-3 border border-gray-400 rounded-full cursor-pointer" />
		<span class="hs-carousel-active:bg-blue-700 hs-carousel-active:border-blue-700 w-3 h-3 border border-gray-400 rounded-full cursor-pointer" />
	</div>
</div>
