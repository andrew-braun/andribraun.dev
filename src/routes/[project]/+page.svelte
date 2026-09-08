<script lang="ts">
	import ImageText from "$components/layout/columns/ImageText.svelte";
	import Container from "$components/layout/containers/Container.svelte";
	import ProjectHero from "$components/sections/hero/ProjectHero.svelte";
	import ProjectChallengeOutcome from "$components/sections/projects/ProjectChallengeOutcome.svelte";
	import ProjectContext from "$components/sections/projects/ProjectContext.svelte";
	import ProjectContribution from "$components/sections/projects/ProjectContribution.svelte";
	import ProjectOutcome from "$components/sections/projects/ProjectOutcome.svelte";
	import ProjectTechnology from "$components/sections/projects/ProjectTechnology.svelte";
	import { populatedMedia } from "$lib/cms/media";

	let { data } = $props();
	const { project } = $derived(data);
	const {
		business_challenge,
		intro_markdown,
		tech_stack_markdown,
		implementation_markdown,
		outcome_markdown
	} = $derived(project);
	const contributionHighlights = $derived(project.contribution_highlights ?? []);
	const outcomes = $derived(project.outcomes ?? []);
	const { metadata } = $derived(project);
</script>

<ProjectHero {project} />
<ProjectContext clientName={project.client_name} status={project.status} />

<Container>
	<div class="project-overview">
		{#if intro_markdown}
			<section id="project-introduction">
				<ImageText
					image={populatedMedia(project?.images?.[1])}
					text={intro_markdown}
					widerSide="right"
					smallColumn="50%"
					imageSide="right"
					titleProps={{ title: "Introduction", tag: "h2" }}
				/>
			</section>
		{/if}

		<ProjectChallengeOutcome challenge={business_challenge} outcome={outcomes[0]} />

		<ProjectTechnology technologies={metadata?.technologies} markdown={tech_stack_markdown} />

		{#if implementation_markdown}
			<section id="project-implementation">
				<ImageText
					image={populatedMedia(project?.images?.[2])}
					text={implementation_markdown}
					widerSide="left"
					smallColumn="50%"
					imageSide="left"
					titleProps={{ title: "Key Implementation Details", tag: "h2" }}
				/>
			</section>
		{/if}

		<ProjectContribution highlights={contributionHighlights} />

		<ProjectOutcome outcomes={outcomes.slice(1)} markdown={outcome_markdown} />
	</div>
</Container>

<style lang="scss">
	.project-overview {
		display: flex;
		flex-direction: column;
		gap: calc(var(--spacing-vertical-section) * 2);
	}
</style>
