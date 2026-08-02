import type { ContactFormData } from "./contact.schema";

export type ContactSubmissionResult = { success: true; referenceId: string };

export type ContactSubmissionDependencies = {
	archive(data: ContactFormData): Promise<{ success: boolean }>;
	notifyOwner(data: ContactFormData, referenceId: string): Promise<void>;
	confirmVisitor(data: ContactFormData): Promise<void>;
	createReferenceId(): string;
};

export async function processContactSubmission(
	data: ContactFormData,
	dependencies: ContactSubmissionDependencies
): Promise<ContactSubmissionResult> {
	const referenceId = dependencies.createReferenceId();

	try {
		const result = await dependencies.archive(data);
		if (!result.success) console.error("Contact archive failed", { referenceId });
	} catch {
		console.error("Contact archive failed", { referenceId });
	}

	if (data.company) return { success: true, referenceId };

	await dependencies.notifyOwner(data, referenceId);

	try {
		await dependencies.confirmVisitor(data);
	} catch {
		console.error("Contact confirmation failed", { referenceId });
	}

	return { success: true, referenceId };
}
