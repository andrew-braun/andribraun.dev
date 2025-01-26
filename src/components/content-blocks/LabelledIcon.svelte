<script lang="ts">
	import type { Component } from "svelte";

	interface LabelledIconProps {
		Icon: Component;
		label: string;
	}

	let { Icon, label }: LabelledIconProps = $props();
</script>

<div class="labelled-icon">
	<Icon class="icon" width="4em" height="4em" />
	<span class="label">{label}</span>
</div>

<style lang="scss">
	.labelled-icon {
		display: flex;
		flex-direction: column;
		align-items: center;

		.label {
			margin-top: var(--spacing-xs);
			font-weight: 600;
		}
	}
</style>
