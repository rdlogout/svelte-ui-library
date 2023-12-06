<script lang="ts">
	import { page } from "$app/stores";
	import { goto } from "$app/navigation";
	import { fly, slide, scale, fade } from "svelte/transition";
	import { bounceOut, cubicIn, cubicInOut, circOut } from "svelte/easing";

	import { twMerge } from "tailwind-merge";
	let modal: HTMLDialogElement;
	let _class: string = "";

	export let direction: "left" | "right" = "right";
	export let size: "xs" | "sm" | "md" | "lg" | "xl" = "sm";
	export let closeOnEsc: boolean = true;
	export let closeOnOuterClick: boolean = true;
	export { _class as class };
	export let open: boolean = false;
	export let queryKey: string;

	const init = (el: HTMLDialogElement) => {
		modal = el;
		if (open) modal.showModal();
		let subscription;

		if (queryKey)
			subscription = page.subscribe(async (value) => {
				const hasValue = value.url.searchParams.get(queryKey);

				if (!hasValue && open) open = false;

				if (hasValue && !open) open = true;
			});

		return {
			update({ open }) {
				if (open) modal.showModal();
				else if (!open) {
					modal.close();
					if (queryKey) $page.url.searchParams.delete(queryKey);
					goto($page.url.toString());
				}
			},
			destroy: () => {
				if (subscription) subscription();
			},
		};
	};
</script>

<button class="btn" on:click={() => (open = !open)}>{open ? "close" : "open"} modal</button>
<dialog
	on:cancel={(_) => (!closeOnEsc ? _.preventDefault() : null)}
	on:close={() => (open = false)}
	use:init={(modal, { open })}
	in:slide
	class=" backdrop:bg-black/40 backdrop:backdrop-blur bg-transparent h-full fixed max-h-full w-full max-w-full p-3"
>
	<div
		transition:fly={{ x: 400, easing: circOut }}
		class={twMerge(`h-full sm:max-w-${size} w-full rounded-xl  z-10 bg-white relative transition-all`, direction === "left" ? "sm:mr-auto" : "sm:ms-auto", _class)}
	>
		<div class="flex h-11 shadow-sm bg-white justify-between items-center px-4 rounded-xl">
			<p class="text-md font-medium text-[#666] flex-1 w-2/3 truncate">New Consignment</p>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				version="1.1"
				xmlns:xlink="http://www.w3.org/1999/xlink"
				x="0"
				y="0"
				viewBox="0 0 512 512"
				style="enable-background:new 0 0 512 512"
				xml:space="preserve"
				class="h-3 aspect-square"
				><g
					><path
						d="m292.2 256 109.9-109.9c10-10 10-26.2 0-36.2s-26.2-10-36.2 0L256 219.8 146.1 109.9c-10-10-26.2-10-36.2 0s-10 26.2 0 36.2L219.8 256 109.9 365.9c-10 10-10 26.2 0 36.2 5 5 11.55 7.5 18.1 7.5s13.1-2.5 18.1-7.5L256 292.2l109.9 109.9c5 5 11.55 7.5 18.1 7.5s13.1-2.5 18.1-7.5c10-10 10-26.2 0-36.2z"
						fill="#000000"
						opacity="1"
						data-original="#000000"
						class=""
					></path></g
				></svg
			>
		</div>

		<div class="p-5">
			<h3 class="font-bold text-lg">Hello!</h3>
			<p class="py-4">Press ESC key or click the button below to close</p>
		</div>
	</div>

	{#if closeOnOuterClick}
		<form method="dialog">
			<button class="fixed inset-0 z-0 !ring-0 !outline-none !border-0" />
		</form>
	{/if}
</dialog>
<!-- <div class="hidden max-w-xs max-w-sm max-w-lg max-w-md max-w-xl max-w-2xl sm:max-w-sm" /> -->
