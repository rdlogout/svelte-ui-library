<script lang="ts">
	import { page } from "$app/stores";
	import { goto } from "$app/navigation";
	import { fade } from "svelte/transition";
	import { twMerge } from "tailwind-merge";
	let modal: HTMLDialogElement;
	let _class: string = "";

	export let size: "xs" | "sm" | "md" | "lg" | "xl" = "md";
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
				else {
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
	class=" backdrop:bg-black/40 backdrop:backdrop-blur-sm bg-transparent h-full fixed max-h-full w-full max-w-full sm:justify-center open:flex items-end sm:items-center"
>
	<div class={twMerge(`max-h-[90vh] max-w-${size} w-full bg- p-5 z-10 bg-white relative sm:rounded-lg rounded-t-lg `, _class)}>
		<h3 class="font-bold text-lg">Hello!</h3>
		<p class="py-4">Press ESC key or click the button below to close</p>
	</div>
	{#if closeOnOuterClick}
		<form method="dialog">
			<button class="fixed inset-0 z-0 !ring-0 !outline-none !border-0" />
		</form>
	{/if}
</dialog>
<div class="hidden max-w-xs max-w-lg max-w-md max-w-xl max-w-2xl" />
