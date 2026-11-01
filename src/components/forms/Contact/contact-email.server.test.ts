import { describe, expect, it } from "vitest";
import type { ContactFormData } from "./contact.schema";
import { renderContactConfirmationVariables } from "./contact-email.server";

const data: ContactFormData = {
	name: "<i>Ada</i>",
	email: "ada@example.com",
	message: "<b>Hi</b>\nBye",
	company: ""
};

describe("renderContactConfirmationVariables", () => {
	it("escapes visitor text and keeps line breaks", () => {
		const variables = renderContactConfirmationVariables(data, "12345678-abcd");

		expect(variables.RECEIVER_NAME).toBe("&lt;i&gt;Ada&lt;/i&gt;");
		expect(variables.USER_MESSAGE).toBe("&lt;b&gt;Hi&lt;/b&gt;<br>Bye");
	});

	it("truncates messages to stay inside Resend's variable limit", () => {
		const long = { ...data, message: "a".repeat(5000) };

		expect(renderContactConfirmationVariables(long, "id").USER_MESSAGE).toHaveLength(1501);
	});
});
