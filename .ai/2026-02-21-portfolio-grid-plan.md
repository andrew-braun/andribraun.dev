# Developer Portfolio — Phase 1 Planning Document

## Bento Grid + Project Cards

---

## Overview

Phase 1 establishes the core visual identity and content structure of the portfolio's projects section. The goal is a bento-style grid that feels editorial and intentional — not a generic card list, but not overengineered either. It should communicate personality, build trust, and guide visitors toward taking action, all within a layout that remains clean and readable.

Phase 2 (auto-typing terminal) and Phase 3 (fake filesystem terminal) will eventually anchor the grid as a reserved feature card. The layout should be designed with this placeholder in mind from day one.

---

## Goals

- Present projects in a visually engaging, non-generic format
- Mix card types to create rhythm and personality in the grid
- Surface social proof (testimonials) and a clear call to action without separate dedicated sections
- Establish a layout that can grow naturally into Phases 2 and 3
- Feel human and consultant-like, not just "another developer portfolio"

---

## Layout

The section uses a **bento grid** — a CSS grid with variable-sized cells that gives the layout an editorial, magazine-like quality. Cards vary in size (some spanning two columns or two rows) to create visual rhythm and hierarchy.

**Grid specs (recommended starting point):**

- 4-column grid on desktop, collapsing to 2-column on tablet and 1-column on mobile
- Gaps of around 12–16px between cells
- No fixed row heights — cards size to their content, with some manually promoted to span extra rows

**Reserved space:** The top-left (or top-right) cell should be reserved as a placeholder for the terminal card in Phase 2. In Phase 1, this can be a styled "Coming soon" placeholder, a logo/name card, or simply a decorative accent card.

---

## Card Types

### 1. Text-Only Project Card

The workhorse card. Used for most projects, especially those without strong visual assets.

**Layout:** Solid flat-design background color (muted, from a defined palette). Project name in a larger weight, project type as a small label or tag above the name, and a 1–2 sentence description below. Tech stack shown as small pill tags at the bottom.

**Interaction:** Subtle background color shift on hover, with a small arrow or "View project →" label sliding in. Card is fully clickable.

**Sizing:** Standard 1×1 or 1×2 cells. Featured projects can be promoted to 2×1 or 2×2.

---

### 2. Screenshot / Visual Card

Used for projects with a strong, attractive visual — a polished UI, a distinctive brand, or a well-designed storefront.

**Layout:** The card is predominantly the screenshot, cropped and filling the card area. Project name overlaid at the bottom, either as a semi-transparent strip or as text sitting on a gradient overlay. Minimal other text.

**Interaction:** On hover, the screenshot zooms in softly (scale transform, clipped to the card). Project name remains visible throughout.

**Sizing:** Larger cells work well here — 2×1 landscape or 2×2 square. Visual cards should be used sparingly to retain impact.

**Image treatment:** Slight inner shadow or soft inset border to make the image feel contained rather than raw. Consistent aspect ratios across all visual cards.

---

### 3. Testimonial / Quote Card

Adds social proof directly inside the grid, without a separate testimonials section.

**Layout:** A short client quote (1–3 sentences max) as the primary content, styled cleanly with a large quotation mark as a decorative element. Client name and company/context below, in a smaller weight. Flat background, slightly warmer or more distinct color than project cards to differentiate it.

**Usage:** One or two maximum in the grid. Should be placed with some visual separation from each other — not adjacent.

**Sizing:** 1×1 or 2×1 depending on quote length.

---

### 4. CTA Card

Drives visitors toward contact. Lives inside the grid rather than only in the footer, making it feel natural rather than like a sales pitch.

**Layout:** Stronger accent color to stand out from the rest of the grid. Short punchy line ("Got a project? Let's talk." or similar). A clear button below. Optionally, a small "Available for new projects" indicator with a green status dot.

**Interaction:** Button with a clear hover state. The card itself should feel like a visual break — a moment of invitation in the browsing flow.

**Sizing:** 1×1 or 1×2. Should not be the largest card in the grid — present but not dominating.

---

## Color & Visual Direction

The grid should use a **small, intentional palette** — not every card a different color, but a set of 4–6 muted tones that rotate across text-only cards to create warmth and variety without chaos. Suggested palette direction: slate, terracotta, warm cream, forest green, dusty blue. All muted, all readable with dark text on top.

Visual cards use no background color — the screenshot fills the space. Testimonial and CTA cards should each have a distinct enough color to read as a different "type" at a glance.

Subtle **noise or grain texture** on card backgrounds can add depth without being distracting. Optional but recommended.

---

## Content Inventory (To Be Filled In)

Before implementation, the following content should be gathered:

- List of projects to include, with: name, type, short description (1–2 sentences), tech stack, URL or case study link, and whether a screenshot is available
- 1–2 client quotes with attribution
- CTA copy and target link (contact form, Calendly, email)
- Decision on which projects are "featured" (larger card size)
- Screenshot assets: cropped, optimized, consistent dimensions

---

## What's Not in Phase 1

- Terminal auto-typing animation (Phase 2)
- Interactive fake filesystem (Phase 3)
- Stat/counter cards
- "Currently" or "Available for work" live indicator cards
- Any animation beyond hover states

These are noted here to avoid scope creep during Phase 1 implementation, while keeping the door open for later phases.

---

## Success Criteria

Phase 1 is complete when:

- The bento grid renders correctly across desktop, tablet, and mobile
- All four card types are implemented and populated with real content
- The terminal placeholder cell is visually reserved and styled
- Hover interactions are in place on project cards
- The layout has been reviewed at multiple viewport sizes and feels intentional at each

---

_Document version: 1.0 — Phase 1 planning_
