<script lang="ts">
	import type { Project, Technology } from "$lib/cms/payload";
	import type { ColorVariant } from "$root/src/ts/style";

	interface Props {
		project: Project;
		color?: ColorVariant;
	}

	let { project, color = "primary" }: Props = $props();
	// svelte-ignore state_referenced_locally
	let { title, description, metadata, liveLink } = project;
	let technologies: Technology[] = (metadata?.technologies?.filter(
		(technology): technology is Technology =>
			typeof technology !== "number" && Object.hasOwn(technology, "name")
	) ?? []) as Technology[];
</script>

<a class="card card--{color}" href={liveLink} target="_blank" rel="noopener noreferrer">
	<div class="card-content">
		<h3 class="title">{title}</h3>
		{#if description}
			<p class="description">{description}</p>
		{/if}
		<div class="footer">
			{#if technologies.length > 0}
				<ul class="tech-pills" aria-label="Technologies used">
					{#each technologies.slice(0, 5) as tech, i (i)}
						{#if typeof tech === "object" && tech.name}
							<li class="pill">{tech.name}</li>
						{/if}
					{/each}
				</ul>
			{/if}
			<span class="arrow" aria-hidden="true">→</span>
		</div>
	</div>
</a>

<style lang="scss" scoped>
	.card {
		display: block;
		height: 100%;
		overflow: hidden;
		color: var(--color-text);
		text-decoration: none;
		border-radius: var(--border-radius-lg);
		transition: var(--transition-md);

		&--primary {
			color: var(--color-primary-fg);
			background-color: var(--color-primary);

			&:hover {
				filter: brightness(1.1);
			}
		}

		&--secondary {
			color: var(--color-secondary-fg);
			background-color: var(--color-secondary);

			&:hover {
				filter: brightness(1.1);
			}
		}

		&--accent-1 {
			color: var(--color-accent-1-fg);
			background-color: var(--color-accent-1);

			&:hover {
				background-color: var(--color-accent-1);
				filter: brightness(1.1);
			}
		}

		&--accent-2 {
			color: var(--color-accent-2-fg);
			background-color: var(--color-accent-2);

			&:hover {
				background-color: var(--color-accent-2);
				filter: brightness(1.1);
			}
		}

		&--accent-3 {
			color: var(--color-accent-3-fg);
			background-color: var(--color-accent-3);

			&:hover {
				background-color: var(--color-accent-3);
				filter: brightness(1.1);
			}
		}

		&:hover .arrow {
			opacity: 1;
			transform: translateX(0);
		}
	}

	.card-content {
		display: flex;
		flex-direction: column;
		gap: var(--space-sm);
		height: 100%;
		padding: var(--space-xl);

		.title {
			margin: 0;
			font-size: var(--font-size-h4);
			font-weight: 700;
			line-height: var(--line-height-tight);
		}

		.description {
			flex: 1;
			margin: 0;
			font-size: var(--font-size-sm);
			line-height: var(--line-height-relaxed);
			opacity: 0.8;
		}
	}

	.footer {
		display: flex;
		gap: var(--space-sm);
		align-items: flex-end;
		justify-content: space-between;
		margin-top: auto;
	}

	.tech-pills {
		display: flex;
		flex-wrap: wrap;
		gap: var(--space-xs);
		padding: 0;
		margin: 0;
		list-style: none;

		.pill {
			padding: 2px var(--space-sm);
			font-size: var(--font-size-xs);
			white-space: nowrap;
			background-color: color-mix(in srgb, currentcolor 12%, transparent);
			border: 1px solid color-mix(in srgb, currentcolor 20%, transparent);
			border-radius: var(--border-radius-xl);
		}
	}

	.arrow {
		flex-shrink: 0;
		font-size: var(--font-size-lg);
		line-height: var(--line-height-none);
		opacity: 0;
		transform: translateX(-8px);
		transition:
			opacity var(--transition-md),
			transform var(--transition-md);
	}
</style>
