<script lang="ts">
	import { twMerge } from "tailwind-merge";

	let _class: string = "";

	export { _class as class };
</script>

<div class={twMerge("hs-accordion w-full", _class)}>
	<slot />
</div>
