<script lang="ts">
	import type { Width } from "$ts/style";
	import InputWrapper from "./InputWrapper.svelte";

	interface Props {
		label: string;
		value?: string;
		name: string;
		id?: string;
		error?: string;
		placeholder?: string;
		rows?: number;
		maxlength?: number;
		width?: Width;
		required?: boolean;
		disabled?: boolean;
		actionAttributes?: Record<string, unknown>;
	}

	let {
		value,
		placeholder,
		name,
		id,
		label,
		error,
		width,
		rows = 8,
		maxlength,
		required = false,
		disabled = false,
		actionAttributes
	}: Props = $props();

	let fieldId = $derived(id ?? name);
	let errorId = $derived(`${fieldId}-error`);
</script>

<InputWrapper {label} id={fieldId} {error} {width} {required}>
	<textarea
		id={fieldId}
		class="textarea"
		bind:value
		{placeholder}
		{name}
		{rows}
		{maxlength}
		{required}
		{disabled}
		aria-invalid={error ? "true" : undefined}
		aria-describedby={error ? errorId : undefined}
		{...actionAttributes}
	></textarea>
</InputWrapper>

<style lang="scss">
	.textarea {
		@include basic-input;
	}
</style>
