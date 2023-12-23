<script>
	import Carousel from "$lib/Carousel/Carousel.svelte";
	// import { Carousel } from "@logoutrd/svelte";
	let open = false;

	const items = [
		{
			id: 7,
			title: "ss",
			is_global: false,
			status: "active",
			type: "image",
			created_at: "2023-12-10T12:26:20.931",
			updated_at: null,
			start_date: "2023-12-10T12:26:25.063",
			end_date: "2023-12-30T12:26:00",
			redirect_url: "",
			analytic_id: null,
			media: {
				src: "https://imagedelivery.net/O9cr80qc9MmTtt9iBRWu3w/d9a8319b-f5b3-452d-aba3-95998030c900/public",
				type: "image",
				thumbnail: "https://imagedelivery.net/O9cr80qc9MmTtt9iBRWu3w/d9a8319b-f5b3-452d-aba3-95998030c900/public",
			},
		},
		{
			id: 6,
			title: "Test3",
			is_global: false,
			status: "active",
			type: "image",
			created_at: "2023-12-10T12:25:17.976",
			updated_at: null,
			start_date: "2023-12-10T12:25:21",
			end_date: "2023-12-29T12:25:00",
			redirect_url: "",
			analytic_id: null,
			media: {
				src: "https://imagedelivery.net/O9cr80qc9MmTtt9iBRWu3w/cd98b6cc-86db-44b2-2ba6-503e73361d00/public",
				type: "image",
				thumbnail: "https://imagedelivery.net/O9cr80qc9MmTtt9iBRWu3w/cd98b6cc-86db-44b2-2ba6-503e73361d00/public",
			},
		},
		{
			id: 5,
			title: "Anoher",
			is_global: false,
			status: "active",
			type: "image",
			created_at: "2023-12-10T12:24:20.285",
			updated_at: null,
			start_date: "2023-12-10T12:24:20.927",
			end_date: "2023-12-30T12:24:00",
			redirect_url: "",
			analytic_id: null,
			media: {
				src: "https://imagedelivery.net/O9cr80qc9MmTtt9iBRWu3w/4e5ed1b2-351f-4bd6-74d4-275b80cfb300/public",
				type: "image",
				thumbnail: "https://imagedelivery.net/O9cr80qc9MmTtt9iBRWu3w/4e5ed1b2-351f-4bd6-74d4-275b80cfb300/public",
			},
		},
	];
</script>

<Carousel class="sm:gap-6 gap-2 rounded-xl overflow-hidden  mx-3 sm:mx-0 " autoPlay={3} pauseOnHover layout={{ default: 1.8, xs: 1 }} gap={{ default: 0 }} slides={items}>
	<div data-id={slide?.id} slot="slide" let:slide let:index>
		{#if !slide}
			<div class="animate-pulse bg-gradient-to-br from-gray-100 to-gray-200 aspect-[1.9] w-full rounded-xl" />
		{:else if slide.media.type == "image"}
			<img containerClass="sm:rounded-xl rounded-xl " src={slide.media.src} width={400} alt={slide.alt} class="rounded-md aspect-[2] object-cover w-full" />
		{:else}
			<iframe
				src={slide.media.src + "/watch"}
				style="border: none"
				class="aspect-[2.1] object-cover w-full"
				title="YouTube video player"
				frameborder="0"
				allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;"
				allowfullscreen="true"
			/>
		{/if}
	</div>

	<div slot="dots" let:scrollTo let:dots class="flex gap-2 flex-1 sm:pt-4 pt-3 px-1 justify-center sm:justify-start sm:mt-0 z-10">
		{#each dots as item, index}
			<button on:click={(_) => scrollTo(index)} class=" sm:h-2 h-1.5 transition-all {item.active ? 'sm:w-8 w-6 bg-gray-600' : 'sm:w-4 w-2 bg-gray-200'} rounded-full" />
		{/each}
	</div>
</Carousel>
