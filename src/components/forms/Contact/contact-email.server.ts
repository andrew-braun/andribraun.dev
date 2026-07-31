import type { ContactFormData } from "./contact.schema";

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

export function renderContactNotification(data: ContactFormData): string {
	return [
		"<h1>New portfolio contact</h1>",
		`<p><strong>Name:</strong> ${escapeHtml(data.name)}</p>`,
		`<p><strong>Email:</strong> ${escapeHtml(data.email)}</p>`,
		`<p><strong>Message:</strong><br>${escapeHtml(data.message).replace(/\n/g, "<br>")}</p>`
	].join("");
}
