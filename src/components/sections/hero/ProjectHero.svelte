<script lang="ts">
	import type { Project } from "$lib/cms/payload";

	interface Props {
		project: Project;
	}

	let { project }: Props = $props();

	let { title, description, liveLink, snapshotLink, githubLink } = $derived(project);
</script>

<section class="text-image-hero">
	<div class="column-1">
		<h1 class="title">
			{title}
		</h1>
		{#if description}
			<p class="description">{description}</p>
		{/if}
		<!-- <p class="overview"></p> -->
		{#if liveLink}
			<a class="live-link" href={liveLink}>Visit live site</a>
		{/if}
		{#if snapshotLink}
			<a class="snapshot-link" href={snapshotLink}>View snapshot</a>
		{/if}
		{#if githubLink}
			<a class="github-link" href={githubLink}>View on GitHub</a>
		{/if}
	</div>
	<div class="column-2"></div>
</section>
