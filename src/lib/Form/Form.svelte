<script lang="ts">
	import { twMerge } from "tailwind-merge";
	import form from "./form.js";
	import { goto, invalidateAll } from "$app/navigation";
	import { applyAction } from "$app/forms";
	let _class: string | undefined;

	let _invalidate: boolean = false,
		_apply: boolean = true;

	export { _class as class, _invalidate as invalidate, _apply as apply };
	export let silent: boolean = false;
	export let disabled: boolean = false;
	export let loading: boolean = false;
	export let onSubmit: any | undefined = null;
	export let onSuccess: any | undefined = null;
	export let onFailure: any | undefined = undefined;

	export let dataType: "form" | "json" = "form";
	export let action: string;
	export let method: "GET" | "POST" | "PUT" | "DELETE" = "POST";
	export let state: any = {};
	export let element: HTMLFormElement;

	const triggerSubmit = async (event = {} as any) => {
		if (loading) return;
		loading = true;
		if (event?.data) state = { ...state, ...event.data };

		const data = element ? new FormData(element) : new FormData();

		form.objectToFormData(state, data);
		const url = event?.url || action;

		loading = true;
		const { msg, ...result } = (await form.post(url, data, event.silent || silent, method)) as any;
		loading = false;

		if (!result.success) return onFailure?.(result);

		if (_invalidate) await invalidateAll();

		if (_apply) applyAction(result);

		if (result.redirect) goto(result.redirect);

		onSuccess?.(result);
	};
</script>

<form class={twMerge("relative", _class)} enctype="multipart/form-data" {action} {method} {disabled} bind:this={element} on:submit|preventDefault={triggerSubmit}>
	<slot />

	{#if dataType === "json"}
		<input type="hidden" name="_json" value="true" />
	{/if}
</form>
