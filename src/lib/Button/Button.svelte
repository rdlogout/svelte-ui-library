<script lang="ts">
	export let href;
	export let disabled;
	export let loading;
	export let SubmitEvent;
	export let onClick;
	export let variant: "solid" | "outline" | "ghost" | "soft" | "link" = "solid";
	export let size: "xs" | "sm" | "md" | "lg" | "xl" = "md";
	export let color: "primary" | "secondary" | "success" | "danger" | "warning" | "info" | "light" | "dark" | "link" = "primary";
	let _class;

	export { _class as class };
</script>

<button
	type="button"
	class="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
>
	Solid
</button>
