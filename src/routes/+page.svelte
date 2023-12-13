<script>
	import Dropdown from "$lib/Dropdown/Dropdown.svelte";
	import Input from "$lib/Form/Input.svelte";
	import Drawer from "$lib/Modal/Drawer.svelte";
	import Modal from "$lib/Modal/Modal.svelte";
	import PinInput from "$lib/Form/PinInput.svelte";
	import LinkPreview from "$lib/Utilities/LinkPreview.svelte";
	import Sheet from "$lib/Modal/Sheet.svelte";
	// import { Carousel } from "@logoutrd/svelte";
	let open = false;
</script>

<div class="p-10">
	<h1>Welcome to your library project</h1>
	<p>Create your package using @sveltejs/package and preview/showcase your work with SvelteKit</p>
	<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>

	<Sheet parent outerContainerClass="bg-red-100" title="Update Location" queryKey="name">
		<button slot="trigger" let:trigger class="w-full sm:w-fit rounded-full px-5" on:click={trigger}> Open </button>
		<Sheet outerContainerClass="bg-yellow-500 " title="Update Location" queryKey="name">
			<button slot="trigger" let:trigger class="w-full sm:w-fit rounded-full px-5" on:click={trigger}> Open2 </button>
		</Sheet>
	</Sheet>
	<Dropdown closeOnSelect>Ok</Dropdown>
</div>
