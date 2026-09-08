<script lang="ts">
	import TwoColumn from "$components/layout/columns/TwoColumn.svelte";
	import Markdown from "$components/text/Markdown.svelte";
	import Title from "$components/text/Title.svelte";
	import Tag from "$components/ui/content/Tag.svelte";
	import type { Technology } from "$lib/cms/payload-types";
	import { assignColor } from "$styles/variables";

	interface Props {
		technologies?: (number | Technology)[] | null | undefined;
		markdown?: string | null | undefined;
	}

	let { technologies, markdown }: Props = $props();

	// Display order doubles as assignment order. `tool` sits last on purpose: 112 of the 181
	// CMS records carry it, so ranking it below every sharper category sends Vite to Frontend
	// and pnpm to DevOps instead of collapsing both into one bin.
	const CATEGORY_ORDER = [
		["frontend", "Frontend"],
		["framework", "Framework"],
		["language", "Language"],
		["backend", "Backend"],
		["cms", "CMS"],
		["database", "Database"],
		["devops", "DevOps"],
		["design", "Design"],
		["tool", "Tooling"]
	] as const;

	const assigned = $derived.by(() => {
		const entries: { name: string; key: string }[] = [];

		for (const technology of technologies ?? []) {
			if (typeof technology !== "object") continue;

			const name = technology.name?.trim();
			// The CMS holds a few duplicate records under one name; show each name once.
			if (!name || entries.some((entry) => entry.name === name)) continue;

			entries.push({
				name,
				key: CATEGORY_ORDER.find(([value]) => technology.category?.includes(value))?.[0] ?? "other"
			});
		}

		return entries;
	});

	// A technology with no recognised category surfaces under Other rather than vanishing.
	const groups = $derived(
		[...CATEGORY_ORDER, ["other", "Other"] as const]
			.map(([key, label]) => ({
				key,
				label,
				names: assigned.filter((entry) => entry.key === key).map((entry) => entry.name)
			}))
			.filter((group) => group.names.length)
	);

	const narrative = $derived(markdown?.trim());
</script>

{#snippet index()}
	<div class="technology-index">
		{#each groups as group, groupIndex (group.key)}
			<div class={["group", assignColor(groupIndex)]}>
				<h3 class="label">{group.label}</h3>
				<ul class="names">
					{#each group.names as name (name)}
						<li><Tag text={name} color={assignColor(groupIndex)} /></li>
					{/each}
				</ul>
			</div>
		{/each}
	</div>
{/snippet}

{#snippet narrativeText()}
	{#if narrative}
		<Markdown text={narrative} />
	{/if}
{/snippet}

{#if groups.length || narrative}
	<section id="project-technologies">
		<Title title="Tech Stack" tag="h2" />
		<TwoColumn
			smallColumn="40%"
			widerSide="right"
			leftContent={index}
			rightContent={narrativeText}
		/>
	</section>
{/if}

<style lang="scss">
	.technology-index {
		display: flex;
		flex-direction: column;
		gap: var(--space-lg);

		.group {
			&.primary {
				--group-accent: var(--color-primary);
			}

			&.secondary {
				--group-accent: var(--color-secondary);
			}

			&.accent-1 {
				--group-accent: var(--color-accent-1);
			}

			&.accent-2 {
				--group-accent: var(--color-accent-2);
			}

			&.accent-3 {
				--group-accent: var(--color-accent-3);
			}

			.label {
				margin: 0 0 var(--space-sm);
				font-size: var(--font-size-sm);
				font-weight: var(--font-weight-bold);
				color: var(--group-accent);
				text-transform: uppercase;
				letter-spacing: 0.05em;
			}

			.names {
				display: flex;
				flex-wrap: wrap;
				gap: var(--space-sm);
				padding: 0;
				margin: 0;
				list-style: none;

				li {
					margin: 0;
				}
			}
		}

		@media (max-width: $breakpoint-sm) {
			gap: var(--space-md);
		}
	}
</style>
