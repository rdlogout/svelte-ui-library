<script lang="ts">
	import { twMerge } from "tailwind-merge";
	export let dashed: boolean = false;

	export let vertical: boolean = false;

	let _class: string = "";
	export let containerClass: string = "";

	export { _class as class };
</script>

{#if vertical}
	<div class={twMerge("h-2 border-s w-[1px]", _class)} />
{:else}
	<div class={twMerge("flex items-center", containerClass)}>
		<hr class={twMerge(`flex-grow border-t my-5 border-gray-100 border-${dashed ? "dashed" : "solid"}`, _class)} />
		<slot />
		<hr class={twMerge(`flex-grow border-t my-5 border-gray-100 border-${dashed ? "dashed" : "solid"}`, _class)} />
	</div>
{/if}
