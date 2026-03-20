import type { ShippageConfig } from "../utils/get-config.js";

/**
 * Returns the TSX source code for a given section.
 * Each section composes shadcn/ui + Magic UI primitives with
 * conversion-optimized structure baked in.
 *
 * These are starter templates — the Claude Code skill fills in
 * the actual copy and design tokens. Without the skill, users
 * get well-structured components with placeholder copy.
 */
export function getSectionSource(
  name: string,
  framework: ShippageConfig["framework"]
): string {
  const generators: Record<string, () => string> = {
    "navbar": () => navbar(framework),
    "hero-centered": () => heroCentered(framework),
    "hero-split": () => heroSplit(framework),
    "social-proof-logos": () => socialProofLogos(),
    "pain-points": () => painPoints(),
    "features-alternating": () => featuresAlternating(),
    "features-bento": () => featuresBento(),
    "how-it-works": () => howItWorks(),
    "testimonials": () => testimonials(),
    "comparison-table": () => comparisonTable(),
    "pricing": () => pricing(),
    "faq": () => faq(),
    "cta-footer": () => ctaFooter(),
    "contact-form": () => contactForm(),
    "waitlist": () => waitlist(),
    "exit-intent-popup": () => exitIntentPopup(),
    "sticky-cta-bar": () => stickyCta(),
    "cookie-consent": () => cookieConsent(),
  };

  const generator = generators[name];
  if (!generator) {
    const safeName = name.replace(/[^a-zA-Z0-9_-]/g, "_");
    return `// Section "${safeName}" not found in registry.\n// Available: ${Object.keys(generators).join(", ")}\n`;
  }
  return generator();
}

function useClient(framework: ShippageConfig["framework"]): string {
  return framework === "nextjs" ? '"use client";\n\n' : "";
}

// ---------------------------------------------------------------------------
// Section generators
// ---------------------------------------------------------------------------

function navbar(framework: ShippageConfig["framework"]): string {
  return `${useClient(framework)}import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const navLinks = [
  { label: "Features", href: "#features" },
  { label: "Pricing", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-lg">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <a href="/" className="text-xl font-bold tracking-tight">
          {/* Replace with your logo or product name */}
          YourProduct
        </a>

        {/* Desktop links */}
        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
            </a>
          ))}
          <Button size="sm">
            Get Started Free
          </Button>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden border-b border-border md:hidden"
          >
            <div className="flex flex-col gap-4 px-4 py-6">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  {link.label}
                </a>
              ))}
              <Button className="w-full" size="sm">
                Get Started Free
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
`;
}

function heroCentered(framework: ShippageConfig["framework"]): string {
  return `${useClient(framework)}import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function HeroCentered() {
  return (
    <section className="relative flex min-h-[90vh] items-center justify-center overflow-hidden px-4">
      {/* Background effect slot — replace with Aurora, Particles, DotPattern, etc. */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-muted/20" />

      <div className="relative z-10 mx-auto max-w-4xl text-center">
        {/* Badge / social proof signal */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-muted/50 px-4 py-1.5 text-sm text-muted-foreground">
            Trusted by 2,000+ teams
          </span>
        </motion.div>

        {/* Headline — 6-10 words, outcome-focused */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl md:text-6xl lg:text-7xl"
        >
          Ship faster without
          <br />
          breaking things
        </motion.h1>

        {/* Subheadline — 15-25 words, specific number or timeframe */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground sm:text-xl"
        >
          Deploy with confidence in under 3 minutes. Zero-downtime releases,
          automatic rollbacks, and real-time monitoring for engineering teams.
        </motion.p>

        {/* CTA cluster — primary + secondary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <Button size="lg" className="min-w-[200px] gap-2 text-base">
            Start my free trial
            <ArrowRight className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="lg" className="min-w-[200px] text-base">
            See how it works
          </Button>
        </motion.div>

        {/* Trust hint — below CTA */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-4 text-sm text-muted-foreground"
        >
          No credit card required. Cancel anytime.
        </motion.p>
      </div>
    </section>
  );
}
`;
}

