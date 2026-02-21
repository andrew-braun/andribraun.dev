// ---------------------------------------------------------------------------
// Generic Payload REST API response wrappers
// ---------------------------------------------------------------------------

export interface PayloadListResponse<T> {
	docs: T[];
	totalDocs: number;
	limit: number;
	page: number;
	totalPages: number;
	pagingCounter: number;
	hasPrevPage: boolean;
	hasNextPage: boolean;
	prevPage: number | null;
	nextPage: number | null;
}

// ---------------------------------------------------------------------------
// Shared / referenced types
// ---------------------------------------------------------------------------

export interface Media {
	id: string;
	url: string;
	alt: string;
	width: number;
	height: number;
	filename: string;
	mimeType: string;
	createdAt: string;
	updatedAt: string;
}

export interface Technology {
	id: string;
	name: string;
	slug: string;
	createdAt: string;
	updatedAt: string;
}

// ---------------------------------------------------------------------------
// Projects collection
// ---------------------------------------------------------------------------

export interface Project {
	id: string;
	title: string;
	/** Lexical rich text — opaque object. Use `description_markdown` for rendering. */
	description: unknown;
	description_markdown: string;
	metadata: {
		/** Populated when depth >= 1; otherwise an array of ID strings. */
		technologies: Technology[];
	};
	// link fields (inside collapsible — Payload flattens collapsibles)
	liveLink: string | null;
	snapshotLink: string | null;
	githubLink: string | null;
	// media fields (inside collapsible — Payload flattens collapsibles)
	/** Populated when depth >= 1; otherwise an ID string or null. */
	thumbnail: Media | null;
	/** Populated when depth >= 1; otherwise an array of ID strings. */
	images: Media[];
	createdAt: string;
	updatedAt: string;
}
