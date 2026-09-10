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

{#if intro_markdown}
	<Container element="section" id="project-introduction" spacing="section">
		<ImageText
			image={populatedMedia(project?.images?.[1])}
			text={intro_markdown}
			widerSide="right"
			smallColumn="50%"
			imageSide="right"
			titleProps={{ title: "Introduction", tag: "h2", eyebrow: "01", accent: "primary" }}
		/>
	</Container>
{/if}

<ProjectChallengeOutcome challenge={business_challenge} outcome={outcomes[0]} tone="secondary" />

<ProjectTechnology technologies={metadata?.technologies} markdown={tech_stack_markdown} />

{#if implementation_markdown}
	<Container element="section" id="project-implementation" spacing="section" bleed tone="accent-3">
		<ImageText
			image={populatedMedia(project?.images?.[2])}
			text={implementation_markdown}
			widerSide="left"
			smallColumn="50%"
			imageSide="left"
			leadParagraph
			titleProps={{
				title: "Key Implementation Details",
				tag: "h2",
				eyebrow: "04",
				accent: "accent-3"
			}}
		/>
	</Container>
{/if}

<ProjectContribution highlights={contributionHighlights} />

<ProjectOutcome outcomes={outcomes.slice(1)} markdown={outcome_markdown} tone="accent-2" />
