import { resendEmail } from "./resend";

export interface SendEmailParams {
	toEmail: string;
	fromEmail?: string;
	subject?: string;
	htmlContent?: string;
	template?: string;
	variables?: Record<string, string | number | boolean>;
}

export async function sendEmail({
	toEmail,
	fromEmail,
	subject,
	htmlContent,
	template,
	variables
}: SendEmailParams) {
	try {
		const response = await resendEmail({
			toEmail,
			fromEmail,
			subject,
			htmlContent,
			template,
			variables
		});

		return response;
	} catch (error) {
		console.error("Error sending email:", error);
		throw new Error("Failed to send email. Please try again later.", {
			cause: error
		});
	}
}
