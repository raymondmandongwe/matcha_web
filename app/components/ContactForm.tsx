'use client';

import { useCallback, useRef, useState } from 'react';
import type { ChangeEvent, FocusEvent, FormEvent } from 'react';

/* ----------------------------------------------------------------------- */
/* Types                                                                    */
/* ----------------------------------------------------------------------- */

export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

type FormErrors = Partial<Record<keyof ContactFormData, string>>;
type FormStatus = 'idle' | 'sending' | 'success' | 'error';

/* ----------------------------------------------------------------------- */
/* Constants                                                                */
/* ----------------------------------------------------------------------- */

const FORMSUBMIT_URL = 'https://formsubmit.co/ajax/info@love-matcha.co.za';
const EMPTY: ContactFormData = { name: '', email: '', phone: '', message: '' };
const MESSAGE_MAX = 500;
const ALL_FIELDS = new Set<keyof ContactFormData>(['name', 'email', 'phone', 'message']);

/* ----------------------------------------------------------------------- */
/* Validation                                                               */
/* ----------------------------------------------------------------------- */

function validate(
  data: ContactFormData,
  touched: ReadonlySet<keyof ContactFormData>,
): FormErrors {
  const errors: FormErrors = {};

  if (touched.has('name') && !data.name.trim()) {
    errors.name = 'Your name is required.';
  }

  if (touched.has('email')) {
    if (!data.email.trim()) {
      errors.email = 'Email address is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email.trim())) {
      errors.email = 'Please enter a valid email address.';
    }
  }

  if (touched.has('message')) {
    if (!data.message.trim()) {
      errors.message = 'Please write us a message.';
    } else if (data.message.length > MESSAGE_MAX) {
      errors.message = `Keep it under ${MESSAGE_MAX} characters (${data.message.length} used).`;
    }
  }

  return errors;
}

/* ----------------------------------------------------------------------- */
/* Component                                                                */
/* ----------------------------------------------------------------------- */

