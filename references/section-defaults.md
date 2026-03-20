# Section Defaults

> Shared rules for all 18 section templates. Each template inherits everything below
> unless it explicitly overrides a rule. Templates only document what is **unique**.

---

## Design Tokens (Tailwind semantic classes)

```
Background:           bg-background
Card:                 bg-card
Muted surface:        bg-muted
Primary:              bg-primary
Foreground text:      text-foreground
Muted text:           text-muted-foreground
Primary text:         text-primary / text-primary-foreground
Border:               border-border
Accent:               bg-accent / text-accent-foreground
Destructive:          bg-destructive / text-destructive-foreground
```

All tokens map to CSS custom properties defined in the project's `globals.css`.
Never hard-code color values — always use semantic classes so themes work.

### Typography Scale (Research-Backed Defaults)

Maximum 2 font families per page. Characters per line: 66 optimal (`max-w-prose`).
Content over 80 characters/line is skipped 41% more (Baymard Institute).

| Element | Desktop | Mobile | Line Height | Weight |
|---------|---------|--------|-------------|--------|
| H1 (hero) | `text-5xl` (48px) to `text-7xl` (72px) | `text-4xl` (36px) | 1.1 | bold (700) |
| H2 (section) | `text-3xl` (30px) to `text-4xl` (36px) | `text-2xl` (24px) | 1.2 | bold (700) |
| H3 (cards) | `text-lg` (18px) to `text-xl` (20px) | `text-lg` (18px) | 1.3 | semibold (600) |
| Body | `text-base` (16px) to `text-lg` (18px) | `text-base` (16px) | 1.5-1.7 | normal (400) |
| CTA text | `text-sm` (14px) to `text-base` (16px) | `text-sm` (14px) | 1.0 | semibold (600) |
| Captions | `text-sm` (14px) | `text-sm` (14px) | 1.4 | normal (400) |

Use `clamp()` for fluid scaling: `font-size: clamp(1.75rem, 3vw + 1rem, 3.125rem)`

### Spacing Scale (8px Grid)

| Token | Value | Usage |
|-------|-------|-------|
| Section padding | 96px desktop / 64px tablet / 48px mobile | `py-12 sm:py-16 lg:py-24` |
| Container max-width | 1200px | `max-w-6xl` |
| Card padding | 24-32px | `p-6` or `p-8` |
| Card gap | 24px desktop / 16-20px mobile | `gap-6` |
| Border radius (buttons) | 8px | `rounded-lg` |
| Border radius (cards) | 12px | `rounded-xl` |
| Border radius (inputs) | 6px | `rounded-md` |

### Color Rules

- **60-30-10 rule**: 60% dominant (background), 30% secondary (cards/surfaces), 10% accent (CTAs)
- **3-5 total colors** including neutrals. Simpler schemes preferred.
- **CTA contrast**: CTA button must be highest-contrast element on every viewport. The Von Restorff
  effect (isolation) is what drives clicks, not any specific color.
- **Contrast minimums**: 4.5:1 for normal text (WCAG AA), 3:1 for large text.
- **Dark mode**: 82% of mobile users prefer it. Pages matching system preference see 14% lower bounce.

---

## Hover Patterns

| Element    | Hover                                                                 |
|------------|-----------------------------------------------------------------------|
| Cards      | `hover:shadow-lg hover:-translate-y-1 transition-all duration-300`    |
| Buttons    | `hover:brightness-110` + `whileHover={{ scale: 1.02 }}` + `whileTap={{ scale: 0.98 }}` |
| Links      | `hover:text-foreground transition-colors duration-200`                |
| Icons      | `group-hover:scale-110 transition-all duration-300`                   |
| Outline btn| `hover:bg-muted hover:border-border/80 transition-colors duration-200`|

Touch devices: rely on `active:` states, not hover.

---

## Scroll Animation

### Entrance Variants — pick per section type for visual variety

Never use the same entrance animation for every section. Mix 3-4 variants across the page.

