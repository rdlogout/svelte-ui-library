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
	in:fade
	class=" backdrop:bg-black/40 backdrop:backdrop-blur-sm bg-transparent h-full fixed max-h-full w-full max-w-full"
>
	<div
		transition:fly={{ x: 400, easing: circOut }}
		class={twMerge(`h-full sm:max-w-${size} w-full bg- p-5 z-10 bg-white relative transition-all`, direction === "left" ? "sm:mr-auto" : "sm:ms-auto", _class)}
	>
		<h3 class="font-bold text-lg">Hello!</h3>
		<p class="py-4">Press ESC key or click the button below to close</p>
	</div>

	{#if closeOnOuterClick}
		<form method="dialog">
			<button class="fixed inset-0 z-0 !ring-0 !outline-none !border-0" />
		</form>
	{/if}
</dialog>
<!-- <div class="hidden max-w-xs max-w-sm max-w-lg max-w-md max-w-xl max-w-2xl sm:max-w-sm" /> -->
