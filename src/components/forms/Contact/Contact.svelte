<script lang="ts">
	/* eslint-disable svelte/no-at-html-tags */

	import TextArea from "$components/forms/components/TextArea.svelte";
	import TextInput from "$components/forms/components/TextInput.svelte";
	import Button from "$components/ui/buttons/Button.svelte";
	import type { FormPhase } from "$root/src/ts/forms";
	import { scrollTo } from "$utils/ui/scroll";

	import { fade } from "svelte/transition";
	import { contactForm } from "./contact.remote";
	import { contactFormSchema } from "./contact.schema";

	let { formPhase = $bindable("idle") }: { formPhase?: FormPhase } = $props();
	let submitAttempted = $state(false);
	let displaySuccessDialog = $state(false);

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
			formPhase = "submitting";
			// errorState = {
			// 	hasError: false,
			// 	errorMessages: [],
			// 	fieldErrors: {
			// 		name: [],
			// 		email: [],
			// 		message: []
			// 	}
			// };

			const response = await submit();

			if (!response) {
				throw new Error(
					"Houston, we have a problem: your message failed to launch! Please try again or contact me via email at <a href='mailto:andri@andribraun.dev'>andri@andribraun.dev</a>"
				);
			}

			formPhase = "launching";
		} catch (error) {
			console.error("Error submitting form:", error);
			formPhase = "error";
			// errorState.errorMessages =
			// 	error instanceof Error
			// 		? [error.message]
			// 		: [
			// 				"Houston, we have a problem: your message failed to launch! Please try again or contact me via email at <a href='mailto:andri@andribraun.dev'>andri@andribraun.dev</a>"
			// 			];
		}
	}

	async function handleFormReset() {
		formPhase = "idle";
		submitAttempted = false;
		displaySuccessDialog = false;
	}

	function handleAnimationStart(event: AnimationEvent) {
		setTimeout(() => {
			formElement?.reset();

			if (event.animationName.endsWith("launch")) {
				displaySuccessDialog = true;
			}
		}, 2000);
	}

	function handleAnimationEnd(event: AnimationEvent) {
		console.log("Animation ended:", event.animationName);
		if (event.animationName.endsWith("launch")) {
			formPhase = "submitted";
		}
	}
</script>

<svelte:window onanimationend={handleAnimationEnd} onanimationstart={handleAnimationStart} />
<div class={["form-container", formPhase === "launching" ? "launching" : ""]}>
	{#if formPhase !== "submitted" && displaySuccessDialog === false}
		<form
			bind:this={formElement}
			class={["contact-form"]}
			{...contactForm.preflight(contactFormSchema).enhance(enhancedSubmit)}
			onchange={() => contactForm.validate()}
			onkeydown={handleKeydown}
			transition:fade
		>
			{#if errorState.hasError && submitAttempted}
				<div
					class="form-error"
					{@attach (el) => scrollTo(el, { behavior: "smooth", block: "center" })}
				>
					{@html errorState.errorMessages.join("<br>")}
				</div>
			{/if}
			<TextInput
				label="Name"
				name="name"
				placeholder="What do I call you, stranger?"
				required={true}
				actionAttributes={contactForm.fields.name.as("text")}
				error={errorState.fieldErrors.name.join(", ")}
			/>
			<TextInput
				label="Email"
				name="email"
				type="email"
				placeholder="I reply within 48 hours or your pizza is free"
				required={true}
				actionAttributes={contactForm.fields.email.as("email")}
				error={errorState.fieldErrors.email.join(", ")}
			/>
			<TextArea
				label="Message"
				name="message"
				placeholder="This is where the magic happens. Your hopes. Your dreams. Your secret family recipes. Or, you know, work stuff about projects. That's probably why you're here, now that I think about it. Either way, let's get this train rolling! The train has a dining car, though, so that family recipe could come in handy."
				required={true}
				actionAttributes={contactForm.fields.message.as("text")}
				error={errorState.fieldErrors.message.join(", ")}
			/>
			<div class="submit-button-wrapper">
				<Button
					type="submit"
					variant="outline"
					disabled={!canSubmit}
					loading={formPhase === "submitting"}>Launch Message</Button
				>
			</div>
		</form>
	{/if}

	{#if displaySuccessDialog}
		<div class={["success-state"]} transition:fade>
			<h2>Message Launched!</h2>
			<p>Thanks for reaching out! I'll get back to you within 48 hours.</p>
			<Button onclick={handleFormReset}>Got it!</Button>
		</div>
	{/if}
</div>

<style lang="scss">
	.form-container {
		min-width: 280px;
		transition: transform 2s ease;

		&.launching {
			animation: launch 4s ease-in forwards;

			@include launch(0, 0);
		}

		.contact-form {
			position: relative;
			z-index: 5;
			display: flex;
			flex-direction: column;
			gap: var(--space-sm);

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
		}

		.success-state {
			position: relative;
			z-index: 10;
			display: flex;
			flex-direction: column;
			gap: var(--space-sm);
			align-items: center;
			min-width: 280px;
			text-align: center;
			animation: launch 2s ease-out forwards;
		}
	}
</style>
