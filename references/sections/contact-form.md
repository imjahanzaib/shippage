# Contact Form Section Template

> Defaults: See `section-defaults.md` for shared tokens, hover states, scroll animation, accessibility, and performance rules.

---

## Conversion Job

**CAPTURE LEADS.** Give visitors a direct way to reach you — whether for sales inquiries, partnerships, support, or custom requests. The form should feel effortless and trustworthy.

---

## Desktop Layout

- Full-width section with `bg-muted/50` or subtle background
- Inner content: `max-w-4xl mx-auto`
- Two-column layout: left column has headline + description + contact details, right column has the form
- Left column: `flex-1`, right column: `flex-1` or `max-w-md`
- Form fields stack vertically with `gap-4`
- Submit button full width within form column
- Padding: `py-16 lg:py-24`

## Mobile Layout (mobile-first)

- Single column stack: headline + description on top, form below
- Full width with `px-4 sm:px-6` padding
- All form fields full width
- Submit button full width
- Padding: `py-12 sm:py-16`
- Contact details (email, social) below the form

---

## Copy Structure

### Headline
- Action-oriented: "Get in touch", "Let's talk", "Have a question?"
- Match the voice calibration (dev audience = casual, enterprise = formal)
- Do NOT use: "Contact Us" (generic), "Reach Out" (AI slop), "Don't Hesitate" (patronizing)

### Description (1-2 sentences)
- Set expectations: what happens after they submit
- Example: "Tell us about your project and we'll get back to you within 24 hours."
- Example (dev): "Drop us a line. We read every message and reply within a day."

### Contact Details (optional, left column)
- Email address (if public)
- Social links (Twitter/X, LinkedIn, Discord)
- Office hours or response time expectation

### Form Fields

**Minimum viable form (3 fields):**
1. **Name** — text input, required
2. **Email** — email input, required, validate format
3. **Message** — textarea, required, min 10 chars

**Extended form (5 fields, for B2B/enterprise):**
1. **Name** — text input, required
2. **Work email** — email input, required
3. **Company** — text input, optional
4. **Subject** — select dropdown (General inquiry, Sales, Support, Partnership)
5. **Message** — textarea, required

### Submit Button
- Use outcome language: "Send Message", "Get in Touch", "Start a Conversation"
- Do NOT use: "Submit" (generic), "Send" (too terse)
- Add trust hint below: "We'll respond within 24 hours" or "No spam, ever"

### Success State
- Replace form with confirmation message
- "Thanks! We've received your message and will get back to you within 24 hours."
- Include a secondary CTA: "While you wait, check out our docs" or back-to-home link

### Error State
- Inline field validation (red border + error message below field)
- Toast or banner for submission errors: "Something went wrong. Please try again or email us at [email]."

---

## Section-Specific Notes

