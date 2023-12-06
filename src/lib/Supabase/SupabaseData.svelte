<script lang="ts">
	import { onMount } from "svelte";
	import { page } from "$app/stores";
	import supabase from "./supabase.js";

	export let loading: boolean = true;
	export let ssr: boolean = false;
	export let table: string;
	export let select: string = "*";
	export let limit: number = 20;
	export let maybeSingle: boolean = false;
	export let baseFilters: any[] = [];
	export let filters: any[] = [];

	export let data: any;

	const fetchData = async () => {
		loading = true;

		let query = $page.data.supabase.from(table).select(select);

		if (baseFilters) query = supabase.applyFilters(query, baseFilters);
		if (filters) query = supabase.applyFilters(query, filters);

		if (maybeSingle) query = query.maybeSingle();

		if (limit) query = query.limit(limit);

		const { data: respData, error } = await query;
		loading = false;

		if (error) console.error(error);
		data = respData;
	};

	if (ssr) fetchData();

	onMount(() => {
		if (!ssr) fetchData();
	});
</script>

{#if data}
	<slot {data} />
{/if}

{#if loading}
	loading
{/if}
