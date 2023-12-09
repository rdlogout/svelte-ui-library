<script lang="ts">
	import { createDialog } from "@melt-ui/svelte";

	import { page } from "$app/stores";
	import { fly } from "svelte/transition";
	import { twMerge } from "tailwind-merge";
	import { get } from "svelte/store";
	import { browser } from "$app/environment";
	import { goto } from "$app/navigation";
	import { onDestroy } from "svelte";

	let pageSubscription: any;
	let storeSubscription: any;

	let _class: string = "";
	let _title: string = "";
	let _open: boolean = false;
	export let onClose: () => void;
	export let closeButton: boolean = true;
	export let drawer: boolean = false;
	export let placement: "left" | "right" | "top" | "center" = drawer ? "right" : "center";
	export let size: "xs" | "sm" | "md" | "lg" | "xl" = drawer ? "sm" : "md";
	export let portal: boolean = false;
	export let closeOnEscape: boolean = true;
	export let closeOnOutsideClick: boolean = true;
	export { _class as class, _title as title };
	export let containerClass: string | undefined = undefined;
	export let headerClass: string | undefined = undefined;
	export { _open as open };
	export let triggerClass: string | undefined = undefined;

	export let queryKey: string | undefined = undefined;

	const handleChange = ({ next }: { next: boolean }): boolean => {
		console.log("fired", $$props.id);
		if (_open === next) {
			console.log("returning", $$props.id, next);
			return next;
		}

		if (!next) {
			if (queryKey && browser && $page.url.searchParams.has(queryKey)) {
				$page.url.searchParams.delete(queryKey);
				goto($page.url.toString());
			}

			onClose?.();
		}

		console.log("dispatching", next);
		if (browser) {
			dispatchEvent(
				new CustomEvent("sendToApp", {
					detail: {
						name: "modalState",
						open: next,
					},
				})
			);
		}
		_open = next;

		return next;
	};

	const {
		elements: { trigger, portalled, overlay, content, title, description, close },
		states: { open },
	} = createDialog({
		defaultOpen: _open,
		onOpenChange: handleChange,
		closeOnEscape,
		closeOnOutsideClick,
		portal: portal ? "body" : undefined,
	});

	$: open.set(_open);

	if (queryKey)
		pageSubscription = page.subscribe((value) => {
			const is_open = value.url.searchParams.get(queryKey) !== null;
			if (is_open && !_open) {
				open.set(true);
			} else if (!is_open && _open) {
				open.set(false);
			}
		});

	onDestroy(() => {
		if (pageSubscription) {
			pageSubscription();
		}
		if (storeSubscription) storeSubscription();
	});

	let startY = 0;
	let currentY = 0;
	let element: HTMLElement;
	const touchMove = (e: TouchEvent) => {
		currentY = e.touches[0].clientY;
		const translateY = Math.min(Math.max(currentY - startY, 0), window.innerHeight * 0.8);
		element.style.transform = `translateY(${translateY}px)`;
	};
	const touchEnd = (e: TouchEvent) => {
		if (currentY - startY > window.innerHeight * 0.2) {
			open.set(false);
		} else {
			element.style.transform = "translateY(0)";
		}
	};
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
			bind:this={element}
			on:touchstart={(_) => (startY = _.touches[0].clientY)}
			on:touchmove={(_) => (currentY = _.touches[0].pageY)}
			on:touchmove={touchMove}
			on:touchend={(_) => touchEnd(_)}
			{...$content}
			use:content
			transition:fly={{
				...{ ...(get(page).data.is_mobile ? { y: 350 } : drawer ? (placement === "right" ? { x: 350 } : { x: -350 }) : { y: -200 }) },
				duration: 200,
			}}
			class={twMerge(
				"fixed   sm:p-4   w-full z-50 left-0 right-0 bottom-0  sm:top-0 top-auto !ring-0 !outline-none overflow-auto  ",
				drawer ? `sm:min-h-screen` : "sm:max-h-[85vh] rounded-t-xl",
				placement === "left" && "sm:left-0 sm:right-auto",
				placement === "right" && "sm:right-0 sm:left-auto",
				placement === "top" && "sm:top-10 sm:bottom-auto",
				placement === "center" && "sm:top-1/2 sm:bottom-auto sm:-translate-y-1/2 sm:-translate-x-1/2 sm:left-1/2",
				size === "xs" && "sm:max-w-xs",
				size === "sm" && "sm:max-w-sm",
				size === "md" && "sm:max-w-md",
				size === "lg" && "sm:max-w-lg",
				size === "xl" && "sm:max-w-xl",
				containerClass
			)}
		>
			<div
				class={twMerge(
					"modal-content h-full shadow-xl",

					_class
				)}
			>
				<div class={twMerge("flex flex-col items-center", headerClass)}>
					{#if closeButton}
						<button {...$close} class="h-1 sm:h-1.5 w-8 bg-gray-200 mx-auto rounded-full mb-1 !ring-0 !outline-none my-3" use:close />
					{/if}

					{#if _title}
						<h2 class="font-bold text-lg leading-none text-[#666] truncate text-center py-3 border-b w-full">{_title}</h2>
					{/if}
				</div>
				<div class="flex-1 overflow-auto flex flex-col p-6 pb-10 sm:pb-6 py-5">
					<slot />
				</div>
			</div>
		</div>
	{/if}
</div>

<style lang="scss">
	.modal-content {
		background-color: white;
		width: 100%;
		max-height: 95vh;
		position: relative;
		border-start-start-radius: 16px;
		border-start-end-radius: 16px;
		display: flex;
		flex-direction: column;
		overflow: auto;

		&::-webkit-scrollbar {
			display: none;
		}

		@media (min-width: 640px) {
			border-radius: 16px;
			max-height: 100vh;
		}
	}
</style>
