<script lang="ts">
	import InputWrapper from "./InputWrapper.svelte";

	interface Props {
		label: string;
		value?: string;
		name: string;
		error?: string;
		placeholder?: string;
	}

	let { value, placeholder, name, label, error }: Props = $props();
</script>

<InputWrapper {label} {name} {error}>
	<input type="text" class="input" bind:value {placeholder} {name} />
</InputWrapper>

<style>
	.input {
		padding: var(--spacing-sm);
	}
</style>
