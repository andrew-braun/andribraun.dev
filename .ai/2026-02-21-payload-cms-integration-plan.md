# Payload CMS Integration Plan

**Date:** 2026-02-21  
**CMS:** `cms.andribraun.dev` (Payload v3)  
**Frontend:** SvelteKit (`andribraun.dev`)

---

## Overview

Connect the SvelteKit frontend to the Payload CMS REST API to power the projects section (and any future CMS-driven content). All data fetching runs server-side via SvelteKit `+page.server.ts` load functions to avoid CORS issues and keep API details out of the browser.

---

## Data Flow

```
SvelteKit load fn (server)
  → src/lib/cms/payload.ts  (typed API client)
    → GET https://cms.andribraun.dev/api/projects?depth=2&...
      → Payload REST API
  → typed data returned as page props
    → Svelte page component renders
```

---

## Files to Create

### 1. `.env` / `.env.example`

```
CMS_URL=https://cms.andribraun.dev
```

- `PUBLIC_` prefix makes it available in both server and client SvelteKit contexts.
- `.env.example` committed to repo; `.env` git-ignored.

---

### 2. `src/lib/cms/types.ts` — TypeScript Interfaces

Typed representations of every Payload collection used by the frontend. Mirrors the schema exactly so fetched data is fully typed throughout the app.

**Collections to type:**

- `Media` — `id`, `url`, `alt`, `width`, `height`
- `Technology` — `id`, `name`, `slug` (inferred from `technologies` collection)
- `Project` — all fields from the `Projects` schema:
  - `title: string`
  - `description: unknown` (Lexical rich text — opaque object)
  - `description_markdown: string`
  - `metadata.technologies: Technology[]` (populated at `depth >= 1`)
  - `liveLink`, `snapshotLink`, `githubLink: string | null`
  - `thumbnail: Media | null` (populated at `depth >= 1`)
  - `images: Media[]` (populated at `depth >= 1`)
  - `createdAt`, `updatedAt: string`

**Also export:**

- `PayloadListResponse<T>` — generic wrapper for paginated `find` responses (`docs`, `totalDocs`, `page`, `totalPages`, etc.)
- `PayloadSingleResponse<T>` — alias for a single document

---

### 3. `src/lib/cms/payload.ts` — API Client

A DRY, typed wrapper around `fetch` + `qs-esm` for the Payload REST API.

**Core utilities (unexported internals):**

```ts
// Build a full API URL for a given collection path + query params
function buildUrl(path: string, params?: object): string;

// Central fetch wrapper — handles base URL, error throwing, JSON parsing
async function cmsGet<T>(path: string, params?: object): Promise<T>;
```

**Exported collection helpers:**

```ts
export async function getProjects(opts?: {
	depth?: number;
	limit?: number;
	page?: number;
}): Promise<PayloadListResponse<Project>>;

export async function getProjectById(id: string, opts?: { depth?: number }): Promise<Project>;
```

**Key decisions:**

- Default `depth: 2` for `getProjects` — auto-populates `metadata.technologies` (rel), `thumbnail`, and `images` (uploads).
- `qs-esm` used for all query string building (`stringify` with `{ addQueryPrefix: true }`). Import: `import * as qs from 'qs-esm'`.
- Throw a descriptive error on non-2xx responses, including the Payload error message if available.
- No auth needed for read-only public collections (access control permitting). Add `Authorization` header pattern if needed later.

---

### 4. `src/routes/+page.server.ts` (or per-section route) — Server Load Function

```ts
import { getProjects } from "$lib/cms/payload";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async () => {
	const projects = await getProjects({ depth: 2 });
	return { projects: projects.docs };
};
```

- Runs exclusively on the server — no API URL or fetch detail leaks to the browser.
- `$types` gives full type inference on the `data` prop in the page component.

---

## DRY Principles

| Repeated concern                           | Where it lives                                    |
| ------------------------------------------ | ------------------------------------------------- |
| Base CMS URL                               | `$env/static/public` → `PUBLIC_CMS_URL`           |
| URL construction + query string            | `buildUrl()` in `payload.ts`                      |
| Fetch + error handling + JSON parse        | `cmsGet<T>()` in `payload.ts`                     |
| Response shape                             | `PayloadListResponse<T>` generic in `types.ts`    |
| Collection-specific defaults (depth, etc.) | Individual exported helpers (`getProjects`, etc.) |

Any utility used in 3+ places lives in its own function. No raw `fetch` calls outside of `cmsGet`.

---

## Dependencies

| Package     | Purpose               | Notes                                      |
| ----------- | --------------------- | ------------------------------------------ |
| `qs-esm`    | Query string building | Payload's own ESM fork — already installed |
| `@types/qs` | Types for qs API      | Already installed as devDep                |

No additional runtime deps needed.

---

## Future Considerations

- **Authentication:** If any collections require auth, pass `Authorization: Bearer <token>` via `cmsGet` options. Store token in `$env/static/private`.
- **Additional collections:** Add `getTechnologies()`, `getMediaById()`, etc. following the same pattern — one helper per collection, all using `cmsGet`.
- **Caching:** SvelteKit `fetch` in `load` functions is already cache-aware. Add `Cache-Control` headers or use `depends()` for fine-grained invalidation later.
- **Rich text rendering:** `description` is Lexical rich text (an opaque object). Will need a Lexical → HTML/Svelte renderer (e.g., `@payloadcms/richtext-lexical` converters or a custom one) — out of scope for now; `description_markdown` is the workaround.
