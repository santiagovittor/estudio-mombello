---
name: Estudio Mombello
description: Conversion surface for Dr. Fabio Mombello — Buenos Aires law firm, Penal, Laboral, Familia
colors:
  ink: "oklch(9% 0.01 245)"
  paper: "oklch(97.5% 0.005 90)"
  hero-bg: "oklch(11% 0.012 245)"
  hero-text: "oklch(95% 0.01 75)"
  accent: "oklch(52% 0.14 25)"
  accent-hover: "oklch(58% 0.14 25)"
  muted: "oklch(48% 0.006 245)"
typography:
  display:
    fontFamily: "Archivo, sans-serif"
    fontSize: "clamp(2.75rem, 6vw, 5.5rem)"
    fontWeight: 900
    lineHeight: 1.04
    letterSpacing: "-0.025em"
  subline:
    fontFamily: "Archivo, sans-serif"
    fontSize: "clamp(1rem, 1.5vw, 1.25rem)"
    fontWeight: 500
    lineHeight: 1.4
    letterSpacing: "0.005em"
  body:
    fontFamily: "Archivo, sans-serif"
    fontSize: "clamp(1rem, 1.2vw, 1.125rem)"
    fontWeight: 400
    lineHeight: 1.68
    letterSpacing: "0em"
  label:
    fontFamily: "Archivo, sans-serif"
    fontSize: "0.8125rem"
    fontWeight: 500
    lineHeight: 1
    letterSpacing: "0.07em"
rounded:
  interactive: "0.25rem"
spacing:
  section-x: "clamp(1.5rem, 5vw, 6rem)"
components:
  button-primary:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.hero-text}"
    rounded: "{rounded.interactive}"
    padding: "0.9rem 1.75rem"
  button-primary-hover:
    backgroundColor: "{colors.accent-hover}"
    textColor: "{colors.hero-text}"
    rounded: "{rounded.interactive}"
    padding: "0.9rem 1.75rem"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.hero-text}"
    rounded: "{rounded.interactive}"
    padding: "0.875rem 1.75rem"
  nav-cta:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.hero-text}"
    rounded: "{rounded.interactive}"
    padding: "0.5rem 1.25rem"
---

# Design System: Estudio Mombello

## 1. Overview

**Creative North Star: "The Practitioner's Door"**

The office you need when something has gone wrong. A fixed navbar marked "Dr. Mombello." A dark hero with a single large statement. One button. The design communicates competence before a word is read — not through decoration, but through discipline. Every removed element is a trust signal. Every restraint is a claim that the work speaks for itself.

This is a decision surface, not a portfolio. The visitor arrives scared: a criminal charge, a termination letter, a custody dispute. They have seconds and a phone. The design must answer three questions in order — "Is this person competent?", "Can I trust them?", "How do I reach them now?" — and answer them without demanding patience. Typography does the work; color marks the action; copy speaks to one person, not a category.

The palette operates in two registers: a near-black hero surface for the first fold, and a near-neutral white body for the sections that follow. The single accent color (Buenos Aires Brick) appears only where a visitor should act. Archivo, a grotesque from the Argentine type foundry Omnibus-Type, carries the entire typographic hierarchy through weight contrast alone. No secondary typeface, no display serif, no gradients between registers.

This system explicitly rejects: corporate law firm clichés (dark navy and gold, marble textures, stock photos of suited handshakes); startup and SaaS aesthetics (gradient blobs, cream backgrounds, glassmorphism, ultra-rounded cards); the generic Argentine abogados template (blue/white, stock courtroom photography, dense column text); and editorial-magazine art direction (italic display serifs, tracked uppercase eyebrows above every section, broadsheet column grids). The reference is the *effect* of an institution that has handled this before — not the aesthetic of any one of these lanes.

**Key Characteristics:**
- Single grotesque family (Archivo), weight axis as the sole hierarchy engine
- Two color registers (near-black hero, near-white body) with an abrupt, intentional break between them
- One accent color (Buenos Aires Brick), one role: action-only
- Flat elevation at rest; one structural hairline on the navbar post-scroll
- All UI copy in Spanish, always second-person singular, always one person in a bad situation
- Typographic scale minimum 1.25× between adjacent roles

