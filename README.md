# Shippage

**A $50K landing page team in your terminal.**

One sentence. Production-ready page. No AI slop. Free forever.

```
"Build a landing page for Deploybot — one-click deploys for small engineering teams"
```

That single prompt produces a complete, conversion-optimized landing page with professional copy, real design tokens, legal pages, cookie consent, SEO schemas, exit-intent popups, and analytics wiring. Not a template. Not a starting point. A production page ready to ship.

Hiring a CRO strategist costs $10K/month. A SaaS copywriter charges $3K-5K per page.
A designer charges $5K-15K. Shippage encodes all that expertise as data — free.

Works with Next.js, Vite + React, Remix, Astro, Vue/Nuxt, and Svelte/SvelteKit.

<br>

## The Problem

Ask any AI to build a landing page and you get the same thing every time. Inter font. Purple gradient. A headline that says "Unlock Your Potential" or "Leverage Seamless Solutions." Cards in a grid. No copy strategy, no conversion structure, no personality. We call it **AI slop** and it kills trust on contact.

The page looks like it was made by a robot because it was. Visitors bounce in 3 seconds because nothing on the page speaks to their actual problem.

<br>

## What This Skill Does Differently

**It replaces your copywriter.** Not placeholder text. Not "lorem ipsum." Not "Your compelling headline here." Real conversion copy using 1,000+ lines of data-backed formulas. First-person CTAs that convert 90% better (A/B tested). Headlines calibrated to awareness levels. A social proof cascade that distributes proof throughout the page, not just one section. Risk reversal trust hints on every CTA (+32% conversion). An anti-AI word filter blocks 40+ overused words so your page sounds human. VoC (Voice of Customer) methodology that $5K copywriters use — encoded as rules.

**It replaces your designer.** Shippage ships with real design tokens extracted from 200+ successful SaaS sites (Stripe, Linear, Vercel, Notion, and 196 more). Research-backed typography rules (66 chars/line optimal, 8px spacing grid, Major Third scale). Color psychology data (60-30-10 rule, contrast-first CTAs). Mobile-first layout patterns from analysis of 2,000+ B2B SaaS landing pages. When you say "dark premium," you don't get a guess. You get a curated system that professional agencies charge $5K-15K to create.

**It replaces your CRO strategist.** Every page follows a 7-step narrative arc where each section has exactly one job: stop the scroll, build trust, agitate the pain, show the solution, prove it works, remove doubt, make the ask. CRO agencies charge $10K/month for this sequence. Centered CTAs (+682% clicks). Above-fold CTAs (+304%). Single-offer pages (+266%). Social proof cascading at 5 strategic positions. Sections selected and ordered automatically based on your product, awareness level, and CTA type.

**It handles the stuff nobody wants to build.** Cookie consent banners that comply with GDPR, CCPA, and CNIL standards. Exit-intent popups with A/B testing and frequency capping. Sticky CTA bars. Privacy policies, terms of service, cookie policies, and acceptable use policies generated from your intake data. JSON-LD structured data for Google rich results. OG image templates for social sharing. Sitemap and robots.txt. Analytics wiring with scroll depth tracking and CTA click events.

**It works when you have nothing.** Pre-launch mode handles the cold start problem. No screenshots? Gradient placeholders and architecture diagrams. No testimonials? Founder story sections and traction signals. No logo bar? Waitlist counters, GitHub stars, and beta badges. 60%+ of our users are pre-launch founders. The skill is built for that.

<br>

## Install

```bash
# Copy into your Claude Code skills directory
cp -r shippage ~/.claude/skills/
```

Or clone this repo and symlink it:

```bash
git clone https://github.com/imjahanzaib/shippage.git
ln -s $(pwd)/shippage ~/.claude/skills/shippage
```

The skill activates automatically whenever you ask Claude Code to build a landing page, marketing page, website, or sales page for any SaaS product. You can also trigger it manually with `/shippage`.

<br>

## Usage

### Quick Mode (one sentence, deployed page)

Give it a product name and a one-liner. Shippage infers everything else: design system, awareness level, CTA type, vibe, section selection, copy, effects, and mobile optimization.

