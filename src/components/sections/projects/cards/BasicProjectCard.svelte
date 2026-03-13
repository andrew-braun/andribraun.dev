<script lang="ts">
	import type { Project } from "$lib/cms/payload";
	import type { ColorVariant } from "$root/src/ts/style";

	interface Props {
		project: Project;
		color?: ColorVariant;
	}

	let { project, color = "primary" }: Props = $props();
	// svelte-ignore state_referenced_locally
	let { title, description, metadata, liveLink } = project;
	let technologies =
		metadata?.technologies?.filter(
			(technology) => typeof technology !== "number" && technology.hasOwnProperty("name")
		) ?? [];
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
					{#each technologies.slice(0, 5) as tech}
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

<style lang="scss">
	.card {
		display: block;
		height: 100%;
		border-radius: var(--border-radius-lg);
		text-decoration: none;
		color: var(--color-text);
		overflow: hidden;
		transition: var(--transition-md);

		&--primary {
			background-color: var(--color-primary);
			color: var(--color-primary-text);
			&:hover {
				filter: brightness(1.1);
			}
		}
		&--secondary {
			background-color: var(--color-secondary);
			color: var(--color-secondary-text);
			&:hover {
				filter: brightness(1.1);
			}
		}
		&--accent-1 {
			background-color: var(--color-accent-1);
			color: var(--color-accent-1-text);
			&:hover {
				background-color: var(--color-accent-1);
				filter: brightness(1.1);
			}
		}
		&--accent-2 {
			background-color: var(--color-accent-2);
			color: var(--color-accent-2-text);
			&:hover {
				background-color: var(--color-accent-2);
				filter: brightness(1.1);
			}
		}
		&--accent-3 {
			background-color: var(--color-accent-3);
			color: var(--color-accent-3-text);
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
		height: 100%;
		padding: var(--spacing-lg);
		gap: var(--spacing-sm);

		.title {
			margin: 0;
			font-size: var(--font-size-h4);
			font-weight: 700;
			line-height: 1.2;
		}

		.description {
			margin: 0;
			font-size: var(--font-size-sm);
			line-height: 1.6;
			flex: 1;
			opacity: 0.8;
		}
	}

	.footer {
		display: flex;
		align-items: flex-end;
		justify-content: space-between;
		gap: var(--spacing-sm);
		margin-top: auto;
	}

	.tech-pills {
		display: flex;
		flex-wrap: wrap;
		gap: var(--spacing-xs);
		list-style: none;
		margin: 0;
		padding: 0;

		.pill {
			font-size: var(--font-size-xs);
			padding: 2px var(--spacing-sm);
			border-radius: var(--border-radius-xl);
			background-color: color-mix(in srgb, currentColor 12%, transparent);
			border: 1px solid color-mix(in srgb, currentColor 20%, transparent);
			white-space: nowrap;
		}
	}

	.arrow {
		font-size: var(--font-size-lg);
		opacity: 0;
		transform: translateX(-8px);
		transition:
			opacity var(--transition-md),
			transform var(--transition-md);
		flex-shrink: 0;
		line-height: 1;
	}
</style>