## 2. Colors

The palette is near-monochromatic with a single saturated accent. Scarcity is the system.

### Primary
- **Buenos Aires Brick** (`oklch(52% 0.14 25)`): The conversion action color. Used exclusively on interactive CTAs (`.hero-cta-primary`, `.nav-cta`) and their hover state. Not decorative — if it appears in a non-interactive context, something is wrong. Its hover lightens to `oklch(58% 0.14 25)`; the hue and chroma stay constant.

### Neutral
- **Late Night Ink** (`oklch(9% 0.01 245)`): Near-black with a cold blue undertone (`H=245°`). Body text and UI text in light sections. The cold tint keeps it from reading as warm black.
- **Document White** (`oklch(97.5% 0.005 90)`): Light section background. Chroma 0.005 — barely tinted, enough to avoid optical stark white, not enough to read warm. Not cream. Not warm neutral. The tint references the accent's hue axis, not warmth-by-default.
- **Chamber Dark** (`oklch(11% 0.012 245)`): Hero section background. Marginally distinct from ink (chroma 0.012 vs 0.01) so it doesn't disappear against it at boundaries. Authoritative; reads as intentional dark, not failed dark.
- **Hero White** (`oklch(95% 0.01 75)`): Text and UI elements on dark surfaces only (hero, navbar in dark state, CTA text). The 75° hue (slightly warm) prevents it from reading clinical white on the dark background.
- **Case File Gray** (`oklch(48% 0.006 245)`): Muted/secondary text. Supporting information only — body copy that should recede, captions, minor UI labels.

**Named Rules:**

**The One Accent Rule.** Buenos Aires Brick (`--color-accent`) appears on CTAs and the persistent navbar button — nowhere else. Its rarity is the conversion signal. Using it decoratively (dividers, icons, hover highlights on non-interactive elements) dilutes what it means.

**The Two-Register Rule.** The site operates in exactly two color registers: dark (hero) and light (body sections). There is no gradient transition, no blurred boundary, no intermediate surface. The fold break is abrupt and intentional. Any element that visually blends the two registers (a card with hero-dark bg inside a light section, a gradient overlay spanning the break) violates the system.

**The No-Cream Rule.** The body background is Document White (`oklch(97.5% 0.005 90)`), chroma 0.005. Any token in the warm-neutral band (`L 0.84–0.97, C < 0.06, hue 40–100`) reads as cream/sand/parchment and triggers the AI-generated tell. The boundary is chroma ≤ 0.01 at hue ≠ 40–100.

## 3. Typography

**Display Font:** Archivo (Omnibus-Type, Buenos Aires) — grotesque, variable weight 100–900
**Body Font:** Archivo — same family, lighter weights

**Character:** A single grotesque from an Argentine type foundry, chosen for three reasons: institutional weight at 900, clean legibility at body sizes (400), and a meaningful local provenance for a Buenos Aires law firm. The font selection IS a design decision, not a default. The hierarchy runs entirely through weight contrast (900 vs 500 vs 400) and scale. There is no secondary typeface — introducing one is a system violation.

### Hierarchy
- **Display** (900, `clamp(2.75rem, 6vw, 5.5rem)`, line-height 1.04, letter-spacing -0.025em): Hero H1 only. Maximum ceiling 5.5rem. Letter-spacing at -0.025em; floor is -0.04em. Anything tighter and letters touch; cramped, not designed.
- **Headline** (900, `clamp(1.875rem, 4vw, 3rem)`, line-height 1.1): Section headings (not yet implemented; reserve this slot for H2 in About, PracticeAreas, Contact). Same weight as Display, smaller scale.
- **Subline** (500, `clamp(1rem, 1.5vw, 1.25rem)`, line-height 1.4, letter-spacing 0.005em): Hero credential line; section kickers where needed. Weight 500 distinguishes from body without competing with the heading above it.
- **Body** (400, `clamp(1rem, 1.2vw, 1.125rem)`, line-height 1.68): All prose. Max line length 52ch in the hero; 65–75ch in light sections. `text-wrap: pretty` on body paragraphs. `text-wrap: balance` on H1–H3.
- **Label** (500, `0.8125rem`, letter-spacing 0.07em, uppercase): Single-use positioning statement (hero kicker "BUENOS AIRES · 20 AÑOS DE EXPERIENCIA"). Used once per context — this is a brand voice element, not a section grammar pattern.

