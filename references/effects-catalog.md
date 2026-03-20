# Effects Catalog -- Open-Source Animation Library

> Sources: [Aceternity UI](https://ui.aceternity.com) | [Magic UI](https://magicui.design)
> License: MIT | React + Tailwind CSS + Framer Motion | Copy-paste ready

---

## CRITICAL RULE: Maximum 3 Premium Effects Per Page

1. **ONE** hero background effect
2. **ONE** headline text effect *(optional)*
3. **ONE** CTA / section effect *(optional)*

Everything else = **Universal Motion** primitives (Section 4). Those lightweight
scroll reveals and hover states are always included and do NOT count toward the budget.

---

## 1. Hero Background Effects (pick ONE)

| Effect | Source | Vibe | Mobile | Perf |
|--------|--------|------|--------|------|
| Wavy Background | Aceternity | playful, creative | simplified | medium |
| Aurora Background | Aceternity | premium, dark, AI | simplified | medium |
| Background Beams | Aceternity | dark, technical | works | medium |
| Dot Pattern | Magic UI | minimal, clean | works | light |
| Grid Pattern | Magic UI | technical, dev-tools | works | light |
| Particles | Magic UI | ambient, dark | reduced count | medium |
| Meteors | Magic UI | dramatic, dark, AI | reduced count | medium |
| Sparkles | Aceternity | playful, creative | reduced count | medium |
| Lamp Effect | Aceternity | Linear-style, dark | works | light |
| BG Gradient Animation | Aceternity | colorful, energetic | works | light |
| Vortex Background | Aceternity | swirly, bold | DISABLE | heavy |
| None (solid/gradient) | N/A | enterprise, minimal | N/A | none |

### Wavy Background
Install: Copy from `https://ui.aceternity.com/components/wavy-background`
```tsx
<WavyBackground colors={["#38bdf8","#818cf8","#c084fc"]} waveWidth={50} blur={10} speed="fast" waveOpacity={0.5}>
  <h1 className="text-4xl font-bold text-white">Your Headline</h1>
</WavyBackground>
```

### Aurora Background
Install: Copy from `https://ui.aceternity.com/components/aurora-background`
```tsx
<AuroraBackground>
  <div className="relative z-10 flex flex-col items-center gap-4">
    <h1 className="text-5xl font-bold text-white">Ship faster with AI</h1>
  </div>
</AuroraBackground>
```

### Background Beams
Install: Copy from `https://ui.aceternity.com/components/background-beams`
```tsx
<div className="relative h-screen w-full bg-neutral-950">
  <div className="relative z-10 flex items-center justify-center h-full"><h1 className="text-5xl font-bold text-white">Your Headline</h1></div>
  <BackgroundBeams />
</div>
```

### Dot Pattern
Install: `npx shadcn@latest add "https://magicui.design/r/dot-pattern"`
```tsx
<DotPattern className="[mask-image:radial-gradient(500px_circle_at_center,white,transparent)]" />
```

### Grid Pattern
Install: `npx shadcn@latest add "https://magicui.design/r/grid-pattern"`
```tsx
<GridPattern width={40} height={40} className="[mask-image:radial-gradient(600px_circle_at_center,white,transparent)]" />
```

### Particles
Install: `npx shadcn@latest add "https://magicui.design/r/particles"`
```tsx
<Particles className="absolute inset-0" quantity={100} color="#ffffff" ease={80} refresh />
```
Mobile: Pass `quantity={50}` on viewports < 768px.

### Meteors
Install: `npx shadcn@latest add "https://magicui.design/r/meteors"`
```tsx
<Meteors number={20} />
```
Mobile: Pass `number={10}` on viewports < 768px.

### Sparkles
Install: Copy from `https://ui.aceternity.com/components/sparkles`
```tsx
<SparklesCore id="hero-sparkles" background="transparent" minSize={0.6} maxSize={1.4}
  particleDensity={80} particleColor="#FFFFFF" className="absolute inset-0" />
```
Mobile: Set `particleDensity={40}` on smaller viewports.

### Lamp Effect
Install: Copy from `https://ui.aceternity.com/components/lamp-effect`
```tsx
<LampContainer>
  <h1 className="mt-8 text-4xl font-medium text-white">Build with confidence</h1>
</LampContainer>
```

### Background Gradient Animation
Install: Copy from `https://ui.aceternity.com/components/background-gradient-animation`
```tsx
<BackgroundGradientAnimation>
  <div className="relative z-10 flex items-center justify-center h-full">
    <h1 className="text-5xl font-bold text-white">Energetic vibes</h1>
  </div>
</BackgroundGradientAnimation>
```

### Vortex Background
Install: Copy from `https://ui.aceternity.com/components/vortex`
```tsx
<Vortex backgroundColor="black" rangeY={800} particleCount={500} className="flex items-center justify-center h-screen">
  <h1 className="text-5xl font-bold text-white">Go bold</h1>
</Vortex>
```
Mobile: Replace with static gradient fallback on viewports < 768px.

### None (solid or gradient)
```tsx
<section className="h-screen bg-gradient-to-b from-white to-neutral-50 dark:from-neutral-950 dark:to-neutral-900">
  {/* content */}
</section>
```

---

## 2. Text Effects (pick ONE or none)

| Effect | Source | Usage |
|--------|--------|-------|
| Animated Gradient Text | Magic UI | Highlight key word in headline |
| Text Generate Effect | Aceternity | Headline appears word by word |
| Typewriter Effect | Aceternity | Rotating words in headline |
| Number Ticker | Magic UI | Animated counting for metrics |

### Animated Gradient Text
Install: `npx shadcn@latest add "https://magicui.design/r/animated-gradient-text"`
```tsx
<h1 className="text-5xl font-bold">
  Ship your SaaS <AnimatedGradientText className="inline">10x faster</AnimatedGradientText>
</h1>
```

### Text Generate Effect
Install: Copy from `https://ui.aceternity.com/components/text-generate-effect`
```tsx
<TextGenerateEffect words="The platform that scales with your ambition" className="text-5xl font-bold" />
```

### Typewriter Effect
Install: Copy from `https://ui.aceternity.com/components/typewriter-effect`
```tsx
<TypewriterEffect words={[{ text: "Build" }, { text: "amazing" }, { text: "products", className: "text-blue-500" }]} />
```

### Number Ticker
Install: `npx shadcn@latest add "https://magicui.design/r/number-ticker"`
```tsx
<NumberTicker value={10000} className="text-4xl font-bold" />
<NumberTicker value={99.9} decimalPlaces={1} className="text-4xl font-bold" />
```

---

## 3. CTA / Section Effects (pick ONE or none)

| Effect | Source | Usage |
|--------|--------|-------|
| Shimmer Button | Magic UI | Glowing primary CTA button |
| Moving Border | Aceternity | Animated border on CTA or cards |
| Marquee | Magic UI | Infinite-scroll logo strip |
| Infinite Moving Cards | Aceternity | Auto-scrolling testimonial cards |
| Animated Beam | Magic UI | Connecting lines between elements |
| Bento Grid | Magic UI / Aceternity | Feature showcase grid |

### Shimmer Button
Install: `npx shadcn@latest add "https://magicui.design/r/shimmer-button"`
```tsx
<ShimmerButton className="shadow-2xl" shimmerColor="#ffffff" shimmerSize="0.1em">
  <span className="text-sm font-medium text-white">Get Started Free</span>
</ShimmerButton>
```

### Moving Border
Install: Copy from `https://ui.aceternity.com/components/moving-border`
```tsx
<Button borderRadius="1.75rem" className="bg-white dark:bg-neutral-900 text-black dark:text-white">
  Start Building
</Button>
```

### Marquee
Install: `npx shadcn@latest add "https://magicui.design/r/marquee"`
```tsx
<Marquee pauseOnHover className="[--duration:30s]">
  {logos.map((logo) => (
    <img key={logo.name} src={logo.src} alt={logo.name} className="h-8 mx-8 grayscale hover:grayscale-0 transition" />
  ))}
</Marquee>
```

### Infinite Moving Cards
Install: Copy from `https://ui.aceternity.com/components/infinite-moving-cards`
```tsx
<InfiniteMovingCards items={testimonials} direction="right" speed="slow" className="py-8" />
```

### Animated Beam
Install: `npx shadcn@latest add "https://magicui.design/r/animated-beam"`
```tsx
<AnimatedBeam containerRef={containerRef} fromRef={sourceRef} toRef={targetRef} />
```

### Bento Grid
Install: `npx shadcn@latest add "https://magicui.design/r/bento-grid"`
```tsx
<BentoGrid className="max-w-5xl mx-auto">
  <BentoCard name="Analytics" description="Real-time insights" className="col-span-2" Icon={ChartIcon} href="/features/analytics" cta="Learn more" />
  <BentoCard name="Security" description="Enterprise-grade" Icon={ShieldIcon} href="/features/security" cta="Learn more" />
</BentoGrid>
```

---

## 4. Universal Motion (always included -- NOT counted in the 3-effect budget)

### Entrance Animation Library — mix 3-4 per page for variety

See `section-defaults.md → Scroll Animation` for the full library (fadeUp, blurIn, scaleUp,
slideLeft, slideRight, clipReveal) and the section → animation mapping table.

**Key rule**: Never use the same entrance animation on every section. Vary them.

### Stagger Children — items reveal sequentially
```tsx
const stagger = (delay = 0.08) => ({
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: delay, delayChildren: 0.1 } },
});
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.4, 0.25, 1] as const } },
};
```

### Hero Parallax — scroll-linked fade + translate
```tsx
import { useScroll, useTransform, motion } from "framer-motion";
const ref = useRef(null);
const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

<section ref={ref}>
  <motion.div style={{ y, opacity }}>{/* hero content */}</motion.div>
</section>
```

### Button Hover — scale + glow
```tsx
<motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
  transition={{ duration: 0.15, ease: [0.25, 0.4, 0.25, 1] as const }}
  className="rounded-lg bg-primary px-6 py-3 text-white
    shadow-[0_0_20px_-3px_hsl(var(--primary)/0.4)]
    hover:shadow-[0_0_30px_-3px_hsl(var(--primary)/0.6)]
    hover:brightness-110 transition-all duration-300">
  Get Started
</motion.button>
```

### Card Hover — lift + colored glow + border highlight
```tsx
<motion.div whileHover={{ y: -4 }} transition={{ duration: 0.2 }}
  className="group rounded-xl border border-border bg-card p-6
    shadow-sm hover:shadow-[0_0_30px_-5px_hsl(var(--primary)/0.15)]
    hover:border-primary/30 transition-all duration-300">
  {/* card content */}
</motion.div>
```

### Link Hover — underline slide-in, 150ms
```css
.link-hover { position: relative; transition: color 150ms ease; }
.link-hover::after { content: ""; position: absolute; bottom: -2px; left: 0; width: 0; height: 2px;
  background: currentColor; transition: width 150ms ease; }
.link-hover:hover::after { width: 100%; }
```

### Logo Strip Hover — grayscale to full color
```tsx
<img className="h-8 grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-200" />
```

### Focus Rings
```css
*:focus-visible { outline: 2px solid hsl(var(--primary)); outline-offset: 2px; border-radius: 4px; }
```

### Animated Number Counter — scroll-triggered
```tsx
function Counter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  useEffect(() => {
    if (!inView) return;
    let current = 0;
    const step = target / 40;
    const id = setInterval(() => {
      current += step;
      if (current >= target) { setCount(target); clearInterval(id); }
      else setCount(Math.floor(current));
    }, 37);
    return () => clearInterval(id);
  }, [inView, target]);
  return <span ref={ref}>{count}{suffix}</span>;
}
```

---

## 5. Vibe to Effects Quick Reference

```
Vibe                  Hero Background           Text Effect        CTA / Section
---                   ---------------           -----------        -------------
Minimal Clean         DotPattern                none               plain Button
Bold Modern           Particles                 GradientText       ShimmerButton
Dark Premium          AuroraBackground          TextGenerate       MovingBorder
Playful Creative      WavyBackground            TypewriterEffect   ShimmerButton
Enterprise Trust      none (subtle gradient)    none               plain Button
Technical Dev-Tools   GridPattern               GradientText       AnimatedBeam
AI / ML Product       BackgroundBeams           TextGenerate       ShimmerButton
Dramatic Launch       Meteors                   TypewriterEffect   MovingBorder
```

---

## 6. Performance Rules

### Dynamic Imports (no SSR for canvas/WebGL effects)

**Next.js:**
```tsx
import dynamic from "next/dynamic";
const AuroraBackground = dynamic(() => import("@/components/ui/aurora-background"), {
  ssr: false, loading: () => <div className="h-screen bg-neutral-950" />,
});
```

**Vite / Remix / other:**
```tsx
import { lazy, Suspense } from "react";
const AuroraBackground = lazy(() => import("@/components/ui/aurora-background"));
// Wrap in <Suspense fallback={<div className="h-screen bg-neutral-950" />}>
```

### Mobile Optimization
- Reduce particle counts by 50% on viewports < 768px
- Disable Vortex entirely on mobile (replace with gradient)
- Simplify Wavy Background to fewer wave layers
```tsx
import { useMediaQuery } from "@/hooks/use-media-query";
function HeroBackground() {
  const isMobile = useMediaQuery("(max-width: 768px)");
  return <Particles quantity={isMobile ? 50 : 100} />;
}
```

### Accessibility
- All decorative effects: `aria-hidden="true"`
- Respect `prefers-reduced-motion` -- disable ALL animations
```tsx
const prefersReducedMotion = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
<motion.div initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }} whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }} viewport={{ once: true }} />
```
```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after { animation-duration: 0.01ms !important; animation-iteration-count: 1 !important; transition-duration: 0.01ms !important; scroll-behavior: auto !important; }
}
```

### LCP Protection
- Background effects: `position: absolute; z-index: 0` -- content above at `z-index: 10`
- Effects must not block the Largest Contentful Paint element
- Use `loading` fallback in dynamic imports to prevent layout shift

### Performance Budget
| Metric | Target |
|--------|--------|
| LCP | < 2.5s |
| CLS | < 0.1 |
| FID | < 100ms |
| Effect JS bundle | < 50KB per effect |
| Total animation JS | < 120KB |

---

## 7. CSS Fallback Map

When a premium effect fails to install or causes errors, use these CSS-only replacements.
The page must look good with zero JS effects.

### Background Effects

| Effect | CSS Fallback |
|--------|-------------|
| Aurora Background | `bg-gradient-to-br from-indigo-950 via-purple-900 to-blue-950` with `animate-gradient` keyframe |
| Wavy Background | `bg-gradient-to-r from-sky-400/20 via-violet-400/20 to-fuchsia-400/20` with subtle pulse |
| Background Beams | `bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent` |
| Dot Pattern | `bg-[radial-gradient(circle,hsl(var(--primary)/0.06)_1px,transparent_1px)] bg-[size:24px_24px]` |
| Grid Pattern | `bg-[linear-gradient(hsl(var(--border)/0.3)_1px,transparent_1px),linear-gradient(90deg,hsl(var(--border)/0.3)_1px,transparent_1px)] bg-[size:40px_40px]` |
| Particles | `bg-[radial-gradient(circle_at_20%_50%,hsl(var(--primary)/0.05),transparent_50%)]` with multiple positioned radials |
| Meteors | `bg-gradient-to-b from-transparent via-primary/5 to-transparent` |
| Sparkles | Same as Particles fallback |
| Lamp Effect | `bg-[conic-gradient(from_230deg,transparent_0%,hsl(var(--primary)/0.15)_10%,transparent_20%)]` |
| BG Gradient Animation | `bg-gradient-to-r from-primary/20 via-accent/20 to-primary/20` (static) |
| Vortex Background | `bg-gradient-to-br from-neutral-950 via-indigo-950 to-neutral-950` |

### Text Effects

| Effect | CSS Fallback |
|--------|-------------|
| Animated Gradient Text | `bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent` (static gradient) |
| Text Generate Effect | Standard fade-in: `initial={{ opacity: 0 }} animate={{ opacity: 1 }}` with Framer Motion |
| Typewriter Effect | Static text with blinking cursor: `border-r-2 border-foreground animate-pulse` |
| Number Ticker | Static number (no animation) |

### CTA / Section Effects

| Effect | CSS Fallback |
|--------|-------------|
| Shimmer Button | `relative overflow-hidden` with `after:absolute after:inset-0 after:bg-gradient-to-r after:from-transparent after:via-white/10 after:to-transparent after:animate-shimmer` |
| Moving Border | `ring-2 ring-primary/50 ring-offset-2` (static ring) |
| Marquee | CSS `@keyframes marquee { from { transform: translateX(0) } to { transform: translateX(-50%) } }` on duplicated content |
| Infinite Moving Cards | Same as Marquee fallback applied to card container |
| Animated Beam | Static `border-l-2 border-primary/30` connecting line |
| Bento Grid | Standard CSS Grid layout without animation |

### Shimmer Keyframe (add to globals.css)
```css
@keyframes shimmer {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
}
.animate-shimmer { animation: shimmer 2s infinite; }
```

### Gradient Animation Keyframe (add to globals.css)
```css
@keyframes gradient-shift {
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
}
.animate-gradient {
  background-size: 200% 200%;
  animation: gradient-shift 8s ease infinite;
}
```

### Fallback Implementation Pattern
```tsx
// Next.js: try premium effect, fall back to CSS
import dynamic from "next/dynamic";
const AuroraBackground = dynamic(
  () => import("@/components/ui/aurora-background"),
  {
    ssr: false,
    loading: () => (
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-950 via-purple-900 to-blue-950 animate-gradient" />
    ),
  }
);

// Vite / generic: try import, catch with CSS fallback
let HeroBackground: React.ComponentType<{ children: React.ReactNode }>;
try {
  const mod = await import("@/components/ui/aurora-background");
  HeroBackground = mod.AuroraBackground;
} catch {
  HeroBackground = ({ children }) => (
    <div className="relative bg-gradient-to-br from-indigo-950 via-purple-900 to-blue-950 animate-gradient">
      {children}
    </div>
  );
}
```
