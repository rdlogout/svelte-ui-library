<script lang="ts">
	import { twMerge } from "tailwind-merge";

	let _class: string = "";

	export { _class as class };
	export let size: "3" | "4" | "5" | "6" | "7" | "8" | "9" | "10" = "5";
	export let name: string = "stars";
	export let max: number = 5;
	export let readOnly: boolean = false;
	export let value: number = 0;
</script>

<div class="flex gap-2 text-yellow-400">
	{#each Array(Math.round(value)) as _, index}
		{#if index + 1 <= value}
			<svg
				class={twMerge("flex-shrink-0 w-5 h-5 fill-yellow-500", `w-${size} h-${size}`, _class)}
				xmlns="http://www.w3.org/2000/svg"
				id="Layer_1"
				data-name="Layer 1"
				viewBox="0 0 24 24"
				width="512"
				height="512"><path d="M19.467,23.316,12,17.828,4.533,23.316,7.4,14.453-.063,9H9.151L12,.122,14.849,9h9.213L16.6,14.453Z" /></svg
			>
		{:else}
			<svg class={twMerge("flex-shrink-0 w-5 h-5 fill-yellow-500", `w-${size} h-${size}`, _class)} xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24">
				<path d="m4.567,23.088l2.829-8.754L.039,8.999h9.242L12.5-.668v18.188l-7.933,5.568Z" />
			</svg>
		{/if}
	{/each}
</div>
