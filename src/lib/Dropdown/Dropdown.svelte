<script lang="ts">
	import { createDropdownMenu, melt, type FloatingConfig } from "@melt-ui/svelte";
	import { twMerge } from "tailwind-merge";
	export let triggerClass: string;
	export let position: FloatingConfig = "bottom";

	export let onOpenChange: (open: boolean) => void;
	export let portal: boolean = false;
	export let closeOnOutsideClick: boolean = true;
	let _class: string;
	export { _class as class };

	const {
		elements: { menu, item, trigger, arrow },
	} = createDropdownMenu({
		portal,
		closeOnOutsideClick,
		onOpenChange,
		positioning: position,
	});
</script>

<button use:melt={$trigger} class={twMerge(triggerClass)}>
	<slot name="trigger" />
</button>
<div class={twMerge("bg-white shadow w-fit", _class)} use:melt={$menu}>
	<slot />

	<div>...</div>
	<div use:melt={$item}>...</div>
	<div use:melt={$item}>...</div>
	<div use:melt={$arrow} />
</div>
