<script>
	import Carousel from "$lib/Carousel/Carousel.svelte";
	import Input from "$lib/Form/Input.svelte";
	import Drawer from "$lib/Modal/Drawer.svelte";
	import Modal from "$lib/Modal/Modal.svelte";
	import LinkPreview from "$lib/Utilities/LinkPreview.svelte";
	// import { Carousel } from "@logoutrd/svelte";
</script>

<div class="p-10">
	<h1>Welcome to your library project</h1>
	<p>Create your package using @sveltejs/package and preview/showcase your work with SvelteKit</p>
	<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>
	<Modal queryKey="name" drawer>
		<p slot="trigger">Sue</p>
	</Modal>
</div>
