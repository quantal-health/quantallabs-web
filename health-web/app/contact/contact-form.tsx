"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

const EASE_ENTRANCE = [0.22, 1, 0.36, 1] as const;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type FieldErrors = {
  name?: string;
  email?: string;
  message?: string;
};

function FieldError({ id, children }: { id: string; children: string }) {
  return (
    <p id={id} className="text-[0.8125rem] font-medium text-danger">
      {children}
    </p>
  );
}

export function ContactForm() {
  const reduced = useReducedMotion();
  const [errors, setErrors] = useState<FieldErrors>({});
  const [submitted, setSubmitted] = useState(false);

  function clearError(field: keyof FieldErrors) {
    setErrors((prev) => {
      if (!prev[field]) return prev;
      const next = { ...prev };
      delete next[field];
      return next;
    });
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();

    const next: FieldErrors = {};
    if (!name) next.name = "Please enter your name.";
    if (!email) next.email = "Please enter your email.";
    else if (!EMAIL_RE.test(email))
      next.email = "Please enter a valid email address.";
    if (!message) next.message = "Please enter a message.";

    setErrors(next);
    if (Object.keys(next).length === 0) setSubmitted(true);
  }

  return (
    <AnimatePresence mode="wait" initial={false}>
      {submitted ? (
        <motion.div
          key="success"
          initial={{ opacity: 0, y: reduced ? 0 : 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: EASE_ENTRANCE }}
          role="status"
          aria-live="polite"
          className="rounded-xl border border-quantum bg-quantum-soft px-6 py-10 text-center"
        >
          <h3 className="text-h3 font-semibold">
            Thanks — we&apos;ll be in touch.
          </h3>
          <p className="mt-2 text-sm text-ink-muted">
            One of the founders will get back to you within one business day.
          </p>
        </motion.div>
      ) : (
        <motion.form
          key="form"
          noValidate
          onSubmit={handleSubmit}
          exit={{ opacity: 0, y: reduced ? 0 : -10 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="space-y-5"
        >
          <div className="grid gap-5 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="contact-name">
                Name
                <span
                  aria-hidden
                  className="-ml-1.5 text-quantum-dark dark:text-quantum"
                >
                  *
                </span>
              </Label>
              <Input
                id="contact-name"
                name="name"
                autoComplete="name"
                required
                aria-required
                aria-invalid={errors.name ? true : undefined}
                aria-describedby={errors.name ? "contact-name-error" : undefined}
                onChange={() => clearError("name")}
                className="h-11"
              />
              {errors.name && (
                <FieldError id="contact-name-error">{errors.name}</FieldError>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="contact-email">
                Email
                <span
                  aria-hidden
                  className="-ml-1.5 text-quantum-dark dark:text-quantum"
                >
                  *
                </span>
              </Label>
              <Input
                id="contact-email"
                name="email"
                type="email"
                autoComplete="email"
                required
                aria-required
                aria-invalid={errors.email ? true : undefined}
                aria-describedby={
                  errors.email ? "contact-email-error" : undefined
                }
                onChange={() => clearError("email")}
                className="h-11"
              />
              {errors.email && (
                <FieldError id="contact-email-error">{errors.email}</FieldError>
              )}
            </div>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="contact-practice">
                Practice / company
                <span className="text-xs font-normal text-ink-muted">
                  (optional)
                </span>
              </Label>
              <Input
                id="contact-practice"
                name="practice"
                autoComplete="organization"
                className="h-11"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="contact-inquiry">Inquiry type</Label>
              <Select name="inquiry" defaultValue="sales">
                <SelectTrigger
                  id="contact-inquiry"
                  className="w-full data-[size=default]:h-11"
                >
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sales">Sales</SelectItem>
                  <SelectItem value="design-partner">Design partner</SelectItem>
                  <SelectItem value="security">Security</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="contact-message">
              Message
              <span
                aria-hidden
                className="-ml-1.5 text-quantum-dark dark:text-quantum"
              >
                *
              </span>
            </Label>
            <Textarea
              id="contact-message"
              name="message"
              required
              aria-required
              aria-invalid={errors.message ? true : undefined}
              aria-describedby={
                errors.message ? "contact-message-error" : undefined
              }
              onChange={() => clearError("message")}
              className="min-h-36"
            />
            {errors.message && (
              <FieldError id="contact-message-error">
                {errors.message}
              </FieldError>
            )}
          </div>

          <Button
            type="submit"
            variant="accent"
            size="lg"
            className="w-full sm:w-auto"
          >
            Send message
          </Button>
        </motion.form>
      )}
    </AnimatePresence>
  );
}
