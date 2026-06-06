'use client';

import { useRef, useState } from 'react';
import type { ChangeEvent, FormEvent } from 'react';

export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

type ContactFormErrors = Partial<Record<keyof ContactFormData, string>>;

const EMPTY_FORM_DATA: ContactFormData = { name: '', email: '', phone: '', message: '' };

function validateContactForm(data: ContactFormData): ContactFormErrors {
  const errors: ContactFormErrors = {};

  if (!data.name.trim()) {
    errors.name = 'Please tell us your name.';
  }

  if (!data.email.trim()) {
    errors.email = 'Email is required.';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email.trim())) {
    errors.email = 'Enter a valid email address.';
  }

  if (!data.message.trim()) {
    errors.message = 'Let us know how we can help.';
  }

  return errors;
}

export function ContactForm() {
  const [formData, setFormData] = useState<ContactFormData>(EMPTY_FORM_DATA);
  const [errors, setErrors] = useState<ContactFormErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const handleChange =
    (field: keyof ContactFormData) => (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { value } = event.target;
      setFormData((prev) => ({ ...prev, [field]: value }));
      setErrors((prev) => (prev[field] ? { ...prev, [field]: undefined } : prev));
    };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const validationErrors = validateContactForm(formData);
    setErrors(validationErrors);

    const firstInvalidField = (Object.keys(validationErrors) as (keyof ContactFormData)[])[0];
    if (firstInvalidField) {
      formRef.current?.querySelector<HTMLElement>(`[name="${firstInvalidField}"]`)?.focus();
      return;
    }

    setSubmitted(true);
    setFormData(EMPTY_FORM_DATA);
  };

  const fieldClasses = (hasError: boolean) =>
    `w-full rounded-lg border bg-[#F9F5EE]/60 px-4 py-2.5 text-sm text-[#1A1A1A] outline-none transition-colors placeholder:text-[#1A1A1A]/40 focus:border-[#2D5016] focus:ring-2 focus:ring-[#8FAF6A]/40 ${
      hasError ? 'border-red-400' : 'border-[#2D5016]/15'
    }`;

  return (
    <section aria-labelledby="contact-form-heading" className="bg-[#F9F5EE] px-6 py-16 sm:py-24">
      <div className="mx-auto max-w-[600px] rounded-3xl bg-white p-8 shadow-[0_20px_60px_-15px_rgba(45,80,22,0.25)] sm:p-10">
        <h2 id="contact-form-heading" className="font-[family-name:var(--font-display)] text-3xl font-semibold text-[#2D5016]">
          Get in Touch
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-[#1A1A1A]/70">
          Questions, feedback, or a stockist enquiry? Send us a note and the team will reply within two business days.
        </p>

        {submitted && (
          <p role="status" className="mt-6 rounded-lg bg-[#8FAF6A]/20 px-4 py-3 text-sm font-medium text-[#2D5016]">
            Thank you — your message has been sent. We&apos;ll be in touch soon.
          </p>
        )}

        <form ref={formRef} noValidate onSubmit={handleSubmit} className="mt-8 space-y-5">
          <div>
            <label htmlFor="contact-name" className="block text-sm font-medium text-[#1A1A1A]">
              Name
            </label>
            <input
              id="contact-name"
              name="name"
              type="text"
              autoComplete="name"
              value={formData.name}
              onChange={handleChange('name')}
              aria-required="true"
              aria-invalid={Boolean(errors.name)}
              aria-describedby={errors.name ? 'contact-name-error' : undefined}
              className={`${fieldClasses(Boolean(errors.name))} mt-1.5`}
            />
            {errors.name && (
              <p id="contact-name-error" role="alert" className="mt-1.5 text-sm text-red-600">
                {errors.name}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="contact-email" className="block text-sm font-medium text-[#1A1A1A]">
              Email <span aria-hidden="true">*</span>
            </label>
            <input
              id="contact-email"
              name="email"
              type="email"
              autoComplete="email"
              value={formData.email}
              onChange={handleChange('email')}
              aria-required="true"
              aria-invalid={Boolean(errors.email)}
              aria-describedby={errors.email ? 'contact-email-error' : undefined}
              className={`${fieldClasses(Boolean(errors.email))} mt-1.5`}
            />
            {errors.email && (
              <p id="contact-email-error" role="alert" className="mt-1.5 text-sm text-red-600">
                {errors.email}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="contact-phone" className="block text-sm font-medium text-[#1A1A1A]">
              Phone <span className="font-normal text-[#1A1A1A]/50">(optional)</span>
            </label>
            <input
              id="contact-phone"
              name="phone"
              type="tel"
              autoComplete="tel"
              value={formData.phone}
              onChange={handleChange('phone')}
              aria-invalid={Boolean(errors.phone)}
              className={`${fieldClasses(Boolean(errors.phone))} mt-1.5`}
            />
          </div>

          <div>
            <label htmlFor="contact-message" className="block text-sm font-medium text-[#1A1A1A]">
              Message
            </label>
            <textarea
              id="contact-message"
              name="message"
              rows={4}
              value={formData.message}
              onChange={handleChange('message')}
              aria-required="true"
              aria-invalid={Boolean(errors.message)}
              aria-describedby={errors.message ? 'contact-message-error' : undefined}
              className={`${fieldClasses(Boolean(errors.message))} mt-1.5 resize-none`}
            />
            {errors.message && (
              <p id="contact-message-error" role="alert" className="mt-1.5 text-sm text-red-600">
                {errors.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full rounded-full bg-[#2D5016] px-6 py-3 text-sm font-semibold text-[#F9F5EE] transition-colors hover:bg-[#23400f] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8FAF6A]"
          >
            Send Message
          </button>
        </form>
      </div>
    </section>
  );
}