**Named Rules:**

**The No-Serif Rule.** The system uses Archivo exclusively. Do not introduce a display serif for testimonials, pull quotes, or accent headlines. The voice is the grotesque's voice; a serif is a different voice.

**The Eyebrow-Once Rule.** The small uppercase tracked label is a brand positioning statement. It appears once in the hero. If it appears above a second section heading on the same page, it is AI section-grammar, not brand voice.

**The Weight-Not-Color Rule.** Emphasis within body copy is through font-weight (400 → 500 → 700), not through color. Colored inline text violates The One Accent Rule. Bold is the only inline emphasis.

## 4. Elevation

Flat. Surfaces at rest carry no shadow. Depth is expressed through color register (dark hero / light body) and typographic scale, not through shadow or layering.

The one exception is structural, not decorative: the fixed Navbar receives `box-shadow: 0 1px 0 oklch(9% 0.01 245 / 0.08)` on scroll. This is a hairline separator (1px effective width, 8% opacity), appearing only once the navbar background transitions from transparent to opaque — signaling register change, not elevation.

No decorative `box-shadow` on cards, buttons, inputs, or any surface at rest.

**Named Rules:**

**The Flat-By-Default Rule.** Interactive elements communicate state through color shift, not shadow lift. `--color-accent-hover` signals hover; no `translateY`, no `box-shadow` on hover. The system does not use shadow as decoration or as a hover affordance.

**The One Hairline Rule.** The only shadow in the system is the navbar's 1px post-scroll separator. If a second `box-shadow` is introduced, it must carry functional meaning (focus ring, modal backdrop) — not aesthetic depth. Focus rings use `outline: 2px solid` at `3px offset`, not `box-shadow`.

## 5. Components

### Buttons

Confident and minimal. The label is the button. No icon by default, no arrow, no decorative element.

- **Shape:** `border-radius: 0.25rem` (4px). Reads as rectangular with softened corners — institutional precision, not playful rounding. Never exceed 0.25rem on buttons.
- **Primary (`.hero-cta-primary`):** Buenos Aires Brick background (`--color-accent`), Hero White text, font-weight 700, padding `0.9rem 1.75rem`, `font-size: 1rem`. Transition: `background-color 150ms ease`. Min-height approaches 44px touch target.
- **Primary hover:** `--color-accent-hover` (`oklch(58% 0.14 25)`). Same shape, same text, same size. No scale, no shadow.
- **Primary focus-visible:** `outline: 2px solid var(--color-accent-hover)` at `outline-offset: 3px`. Visible ring, not glow.
- **Ghost (`.hero-cta-ghost`):** Transparent background, `border: 1px solid oklch(95% 0.01 75 / 0.4)`, Hero White text, font-weight 500, padding `0.875rem 1.75rem`. Used alongside primary on dark surfaces only — this pairing (solid + ghost) is the hero CTA pattern. Ghost does not appear in light sections.
- **Ghost hover:** `border-color: oklch(95% 0.01 75 / 0.7)`. No background fill.
- **Nav CTA (`.nav-cta`):** Same as primary but smaller — padding `0.5rem 1.25rem`, `font-size: 0.875rem`, font-weight 700. Always present in the navbar; persists across scroll states.

### Navigation (Navbar)

Fixed, full-width, `z-index: 50`. Two states: dark (transparent over hero) and light (opaque over body sections).

- **Dark state:** Transparent background; "Dr. Mombello" wordmark in Hero White (weight 700, 1rem); nav links in Hero White at 0.7 opacity (opacity 1 on hover, `transition: opacity 200ms ease`); Nav CTA in Buenos Aires Brick.
- **Light state (after 60px scroll):** Background switches to `--color-paper`; wordmark and nav links switch to `--color-ink`; hairline bottom separator appears.
- **Transition:** `background-color 300ms ease`, `box-shadow 300ms ease`, `color 300ms ease` on the header element and each text child simultaneously.
- **Mobile (below 768px):** Nav links hidden. Wordmark + Nav CTA only. No hamburger implemented yet.
- **Desktop nav links:** `font-size: 0.875rem`, `font-weight: 500`. Three links: "Áreas", "Sobre Fabio", "Contacto". Anchor-based scroll navigation.

