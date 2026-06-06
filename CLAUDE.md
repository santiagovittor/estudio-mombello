# CLAUDE.md

Operating instructions for Claude Code. Read before every task.
**Working code only. Finish the job. Plausibility is not correctness.**

---

## 0. Non-negotiables

1. **No flattery, no filler.** Start with the action or the answer.
2. **Disagree when you disagree.** Wrong premise? Say so before doing the work.
3. **Never fabricate.** Read the file or say "I don't know."
4. **Stop when confused.** Two plausible interpretations? Ask.
5. **Touch only what you must.** Every changed line traces directly to the request.

---

## 1. Before coding

- State the plan before touching files. For non-trivial tasks, list steps with a verification check for each.
- Read every file you will touch and every file that imports it.
- Match existing patterns. Surface assumptions before implementing, not inside the diff.

---

## 2. Code and changes

- No features beyond what was asked. No speculative abstractions.
- Bias toward deleting over adding. Clean up orphans your changes create.
- Every changed line traces to the request. If a line fails that test, revert it.

---

## 3. Verification — always in this order

1. `/impeccable audit` before and after every UI change. **Non-negotiable on a brand surface.**
2. `pnpm typecheck && pnpm lint` — zero errors, zero warnings.
3. Browser at 375px · 768px · 1440px — no overflow, no console errors.

Report audit results. Never mark done on a plausible diff.

---

## 4. Goal-driven execution

Rewrite vague asks before starting:
- "Make the hero better" → name the `/impeccable audit` flag, fix it, re-audit, confirm it is gone.
- "Add the contact section" → renders at all breakpoints, form submits, WhatsApp resolves, map loads.
- "Improve performance" → Lighthouse before → change → Lighthouse after → report delta.

---

## 5. Session hygiene

- Two failed corrections on the same issue: stop, summarize, ask for a sharper prompt.
- **When compacting: preserve modified files list, unfinished tasks, and every decision in DESIGN.md.**
- Ask when two interpretations affect output materially or a decision deviates from DESIGN.md.

---

## 6. Self-improvement loop

After any session where something went wrong, append one concrete rule to section 11.
Format: "Always X for Y" or "Never X when Y." Prune when a rule no longer prevents real mistakes.

---

## 10. Project context

@DESIGN.md — all visual decisions defer to it. Do not override it.

### What this is

Landing page for **Fabio Mombello y Asociados**, Buenos Aires law firm.
Goal: a potential client in a stressful legal situation feels in seconds that Fabio is competent, trustworthy, and reachable.
This is a **brand surface** (Impeccable), not a product UI. Every decision serves conversion.

### Stack

Next.js 16 App Router · TypeScript strict · Tailwind CSS v4 · Framer Motion · Impeccable · Vercel · pnpm

```
pnpm dev · pnpm build · pnpm typecheck · pnpm lint
```

### CSS units — deviations are bugs

| Use | For |
|---|---|
| `rem` | All font sizes, padding, margins |
| `clamp(min, fluid, max)` | Fluid typography — no breakpoint-only scaling |
| `px` | Borders, shadows, sub-pixel details only |
| `%` | Fluid widths |
| `dvh` | Viewport height — never `vh` |

No Tailwind arbitrary pixel values where a rem token fits.

### Language

**All UI text is Spanish.** Headings, body, labels, placeholders, errors, aria-labels, meta, OG.

### File layout

```
app/layout.tsx · page.tsx · globals.css
components/layout/Navbar.tsx · Footer.tsx
components/ui/FloatingWhatsApp.tsx · FloatingCall.tsx
components/sections/
  Hero · Stats · About · PracticeAreas · Credentials
  Testimonials · FAQ · Booking · Contact
lib/constants.ts · schema.ts · analytics.ts · reviews-data.ts
public/logo.* · photos/
```

### Section order in page.tsx — do not reorder

```
Navbar → Hero → Stats → About → PracticeAreas → Credentials
→ Testimonials → FAQ → Booking → Contact → Footer
→ FloatingWhatsApp → FloatingCall
```

### Client constants — always from lib/constants.ts, never hardcoded

```ts
PHONE_DISPLAY      = '011 5257-9927'
WHATSAPP_URL       = 'https://wa.me/5491152579927'
INSTAGRAM_URL      = 'https://instagram.com/abogadofabiomombello'
GOOGLE_BIZ_NAME    = 'Estudio Jurídico Dr. Mombello y Asoc.'
GOOGLE_BIZ_RATING  = 4.5
GOOGLE_BIZ_COUNT   = 88
YEARS_EXPERIENCE   = 20
CALENDAR_EMBED_URL = ''   // stub
DOMAIN             = ''   // stub
```

### SEO — embedded in every section, not a final pass

- One H1 (Hero only). H2 for section headings. H3 for sub-items. Never skip levels.
- Every `<section>` has an `id` matching its nav anchor.
- All images: `next/image` with explicit `width`, `height`, and descriptive Spanish `alt`.
- NAP in Contact must match Google Business exactly: name · 011 5257-9927 · address.
- Schema per section: `LocalBusiness + Person` (layout) · `LegalService ×3` (PracticeAreas) · `FAQPage` (FAQ) · `AggregateRating` (Testimonials). All via `lib/schema.ts`.
- Keyword targets — use naturally, never stuffed: `abogado penal Buenos Aires` · `abogado laboral Buenos Aires` · `abogado familia Buenos Aires` · `Dr. Fabio Mombello`

### Copy rules

- No em dashes. No filler: very, truly, genuinely, just.
- No rhetorical questions in headings. No passive voice in CTAs.
- Concrete verbs over abstract nouns: "Fabio resuelve" not "soluciones integrales".
- Write to one person in a difficult moment, not a crowd.

### Integrations

| What | How |
|---|---|
| GA4 | Script in `layout.tsx`. Events: `whatsapp_click` `call_click` `form_submit` `booking_open` |
| WhatsApp | `WHATSAPP_URL` from constants. Fire event on every touchpoint. |
| Google Maps | `<iframe>` embed in Contact section. |
| Google Calendar | Appointment `<iframe>` in Booking. Stub until URL available. |
| Google Reviews | Static typed array in `lib/reviews-data.ts`. No external API. |

### Hard stops

- `px` for font sizes or spacing — use `rem`
- `vh` for viewport heights — use `dvh`
- Client data hardcoded outside `lib/constants.ts`
- `/impeccable audit` skipped after a UI change
- Stock photos — `public/photos/` only

---

## 11. Project learnings

*(One-line concrete rules only. Prune when a rule no longer prevents real mistakes.)*