<script lang="ts">
	import type { Width } from "$ts/style";
	import type { HTMLInputAttributes, HTMLInputTypeAttribute } from "svelte/elements";
	import InputWrapper from "./InputWrapper.svelte";

	interface Props {
		label: string;
		value?: string;
		name: string;
		id?: string;
		type?: HTMLInputTypeAttribute;
		error?: string;
		placeholder?: string;
		maxlength?: number;
		width?: Width;
		required?: boolean;
		disabled?: boolean;
		actionAttributes?: HTMLInputAttributes;
	}

	let {
		value,
		placeholder,
		name,
		id,
		label,
		error,
		width,
		maxlength,
		type = "text",
		actionAttributes,
		required = false,
		disabled = false
	}: Props = $props();

	let fieldId = $derived(id ?? name);
	let errorId = $derived(`${fieldId}-error`);
</script>

<InputWrapper {label} id={fieldId} {error} {width} {required}>
	<input
		id={fieldId}
		{type}
		class="input"
		bind:value
		{placeholder}
		{name}
		{maxlength}
		{required}
		{disabled}
		aria-invalid={error ? "true" : undefined}
		aria-describedby={error ? errorId : undefined}
		{...actionAttributes}
	/>
</InputWrapper>

<style lang="scss">
	.input {
		@include basic-input;
	}
</style>
