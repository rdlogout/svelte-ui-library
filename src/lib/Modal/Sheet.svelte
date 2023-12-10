<script lang="ts">
	import { goto } from "$app/navigation";
	import { page } from "$app/stores";
	import { twMerge } from "tailwind-merge";
	export let type: "modal" | "drawer" = "drawer";
	export let size: "xs" | "sm" | "md" | "lg" | "xl" = type === "drawer" ? "sm" : "md";
	export let title: string = "";
	let _class: string = "";
	let pageSubscription: any;

	export let containerClass: string = "";
	export { _class as class };
	export let queryKey: string = "";
	export let open: boolean = false;
	export let titleClass: string = "";
	let contentElement: HTMLElement;

	export let onClose: () => void = () => {};

	let startY = 0;
	let currentY = 0;
	const touchStart = (e: TouchEvent) => {
		e.stopPropagation();
		startY = e.touches[0].clientY;
		contentElement.classList.remove("transition-all");
	};
	const touchMove = (e: TouchEvent) => {
		e.stopPropagation();
		currentY = e.touches[0].clientY;
		const translateY = Math.min(Math.max(currentY - startY, 0), window.innerHeight * 0.8);
		contentElement.style.transform = `translateY(${translateY}px)`;
	};
	const touchEnd = (e: TouchEvent) => {
		e.stopPropagation();
		if (currentY - startY > 30) open = false;
		contentElement.style.transform = "";
		contentElement.classList.add("transition-all");
	};
	if (queryKey)
		pageSubscription = page.subscribe((value) => {
			const is_open = value.url.searchParams.get(queryKey) !== null;

			if (is_open === open) return;

			if (is_open && !open) {
				open = true;
			} else if (!is_open && open) {
				open = false;
			}
		});

	const containerAction = (node: HTMLElement, open: boolean) => {
		return {
			update(open: boolean) {
				document.body.style.overflow = open ? "hidden" : "";
				if (!open) {
					onClose?.();
					if (queryKey && $page.url.searchParams.has(queryKey)) {
						$page.url.searchParams.delete(queryKey);
						goto($page.url.toString());
					}
				}

				dispatchEvent(
					new CustomEvent("sheetStateChanged", {
						detail: {
							open,
						},
					})
				);
			},
			destroy() {
				if (pageSubscription) {
					pageSubscription();
				}
			},
		};
	};
</script>

{#if $$slots.trigger}
	<slot name="trigger" trigger={() => (open = true)} />
{/if}
<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div
	use:containerAction={open}
	on:click={() => (open = false)}
	class={twMerge(
		"fixed inset-0 h-full flex bg-black/30 w-full backdrop-blur-sm z-50 transition-all duration-300 sm:p-4 pt-10 items-end",
		type === "drawer" ? "sm:justify-end" : "sm:justify-center sm:items-center",
		open ? "visible opacity-100" : "invisible opacity-0"
	)}
>
	<div
		on:touchstart={touchStart}
		on:touchmove={touchMove}
		on:touchend={touchEnd}
		bind:this={contentElement}
		class={twMerge(
			"bg-white  sm:rounded-b-xl rounded-t-xl   w-full transition-all sm:translate-y-0 translate-y-full flex flex-col ",
			size === "xs" && "sm:max-w-xs",
			size === "sm" && "sm:max-w-sm",
			size === "md" && "sm:max-w-md",
			size === "lg" && "sm:max-w-lg",
			size === "xl" && "sm:max-w-xl",
			type === "drawer" ? "sm:h-full transform sm:translate-x-full" : "h-fit",
			open ? "sm:translate-x-0  translate-y-0" : "",
			containerClass
		)}
		on:click|stopPropagation
	>
		<button class="mx-auto h-1 sm:h-1.5 w-8 mt-4 bg-gray-200 rounded-full" />
		<h2 class:hidden={!title} class={twMerge("font-extrabold  sm:text-xl text-lg leading-none text-[#555] truncate text-center py-5 border-b border-gray-50 w-full", titleClass)}>{title}</h2>
		<div class={twMerge("flex-1 overflow-auto flex flex-col p-6", _class)}>
			<slot />
		</div>
	</div>
</div>
