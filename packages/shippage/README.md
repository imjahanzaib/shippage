# shippage

**Conversion-optimized SaaS landing page sections built on shadcn/ui + Magic UI.**

Add production-ready, conversion-structured landing page sections to any React project. Like shadcn/ui, but for entire landing page sections — with copy structure, animations, and mobile optimization baked in.

## Quick Start

```bash
# Initialize in your existing project
npx shippage init

# Add sections
npx shippage add hero-centered pricing faq cta-footer

# Or add everything
npx shippage add --all
```

## What You Get

18 conversion-optimized sections, each with:

- Responsive layout (mobile-first, 44px touch targets)
- Framer Motion animations (scroll reveals, hover states, stagger)
- shadcn/ui components (Button, etc.)
- Conversion copy structure (headlines, subheadlines, CTAs, trust hints)
- Accessibility (semantic HTML, focus rings, reduced-motion support)

## Available Sections

```
Navigation
  navbar                   Navigation + persistent CTA

Hero
  hero-centered            Full-width hero with centered copy
  hero-split               Hero with screenshot alongside copy

Trust & Social Proof
  social-proof-logos       Logo bar, metrics, traction signals

Problem
  pain-points              Problem agitation with icons

Solution
  features-alternating     Feature rows with alternating layout
  features-bento           Bento grid feature showcase
  how-it-works             3-step process explanation

Proof
  testimonials             Customer quotes with attribution
  comparison-table         Competitor comparison

Conversion
  pricing                  Pricing tiers with highlight
  faq                      Accordion FAQ with objection handling
  cta-footer               Final CTA + footer
  contact-form             Lead capture with honeypot spam protection
  waitlist                 Email capture with waitlist counter

Utility
  exit-intent-popup        Exit-intent popup (session-aware)
  sticky-cta-bar           Sticky bar after hero scrolls away
  cookie-consent           GDPR/CCPA cookie consent banner
```

## Commands

### `shippage init`

Initialize Shippage in your project. Detects your framework, installs dependencies (Framer Motion, Lucide React), sets up shadcn/ui if needed, and creates `shippage.json`.

```bash
npx shippage init                          # Interactive
npx shippage init --framework nextjs -y    # Non-interactive
npx shippage init --vibe dark-premium      # Set vibe preset
```

**Supported frameworks:** Next.js, Vite, Remix, Astro, Nuxt, SvelteKit

### `shippage add [sections...]`

Add one or more sections to your project.

```bash
npx shippage add hero-centered             # Add one section
npx shippage add hero-split pricing faq    # Add multiple
npx shippage add --all                     # Add all 18 sections
npx shippage add --all -y                  # Skip overwrite prompts
```

Sections are written as `.tsx` files to your sections directory (default: `src/components/sections/`).

### `shippage list`

List all available sections with their conversion jobs.

## How It Works

1. `shippage init` detects your framework and creates a config
2. `shippage add` writes self-contained React components to your project
3. You import and compose them in your page
4. Customize the placeholder copy with your product details

```tsx
// app/page.tsx
import { Navbar } from "@/components/sections/navbar";
import { HeroCentered } from "@/components/sections/hero-centered";
import { PainPoints } from "@/components/sections/pain-points";
import { FeaturesAlternating } from "@/components/sections/features-alternating";
import { Pricing } from "@/components/sections/pricing";
import { FAQ } from "@/components/sections/faq";
import { CTAFooter } from "@/components/sections/cta-footer";

export default function LandingPage() {
  return (
    <>
      <Navbar />
      <HeroCentered />
      <PainPoints />
      <FeaturesAlternating />
      <Pricing />
      <FAQ />
      <CTAFooter />
    </>
  );
}
```

## Requirements

- Node.js >= 20
- React project with Tailwind CSS
- shadcn/ui initialized (or let `shippage init` do it)

## Dependencies

Each section uses:

- [shadcn/ui](https://ui.shadcn.com) — Button and base components
- [Framer Motion](https://motion.dev) — Animations
- [Lucide React](https://lucide.dev) — Icons
- [Tailwind CSS](https://tailwindcss.com) — Styling

## Part of the Shippage Ecosystem

This CLI installs the component library. For AI-powered landing page generation with conversion copy, design tokens from 200+ SaaS sites, and automated QA — use the [Shippage Claude Code skill](https://github.com/imjahanzaib/shippage).

The skill uses these same components but writes real conversion copy, selects sections based on your product, and applies design tokens automatically.

## License

MIT