### Hero Typographic Ghost Decoration

The numeral "20" with "AÑOS" below it, rotated -90deg, positioned in the right column on desktop (`lg` breakpoint, ≥1024px).

- **Opacity:** 0.30 (`--color-hero-text` at 30%). At 0.25 it becomes a smudge; at 0.40 it competes with the text column. This range is the boundary.
- **Font:** Archivo Black (900), `clamp(9rem, 16vw, 20rem)`, line-height 0.88. "AÑOS" below at 1.5rem, weight 400, letter-spacing 0.45em, uppercase.
- **Position:** `position: absolute`, right column (38% width from right edge), `aria-hidden="true"`, `overflow: hidden` on the container to clip at viewport edge.
- **Interaction:** None. `pointer-events: none`, `user-select: none`.

## 6. Do's and Don'ts

### Do:
- **Do** use `--color-accent` only on CTAs and the navbar button. Scarcity is the trust signal.
- **Do** keep all UI copy in Spanish: navigation labels, aria-labels, placeholders, error messages, meta tags, OG tags. English in the rendered output is a bug.
- **Do** write copy to one person in a bad situation — second-person singular ("su problema", "lo llamo hoy"), never to a crowd ("nuestros clientes", "personas que atraviesan dificultades").
- **Do** use `clamp()` for all fluid type sizes. No breakpoint-only font scaling.
- **Do** use `dvh` for viewport heights. `vh` is prohibited — it breaks on mobile browsers with dynamic toolbars.
- **Do** use `rem` for all font sizes, margins, and padding. `px` is reserved for borders (1px), outlines (2px), and box-shadows only.
- **Do** use CTA labels as verb + object: "Escribir por WhatsApp", "Llamar ahora". Not "Consultar", "Ver más", "Enviar".
- **Do** keep the ghost button for dark surfaces only, paired with a primary. In light sections, use primary alone.
- **Do** use `text-wrap: balance` on H1–H3 and `text-wrap: pretty` on body paragraphs.
- **Do** check contrast at every breakpoint. Body text minimum 4.5:1 against its background. Muted text (Case File Gray) minimum 4.5:1 against Document White — verify before shipping any new section.

### Don't:
- **Don't** use navy-and-gold, marble textures, scales-of-justice imagery, or stock photos of suited people shaking hands. These are the generic law firm visual grammar — they communicate "any firm," not Fabio.
- **Don't** use startup or SaaS aesthetics: gradient blobs, glassmorphism, warm-neutral or cream backgrounds, hero metric stat grids, ultra-rounded cards (`border-radius` above 0.25rem on interactive elements is prohibited).
- **Don't** use `border-left` or `border-right` greater than 1px as a colored accent stripe on any element. Side-stripe borders are prohibited — use full borders, background tints, or nothing.
- **Don't** use gradient text (`background-clip: text` + gradient background). Single solid color only.
- **Don't** add a second typeface. Not for testimonials, not for a pull quote, not for a decorative initial. Archivo is the system.
- **Don't** use the uppercase tracked eyebrow label above more than one section. In the hero it is brand voice; repeated above every section it is AI grammar.
- **Don't** pair `border` and `box-shadow` on the same element as decoration. The ghost button has a border; nothing has a shadow.
- **Don't** use numbered section markers (01 / 02 / 03) as structural scaffolding. Numbers in section headings are AI grammar unless the sequence carries real meaning.
- **Don't** translate "Buenos Aires law firm" into a blue-and-white palette, Argentine flag motifs, or stock courthouse photography. The Argentine connection is carried by the Archivo typeface choice and copy — not by color or imagery.
- **Don't** address visitors with em dashes anywhere in the UI. Commas, colons, semicolons, periods, or parentheses only.
- **Don't** use filler qualifiers in copy: "muy", "realmente", "simplemente", "básicamente". Each word earns its place.
