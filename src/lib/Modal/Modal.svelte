<script lang="ts">
	import { createDialog } from "@melt-ui/svelte";

	import { page } from "$app/stores";
	import { fly } from "svelte/transition";
	import { twMerge } from "tailwind-merge";
	import { get, writable } from "svelte/store";
	import { browser } from "$app/environment";
	import { goto } from "$app/navigation";
	import { onDestroy, onMount } from "svelte";

	let pageSubscription: any;
	let storeSubscription: any;

	let _class: string = "";

	let _open: boolean = false;
	let openStore = writable(_open);
	export let onClose: () => void;
	export let closeButton: boolean = true;
	export let drawer: boolean = false;
	export let placement: "left" | "right" | "top" | "center" = drawer ? "right" : "center";
	export let size: "xs" | "sm" | "md" | "lg" | "xl" = drawer ? "sm" : "md";
	export let portal: boolean = false;
	export let closeOnEscape: boolean = true;
	export let closeOnOutsideClick: boolean = true;
	export { _class as class };
	export { _open as open };
	export let triggerClass: string | undefined = undefined;

	export let queryKey: string | undefined = undefined;

	const {
		elements: { trigger, portalled, overlay, content, title, description, close },
		states: { open },
	} = createDialog({
		open: openStore,
		closeOnEscape,
		closeOnOutsideClick,
		portal: portal ? "body" : undefined,
	});

	onMount(() => {
		if (queryKey)
			pageSubscription = page.subscribe((value) => {
				const is_open = value.url.searchParams.get(queryKey) !== null;
				if (is_open && !_open) {
					openStore.set(true);
				} else if (!is_open && _open) {
					openStore.set(false);
				}
			});

		storeSubscription = openStore.subscribe((value) => {
			// sendToApp("modalState", {
			//   open: value,
			// });
			if (!value && onClose) onClose();

			dispatchEvent(
				new CustomEvent("sendToApp", {
					detail: {
						name: "modalState",
						open: value,
					},
				})
			);

			if (!value) {
				_open = false;
				if (browser && $page.url.searchParams.get(queryKey) !== null && queryKey) {
					$page.url.searchParams.delete(queryKey);
					goto($page.url.toString());
				}
			}
		});
	});

	onDestroy(() => {
		if (pageSubscription) {
			pageSubscription();
		}
		if (storeSubscription) storeSubscription();
	});

	$: openStore.set(_open);
</script>

{#if $$slots.trigger}
	<button {...$trigger} class={triggerClass} use:trigger>
		<slot name="trigger" />
	</button>
{/if}

<div {...$portalled} use:portalled>
	{#if $open}
		<div {...$overlay} use:overlay class="fixed z-50 inset-0 backdrop-blur-sm bg-black/30" />
		<div
			{...$content}
			use:content
			transition:fly={{
				...{ ...(get(page).data.is_mobile ? { y: 350 } : drawer ? (placement === "right" ? { x: 350 } : { x: -350 }) : { y: -200 }) },
				duration: 200,
			}}
			class={twMerge(
				"fixed sm:p-4 w-full z-50 left-0 right-0",
				placement === "left" && "sm:left-0 sm:right-auto",
				placement === "right" && "sm:right-0 sm:left-auto",
				placement === "top" && "sm:top-10",
				placement === "center" && "sm:top-1/2 sm:-translate-y-1/2 sm:-translate-x-1/2 sm:left-1/2",
				drawer ? `bottom-0 sm:top-0 ` : "max-h-[85vh] bottom-0 sm:bottom-auto  rounded-t-xl",
				size === "xs" && "sm:max-w-xs",
				size === "sm" && "sm:max-w-sm",
				size === "md" && "sm:max-w-md",
				size === "lg" && "sm:max-w-lg",
				size === "xl" && "sm:max-w-xl"
			)}
		>
			<div class={twMerge("w-full bg-white p-6 relative h-full shadow-xl flex flex-col overflow-auto text-start rounded-t-xl sm:rounded-xl", _class)}>
				{#if closeButton}
					<div class="absolute flex justify-end right-5 top-5">
						<button {...$close} use:close class=" h-1.5 w-8 bg-gray-200 opacity-90 rounded-full top-6 ring-0 focus:ring-0 outline-none border-0" />
					</div>
				{/if}

				<slot />
			</div>
		</div>
	{/if}
</div>
