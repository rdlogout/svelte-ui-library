<script lang="ts">
	import { twMerge } from "tailwind-merge";

	let timeout: any;

	export let debounce: number = 0;
	export let id: string;
	export let min: number;
	export let max: number;
	export let step: number;
	export let icon: string;

	export let required: boolean = true;
	export let disabled: boolean = false;
	export let name: string;
	export let placeholder: string;
	export let type: "text" | "number" | "email" | "password" | "search" | "tel" | "url" | "datetime-local" | "date" | "textarea" | "select" = "text";
	export let variant: "outline" | "filled" | "unstyled" | "inline" = "outline";
	export let size: "xs" | "sm" | "md" | "lg" | "xl" = variant === "inline" ? "lg" : "md";

	export let value: string = "";

	export let outerClass: string;
	export let containerClass: string;
	export let labelClass: string;
	let _class: string = "";
	let _label: string = "";
	export { _class as class, _label as label };
	export let onChange: (value: string) => void;

	const onInput = (e: any) => {
		value = e.target.value;
		clearTimeout(timeout);
		timeout = setTimeout(() => {
			if (onChange) onChange(value);
		}, debounce);
	};
</script>

<div class={twMerge("flex flex-col gap-2 mb-4", outerClass)}>
	{#if variant !== "inline"}
		<div class="flex justify-between items-center">
			<label class:hidden={!_label} for={id} class={twMerge("text-base text-[#777] font-medium ms-0.5", labelClass)}>{_label}</label>
			<slot name="label-right" />
		</div>
	{/if}

	<div
		class={twMerge(
			"flex items-center gap-3  px-3 flex-1 rounded-md",
			size === "xs" ? "p-1.5" : size === "sm" ? "p-2" : size === "md" ? "p-2.5" : size === "lg" ? "p-3" : size === "xl" ? "p-3.5" : "p-2.5",
			variant === "filled" ? "bg-[#f8f9fb]" : variant === "outline" ? "border border-gray-200" : variant === "unstyled" ? "px-0" : "shadow-sm bg-white border-b-2 border-gray-50 rounded-sm",
			type === "textarea" ? "items-start" : "",
			containerClass
		)}
	>
		{#if icon}
			<i class={twMerge("text-[#888] center", icon)} />
		{/if}
		{#if _label && variant === "inline"}
			<label class:hidden={!_label} for={id} class={twMerge("text-base text-[#999] mt-0.5", labelClass)}>{_label}</label>
		{/if}

		<slot name="left" />

		{#if type === "select"}
			<svelte:element
				this={"select"}
				class={twMerge(
					"bg-transparent !border-0 !outline-none !shadow-none flex-1 !ring-0 text-base px-2 leading-none py-0 text-[#777]",
					size === "xs" ? "text-xs" : size === "sm" ? "text-sm" : size === "md" ? "text-base" : size === "lg" ? "text-md" : size === "xl" ? "text-lg" : "text-base",
					_class
				)}
				{value}
				on:input={onInput}
				on:change={onInput}
				{id}
				{name}
				{placeholder}
				{required}
				{disabled}
			>
				<slot />
			</svelte:element>
		{:else}
			<svelte:element
				this={type === "textarea" ? "textarea" : "input"}
				class={twMerge(
					"bg-transparent !border-0 !outline-none !shadow-none flex-1 !ring-0 text-base px-2 leading-none py-0 text-[#777]",
					size === "xs" ? "text-xs" : size === "sm" ? "text-sm" : size === "md" ? "text-base" : size === "lg" ? "text-md" : size === "xl" ? "text-lg" : "text-base",
					_class
				)}
				{value}
				on:input={onInput}
				on:change={onInput}
				{id}
				{name}
				{placeholder}
				{type}
				{min}
				{required}
				{disabled}
				{step}
				{max}
			/>
		{/if}

		{#if $$slots.right}
			<slot name="right" />
		{/if}
	</div>
	{#if min && value?.length < min}
		<p class="text-xs text-gray-500 ms-auto">
			Need
			<span class="text-red-500">
				{min - value.length}
			</span>
			characters at least more
		</p>
	{/if}
</div>
