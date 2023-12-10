<script lang="ts">
	import { twMerge } from "tailwind-merge";
	import { fly, slide, scale } from "svelte/transition";
	export let open: boolean = false;
	let _class: string = "";
	export let variant: "outline" | "unstyled" = "outline";
	export let arrow: boolean = variant === "outline";
	export { _class as class };
	export let contentClass: string = "";
	export let containerClass: string = "";
	let dropdownElement: HTMLElement;

	const handleClickOutside = (e: any) => {
		if (dropdownElement && !dropdownElement.contains(e.target)) {
			open = false;
		}
	};
</script>

<div bind:this={dropdownElement} class={twMerge("relative inline-block text-left", containerClass)}>
	<!-- Trigger button -->
	<button
		data-trigger
		aria-haspopup="true"
		aria-expanded={open}
		on:click={() => (open = !open)}
		id="dropdownButton"
		type="button"
		class={twMerge("inline-flex justify-center w-full !ring-0 border-0 text-base", variant === "outline" ? "border border-gray-200 rounded-lg px-4 py-2 gap-2" : "", _class)}
	>
		<slot name="trigger" />
		{#if arrow}
			<svg class="-mr-1 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
			</svg>
		{/if}
	</button>

	<!-- Dropdown menu -->
	{#if open}
		<div
			in:scale
			out:scale
			data-content
			id="dropdownMenu"
			class={twMerge("origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-50 overflow-hidden", contentClass)}
			role="menu"
			aria-orientation="vertical"
			aria-labelledby="options-menu"
		>
			<slot {open} />
		</div>
	{/if}
</div>

<svelte:window on:click={handleClickOutside} />