```
Build a landing page for Calmly — meditation and breathing exercises for anxious developers
```

```
Build me a website for InvoiceBot — AI-powered invoice processing for small accounting firms
```

```
Ship a landing page for GitGuard — automated security scanning for GitHub repos
```

### Guided Mode (full control)

Want more control? Shippage walks you through 8 intake questions: product name, one-liner, target audience, awareness level, CTA goal, social proof assets, vibe preference, and brand assets (colors, fonts, logos).

```
Build a landing page for my SaaS (guided mode)
```

### Framework Selection

The default output is React + Tailwind CSS + Framer Motion + shadcn/ui. Tell it what you're using and the output adapts:

```
Build a landing page for Deploybot using Astro
Build a landing page for Deploybot using Vue + Nuxt
Build a landing page for Deploybot using SvelteKit
```

### Audit Mode

Already have a landing page? Shippage audits it against the same conversion, design, and performance rules it uses to generate pages.

```
Roast this landing page: https://myproduct.com
Audit my landing page for conversion issues
```

<br>

## What's Inside

### 18 Section Templates

Every section is a complete, documented component with desktop layout, mobile layout, copy rules, accessibility requirements, animation specs, and production-ready JSX.

| Section | Conversion Job |
|---------|---------------|
| **Navbar** | Navigation with CTA that converts on first scroll |
| **Hero (Centered)** | Stop the scroll in 5 seconds with one bold claim |
| **Hero (Split)** | Stop the scroll with screenshot/demo on one side, copy on the other |
| **Social Proof Bar** | Build instant credibility with logos, metrics, or traction signals |
| **Pain Points** | Make the visitor feel understood before showing the solution |
| **Features (Alternating)** | Show how the product solves each pain point, one by one |
| **Features (Bento Grid)** | Show many capabilities at once for product-aware audiences |
| **How It Works** | Reduce perceived complexity to three simple steps |
| **Testimonials** | Let customers prove the claims you just made |
| **Comparison Table** | Win the "why not the competitor?" conversation |
| **Pricing** | Remove the biggest remaining objection: cost |
| **FAQ** | Kill the final doubts before the ask |
| **CTA Footer** | Make the ask. One last time. Clear and direct. |
| **Contact Form** | Capture leads with spam-protected forms (Formspree, Resend, or custom) |
| **Waitlist** | Viral waitlist with referral links, queue positions, and tiered rewards |
| **Exit-Intent Popup** | Recover abandoning visitors with A/B tested offers |
| **Sticky CTA Bar** | Keep the conversion action visible as the hero scrolls away |
| **Cookie Consent** | GDPR/CCPA compliant banner with preference center and consent proof |

### The Copy Engine (1,000+ lines)

Not a prompt template. A structured copy system with:

| Rule Category | What It Does |
|--------------|-------------|
| **Anti-AI Filter** | Blocks "leverage," "seamless," "cutting-edge," "unlock," and 36 more dead words |
| **Headline Formulas** | 8 tested patterns calibrated by awareness level |
| **CTA Language** | Outcome verbs ("Start shipping faster") over feature verbs ("Sign up") |
| **Social Proof Copy** | Specific numbers ("2,847 teams") over vague claims ("thousands of users") |
| **FAQ Generation** | Answers real objections, not softballs |
| **Voice Calibration** | Matches tone to audience (developer != enterprise buyer != creative) |

### Design Token Database (200+ Sites)

