import { resendEmail } from "./resend";

// Optionals accept an explicit `undefined` because callers forward destructured
// optional fields straight through to `resendEmail`.
export interface SendEmailParams {
	toEmail: string;
	fromEmail?: string | undefined;
	replyTo?: string | undefined;
	subject?: string | undefined;
	htmlContent?: string | undefined;
	template?: string | undefined;
	variables?: Record<string, string | number | boolean> | undefined;
}

export async function sendEmail({
	toEmail,
	fromEmail,
	replyTo,
	subject,
	htmlContent,
	template,
	variables
}: SendEmailParams) {
	try {
		const response = await resendEmail({
			toEmail,
			fromEmail,
			replyTo,
			subject,
			htmlContent,
			template,
			variables
		});

		return response;
	} catch (error) {
		console.error("Email dispatch failed");
		throw new Error("Failed to send email. Please try again later.", {
			cause: error
		});
	}
}
