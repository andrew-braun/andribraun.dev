<script lang="ts">
	/* eslint-disable svelte/no-at-html-tags */

	import TextArea from "$components/forms/components/TextArea.svelte";
	import TextInput from "$components/forms/components/TextInput.svelte";
	import Button from "$components/ui/buttons/Button.svelte";
	import type { FormPhase } from "$ts/forms";
	import { scrollTo } from "$utils/ui/scroll";

	import { tick } from "svelte";
	import { fade, slide } from "svelte/transition";
	import { contactForm } from "./contact.remote";
	import { contactFormSchema } from "./contact.schema";

	let { formPhase = $bindable("idle") }: { formPhase?: FormPhase } = $props();
	let submitAttempted = $state(false);
	let displaySuccessDialog = $state(false);
	let submissionError = $state<string | null>(null);
	let validationErrorElement = $state<HTMLElement | null>(null);
	let submissionErrorElement = $state<HTMLElement | null>(null);
	let successElement = $state<HTMLElement | null>(null);

	let errorState = $derived({
		hasError: Boolean(contactForm.fields?.allIssues()?.length),
		errorMessages:
			contactForm.fields
				?.allIssues()
				?.map((issue: { message: string }) => issue.message)
				?.filter((message: string) => message !== "Invalid input") || [],
		fieldErrors: {
			name:
				contactForm.fields.name.issues()?.map((issue: { message: string }) => issue.message) || [],
			email:
				contactForm.fields.email.issues()?.map((issue: { message: string }) => issue.message) || [],
			message:
				contactForm.fields.message.issues()?.map((issue: { message: string }) => issue.message) ||
				[]
		}
	});

	let canSubmit = $derived(formPhase === "idle" || (formPhase === "error" && !errorState.hasError));

	let formElement = $state<HTMLFormElement | null>(null);

	function handleKeydown(event: KeyboardEvent) {
		if (event.ctrlKey && event.key === "Enter") {
			if (canSubmit) {
				event.preventDefault();
				(event.currentTarget as HTMLFormElement).requestSubmit();
			}
		}
	}

	async function enhancedSubmit({ submit }: { submit: () => Promise<boolean> }) {
		try {
			submitAttempted = true;
			submissionError = null;
			formPhase = "submitting";

			const succeeded = await submit();

			if (!succeeded) {
				formPhase = "error";
				await tick();
				validationErrorElement?.focus();
				return;
			}

			formElement?.reset();
			displaySuccessDialog = true;
			formPhase = "launching";
			await tick();
			successElement?.focus();
		} catch (error) {
			console.error("Error submitting form:", error);
			submissionError =
				"Houston, we have a problem: your message failed to launch! Please try again, or email andri@andribraun.dev.";
			formPhase = "error";
			await tick();
			submissionErrorElement?.focus();
		}
	}

	function handleFormReset() {
		formPhase = "idle";
		submitAttempted = false;
		displaySuccessDialog = false;
		submissionError = null;
		formElement?.reset();
	}
</script>

<div class="form-container">
	<form
		bind:this={formElement}
		class:form-hidden={displaySuccessDialog}
		class="contact-form"
		aria-hidden={displaySuccessDialog}
		inert={displaySuccessDialog}
		{...contactForm.preflight(contactFormSchema).enhance(enhancedSubmit)}
		onchange={() => contactForm.validate()}
		onkeydown={handleKeydown}
	>
		{#if errorState.hasError && submitAttempted}
			<div
				bind:this={validationErrorElement}
				class="form-error"
				role="alert"
				tabindex="-1"
				{@attach (el) => scrollTo(el, { behavior: "smooth", block: "center" })}
				transition:slide={{ duration: 300 }}
			>
				{@html errorState.errorMessages.join("<br>")}
			</div>
		{/if}
		{#if submissionError}
			<div
				bind:this={submissionErrorElement}
				class="form-error"
				role="alert"
				tabindex="-1"
				transition:slide={{ duration: 300 }}
			>
				<p>{submissionError}</p>
				<a href="mailto:andri@andribraun.dev">Email Andri directly</a>
			</div>
		{/if}
		<TextInput
			id="contact-name"
			label="Name"
			name="name"
			maxlength={100}
			placeholder="What do I call you, stranger?"
			required={true}
			actionAttributes={contactForm.fields.name.as("text")}
			error={errorState.fieldErrors.name.join(", ")}
		/>
		<TextInput
			id="contact-email"
			label="Email"
			name="email"
			type="email"
			maxlength={254}
			placeholder="I reply within 48 hours or your pizza is free"
			required={true}
			actionAttributes={contactForm.fields.email.as("email")}
			error={errorState.fieldErrors.email.join(", ")}
		/>
		<TextArea
			id="contact-message"
			label="Message"
			name="message"
			maxlength={5000}
			placeholder="Well, here you are--just you, your keyboard, and this text area. This is where it all begins, so, go on... type that first letter."
			required={true}
			actionAttributes={contactForm.fields.message.as("text")}
			error={errorState.fieldErrors.message.join(", ")}
		/>
		<div class="honeypot" aria-hidden="true">
			<label for="contact-company">Company</label>
			<input
				id="contact-company"
				tabindex="-1"
				autocomplete="off"
				{...contactForm.fields.company.as("text")}
			/>
		</div>
		<div class="submit-button-wrapper">
			<Button
				type="submit"
				variant="outline"
				disabled={!canSubmit}
				loading={formPhase === "submitting"}>Launch Message</Button
			>
		</div>
	</form>

	{#if displaySuccessDialog}
		<div
			bind:this={successElement}
			class="success-state"
			role="status"
			aria-live="polite"
			tabindex="-1"
			transition:fade
		>
			<h2>Message Launched!</h2>
			<p>Thanks for reaching out! I'll get back to you within 48 hours.</p>
			<Button onclick={handleFormReset}>Send another message</Button>
		</div>
	{/if}
</div>

<style lang="scss">
	.form-container {
		position: relative;
		min-width: 280px;
		transition: transform 2s ease;

		.contact-form {
			position: relative;
			z-index: 5;
			display: flex;
			flex-direction: column;
			gap: var(--space-sm);
			opacity: 1;
			transition: opacity 300ms ease;

			&.form-hidden {
				pointer-events: none;
				opacity: 0;
			}

			.submit-button-wrapper {
				display: flex;
				justify-content: center;
			}

			.form-error {
				padding: var(--space-sm);
				margin-bottom: var(--space-sm);
				color: var(--color-error-text);
				background-color: var(--color-error);
				border-radius: var(--border-radius-md);
			}

			.honeypot {
				position: absolute;
				left: -10000px;
				width: 1px;
				height: 1px;
				overflow: hidden;
			}
		}

		.success-state {
			position: absolute;
			inset: 0;
			z-index: 10;
			display: flex;
			flex-direction: column;
			gap: var(--space-sm);
			align-items: center;
			justify-content: center;
			min-width: 280px;
			text-align: center;
		}
	}
</style>