Real design tokens extracted from production SaaS sites using [Dembrandt](https://github.com/dembrandt/dembrandt). Not guesses. Not AI-generated palettes. The actual colors, fonts, spacing, and border radii that Stripe, Linear, Vercel, Notion, Supabase, Resend, and 194 other successful products use.

Five vibe presets match tokens to your product:

| Vibe | Palette | Best For |
|------|---------|----------|
| **Minimal Clean** | Light background, muted accent, generous whitespace | Fintech, B2B, Enterprise |
| **Bold Modern** | Vibrant accent, high contrast, energetic | SaaS, Startups, Marketing tools |
| **Dark Premium** | Dark background, glow accent, polished | Dev tools, AI products, Infrastructure |
| **Playful Creative** | Colorful, warm, rounded | Consumer apps, Design tools, Education |
| **Enterprise Trust** | Navy/gray, conservative, serious | Security, Compliance, Healthcare |

Or skip presets entirely: say **"make it look like linear.app"** and Shippage extracts tokens from the live site.

### Effects Budget System

Maximum 3 premium effects per page. No more. This is enforced.

1. ONE hero background effect (Aurora, Particles, Dot Pattern, Beams, Lamp, etc.)
2. ONE headline text effect (Animated Gradient Text, Typewriter, Text Generate, etc.)
3. ONE CTA/section effect (Shimmer Button, Marquee, Moving Border, Number Ticker, etc.)

Scroll reveals, hover states, and stagger animations are always included and do not count toward the budget. CSS fallbacks are defined for every premium effect so the page degrades gracefully if a dependency fails to install.

### Conversion Tools (replaces $600+/year in SaaS subscriptions)

| Tool | Replaces | Savings |
|------|----------|---------|
| **Viral Waitlist** | GetWaitlist, Viral Loops, Prefinery | $15 to $69/mo |
| **Exit-Intent Popup** | OptinMonster, Sumo, Sleeknote | $7 to $299/mo |
| **Sticky CTA Bar** | Hello Bar, OptinMonster | $39 to $129/mo |
| **Cookie Consent** | Termly, Iubenda, CookieYes | $3 to $35/mo |
| **Legal Pages** | Termly, GetTerms, Iubenda | $3 to $35/mo |

### Legal Page Generator

Privacy Policy, Terms of Service, Cookie Policy, and Acceptable Use Policy generated from your intake data. Jurisdiction-specific compliance for GDPR (EU), CCPA/CPRA (California), PIPEDA (Canada), and LGPD (Brazil). The footer already links to `/privacy`, `/terms`, `/cookies`. This step creates the actual pages.

### SEO Assets

JSON-LD structured data (Organization, SoftwareApplication, FAQPage schemas) for Google rich results. FAQPage schema alone increases SERP real estate by 2 to 3x. Dynamic OG image templates for social shares. Sitemap.xml and robots.txt generated per framework conventions. All with XSS prevention via the `safeJsonLd()` helper.

### Automated QA

Every generated page runs through automated checks:

```bash
python3 scripts/qa-check.py --dir path/to/project
```

Checks mobile responsiveness, load performance (sub-2.5s LCP target), conversion pattern compliance, accessibility (WCAG 2.1 AA), SEO fundamentals, effects budget compliance, and security headers.

<br>

## The 9-Step Process

Nothing is skipped. Nothing is optional. Every page goes through this sequence:

| Step | What Happens |
|------|-------------|
| **1. Intake** | Quick mode (product name + one-liner) or guided mode (8 structured questions) |
| **2. Design System** | Match design tokens from the 200+ site database, or extract live from any URL |
| **3. Section Selection** | Pick 6 to 9 sections based on awareness level, CTA goal, and social proof availability |
| **4. Copy Generation** | Write every headline, subheadline, CTA, feature description, and FAQ answer |
| **5. Effects Selection** | Choose up to 3 premium effects within the budget, matched to vibe |
| **6. Assembly** | Build the full project structure adapted to your framework |
| **7. Legal Pages** | Generate privacy policy, terms, cookie policy with jurisdiction-specific compliance |
| **8. SEO Assets** | Add JSON-LD schemas, OG image template, sitemap, robots.txt |
| **9. QA Pass** | Run automated checks for mobile, performance, conversion, accessibility, and SEO |

<br>

## Who This Is For

**You can code but you can't write copy.** You've been staring at a blank hero section for three days. You know React and Tailwind inside out, but you cannot write a headline that makes someone want to sign up. The page looks fine. It just doesn't convert.

**You're pre-launch with nothing to show.** No screenshots. No testimonials. No logo bar. No metrics. Every landing page template assumes you have social proof. You don't. You need a page that sells without it.

**You're already in your terminal.** You use Claude Code for product development. Switching to Framer, Webflow, or v0 to build a landing page is a context switch that costs you hours. You want to stay where you are and get a deployable page without opening another tab.

**You don't want another subscription.** v0 is $20/mo. Framer is $10 to $100/mo per site. OptinMonster is $7 to $82/mo. Termly is $10 to $20/mo. This skill is free, generates code you own, and doesn't burn credits when something goes wrong.

<br>

## The Data Moat

Other tools give you pixels. Shippage gives you the brain behind the pixels.

| Data Asset | What It Encodes | Size | Replaces |
|---|---|---|---|
| **Copy Engine** | VoC methodology, 40+ headline formulas, awareness-level calibration, first-person CTA rules (+90%), social proof cascade, risk reversal, anti-AI bans | 1,000+ lines | $3K-5K copywriter |
| **Design Token DB** | Typography, color, spacing from 200 real SaaS sites. 8px grid, 60-30-10 color rule, Major Third type scale | 11,773 lines | $5K-15K designer |
| **Conversion Sequence** | 7-step arc, section ordering by awareness, CTA placement data (+682% centered), single-offer focus (+266%) | Logic + data | $10K/mo CRO agency |
| **Production Extras** | Legal pages, cookie CMP, exit-intent, JSON-LD, OG images, sitemap, analytics, scroll tracking | 18 templates | $600+/yr in SaaS |
| **Pre-Launch Intel** | Zero-proof strategies, waitlist, founder story, traction signals, beta badges | Full workflow | No equivalent |

<br>

## Compared to Alternatives

| | Shippage | v0.dev | ShipFast | Magic UI Pro | Framer |
|---|---|---|---|---|---|
| **Conversion copy** | 1,000+ lines, data-backed | No | No | Placeholder text | No |
| **Social proof cascade** | 5-position system | No | No | No | No |
| **Risk reversal on CTAs** | Auto per CTA type | No | No | No | No |
| **Pre-launch mode** | Zero-proof strategy | No | No | No | No |
| **Design tokens** | 200+ real SaaS sites | Same every time | 1 template | Tailwind defaults | Gallery |
| **Exit-intent + popups** | Built in, A/B tested | No | No | No | No |
| **Legal pages** | GDPR/CCPA generators | No | No | No | No |
| **Cookie consent** | Full CMP | No | No | No | No |
| **SEO** | JSON-LD + OG + sitemap | Basic meta | Basic meta | No | Limited |
| **Frameworks** | 6 | Next.js only | Next.js only | React only | Proprietary |
| **Price** | **Free** | $20/mo | $199 | $199 | $10-100/mo |
| **Own the code** | Yes | Yes | Yes | Yes | No |

<br>

## Why Not Just Use v0?

v0 generates components. Shippage generates **pages that sell**.

v0 has no copy system — it writes "leverage your potential" and calls it a headline. No design token database — same Inter + purple gradient every time. No conversion strategy — just "a page with sections." No exit-intent popups, no cookie consent, no legal pages, no analytics wiring. And it locks you into Next.js at $20/mo.

Shippage is free, runs in your terminal, supports 6 frameworks, writes real conversion copy using 1,000+ lines of A/B-tested formulas, and handles all the production details (GDPR compliance, SEO schemas, A/B tested popups) that v0 leaves for you to figure out.

<br>

## Built for Indie Hackers

Launching a SaaS? This skill handles the problems you're avoiding:

- **No copywriting skills?** 629 lines of conversion-tested copy rules write your headlines, subheadlines, CTAs, and feature descriptions using outcome language, not AI slop
- **No design eye?** Real design tokens extracted from 200+ successful SaaS sites (Stripe, Linear, Vercel, Notion, and 196 more)
- **No screenshots yet?** Pre-launch mode generates gradient placeholders, architecture diagrams, and founder story sections instead
- **No social proof?** Waitlist counters, GitHub stars, beta badges, and founder credibility sections replace logo bars and testimonials
- **No budget?** Free. No credits. No subscription. Code you own.

<br>

## Project Structure

```
shippage/
├── SKILL.md                          # Skill definition (Claude Code loads this)
├── LICENSE                           # MIT
│
├── references/
│   ├── section-defaults.md           # Shared tokens, animation, a11y, mobile rules
│   ├── framework-adapters.md         # Framework adaptation + CSP + analytics + SEO
│   ├── conversion-copy.md            # 629 lines of copy rules and formulas
│   ├── effects-catalog.md            # All effects with install, usage, and CSS fallbacks
│   ├── design-tokens-db.json         # 200+ site token database
│   ├── waitlist-api.md               # Viral waitlist backend (Vercel KV, Supabase, JSON)
│   ├── legal-pages.md                # Legal page generators (4 document types)
│   │
│   └── sections/                     # 17 section templates
│       ├── navbar.md                 # Navigation with conversion CTA
│       ├── hero-centered.md          # Full-width hero with centered copy
│       ├── hero-split.md             # Hero with screenshot/demo alongside copy
│       ├── social-proof-logos.md      # Logo bar, metrics, traction signals
│       ├── pain-points.md            # Problem agitation
│       ├── features-alternating.md   # Feature rows with alternating layout
│       ├── features-bento.md         # Bento grid feature showcase
│       ├── how-it-works.md           # 3-step process explanation
│       ├── testimonials.md           # Customer quotes with attribution
│       ├── comparison-table.md       # Competitor comparison
│       ├── pricing.md                # Pricing tiers
│       ├── faq.md                    # FAQ with objection handling
│       ├── cta-footer.md             # Final conversion CTA
│       ├── contact-form.md           # Lead capture with spam protection
│       ├── waitlist.md               # Viral waitlist component
│       ├── exit-intent-popup.md      # Exit-intent popup with A/B testing
│       ├── sticky-cta-bar.md         # Sticky CTA bar
│       └── cookie-consent.md         # GDPR/CCPA cookie consent banner
│
├── scripts/
│   ├── extract-tokens.sh             # Batch token extraction via Dembrandt
│   ├── parse-tokens.py               # Normalize raw tokens to CSS custom properties
│   ├── select-design-system.py       # Query token DB by industry + vibe
│   ├── select-sections.py            # Select section variants for a page
│   ├── detect-stack.sh               # Detect existing project framework
│   └── qa-check.py                   # Automated QA (mobile, perf, a11y, SEO)
│
└── sites/
    └── sites.txt                     # 200+ curated SaaS sites by industry
```

<br>

## Tech Stack

Default output uses:

| Technology | Role |
|-----------|------|
| [React](https://react.dev) | UI framework (or your framework of choice) |
| [Tailwind CSS](https://tailwindcss.com) | Styling via design tokens |
| [Framer Motion](https://motion.dev) | Animation and scroll effects |
| [shadcn/ui](https://ui.shadcn.com) | Base component library |
| [Magic UI](https://magicui.design) + [Aceternity UI](https://ui.aceternity.com) | Premium effects |
| [Lucide React](https://lucide.dev) | Icons |
| TypeScript | Type safety throughout |

<br>

## Contributing

### Add design tokens from a new site

1. Add the URL to `sites/sites.txt` under the right industry heading
2. Run `./scripts/extract-tokens.sh --site [url]`
3. Verify the output, submit a PR

### Add a new section template

1. Create a `.md` file in `references/sections/`
2. Follow existing format: Conversion Job, Desktop Layout, Mobile Layout, Copy Structure, Section-Specific Notes, Complete JSX Template
3. Start with `> Defaults: See section-defaults.md` and only include section-specific overrides

### Add a new effect

1. Add the entry to `references/effects-catalog.md`
2. Include source, vibe tags, mobile behavior, performance weight, and CSS fallback
3. Provide complete install and usage code with TypeScript types

<br>

## Credits

[Dembrandt](https://github.com/dembrandt/dembrandt) for design token extraction from live sites.
[shadcn/ui](https://ui.shadcn.com), [Magic UI](https://magicui.design), [Aceternity UI](https://ui.aceternity.com) for component libraries.
[Framer Motion](https://motion.dev) for animation. [Lucide](https://lucide.dev) for icons.

<br>

## License

MIT. See [LICENSE](LICENSE).
