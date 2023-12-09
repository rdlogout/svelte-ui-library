<script lang="ts">
	import { createPinInput, melt } from "@melt-ui/svelte";
	import { twMerge } from "tailwind-merge";
	export let placeholder: string = "*";
	export let length: number = 5;
	export let masked: boolean = false;
	export let type: "text" | "number" = "number";
	export let defaultValue: string[] = [];
	export let value: string[] = [];
	export let name: string | undefined = undefined;
	let _class: string = "";
	export let containerClass: string = "";
	export { _class as class };
	export let onComplete: (value: string) => void = () => {};
	const handleValueChange = (vals: any): string[] => {
		const _value = vals.next.join("");
		if (_value.length === length) {
			onComplete(_value);
			console.log(_value);
		}

		value = _value;
		return vals.next;
	};

	const {
		elements: { root, input },
	} = createPinInput({
		placeholder,
		type: masked ? "password" : "text",
		defaultValue,
		onValueChange: handleValueChange,
	});
</script>

<div {...$root} use:root class={twMerge("flex items-center gap-2", containerClass)}>
	{#each Array.from({ length }) as _}
		<input class={twMerge("rounded-md bg-white text-center text-lg text-magnum-900 shadow-sm  ", _class)} {...$input()} use:input {type} />
	{/each}
</div>

<input hidden {name} {value} />