function heroSplit(framework: ShippageConfig["framework"]): string {
  return `${useClient(framework)}import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function HeroSplit() {
  return (
    <section className="relative overflow-hidden px-4 py-20 sm:py-32">
      <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2 lg:gap-16">
        {/* Copy side */}
        <div>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-muted/50 px-4 py-1.5 text-sm text-muted-foreground">
              Now in public beta
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-6 text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl lg:text-6xl"
          >
            Deploy in minutes,
            <br />
            not hours
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-6 max-w-lg text-lg text-muted-foreground"
          >
            Push to git, deploy to production. Automatic previews, instant
            rollbacks, and built-in analytics. Your team ships 3x faster.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-8 flex flex-col gap-4 sm:flex-row"
          >
            <Button size="lg" className="gap-2">
              Start my free trial
              <ArrowRight className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="lg">
              Book a demo
            </Button>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-4 text-sm text-muted-foreground"
          >
            No credit card required. Cancel anytime.
          </motion.p>
        </div>

        {/* Image / screenshot side */}
        <motion.div
          initial={{ opacity: 0, x: 20, scale: 0.95 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="relative"
        >
          <div className="overflow-hidden rounded-xl border border-border bg-muted/30 shadow-2xl">
            {/* Replace with your product screenshot */}
            <div className="flex aspect-[4/3] items-center justify-center bg-gradient-to-br from-primary/10 via-muted to-accent/10 text-muted-foreground">
              <span className="text-lg">Your Product Screenshot</span>
            </div>
          </div>
          {/* Glow effect behind screenshot */}
          <div className="absolute -inset-4 -z-10 rounded-2xl bg-gradient-to-r from-primary/20 via-transparent to-accent/20 opacity-50 blur-2xl" />
        </motion.div>
      </div>
    </section>
  );
}
`;
}

function socialProofLogos(): string {
  return `import { motion } from "framer-motion";

const logos = [
  { name: "Acme Corp", width: 120 },
  { name: "Globex", width: 100 },
  { name: "Initech", width: 110 },
  { name: "Umbrella", width: 130 },
  { name: "Hooli", width: 90 },
];

export function SocialProofLogos() {
  return (
    <section className="border-y border-border/40 bg-muted/30 py-12">
      <div className="mx-auto max-w-6xl px-4">
        <p className="mb-8 text-center text-sm font-medium text-muted-foreground">
          Trusted by 2,847 teams at companies like
        </p>
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.08 } },
          }}
          className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6"
        >
          {logos.map((logo) => (
            <motion.span
              key={logo.name}
              variants={{
                hidden: { opacity: 0, y: 10 },
                show: { opacity: 1, y: 0 },
              }}
              className="text-lg font-semibold text-muted-foreground/60 transition-colors hover:text-muted-foreground"
            >
              {/* Replace with actual <img> logos */}
              {logo.name}
            </motion.span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
`;
}

function painPoints(): string {
  return `import { motion } from "framer-motion";
import { AlertTriangle, Clock, Frown } from "lucide-react";

const pains = [
  {
    icon: Clock,
    title: "Hours wasted on manual deploys",
    description:
      "Your team spends 6+ hours per week on deployment tasks that should take seconds. That's 300+ hours a year your engineers aren't building product.",
  },
  {
    icon: AlertTriangle,
    title: "Deployments that break production",
    description:
      "One bad deploy on a Friday night means lost revenue, angry customers, and weekend firefighting. No rollback plan makes it worse.",
  },
  {
    icon: Frown,
    title: "No visibility into what shipped",
    description:
      "Your PM asks 'is that live yet?' and nobody knows. Deploy status lives in Slack threads and tribal knowledge.",
  },
];

export function PainPoints() {
  return (
    <section className="py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Sound familiar?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            These problems cost engineering teams thousands of hours every year.
          </p>
        </motion.div>

        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {pains.map((pain, i) => (
            <motion.div
              key={pain.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="rounded-xl border border-destructive/20 bg-destructive/5 p-6"
            >
              <pain.icon className="h-8 w-8 text-destructive" />
              <h3 className="mt-4 text-lg font-semibold">{pain.title}</h3>
              <p className="mt-2 text-muted-foreground">{pain.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
`;
}

