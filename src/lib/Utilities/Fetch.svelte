<script lang="ts">
	import { browser } from "$app/environment";
	import { twMerge } from "tailwind-merge";

	export let url: string = "";
	export let data: any = undefined;
	export let loading: boolean = false;
	export let loadingClass: string = "";
	const fetchData = () => {
		loading = true;
		fetch(url)
			.then((res) => res.json())
			.then((_) => (data = _))
			.catch((err) => {
				console.log(err);
				data = null;
			})
			.finally(() => (loading = false));
	};

	$: browser && !loading && data === undefined && fetchData();
</script>

{#if data}
	<slot {data} {fetchData} />
{/if}

{#if loading}
	<slot name="loading">
		<div
			class={twMerge("animate-spin inline-block w-8 h-8 border-[3px] border-current border-t-transparent text-yellow-600 rounded-full text-center", loadingClass)}
			role="status"
			aria-label="loading"
		>
			<span class="sr-only">Loading...</span>
		</div>
	</slot>
{/if}
