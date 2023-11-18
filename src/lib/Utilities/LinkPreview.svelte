<script lang="ts">
	import { createLinkPreview, melt } from "@melt-ui/svelte";
	const {
		elements: { trigger, content, arrow },
	} = createLinkPreview({
		defaultOpen: true,
	});
</script>

<div use:melt={$content}>
	<div>I am content inside the link preview</div>
	<div use:melt={$arrow} />
</div>
<a class="trigger" href="https://github.com/melt-ui/melt-ui" target="_blank" rel="noopener noreferrer" use:melt={$trigger}>
	<img src="/logo_mark.svg" alt="Melt UI Logo" class="h-full w-full rounded-full bg-neutral-900 object-contain p-1" />
	<span class="sr-only">Open Melt UI Details</span>
</a>