### Spam Protection
Always include a honeypot field — a hidden input that bots fill but humans don't:
```tsx
{/* Honeypot — hidden from humans, catches bots */}
<input
  type="text"
  name="website"
  value={honeypot}
  onChange={(e) => setHoneypot(e.target.value)}
  className="absolute opacity-0 pointer-events-none h-0 w-0"
  tabIndex={-1}
  autoComplete="off"
  aria-hidden="true"
/>
```
On submit, if `honeypot` has a value, silently succeed (don't reveal to bots that they were caught).

### Form Handling Options

**Option 1: Formspree (zero backend, recommended for most)**
```tsx
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  if (honeypot) { setSuccess(true); return; } // honeypot caught
  const res = await fetch("https://formspree.io/f/YOUR_FORM_ID", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, message }),
  });
  if (res.ok) setSuccess(true);
  else setError(true);
};
```
Free tier: 50 submissions/month. No backend needed.

**Option 2: Resend (email API, for Next.js API routes)**
```tsx
// app/api/contact/route.ts
import { Resend } from "resend";
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  const { name, email, message } = await req.json();
  // Validate inputs server-side
  if (!name || !email || !message) {
    return Response.json({ error: "Missing fields" }, { status: 400 });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return Response.json({ error: "Invalid email" }, { status: 400 });
  }
  await resend.emails.send({
    from: "Contact Form <noreply@yourdomain.com>",
    to: "you@yourdomain.com",
    replyTo: email,
    subject: `Contact from ${name}`,
    text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
  });
  return Response.json({ success: true });
}
```

**Option 3: Custom API route (any framework)**
```tsx
// Generic POST handler — adapt to your framework's API route convention
export async function handleContact(req: Request) {
  const { name, email, message, website } = await req.json();
  if (website) return Response.json({ success: true }); // honeypot
  // Validate + send email via your preferred provider (SendGrid, Postmark, etc.)
}
```

### Prompt the User
Always ask: "How do you want to receive form submissions? Options:
1. **Formspree** (free, zero backend — I'll set up the form and you add your Formspree ID)
2. **Resend / email API** (I'll create an API route — you'll need a Resend API key)
3. **Custom** (tell me your preferred service and I'll wire it up)"

---

## Accessibility

- All inputs have associated `<label>` elements (not just placeholder text)
- Required fields marked with `aria-required="true"` and visual indicator
- Error messages linked via `aria-describedby`
- Form wrapped in `<form>` with proper `action` and `method` (progressive enhancement)
- Submit button is a `<button type="submit">`, not a div or span
- Focus moves to success/error message after submission
- Tab order follows visual order

---

## Complete JSX Template

```tsx
"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, CheckCircle, AlertCircle, Mail, MessageSquare } from "lucide-react";

const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } },
};
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!name.trim()) errs.name = "Name is required";
    if (!email.trim()) errs.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errs.email = "Enter a valid email";
    if (!message.trim()) errs.message = "Message is required";
    else if (message.trim().length < 10) errs.message = "Message must be at least 10 characters";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (honeypot) { setStatus("success"); return; }
    if (!validate()) return;
    setStatus("sending");
    try {
      // --- Replace with your form endpoint ---
      // Formspree: https://formspree.io/f/YOUR_FORM_ID
      // Custom API: /api/contact
      const res = await fetch("https://formspree.io/f/YOUR_FORM_ID", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });
      if (res.ok) {
        setStatus("success");
        setName(""); setEmail(""); setMessage("");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <section className="bg-muted/50 py-16 lg:py-24">
        <div className="mx-auto max-w-2xl px-4 text-center sm:px-6">
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
            <CheckCircle className="mx-auto h-12 w-12 text-green-500" />
            <h3 className="mt-4 text-2xl font-bold text-foreground">
              {/* COPY: Confirmation headline */}
              Message received
            </h3>
            <p className="mt-2 text-muted-foreground">
              {/* COPY: Set response time expectation */}
              Thanks for reaching out. We'll get back to you within 24 hours.
            </p>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section id="contact" className="bg-muted/50 py-16 lg:py-24">
      <motion.div
        className="mx-auto grid max-w-4xl gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16"
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
      >
        {/* Left column: headline + contact info */}
        <motion.div variants={itemVariants} className="flex flex-col justify-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {/* COPY: Section headline — action-oriented */}
            Get in touch
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            {/* COPY: Set expectations for what happens next */}
            Have a question or want to work together? Drop us a message
            and we'll respond within 24 hours.
          </p>
          <div className="mt-8 space-y-4">
            <div className="flex items-center gap-3 text-muted-foreground">
              <Mail className="h-5 w-5 text-primary" />
              <span>{/* COPY: Contact email */}hello@yourproduct.com</span>
            </div>
            <div className="flex items-center gap-3 text-muted-foreground">
              <MessageSquare className="h-5 w-5 text-primary" />
              <span>{/* COPY: Response time */}We typically respond within a few hours</span>
            </div>
          </div>
        </motion.div>

        {/* Right column: form */}
        <motion.form
          variants={itemVariants}
          onSubmit={handleSubmit}
          className="space-y-4 rounded-xl border border-border bg-card p-6 shadow-sm sm:p-8"
          noValidate
        >
          {/* Honeypot */}
          <input
            type="text"
            name="website"
            value={honeypot}
            onChange={(e) => setHoneypot(e.target.value)}
            className="absolute opacity-0 pointer-events-none h-0 w-0"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
          />

          <div>
            <label htmlFor="contact-name" className="block text-sm font-medium text-foreground">
              Name
            </label>
            <input
              id="contact-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              aria-required="true"
              aria-describedby={errors.name ? "name-error" : undefined}
              className="mt-1 block w-full rounded-lg border border-border bg-background px-4 py-2.5 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              placeholder="Your name"
            />
            {errors.name && <p id="name-error" className="mt-1 text-sm text-destructive">{errors.name}</p>}
          </div>

          <div>
            <label htmlFor="contact-email" className="block text-sm font-medium text-foreground">
              Email
            </label>
            <input
              id="contact-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              aria-required="true"
              aria-describedby={errors.email ? "email-error" : undefined}
              className="mt-1 block w-full rounded-lg border border-border bg-background px-4 py-2.5 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              placeholder="you@company.com"
            />
            {errors.email && <p id="email-error" className="mt-1 text-sm text-destructive">{errors.email}</p>}
          </div>

          <div>
            <label htmlFor="contact-message" className="block text-sm font-medium text-foreground">
              Message
            </label>
            <textarea
              id="contact-message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={5}
              aria-required="true"
              aria-describedby={errors.message ? "message-error" : undefined}
              className="mt-1 block w-full resize-none rounded-lg border border-border bg-background px-4 py-2.5 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              placeholder="Tell us about your project..."
            />
            {errors.message && <p id="message-error" className="mt-1 text-sm text-destructive">{errors.message}</p>}
          </div>

          {status === "error" && (
            <div className="flex items-center gap-2 rounded-lg bg-destructive/10 p-3 text-sm text-destructive">
              <AlertCircle className="h-4 w-4 flex-shrink-0" />
              Something went wrong. Please try again or email us directly.
            </div>
          )}

          <button
            type="submit"
            disabled={status === "sending"}
            className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-colors hover:brightness-110 disabled:opacity-60"
          >
            {status === "sending" ? (
              <>
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" />
                Sending...
              </>
            ) : (
              <>
                <Send className="h-4 w-4" />
                {/* COPY: CTA text — outcome language */}
                Send Message
              </>
            )}
          </button>

          <p className="text-center text-xs text-muted-foreground">
            {/* COPY: Trust hint */}
            We'll respond within 24 hours. No spam, ever.
          </p>
        </motion.form>
      </motion.div>
    </section>
  );
}
```
