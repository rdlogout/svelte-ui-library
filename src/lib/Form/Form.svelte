<script lang="ts">
	import { twMerge } from "tailwind-merge";
	let _class, _invalidate, _apply;

	export { _class as class, _invalidate as invalidate, _apply as apply };

	export let disabled: boolean = false;

	export let onSubmit: any;
	export let onSuccess: any;
	export let onFailure: any;

	export let form: HTMLFormElement;

	export let dataType: "form" | "json" = "form";
	export let action: string;
	export let method: "GET" | "POST" | "PUT" | "DELETE" = "POST";

	const triggerSubmit = () => {};
</script>

<form class={twMerge("relative", _class)} enctype="multipart/form-data" {action} {method} {disabled} bind:this={form} on:submit|preventDefault={triggerSubmit}>
	<slot />

	{#if dataType === "json"}
		<input type="hidden" name="_json" value="true" />
	{/if}
</form>