function featuresAlternating(): string {
  return `import { motion } from "framer-motion";
import { Zap, Shield, BarChart3 } from "lucide-react";

const features = [
  {
    icon: Zap,
    title: "One-click deploys",
    description:
      "Push to main and your code is live in under 90 seconds. Automatic previews for every PR so your team can review before shipping.",
    benefit: "so that your team ships features 3x faster without deployment bottlenecks.",
    imageAlt: "Deploy dashboard showing one-click deployment",
  },
  {
    icon: Shield,
    title: "Automatic rollbacks",
    description:
      "Something wrong? Roll back to the last working version in one click. Health checks detect issues before your customers do.",
    benefit: "so that a bad deploy never costs you more than 30 seconds of downtime.",
    imageAlt: "Rollback interface with health check indicators",
  },
  {
    icon: BarChart3,
    title: "Real-time monitoring",
    description:
      "See deploy status, error rates, and performance metrics in one dashboard. Know exactly what shipped, when, and who deployed it.",
    benefit: "so that your whole team has visibility without digging through Slack.",
    imageAlt: "Monitoring dashboard with real-time metrics",
  },
];

export function FeaturesAlternating() {
  return (
    <section id="features" className="py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Everything you need to ship with confidence
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            Built for teams that move fast and can't afford downtime.
          </p>
        </motion.div>

        <div className="mt-20 space-y-28">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className={\`grid items-center gap-12 lg:grid-cols-2 \${i % 2 === 1 ? "lg:flex-row-reverse" : ""}\`}
              style={{ direction: i % 2 === 1 ? "rtl" : "ltr" }}
            >
              <div style={{ direction: "ltr" }}>
                <feature.icon className="h-10 w-10 text-primary" />
                <h3 className="mt-4 text-2xl font-bold">{feature.title}</h3>
                <p className="mt-3 text-lg text-muted-foreground">
                  {feature.description}
                </p>
                <p className="mt-2 text-sm font-medium text-primary">
                  {feature.benefit}
                </p>
              </div>
              <div
                style={{ direction: "ltr" }}
                className="overflow-hidden rounded-xl border border-border bg-muted/30"
              >
                {/* Replace with actual screenshot */}
                <div className="flex aspect-[16/10] items-center justify-center bg-gradient-to-br from-primary/5 to-accent/5 text-muted-foreground">
                  {feature.imageAlt}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
`;
}

function featuresBento(): string {
  return `import { motion } from "framer-motion";
import { Zap, Shield, BarChart3, Globe, Lock, Cpu } from "lucide-react";

const features = [
  { icon: Zap, title: "Lightning deploys", description: "Push to production in under 90 seconds with zero-downtime releases.", span: "col-span-2" },
  { icon: Shield, title: "Auto rollbacks", description: "Health checks detect issues and roll back automatically.", span: "" },
  { icon: BarChart3, title: "Real-time metrics", description: "Monitor error rates, latency, and deploy status in one dashboard.", span: "" },
  { icon: Globe, title: "Edge deploys", description: "Deploy to 40+ regions worldwide with one command.", span: "" },
  { icon: Lock, title: "SOC 2 ready", description: "Audit logs, RBAC, and SSO built in from day one.", span: "" },
  { icon: Cpu, title: "CI/CD native", description: "Works with GitHub Actions, GitLab CI, and Jenkins out of the box.", span: "col-span-2" },
];

export function FeaturesBento() {
  return (
    <section id="features" className="py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Built for modern engineering teams
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            Everything you need to deploy, monitor, and scale with confidence.
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08 } } }}
          className="mt-16 grid gap-4 md:grid-cols-4"
        >
          {features.map((feature) => (
            <motion.div
              key={feature.title}
              variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
              className={\`group rounded-xl border border-border bg-card p-6 transition-all duration-300 hover:border-primary/30 hover:shadow-[0_0_30px_-5px_hsl(var(--primary)/0.15)] \${feature.span}\`}
            >
              <feature.icon className="h-8 w-8 text-primary" />
              <h3 className="mt-3 font-semibold">{feature.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
`;
}

