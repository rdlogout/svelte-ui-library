<script lang="ts">
	import { twMerge } from "tailwind-merge";

	interface UploadedFile {
		data: File;
		preview: string;
	}

	let _class: string = "";
	export let onChange: (files: UploadedFile[]) => void = () => {};
	export let files: UploadedFile[] = [];
	export let accept: string = "*/*";
	export let id: string = "file-upload" + Math.random().toString(36).substring(7);
	export let multiple: boolean = false;
	export let disabled: boolean = false;
	export let name: string = "";

	export let variant: "outline" | "filled" | "unstyled" = "outline";

	export let title: string = "";
	export let subtitle: string = "";
	export let icon: string = "";

	const handleFileChange = (event: any) => {
		let newFiles = [...Array.from(event.target.files)].map((s) => ({
			preview: URL.createObjectURL(s),
			file: s,
		}));
		if (multiple) files = [...files, ...newFiles];
		else files = newFiles;
		onChange?.(files);
	};
</script>

<input {multiple} {accept} {id} type="file" class="hidden" on:change={handleFileChange} />

<label
	for={id}
	class={twMerge(
		"cursor-pointer flex-col flex items-center justify-center w-full",
		variant === "outline" && "border border-gray-200",
		variant === "filled" && "bg-[#f8f9fb]",
		variant === "unstyled" && "border-0 bg-transparent",
		_class
	)}
>
	{#if files.length === 0 || !$$slots.preview}
		{#if icon}
			<i class={twMerge("text-[#888] center", icon)} />
		{/if}
		<h4 class:hidden={!title} class="text-center">{title}</h4>
		<p class:hidden={!subtitle} class="text-center">{subtitle}</p>

		<slot {files} />
	{:else}
		<slot name="preview" {files} />
	{/if}
</label>
