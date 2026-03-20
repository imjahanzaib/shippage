import { z } from "zod";

/**
 * Registry schema for Shippage sections.
 * Each section is a self-contained, conversion-optimized component
 * that composes shadcn/ui + Magic UI primitives.
 */

export const sectionSchema = z.object({
  name: z.string(),
  description: z.string(),
  conversionJob: z.string(),
  dependencies: z.array(z.string()).default([]),
  devDependencies: z.array(z.string()).default([]),
  registryDependencies: z.array(z.string()).default([]),
  files: z.array(
    z.object({
      path: z.string(),
      content: z.string(),
    })
  ),
  cssVars: z
    .record(z.string())
    .optional()
    .describe("CSS custom properties to add to globals.css"),
  tailwindExtend: z
    .record(z.unknown())
    .optional()
    .describe("Tailwind config extensions (keyframes, animations)"),
});

export type Section = z.infer<typeof sectionSchema>;

export const registrySchema = z.object({
  name: z.string(),
  version: z.string(),
  sections: z.array(sectionSchema),
});

export type Registry = z.infer<typeof registrySchema>;

/**
 * Section metadata for listing without loading full content.
 */
export const sectionMetaSchema = z.object({
  name: z.string(),
  description: z.string(),
  conversionJob: z.string(),
  category: z.enum([
    "navigation",
    "hero",
    "trust",
    "problem",
    "solution",
    "proof",
    "conversion",
    "utility",
  ]),
});

export type SectionMeta = z.infer<typeof sectionMetaSchema>;

/**
 * All available sections with metadata.
 */
export const SECTIONS: SectionMeta[] = [
  {
    name: "navbar",
    description: "Navigation with CTA that converts on first scroll",
    conversionJob: "Navigation + persistent CTA",
    category: "navigation",
  },
  {
    name: "hero-centered",
    description: "Full-width hero with centered copy and bold headline",
    conversionJob: "Stop the scroll in 5 seconds",
    category: "hero",
  },
  {
    name: "hero-split",
    description: "Hero with screenshot/demo alongside copy",
    conversionJob: "Stop the scroll with visual proof",
    category: "hero",
  },
  {
    name: "social-proof-logos",
    description: "Logo bar, metrics, and traction signals",
    conversionJob: "Build instant credibility",
    category: "trust",
  },
  {
    name: "pain-points",
    description: "Problem agitation with negative-emotion icons",
    conversionJob: "Make the visitor feel understood",
    category: "problem",
  },
  {
    name: "features-alternating",
    description: "Feature rows with alternating image/text layout",
    conversionJob: "Show how you solve each pain point",
    category: "solution",
  },
  {
    name: "features-bento",
    description: "Bento grid feature showcase for many capabilities",
    conversionJob: "Show breadth for product-aware audiences",
    category: "solution",
  },
  {
    name: "how-it-works",
    description: "3-step process explanation with numbered steps",
    conversionJob: "Reduce perceived complexity",
    category: "solution",
  },
  {
    name: "testimonials",
    description: "Customer quotes with attribution and results",
    conversionJob: "Let customers prove your claims",
    category: "proof",
  },
  {
    name: "comparison-table",
    description: "Competitor comparison with checkmarks",
    conversionJob: "Win the 'why not them?' question",
    category: "proof",
  },
  {
    name: "pricing",
    description: "Pricing tiers with recommended plan highlight",
    conversionJob: "Remove the cost objection",
    category: "conversion",
  },
  {
    name: "faq",
    description: "FAQ with objection handling, not softballs",
    conversionJob: "Kill the final doubts",
    category: "conversion",
  },
  {
    name: "cta-footer",
    description: "Final conversion CTA with footer links",
    conversionJob: "Make the ask one last time",
    category: "conversion",
  },
  {
    name: "contact-form",
    description: "Lead capture form with spam protection",
    conversionJob: "Capture leads directly",
    category: "conversion",
  },
  {
    name: "waitlist",
    description: "Viral waitlist with referral links and queue position",
    conversionJob: "Pre-launch demand capture",
    category: "conversion",
  },
  {
    name: "exit-intent-popup",
    description: "Exit-intent popup with A/B tested offers",
    conversionJob: "Recover 2-5% of abandoning visitors",
    category: "utility",
  },
  {
    name: "sticky-cta-bar",
    description: "Sticky bar that keeps CTA visible after hero scrolls away",
    conversionJob: "8-15% conversion improvement",
    category: "utility",
  },
  {
    name: "cookie-consent",
    description: "GDPR/CCPA compliant cookie consent with preference center",
    conversionJob: "Legal compliance without friction",
    category: "utility",
  },
];