function howItWorks(): string {
  return `import { motion } from "framer-motion";
import { Settings, Rocket, CheckCircle } from "lucide-react";

const steps = [
  {
    icon: Settings,
    step: "1",
    title: "Connect your repo",
    description: "Link your GitHub, GitLab, or Bitbucket repository in one click. We detect your framework automatically.",
  },
  {
    icon: Rocket,
    step: "2",
    title: "Push your code",
    description: "Every push to main triggers a zero-downtime deploy. Preview URLs for every pull request.",
  },
  {
    icon: CheckCircle,
    step: "3",
    title: "Ship with confidence",
    description: "Automatic health checks, instant rollbacks, and real-time monitoring. Your team sleeps well.",
  },
];

export function HowItWorks() {
  return (
    <section className="bg-muted/30 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Up and running in 3 minutes
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            No complex setup. No config files. Connect and deploy.
          </p>
        </motion.div>

        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {steps.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="relative text-center"
            >
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10">
                <step.icon className="h-8 w-8 text-primary" />
              </div>
              <span className="mt-4 block text-sm font-bold text-primary">
                Step {step.step}
              </span>
              <h3 className="mt-2 text-xl font-bold">{step.title}</h3>
              <p className="mt-2 text-muted-foreground">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
`;
}

function testimonials(): string {
  return `import { motion } from "framer-motion";

const testimonials = [
  {
    quote: "We cut our deploy time from 45 minutes to 90 seconds. The automatic rollbacks alone saved us from 3 incidents last month.",
    author: "Sarah Chen",
    role: "VP Engineering",
    company: "Acme Corp",
    initials: "SC",
  },
  {
    quote: "Finally, a deploy tool that doesn't require a PhD in DevOps. Our team of 4 ships faster than companies with 40 engineers.",
    author: "Marcus Johnson",
    role: "CTO",
    company: "Startup Co",
    initials: "MJ",
  },
  {
    quote: "The real-time monitoring caught a memory leak before our users noticed. That one save paid for a year of the product.",
    author: "Priya Patel",
    role: "Lead Developer",
    company: "TechFlow",
    initials: "PP",
  },
];

export function Testimonials() {
  return (
    <section className="py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Loved by engineering teams
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            Here's what teams say after switching to our platform.
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1 } } }}
          className="mt-16 grid gap-8 md:grid-cols-3"
        >
          {testimonials.map((t) => (
            <motion.div
              key={t.author}
              variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
              whileHover={{ y: -4 }}
              className="rounded-xl border border-border bg-card p-6 shadow-sm transition-all duration-300 hover:border-primary/30 hover:shadow-[0_0_30px_-5px_hsl(var(--primary)/0.15)]"
            >
              <p className="text-muted-foreground">"{t.quote}"</p>
              <div className="mt-6 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                  {t.initials}
                </div>
                <div>
                  <p className="text-sm font-semibold">{t.author}</p>
                  <p className="text-xs text-muted-foreground">
                    {t.role}, {t.company}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
`;
}

function comparisonTable(): string {
  return `import { motion } from "framer-motion";
import { Check, X } from "lucide-react";

const competitors = ["Us", "Competitor A", "Competitor B"];
const features = [
  { name: "Zero-downtime deploys", us: true, a: true, b: false },
  { name: "Automatic rollbacks", us: true, a: false, b: false },
  { name: "Preview URLs per PR", us: true, a: true, b: true },
  { name: "Real-time monitoring", us: true, a: false, b: true },
  { name: "SOC 2 compliance", us: true, a: false, b: false },
  { name: "Free tier", us: true, a: false, b: true },
];

export function ComparisonTable() {
  return (
    <section className="py-20 sm:py-28">
      <div className="mx-auto max-w-4xl px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Why teams switch to us
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 overflow-hidden rounded-xl border border-border"
        >
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                <th className="px-4 py-3 font-medium text-muted-foreground">Feature</th>
                {competitors.map((c, i) => (
                  <th
                    key={c}
                    className={\`px-4 py-3 text-center font-medium \${i === 0 ? "text-primary" : "text-muted-foreground"}\`}
                  >
                    {c}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {features.map((f) => (
                <tr key={f.name} className="border-b border-border last:border-0">
                  <td className="px-4 py-3">{f.name}</td>
                  {[f.us, f.a, f.b].map((val, i) => (
                    <td key={i} className="px-4 py-3 text-center">
                      {val ? (
                        <Check className="mx-auto h-5 w-5 text-green-500" />
                      ) : (
                        <X className="mx-auto h-5 w-5 text-muted-foreground/40" />
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      </div>
    </section>
  );
}
`;
}

