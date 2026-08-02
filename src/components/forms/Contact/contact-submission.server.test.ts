import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import type { ContactFormData } from "./contact.schema";
import { processContactSubmission } from "./contact-submission.server";

const baseData: ContactFormData = {
	name: "Ada Lovelace",
	email: "ada@example.com",
	message: "Hello there",
	company: ""
};

const honeypotData: ContactFormData = { ...baseData, company: "bot" };

describe("processContactSubmission", () => {
	beforeEach(() => {
		vi.spyOn(console, "error").mockImplementation(() => {});
	});

	afterEach(() => {
		vi.restoreAllMocks();
	});

	it("archives a honeypot submission without sending either email", async () => {
		const calls: string[] = [];
		const result = await processContactSubmission(honeypotData, {
			archive: async () => {
				calls.push("archive");
				return { success: true };
			},
			notifyOwner: async () => {
				calls.push("owner");
			},
			confirmVisitor: async () => {
				calls.push("confirmation");
			},
			createReferenceId: () => "ref-honeypot"
		});

		expect(result).toEqual({ success: true, referenceId: "ref-honeypot" });
		expect(calls).toEqual(["archive"]);
		expect(console.error).not.toHaveBeenCalled();
	});

	it("delivers both emails when the archive fails, logging only the reference id", async () => {
		const calls: string[] = [];
		const result = await processContactSubmission(baseData, {
			archive: async () => {
				calls.push("archive");
				return { success: false };
			},
			notifyOwner: async () => {
				calls.push("owner");
			},
			confirmVisitor: async () => {
				calls.push("confirmation");
			},
			createReferenceId: () => "ref-archive-fail"
		});

		expect(result).toEqual({ success: true, referenceId: "ref-archive-fail" });
		expect(calls).toEqual(["archive", "owner", "confirmation"]);
		expect(console.error).toHaveBeenCalledTimes(1);
		expect(console.error).toHaveBeenCalledWith(expect.any(String), {
			referenceId: "ref-archive-fail"
		});
	});

	it("does not send a visitor confirmation when the owner notification fails", async () => {
		const calls: string[] = [];

		await expect(
			processContactSubmission(baseData, {
				archive: async () => {
					calls.push("archive");
					return { success: true };
				},
				notifyOwner: async () => {
					calls.push("owner");
					throw new Error("owner notification failed");
				},
				confirmVisitor: async () => {
					calls.push("confirmation");
				},
				createReferenceId: () => "ref-owner-fail"
			})
		).rejects.toThrow();

		expect(calls).toEqual(["archive", "owner"]);
	});

	it("returns success and logs only the reference id when the visitor confirmation fails", async () => {
		const calls: string[] = [];
		const result = await processContactSubmission(baseData, {
			archive: async () => {
				calls.push("archive");
				return { success: true };
			},
			notifyOwner: async () => {
				calls.push("owner");
			},
			confirmVisitor: async () => {
				calls.push("confirmation");
				throw new Error("confirmation failed");
			},
			createReferenceId: () => "ref-confirmation-fail"
		});

		expect(result).toEqual({ success: true, referenceId: "ref-confirmation-fail" });
		expect(calls).toEqual(["archive", "owner", "confirmation"]);
		expect(console.error).toHaveBeenCalledTimes(1);
		expect(console.error).toHaveBeenCalledWith(expect.any(String), {
			referenceId: "ref-confirmation-fail"
		});
	});

	it("succeeds with no logging when every dependency succeeds", async () => {
		const calls: string[] = [];
		const result = await processContactSubmission(baseData, {
			archive: async () => {
				calls.push("archive");
				return { success: true };
			},
			notifyOwner: async () => {
				calls.push("owner");
			},
			confirmVisitor: async () => {
				calls.push("confirmation");
			},
			createReferenceId: () => "ref-success"
		});

		expect(result).toEqual({ success: true, referenceId: "ref-success" });
		expect(calls).toEqual(["archive", "owner", "confirmation"]);
		expect(console.error).not.toHaveBeenCalled();
	});
});
