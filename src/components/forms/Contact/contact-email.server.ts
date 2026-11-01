import type { ContactFormData } from "./contact.schema";

// Resend caps string variables at 2,000 characters, and escaping can lengthen the text. A
// message full of symbols can still exceed the cap, but that only costs its confirmation.
const MAX_ECHOED_MESSAGE_LENGTH = 1500;

function escapeHtml(value: string): string {
	return value.replace(
		/[&<>"']/g,
		(character) =>
			({
				"&": "&amp;",
				"<": "&lt;",
				">": "&gt;",
				'"': "&quot;",
				"'": "&#039;"
			})[character]!
	);
}

function escapeMessage(message: string): string {
	return escapeHtml(message).replace(/\n/g, "<br>");
}

export function renderContactNotification(data: ContactFormData): string {
	return [
		"<h1>New portfolio contact</h1>",
		`<p><strong>Name:</strong> ${escapeHtml(data.name)}</p>`,
		`<p><strong>Email:</strong> ${escapeHtml(data.email)}</p>`,
		`<p><strong>Message:</strong><br>${escapeMessage(data.message)}</p>`
	].join("");
}

export function renderContactConfirmationVariables(data: ContactFormData, referenceId: string) {
	const message =
		data.message.length > MAX_ECHOED_MESSAGE_LENGTH
			? `${data.message.slice(0, MAX_ECHOED_MESSAGE_LENGTH)}…`
			: data.message;

	return {
		RECEIVER_NAME: escapeHtml(data.name),
		USER_MESSAGE: escapeMessage(message),
		REF_ID: referenceId.slice(0, 8),
		// Netlify runs in UTC and the visitor's zone is unknown, so name the zone.
		SUBMITTED_DATE: `${new Date().toLocaleString("en-US", {
			dateStyle: "medium",
			timeStyle: "short",
			timeZone: "UTC"
		})} UTC`
	};
}