function pricing(): string {
  return `import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

const plans = [
  {
    name: "Starter",
    price: "$0",
    period: "/month",
    description: "For side projects and small teams getting started.",
    features: ["3 projects", "100 deploys/month", "Community support", "Basic monitoring"],
    cta: "Start for free",
    highlighted: false,
  },
  {
    name: "Pro",
    price: "$29",
    period: "/month",
    description: "For growing teams that need speed and reliability.",
    features: ["Unlimited projects", "Unlimited deploys", "Priority support", "Advanced monitoring", "Auto rollbacks", "SOC 2 audit logs"],
    cta: "Start my free trial",
    highlighted: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    description: "For organizations with advanced security and scale needs.",
    features: ["Everything in Pro", "SSO / SAML", "Dedicated support", "99.99% SLA", "Custom integrations", "On-premise option"],
    cta: "Contact sales",
    highlighted: false,
  },
];

export function Pricing() {
  return (
    <section id="pricing" className="py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Simple, transparent pricing
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            Start free. Upgrade when you're ready. No surprises.
          </p>
        </motion.div>

        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={\`relative rounded-xl border p-8 \${
                plan.highlighted
                  ? "border-primary bg-primary/5 shadow-lg shadow-primary/10"
                  : "border-border bg-card"
              }\`}
            >
              {plan.highlighted && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary px-4 py-1 text-xs font-bold text-primary-foreground">
                  Most Popular
                </span>
              )}
              <h3 className="text-lg font-bold">{plan.name}</h3>
              <div className="mt-4 flex items-baseline gap-1">
                <span className="text-4xl font-bold">{plan.price}</span>
                <span className="text-muted-foreground">{plan.period}</span>
              </div>
              <p className="mt-2 text-sm text-muted-foreground">{plan.description}</p>
              <Button
                className={\`mt-6 w-full \${plan.highlighted ? "" : "variant-outline"}\`}
                variant={plan.highlighted ? "default" : "outline"}
              >
                {plan.cta}
              </Button>
              <ul className="mt-6 space-y-3">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm">
                    <Check className="h-4 w-4 text-primary" />
                    {f}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
`;
}

function faq(): string {
  return `import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "How long does setup take?",
    answer: "Under 3 minutes. Connect your repo, push your code, and you're live. No config files, no build scripts, no DevOps experience required.",
  },
  {
    question: "Will this work with my existing CI/CD?",
    answer: "Yes. We integrate with GitHub Actions, GitLab CI, Jenkins, and CircleCI. You can keep your existing pipeline and add our deploy step, or replace it entirely.",
  },
  {
    question: "What happens if a deploy fails?",
    answer: "Automatic rollback. We run health checks after every deploy. If anything looks wrong, we roll back to the last working version in under 30 seconds. Your users never see the issue.",
  },
  {
    question: "Is there a free tier?",
    answer: "Yes. The Starter plan is free forever with 3 projects and 100 deploys per month. No credit card required. Upgrade to Pro when you need more.",
  },
  {
    question: "How is this different from Vercel/Netlify?",
    answer: "We're built for teams that need more control. Real-time monitoring, automatic rollbacks, SOC 2 compliance, and enterprise SSO — things you'd normally need a platform team to set up.",
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="py-20 sm:py-28">
      <div className="mx-auto max-w-3xl px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Questions? Answers.
          </h2>
        </motion.div>

        <div className="mt-12 space-y-4">
          {faqs.map((faq, i) => (
            <motion.div
              key={faq.question}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="rounded-lg border border-border"
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="flex w-full items-center justify-between px-6 py-4 text-left"
              >
                <span className="font-medium">{faq.question}</span>
                <ChevronDown
                  className={\`h-5 w-5 shrink-0 text-muted-foreground transition-transform \${
                    openIndex === i ? "rotate-180" : ""
                  }\`}
                />
              </button>
              <AnimatePresence>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <p className="px-6 pb-4 text-muted-foreground">{faq.answer}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
`;
}

