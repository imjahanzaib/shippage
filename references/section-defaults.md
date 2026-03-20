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

Standard stagger entrance when section enters viewport:

```tsx
// Container
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.12 },
  },
};

// Each child
const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};
```

- Trigger: `viewport={{ once: true, margin: "-80px" }}`
- `prefers-reduced-motion`: disable all `initial`/`animate`, render static

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

- Single column below 640px: `grid-cols-1`
- Padding: `px-4 py-12` (mobile) -> `px-6 py-16` (sm) -> `px-8 py-20` (lg)
- Body text: minimum 16px (`text-base`)
- CTA buttons: `w-full` on mobile, `w-auto` on `sm:`
- Nav collapses to hamburger below `md`
- Stacked cards get `gap-6` on mobile, `gap-8` on desktop

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

## Component Stack

```
shadcn/ui:       Button, Card, Accordion, Switch, Badge, Input, Sheet
Lucide React:    ArrowRight, Check, X, Zap, Shield, Menu, Sparkles, etc.
Framer Motion:   motion.div, useInView, AnimatePresence
Install:         npx shadcn@latest init && npx shadcn@latest add [components]
```
