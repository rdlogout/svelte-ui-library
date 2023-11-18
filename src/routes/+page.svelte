<script>
	import Dropdown from "$lib/Dropdown/Dropdown.svelte";
	import Input from "$lib/Form/Input.svelte";
	import Ratings from "$lib/Utilities/Ratings.svelte";
	import LinkPreview from "$lib/Utilities/LinkPreview.svelte";
	// import { Carousel } from "@logoutrd/svelte";
</script>

<div class="p-10">
	<h1>Welcome to your library project</h1>
	<p>Create your package using @sveltejs/package and preview/showcase your work with SvelteKit</p>
	<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>
	<Input min={80} type="textarea" size="lg" label="Budget" variant="inline" placeholder="Your Expected Budget" />
	<Dropdown>
		<p slot="trigger" class="text-gray-500 hover:text-gray-600 dark:text-gray-400 dark:hover:text-gray-300">Ok</p></Dropdown
	>
</div>