function ctaFooter(): string {
  return `import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function CTAFooter() {
  return (
    <>
      {/* Final CTA */}
      <section data-cta-footer className="py-20 sm:py-28">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl"
          >
            Ready to ship faster?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mx-auto mt-4 max-w-xl text-lg text-muted-foreground"
          >
            Join 2,847 engineering teams that deploy with confidence. Free to start, no credit card required.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-8"
          >
            <Button size="lg" className="gap-2 text-base">
              Start my free trial
              <ArrowRight className="h-4 w-4" />
            </Button>
          </motion.div>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="mt-4 text-sm text-muted-foreground"
          >
            No credit card required. Cancel anytime.
          </motion.p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-12">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 px-4 sm:flex-row">
          <div className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} YourProduct. All rights reserved.
          </div>
          <nav className="flex gap-6 text-sm text-muted-foreground">
            <a href="/privacy" className="hover:text-foreground transition-colors">Privacy</a>
            <a href="/terms" className="hover:text-foreground transition-colors">Terms</a>
            <a href="/cookies" className="hover:text-foreground transition-colors">Cookies</a>
            <button data-cookie-settings className="hover:text-foreground transition-colors">
              Cookie Settings
            </button>
          </nav>
        </div>
      </footer>
    </>
  );
}
`;
}

function contactForm(): string {
  return `import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <section className="py-20 sm:py-28">
      <div className="mx-auto max-w-2xl px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Get in touch
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Have questions? We'd love to hear from you.
          </p>
        </motion.div>

        {submitted ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mt-12 rounded-xl border border-green-500/20 bg-green-500/5 p-8 text-center"
          >
            <p className="text-lg font-medium">Thanks! We'll be in touch within 24 hours.</p>
          </motion.div>
        ) : (
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            onSubmit={(e) => {
              e.preventDefault();
              // TODO: Wire to your API (Formspree, Resend, or custom endpoint).
              // Security: validate/sanitize inputs server-side, add rate limiting,
              // and consider reCAPTCHA or Cloudflare Turnstile for bot protection.
              const form = e.currentTarget;
              const honeypot = (form.elements.namedItem("_gotcha") as HTMLInputElement)?.value;
              if (honeypot) return; // Bot detected
              setSubmitted(true);
            }}
            className="mt-12 space-y-6"
          >
            {/* Honeypot field — hidden from real users, caught by bots */}
            <input type="text" name="_gotcha" style={{ display: "none" }} tabIndex={-1} autoComplete="off" />
            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <label htmlFor="name" className="block text-sm font-medium">Name</label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  className="mt-1 w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium">Email</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="mt-1 w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium">Message</label>
              <textarea
                id="message"
                name="message"
                rows={4}
                required
                className="mt-1 w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>
            <Button type="submit" className="w-full gap-2 sm:w-auto">
              Send message
              <Send className="h-4 w-4" />
            </Button>
          </motion.form>
        )}
      </div>
    </section>
  );
}
`;
}

function waitlist(): string {
  return `import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Users } from "lucide-react";

export function Waitlist() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // TODO: Wire to your waitlist API (see references/waitlist-api.md).
    // Security: validate email server-side, add rate limiting.
    const form = e.currentTarget;
    const honeypot = (form.elements.namedItem("_gotcha") as HTMLInputElement)?.value;
    if (honeypot) return; // Bot detected
    setSubmitted(true);
  };

  return (
    <section className="py-20 sm:py-28">
      <div className="mx-auto max-w-2xl px-4 text-center">
        {submitted ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-500/10">
              <Users className="h-8 w-8 text-green-500" />
            </div>
            <h2 className="text-2xl font-bold">You're on the list!</h2>
            <p className="mt-2 text-muted-foreground">
              You're #847 in line. Share your unique link to move up.
            </p>
            {/* Referral link would go here */}
          </motion.div>
        ) : (
          <>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-muted/50 px-4 py-1.5 text-sm text-muted-foreground"
            >
              <Users className="h-4 w-4" />
              847 founders already joined
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl"
            >
              Be the first to try it
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mx-auto mt-4 max-w-lg text-lg text-muted-foreground"
            >
              We're launching soon. Join the waitlist to get early access and a lifetime discount.
            </motion.p>

            <motion.form
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              onSubmit={handleSubmit}
              className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center"
            >
              <input type="text" name="_gotcha" style={{ display: "none" }} tabIndex={-1} autoComplete="off" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@company.com"
                required
                className="rounded-lg border border-border bg-background px-4 py-2.5 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 sm:w-72"
              />
              <Button type="submit" className="gap-2">
                Join the waitlist
                <ArrowRight className="h-4 w-4" />
              </Button>
            </motion.form>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-3 text-sm text-muted-foreground"
            >
              No spam. Unsubscribe anytime. We email once.
            </motion.p>
          </>
        )}
      </div>
    </section>
  );
}
`;
}