export function ContactForm() {
  const [data, setData]           = useState<ContactFormData>(EMPTY);
  const [touched, setTouched]     = useState<Set<keyof ContactFormData>>(new Set());
  const [status, setStatus]       = useState<FormStatus>('idle');
  const [sendError, setSendError] = useState('');
  const formRef = useRef<HTMLFormElement>(null);

  const errors    = validate(data, touched);
  const isSending = status === 'sending';

  /* ── handlers ── */

  const handleChange = useCallback(
    (field: keyof ContactFormData) =>
      (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setData((prev) => ({ ...prev, [field]: e.target.value }));
      },
    [],
  );

  const handleBlur = useCallback(
    (field: keyof ContactFormData) => (_: FocusEvent) => {
      setTouched((prev) => new Set([...prev, field]));
    },
    [],
  );

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Reveal all validation errors
    setTouched(ALL_FIELDS);
    const allErrors = validate(data, ALL_FIELDS);
    if (Object.keys(allErrors).length > 0) {
      const first = Object.keys(allErrors)[0] as keyof ContactFormData;
      formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }

    setStatus('sending');
    setSendError('');

    try {
      const res = await fetch(FORMSUBMIT_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          name:     data.name.trim(),
          email:    data.email.trim(),
          phone:    data.phone.trim() || 'Not provided',
          message:  data.message.trim(),
          _subject: `New enquiry from ${data.name.trim()} — Love Matcha`,
          _template: 'table',
          _captcha: 'false',
        }),
      });

      const json = await res.json();

      if (json.success === 'true' || json.success === true) {
        setStatus('success');
        setData(EMPTY);
        setTouched(new Set());
      } else {
        throw new Error(json.message ?? 'Submission failed');
      }
    } catch (err) {
      console.error('[ContactForm]', err);
      setStatus('error');
      setSendError(
        'Something went wrong sending your message. Please try again or email us directly at info@love-matcha.co.za',
      );
    }
  };

  const reset = () => {
    setStatus('idle');
    setSendError('');
  };

  /* ── field class helper ── */

  const fieldCls = (field: keyof ContactFormData) =>
    [
      'w-full rounded-lg border bg-cream/60 px-4 py-2.5 text-sm text-charcoal outline-none',
      'transition-colors placeholder:text-charcoal/35',
      'focus:ring-2 disabled:opacity-50',
      errors[field]
        ? 'border-red-400 focus:border-red-500 focus:ring-red-200'
        : 'border-matcha-dark/15 focus:border-matcha-dark focus:ring-matcha-mid/30',
    ].join(' ');

  /* ── Success screen ── */

  if (status === 'success') {
    return (
      <section aria-labelledby="contact-success-heading" className="bg-cream px-6 py-16 sm:py-24">
        <div className="mx-auto max-w-[600px] rounded-3xl bg-card p-10 text-center shadow-[0_20px_60px_-15px_rgba(31,51,36,0.2)]">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-matcha-mid/20">
            <span aria-hidden="true" className="text-3xl text-matcha-mid">✓</span>
          </div>
          <h2
            id="contact-success-heading"
            className="mt-5 font-[family-name:var(--font-display)] text-2xl font-semibold text-matcha-dark"
          >
            Message Sent!
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-charcoal/65">
            Thanks for reaching out. The Love Matcha team will reply to{' '}
            <span className="font-medium text-matcha-dark">{data.email || 'you'}</span> within
            two business days.
          </p>
          <button
            type="button"
            onClick={reset}
            className="mt-8 rounded-full border border-matcha-dark px-6 py-2.5 text-sm font-medium text-matcha-dark transition-colors hover:bg-matcha-dark hover:text-cream"
          >
            Send Another Message
          </button>
        </div>
      </section>
    );
  }

  /* ── Form ── */

  return (
    <section aria-labelledby="contact-form-heading" className="bg-cream px-6 py-16 sm:py-24">
      <div className="mx-auto max-w-[600px] rounded-3xl bg-card p-8 shadow-[0_20px_60px_-15px_rgba(31,51,36,0.2)] sm:p-10">
        <h2
          id="contact-form-heading"
          className="font-[family-name:var(--font-display)] text-3xl font-semibold text-matcha-dark"
        >
          Get in Touch
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-charcoal/65">
          Questions, feedback, or a stockist enquiry? We reply within two business days.
        </p>

        {/* Send error banner */}
        {status === 'error' && sendError && (
          <div role="alert" className="mt-5 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {sendError}
          </div>
        )}

        <form ref={formRef} noValidate onSubmit={handleSubmit} className="mt-8 space-y-5">

          {/* Name */}
          <div>
            <label htmlFor="cf-name" className="block text-sm font-medium text-charcoal">
              Name <span aria-hidden="true" className="text-red-500">*</span>
            </label>
            <input
              id="cf-name"
              name="name"
              type="text"
              autoComplete="name"
              disabled={isSending}
              value={data.name}
              onChange={handleChange('name')}
              onBlur={handleBlur('name')}
              aria-required="true"
              aria-invalid={Boolean(errors.name)}
              aria-describedby={errors.name ? 'cf-name-error' : undefined}
              placeholder="Your full name"
              className={`${fieldCls('name')} mt-1.5`}
            />
            {errors.name && (
              <p id="cf-name-error" role="alert" className="mt-1.5 text-xs text-red-600">
                {errors.name}
              </p>
            )}
          </div>

          {/* Email */}
          <div>
            <label htmlFor="cf-email" className="block text-sm font-medium text-charcoal">
              Email <span aria-hidden="true" className="text-red-500">*</span>
            </label>
            <input
              id="cf-email"
              name="email"
              type="email"
              autoComplete="email"
              disabled={isSending}
              value={data.email}
              onChange={handleChange('email')}
              onBlur={handleBlur('email')}
              aria-required="true"
              aria-invalid={Boolean(errors.email)}
              aria-describedby={errors.email ? 'cf-email-error' : undefined}
              placeholder="you@example.com"
              className={`${fieldCls('email')} mt-1.5`}
            />
            {errors.email && (
              <p id="cf-email-error" role="alert" className="mt-1.5 text-xs text-red-600">
                {errors.email}
              </p>
            )}
          </div>

          {/* Phone */}
          <div>
            <label htmlFor="cf-phone" className="block text-sm font-medium text-charcoal">
              Phone{' '}
              <span className="font-normal text-charcoal/45">(optional)</span>
            </label>
            <input
              id="cf-phone"
              name="phone"
              type="tel"
              autoComplete="tel"
              disabled={isSending}
              value={data.phone}
              onChange={handleChange('phone')}
              onBlur={handleBlur('phone')}
              placeholder="+27 XX XXX XXXX"
              className={`${fieldCls('phone')} mt-1.5`}
            />
          </div>

          {/* Message */}
          <div>
            <div className="flex items-baseline justify-between">
              <label htmlFor="cf-message" className="block text-sm font-medium text-charcoal">
                Message <span aria-hidden="true" className="text-red-500">*</span>
              </label>
              <span
                aria-live="polite"
                className={`text-xs tabular-nums transition-colors ${
                  data.message.length > MESSAGE_MAX
                    ? 'text-red-500'
                    : data.message.length > MESSAGE_MAX * 0.85
                    ? 'text-gold'
                    : 'text-charcoal/40'
                }`}
              >
                {data.message.length} / {MESSAGE_MAX}
              </span>
            </div>
            <textarea
              id="cf-message"
              name="message"
              rows={5}
              disabled={isSending}
              value={data.message}
              onChange={handleChange('message')}
              onBlur={handleBlur('message')}
              aria-required="true"
              aria-invalid={Boolean(errors.message)}
              aria-describedby={errors.message ? 'cf-message-error' : undefined}
              placeholder="Tell us how we can help…"
              className={`${fieldCls('message')} mt-1.5 resize-none`}
            />
            {errors.message && (
              <p id="cf-message-error" role="alert" className="mt-1.5 text-xs text-red-600">
                {errors.message}
              </p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isSending}
            aria-busy={isSending}
            className="w-full rounded-full bg-matcha-dark px-6 py-3 text-sm font-semibold text-cream transition-all hover:bg-[#5E1530] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-matcha-mid disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSending ? (
              <span className="flex items-center justify-center gap-2">
                <span
                  aria-hidden="true"
                  className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-cream/30 border-t-cream"
                />
                Sending…
              </span>
            ) : (
              'Send Message'
            )}
          </button>

          <p className="text-center text-xs text-charcoal/40">
            Or email us directly at{' '}
            <a
              href="mailto:info@love-matcha.co.za"
              className="text-matcha-mid underline-offset-2 hover:underline"
            >
              info@love-matcha.co.za
            </a>
          </p>
        </form>
      </div>
    </section>
  );
}
