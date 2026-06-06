# Estudio Mombello

Landing page for Dr. Fabio Mombello, attorney based in General Pacheco,
Buenos Aires. Practice areas: criminal, labor, and family law.

Built by [Santiago Vittor](https://santiagovittor.store/ar).

## Stack

| | |
|---|---|
| Framework | Next.js 16, App Router |
| Language | TypeScript strict |
| Styles | Tailwind CSS v4 + OKLCH design tokens |
| Animation | CSS Scroll-Driven Animations + Framer Motion |
| Carousel | Embla Carousel |
| Email | Resend |
| Deployment | Vercel |
| Package manager | pnpm |

## Local setup

```bash
pnpm install
pnpm dev
```

Open http://localhost:3000.

Available commands: `pnpm dev`, `pnpm build`, `pnpm typecheck`, `pnpm lint`.

## Environment variables

Create `.env.local` at the project root:

```env
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
RESEND_API_KEY=re_your_key_here
NEXT_PUBLIC_GA4_ID=G-XXXXXXXXXX
```

`NEXT_PUBLIC_SITE_URL` defaults to `https://fmombello.com` at build time
if the variable is not set.

## Deployment

Set environment variables in the Vercel dashboard before the first
production deploy, then:

```bash
vercel deploy --prod
```

## Client constants

All client-specific data lives in `lib/constants.ts`. Phone numbers,
addresses, URLs, ratings, and copy strings are defined there and
imported where needed. Nothing is hardcoded in components.

## Pending before full launch

The following items are blocked on the client:

- `public/photos/fabio.jpg` — attorney photo, About section placeholder
- Google Maps embed URL — Contact section, currently stubbed
- Google Calendar booking URL — Booking section, currently stubbed
- `NEXT_PUBLIC_GA4_ID` — GA4 property not yet created
- Real review texts — replace placeholders in `lib/reviews-data.ts`
- CPACF registration number — Credentials section
- Domain purchase — `NEXT_PUBLIC_SITE_URL` and Vercel domain config

## Design system

`DESIGN.md` contains the complete visual specification: palette,
typography, spacing rules, and component constraints.

`CLAUDE.md` contains development conventions, prompting patterns for
Claude Code, and hard rules for this codebase.
