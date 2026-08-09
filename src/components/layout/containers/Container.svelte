<script lang="ts">
	let { children } = $props();
</script>

<div class="container">
	{@render children()}
</div>

<style lang="scss">
	.container {
		max-width: var(--site-max-width);
		padding: var(--space-lg);

		@media (max-width: $breakpoint-sm) {
			padding: var(--space-md);
		}
	}
</style>
