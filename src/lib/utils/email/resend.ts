import { RESEND_API_KEY } from "$env/static/private"; // define in your .env file
import { Resend, type CreateEmailOptions } from "resend";
import type { SendEmailParams } from "./email";

const resend = new Resend(RESEND_API_KEY);

export async function resendEmail({
	toEmail,
	fromEmail,
	subject,
	htmlContent,
	template,
	variables
}: SendEmailParams) {
	try {
		// @ts-expect-error -- CreateEmailOptions is a discriminated union; we populate the missing fields below
		const emailData: CreateEmailOptions = {
			from: fromEmail ?? "andri@andribraun.dev",
			to: [toEmail],
			subject: subject ?? "Hello from AndriBraun.dev"
		};

		if (template) {
			emailData["template"] = {
				id: template,
				variables: variables as Record<string, string | number>
			};
		} else if (htmlContent) {
			emailData["html"] = htmlContent ?? "";
		} else {
			emailData["html"] =
				"<h2>AndriBraun.dev</h2><p>Thank you for contacting me! I'll be in touch soon.</p>";
		}

		console.log("emailData: ", emailData);

		const { data, error } = await resend.emails.send(emailData);

		if (error) {
			console.error("Error sending email:", error);
			throw new Error("Failed to send email. Please try again later.", {
				cause: error
			});
		}

		return { success: true, data };
	} catch (error) {
		console.error("Unexpected error:", error);
		throw new Error("Failed to send email. Please try again later.", {
			cause: error
		});
	}
}