```tsx
// 1. FADE-UP (default) — cards, features, FAQ items
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.4, 0.25, 1] } },
};

// 2. BLUR-IN — hero headline, section headings, key CTAs
const blurIn = {
  hidden: { opacity: 0, filter: "blur(12px)", y: 8 },
  show: { opacity: 1, filter: "blur(0px)", y: 0, transition: { duration: 0.7, ease: [0.25, 0.4, 0.25, 1] } },
};

// 3. SCALE-UP — social proof stats, pricing cards, testimonial cards
const scaleUp = {
  hidden: { opacity: 0, scale: 0.92 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: [0.25, 0.4, 0.25, 1] } },
};

// 4. SLIDE-FROM-LEFT — alternating features (odd items)
const slideLeft = {
  hidden: { opacity: 0, x: -40 },
  show: { opacity: 1, x: 0, transition: { duration: 0.6, ease: [0.25, 0.4, 0.25, 1] } },
};

// 5. SLIDE-FROM-RIGHT — alternating features (even items)
const slideRight = {
  hidden: { opacity: 0, x: 40 },
  show: { opacity: 1, x: 0, transition: { duration: 0.6, ease: [0.25, 0.4, 0.25, 1] } },
};

// 6. CLIP-REVEAL — comparison table, how-it-works connectors
const clipReveal = {
  hidden: { opacity: 0, clipPath: "inset(10% 0 10% 0)" },
  show: { opacity: 1, clipPath: "inset(0% 0 0% 0)", transition: { duration: 0.6, ease: [0.25, 0.4, 0.25, 1] } },
};

// Container with stagger
const stagger = (delay = 0.08) => ({
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: delay, delayChildren: 0.1 } },
});
```

### Section → Animation Map

| Section | Heading | Cards/Items | Images |
|---------|---------|-------------|--------|
| Hero | blurIn | — | scaleUp |
| Social Proof | fadeUp | scaleUp | — |
| Pain Points | blurIn | fadeUp (stagger) | — |
| Features (bento) | blurIn | scaleUp (stagger) | — |
| Features (alt.) | blurIn | slideLeft/slideRight | scaleUp |
| How It Works | blurIn | fadeUp (stagger) | clipReveal |
| Testimonials | fadeUp | scaleUp (stagger) | — |
| Comparison | blurIn | clipReveal | — |
| Pricing | blurIn | scaleUp (stagger) | — |
| FAQ | fadeUp | fadeUp (stagger) | — |
| Contact Form | blurIn | slideLeft (info) / slideRight (form) | — |
| CTA Footer | blurIn | scaleUp | — |

- Trigger: `viewport={{ once: true, margin: "-80px" }}`
- `prefers-reduced-motion`: disable all `initial`/`animate`, render static
- Easing: always use cubic-bezier `[0.25, 0.4, 0.25, 1]` — NOT "easeOut" string (avoids TS errors)

---

## Accessibility

- Wrap in `<section aria-labelledby="[section]-heading">`
- Decorative elements: `aria-hidden="true"`
- Focus ring: `focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2`
- Heading hierarchy: `h1` (hero only) -> `h2` (section) -> `h3` (cards/items)
- Touch targets: minimum 44px
- Color contrast: 4.5:1 AA minimum on all text
- `prefers-reduced-motion`: all Framer Motion animations disabled

---

## Mobile-First Rules

79% of SaaS landing page visits are mobile, but mobile converts 40-51% worse.
These rules close that gap. A mobile-first signup redesign lifted mobile conversion
156% and desktop 43% simultaneously.

- Single column below 640px: `grid-cols-1`
- Padding: `px-4 py-12` (mobile) -> `px-6 py-16` (sm) -> `px-8 py-20 lg:py-24` (lg)
- Body text: minimum 16px (`text-base`), 17px on iOS to prevent auto-zoom on inputs
- CTA buttons: `w-full` on mobile, `w-auto` on `sm:` — lower-center thumb zone
- Touch targets: minimum 44x44px (Apple HIG) / 48x48dp (Material), 8-12px spacing between
- Nav collapses to hamburger below `md`
- Stacked cards get `gap-6` on mobile, `gap-8` on desktop
- Hero CTA must be visible without scrolling on mobile (above the fold)
- Reduce form fields on mobile: pages under 10 elements convert 2x vs 40+ elements
- Container: `max-w-6xl` (1152px) content area within `max-w-7xl` (1280px) page

---

## Performance Budget

| Metric             | Target        |
|--------------------|---------------|
| Section JS         | < 5KB each    |
| Total animation JS | < 120KB       |
| LCP (hero)         | < 2.5s        |
| CLS                | 0             |

- Use `transform` + `opacity` only (GPU-composited)
- Reserve space for images (`width`/`height` attributes)
- Background effects: dynamic import with fallback
- Critical text content renders without JS (SSR-safe)

---

## Background Effects by Vibe

| Vibe               | Effect           | Source                       |
|--------------------|------------------|------------------------------|
| minimal-clean      | DotPattern       | Magic UI                     |
| bold-modern        | Particles        | Magic UI                     |
| dark-premium       | Aurora           | Aceternity UI                |
| playful-creative   | WavyBackground   | Aceternity UI                |
| enterprise-trust   | Subtle gradient  | Tailwind `bg-gradient-to-*`  |
| ai-ml              | BackgroundBeams  | Aceternity UI                |
| technical          | GridPattern      | Magic UI                     |