function exitIntentPopup(): string {
  return `import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

export function ExitIntentPopup() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const key = "shippage-exit-shown";
    if (sessionStorage.getItem(key)) return;

    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0) {
        setShow(true);
        sessionStorage.setItem(key, "1");
        document.removeEventListener("mouseout", handleMouseLeave);
      }
    };

    // Delay listener to avoid triggering immediately
    const timer = setTimeout(() => {
      document.addEventListener("mouseout", handleMouseLeave);
    }, 5000);

    return () => {
      clearTimeout(timer);
      document.removeEventListener("mouseout", handleMouseLeave);
    };
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4"
          onClick={() => setShow(false)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-md rounded-xl border border-border bg-background p-8 shadow-2xl"
          >
            <button
              onClick={() => setShow(false)}
              className="absolute right-4 top-4 text-muted-foreground hover:text-foreground"
              aria-label="Close"
            >
              <X className="h-5 w-5" />
            </button>
            <h3 className="text-2xl font-bold">Wait — before you go</h3>
            <p className="mt-3 text-muted-foreground">
              Get a free 14-day trial with full access. No credit card required.
            </p>
            <div className="mt-6 flex flex-col gap-3">
              <Button onClick={() => setShow(false)} className="w-full">
                Start my free trial
              </Button>
              <button
                onClick={() => setShow(false)}
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                No thanks, I'll pass
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
`;
}

function stickyCta(): string {
  return `import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";

export function StickyCTABar() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const heroCta = document.querySelector("[data-hero-cta]");
    if (!heroCta) {
      // Show after scrolling 50% if no hero CTA marker found
      const handleScroll = () => setVisible(window.scrollY > window.innerHeight * 0.5);
      window.addEventListener("scroll", handleScroll, { passive: true });
      return () => window.removeEventListener("scroll", handleScroll);
    }

    const observer = new IntersectionObserver(
      ([entry]) => setVisible(!entry.isIntersecting),
      { threshold: 0 }
    );
    observer.observe(heroCta);
    return () => observer.disconnect();
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-background/95 backdrop-blur-lg"
        >
          <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
            <p className="hidden text-sm font-medium sm:block">
              Ready to ship faster? Start your free trial today.
            </p>
            <Button size="sm" className="ml-auto">
              Start my free trial
            </Button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
`;
}

function cookieConsent(): string {
  return `import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";

type Consent = { analytics: boolean; marketing: boolean };

export function CookieConsent() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) {
      // Delay to avoid competing with hero for attention
      const timer = setTimeout(() => setShow(true), 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  const save = (consent: Consent) => {
    localStorage.setItem("cookie-consent", JSON.stringify(consent));
    setShow(false);
    // Emit event for analytics scripts to check
    window.dispatchEvent(new CustomEvent("cookie-consent", { detail: consent }));
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="fixed bottom-4 left-4 right-4 z-[90] mx-auto max-w-lg rounded-xl border border-border bg-background p-6 shadow-2xl sm:left-auto sm:right-6 sm:bottom-6"
        >
          <p className="text-sm text-muted-foreground">
            We use cookies to improve your experience and analyze site traffic.
            See our{" "}
            <a href="/cookies" className="underline hover:text-foreground">
              Cookie Policy
            </a>
            .
          </p>
          <div className="mt-4 flex gap-3">
            <Button
              size="sm"
              onClick={() => save({ analytics: true, marketing: true })}
            >
              Accept all
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => save({ analytics: false, marketing: false })}
            >
              Reject all
            </Button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
`;
}
