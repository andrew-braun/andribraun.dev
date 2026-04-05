<script lang="ts">
	import type { Snippet } from "svelte";

	interface Props {
		items: any[];
		cellSnippet: Snippet<[any, number]>;
	}

	let { items, cellSnippet }: Props = $props();
</script>

<div class="bento-grid">
	{#each items as item, index (index)}
		<div class="cell">
			{@render cellSnippet(item, index)}
		</div>
	{/each}
</div>

<style lang="scss">
	.bento-grid {
		display: grid;
		grid-template-columns: repeat(12, 1fr);
		grid-auto-rows: 50px;
		gap: var(--space-sm);

		@media (max-width: $breakpoint-md) {
			grid-template-columns: 1fr 1fr 1fr;
		}

		@media (max-width: $breakpoint-sm) {
			grid-template-columns: 1fr 1fr;
		}

		@media (max-width: $breakpoint-xs) {
			grid-template-columns: 1fr;
		}

		.cell {
			grid-row: span 5;
			grid-column: span 4;

			&:nth-of-type(1) {
				grid-row: span 8;
				grid-column: span 6;

				@media (max-width: $breakpoint-md) {
					grid-column: span 2;
				}

				@media (max-width: $breakpoint-xs) {
					grid-column: span 1;
				}
			}

			&:nth-of-type(2),
			&:nth-of-type(3) {
				grid-row: span 3;
				grid-column: span 3;

				@media (max-width: $breakpoint-md) {
					grid-column: span 1;
				}
			}

			&:nth-of-type(4) {
				grid-column: span 6;

				@media (max-width: $breakpoint-md) {
					grid-column: span 1;
				}
			}

			@media (max-width: $breakpoint-md) {
				grid-column: span 1;
			}
		}
	}
</style>