Render as `absolute inset-0 z-0` with content at `relative z-10`.
If import fails, fall back to CSS: `bg-[radial-gradient(circle,hsl(var(--primary)/0.03)_1px,transparent_1px)]`.

---

## Visual Polish (always include — these create the "wow factor")

### 1. Grain Texture Overlay
Add to layout or `globals.css`. Creates subtle film grain over the entire page:
```css
body::before {
  content: "";
  position: fixed;
  inset: 0;
  z-index: 9999;
  pointer-events: none;
  opacity: 0.03;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
}
```
Dark vibes: `opacity: 0.03`. Light vibes: `opacity: 0.02`. Enterprise: `opacity: 0.015`.

### 2. Glow Effects
Use behind hero content, CTA buttons, and feature cards:
```tsx
// Hero glow — large radial gradient behind headline
<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px]
  bg-primary/20 rounded-full blur-[120px] pointer-events-none" aria-hidden="true" />

// Card glow on hover — subtle colored shadow
<div className="group relative rounded-xl border border-border bg-card p-6 transition-all duration-300
  hover:shadow-[0_0_30px_-5px_hsl(var(--primary)/0.15)]">

// CTA button glow — always-on subtle glow
<button className="relative bg-primary text-primary-foreground px-8 py-3 rounded-lg
  shadow-[0_0_20px_-3px_hsl(var(--primary)/0.4)]
  hover:shadow-[0_0_30px_-3px_hsl(var(--primary)/0.6)] transition-shadow duration-300">
```

### 3. Section Transitions
Never use hard edges between sections. Use gradient fades:
```tsx
// Gradient divider between sections (place between sections)
<div className="h-24 bg-gradient-to-b from-background via-background to-muted/30" aria-hidden="true" />

// Or use an SVG curve divider
<svg className="w-full h-12 -mb-px text-muted/30" viewBox="0 0 1200 120" preserveAspectRatio="none">
  <path d="M0,120 C200,60 400,0 600,60 C800,120 1000,60 1200,120 L1200,120 L0,120 Z" fill="currentColor" />
</svg>
```
Alternate between `bg-background` and `bg-muted/30` sections (or `bg-card/50`) to create depth.

### 4. Frosted Glass (dark vibes + AI/ML)
For cards, modals, and sticky bars:
```tsx
<div className="rounded-xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-lg">
```
Light vibes: `border-black/5 bg-white/70 backdrop-blur-xl`

### 5. Colored Shadows
Use the brand primary color in shadows for depth:
```tsx
// Primary-tinted shadow for featured cards or CTAs
className="shadow-lg shadow-primary/10 hover:shadow-xl hover:shadow-primary/20 transition-shadow"

// Card depth layers (for pricing "recommended" card)
className="ring-2 ring-primary shadow-2xl shadow-primary/20 scale-[1.02]"
```

### 6. Animated Gradient Border
For highlighted cards or hero elements:
```css
.gradient-border {
  position: relative;
  border-radius: 12px;
  overflow: hidden;
}
.gradient-border::before {
  content: "";
  position: absolute;
  inset: 0;
  padding: 1px;
  border-radius: inherit;
  background: linear-gradient(135deg, hsl(var(--primary)), hsl(var(--accent)), hsl(var(--primary)));
  background-size: 200% 200%;
  animation: gradient-shift 4s ease infinite;
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
}
```

### 7. Scroll-Linked Animations
For hero sections — parallax and opacity fade on scroll:
```tsx
import { useScroll, useTransform, motion } from "framer-motion";
import { useRef } from "react";

function HeroParallax() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section ref={ref} className="relative min-h-screen overflow-hidden">
      <motion.div style={{ y, opacity }} className="relative z-10">
        {/* Hero content fades and slides as user scrolls */}
      </motion.div>
    </section>
  );
}
```

### 8. Number Counters with Scroll Trigger
For social proof stats — numbers animate from 0 when entering viewport:
```tsx
function AnimatedCounter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    const duration = 1500;
    const steps = 40;
    const increment = target / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) { setCount(target); clearInterval(timer); }
      else setCount(Math.floor(current));
    }, duration / steps);
    return () => clearInterval(timer);
  }, [inView, target]);

  return <span ref={ref}>{count}{suffix}</span>;
}
```

---

## Component Stack

```
shadcn/ui:       Button, Card, Accordion, Switch, Badge, Input, Sheet
Lucide React:    ArrowRight, Check, X, Zap, Shield, Menu, Sparkles, etc.
Framer Motion:   motion.div, useInView, useScroll, useTransform, AnimatePresence
Install:         npx shadcn@latest init && npx shadcn@latest add [components]
```
