'use client';

import { Playfair_Display, Inter } from 'next/font/google';
import { useRef, useState } from 'react';
import type { ChangeEvent, FormEvent, KeyboardEvent, TouchEvent } from 'react';

const playfair = Playfair_Display({ subsets: ['latin'], weight: ['500', '600', '700'], variable: '--font-display' });
const inter = Inter({ subsets: ['latin'], weight: ['400', '500', '600'], variable: '--font-body' });

/* ----------------------------------------------------------------------- */
/* Types                                                                    */
/* ----------------------------------------------------------------------- */

interface OperatingHours {
  days: string;
  hours: string;
}

interface Store {
  id: string;
  name: string;
  email: string;
  address?: string;
  phone?: string;
  mapsQuery: string;
  hours: OperatingHours[];
  images: readonly string[];
}

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

type ContactFormErrors = Partial<Record<keyof ContactFormData, string>>;

/* ----------------------------------------------------------------------- */
/* Data                                                                     */
/* ----------------------------------------------------------------------- */

const STORE_EMAIL = 'info@love-matcha.co.za';

const PLACEHOLDER_PALETTE = ['#2D5016', '#8FAF6A', '#C9A66B', '#6B8E4E', '#1A1A1A'] as const;

function placeholderImages(seed: number): readonly string[] {
  return [0, 1, 2].map((offset) => PLACEHOLDER_PALETTE[(seed + offset) % PLACEHOLDER_PALETTE.length]);
}

const mapsUrl = (query: string) => `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;

const STORES: Store[] = [
  {
    id: 'bloubergstrand',
    name: 'Bloubergstrand',
    email: STORE_EMAIL,
    address: 'Shop 6, 12 Marine Cir, Table View, Cape Town, 7441',
    mapsQuery: 'Love Matcha, Shop 6, 12 Marine Cir, Table View, Cape Town, 7441',
    hours: [
      { days: 'Mon – Thu', hours: '09:00 – 22:00' },
      { days: 'Fri – Sat', hours: '09:00 – 23:00' },
      { days: 'Sun', hours: '09:00 – 22:00' },
    ],
    images: placeholderImages(0),
  },
  {
    id: 'fourways-jhb',
    name: 'Fourways JHB',
    email: STORE_EMAIL,
    address: '11 Ruby Cl, Witkoppen, Sandton, 2068',
    mapsQuery: 'Love Matcha, 11 Ruby Cl, Witkoppen, Sandton, 2068',
    hours: [
      { days: 'Mon – Sat', hours: '09:00 – 20:00' },
      { days: 'Sun', hours: '09:00 – 19:00' },
    ],
    images: placeholderImages(1),
  },
  {
    id: 'gateway-durban',
    name: 'Gateway Durban',
    email: STORE_EMAIL,
    address: '1 Palm Blvd, Umhlanga Ridge, Durban, 4319',
    mapsQuery: 'Love Matcha, 1 Palm Blvd, Umhlanga Ridge, Durban, 4319',
    hours: [{ days: 'Daily', hours: '09:00 – 20:00' }],
    images: placeholderImages(2),
  },
  {
    id: 'canal-walk',
    name: 'Canal Walk',
    email: STORE_EMAIL,
    address: '490 Century Blvd, Century City, Cape Town, 7446',
    mapsQuery: 'Love Matcha, 490 Century Blvd, Century City, Cape Town, 7446',
    hours: [{ days: 'Daily', hours: '09:00 – 21:00' }],
    images: placeholderImages(3),
  },
  {
    id: 'tygervalley-mall',
    name: 'Tygervalley Mall',
    email: STORE_EMAIL,
    mapsQuery: 'Love Matcha, Tygervalley Mall, Cape Town',
    hours: [
      { days: 'Mon – Sat', hours: '09:00 – 19:00' },
      { days: 'Sun', hours: '09:00 – 17:00' },
    ],
    images: placeholderImages(4),
  },
  {
    id: 'sandown',
    name: 'Sandown',
    email: STORE_EMAIL,
    address: 'Retail Crossing Shopping Mall, Sandown',
    mapsQuery: 'Love Matcha, Retail Crossing Shopping Mall, Sandown',
    hours: [
      { days: 'Mon – Fri', hours: '08:00 – 20:00' },
      { days: 'Sat', hours: '08:00 – 19:00' },
      { days: 'Sun', hours: '08:00 – 18:00' },
    ],
    images: placeholderImages(0),
  },
  {
    id: 'neelsie',
    name: 'Neelsie (Stellenbosch University)',
    email: STORE_EMAIL,
    address: 'Neelsie Student Centre, Stellenbosch University, Stellenbosch',
    mapsQuery: 'Love Matcha, Neelsie Student Centre, Stellenbosch University',
    hours: [
      { days: 'Mon – Fri', hours: '07:00 – 16:30' },
      { days: 'Sat – Sun', hours: '07:00 – 19:00' },
    ],
    images: placeholderImages(1),
  },
  {
    id: 'kloof-street',
    name: 'Kloof Street',
    email: STORE_EMAIL,
    address: '50 Kloof St, Gardens, Cape Town, 8001',
    mapsQuery: 'Love Matcha, 50 Kloof St, Gardens, Cape Town, 8001',
    hours: [
      { days: 'Mon – Thu', hours: '08:30 – 21:00' },
      { days: 'Fri – Sat', hours: '08:30 – 22:00' },
      { days: 'Sun', hours: '08:30 – 20:00' },
    ],
    images: placeholderImages(2),
  },
  {
    id: 'mojo-market',
    name: 'Mojo Market',
    email: STORE_EMAIL,
    address: '30 Regent Rd, Sea Point, Cape Town, 8060',
    mapsQuery: 'Love Matcha, Mojo Market, 30 Regent Rd, Sea Point, Cape Town, 8060',
    hours: [
      { days: 'Mon – Thu', hours: '10:00 – 22:00' },
      { days: 'Fri – Sat', hours: '08:00 – 23:00' },
      { days: 'Sun', hours: '10:00 – 22:00' },
    ],
    images: placeholderImages(3),
  },
  {
    id: 'somerset-west',
    name: 'Somerset West',
    email: STORE_EMAIL,
    address: '1 Bright St, Somerset West',
    mapsQuery: 'Love Matcha, 1 Bright St, Somerset West',
    hours: [
      { days: 'Mon – Thu', hours: '08:00 – 18:00' },
      { days: 'Fri – Sat', hours: '08:00 – 19:00' },
      { days: 'Sun & PH', hours: '08:00 – 17:00' },
    ],
    images: placeholderImages(4),
  },
  {
    id: 'rondebosch',
    name: 'Rondebosch',
    email: STORE_EMAIL,
    address: '18 Main Road, Rondebosch, Cape Town, 7700',
    phone: '+27 72 565 5958',
    mapsQuery: 'Love Matcha, 18 Main Road, Rondebosch, Cape Town, 7700',
    hours: [{ days: 'Daily', hours: '09:00 – 21:00' }],
    images: placeholderImages(0),
  },
  {
    id: 'table-bay-mall',
    name: 'Table Bay Mall',
    email: STORE_EMAIL,
    address: 'R27 & Boulevard, Cape Town, 7741',
    mapsQuery: 'Love Matcha, Table Bay Mall, R27 & Boulevard, Cape Town, 7741',
    hours: [
      { days: 'Mon – Sat', hours: '09:00 – 20:00' },
      { days: 'Sun', hours: '09:00 – 18:00' },
    ],
    images: placeholderImages(1),
  },
];

const SOCIAL_LINKS = [
  { name: 'Facebook', href: 'https://www.facebook.com/lovematchaza' },
  { name: 'Instagram', href: 'https://www.instagram.com/lovematcha.co.za' },
  { name: 'TikTok', href: 'https://www.tiktok.com/@lovematcha.co.za' },
  { name: 'YouTube', href: 'https://www.youtube.com/@lovematcha' },
] as const;

const POLICY_LINKS = [
  { name: 'Privacy Policy', href: '/policies/privacy-policy' },
  { name: 'Refund Policy', href: '/policies/refund-policy' },
  { name: 'Terms of Service', href: '/policies/terms-of-service' },
] as const;

const MANUFACTURERS = [
  {
    name: 'Can It',
    location: 'Germiston, Gauteng',
    description: 'Our canning partner — responsible for filling and sealing every can that leaves the line.',
  },
  {
    name: 'Dalcoure Coffee',
    location: 'Epping, Cape Town',
    description: 'Our roasting and beverage production partner, blending and bottling each batch to spec.',
  },
] as const;

/* ----------------------------------------------------------------------- */
/* Matcha leaf watermark                                                    */
/* ----------------------------------------------------------------------- */

function MatchaLeafWatermark() {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      viewBox="0 0 400 400"
      className="pointer-events-none absolute -right-16 -top-16 h-72 w-72 text-[#2D5016]/10 sm:h-96 sm:w-96"
    >
      <path
        fill="currentColor"
        d="M200 20c88 0 160 80 160 180S288 380 200 380 40 300 40 200c0-30 80-180 160-180Z"
      />
      <path
        stroke="#F9F5EE"
        strokeOpacity="0.5"
        strokeWidth="3"
        fill="none"
        d="M200 40v320M120 110c40 30 60 70 80 90M280 110c-40 30-60 70-80 90M100 220c50 10 80 40 100 60M300 220c-50 10-80 40-100 60"
      />
    </svg>
  );
}

/* ----------------------------------------------------------------------- */
/* Hero                                                                     */
/* ----------------------------------------------------------------------- */

function Hero() {
  return (
    <header className="relative overflow-hidden bg-gradient-to-br from-[#2D5016] via-[#3d6a20] to-[#8FAF6A] py-20 text-center sm:py-28">
      <MatchaLeafWatermark />
      <div className="relative mx-auto max-w-3xl px-6">
        <p className="text-sm font-medium uppercase tracking-[0.3em] text-[#F9F5EE]/70">Love Matcha</p>
        <h1 className="mt-4 font-[family-name:var(--font-display)] text-4xl font-semibold tracking-tight text-[#F9F5EE] sm:text-6xl">
          Find Us Near You
        </h1>
        <p className="mx-auto mt-5 max-w-xl font-[family-name:var(--font-body)] text-base leading-relaxed text-[#F9F5EE]/85 sm:text-lg">
          Eleven calm corners across South Africa, each pouring the same ceremonial-grade matcha. Step in, slow down,
          and find your nearest store below.
        </p>
      </div>
    </header>
  );
}

/* ----------------------------------------------------------------------- */
/* Image carousel                                                          */
/* ----------------------------------------------------------------------- */

interface ImageCarouselProps {
  images: readonly string[];
  label: string;
}

function ImageCarousel({ images, label }: ImageCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const touchStartX = useRef<number | null>(null);

  const goTo = (next: number) => {
    setActiveIndex(((next % images.length) + images.length) % images.length);
  };

  const handleTouchStart = (event: TouchEvent<HTMLDivElement>) => {
    touchStartX.current = event.touches[0]?.clientX ?? null;
  };

  const handleTouchEnd = (event: TouchEvent<HTMLDivElement>) => {
    if (touchStartX.current === null) return;
    const deltaX = event.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(deltaX) > 40) {
      goTo(activeIndex + (deltaX < 0 ? 1 : -1));
    }
    touchStartX.current = null;
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'ArrowRight') {
      event.preventDefault();
      goTo(activeIndex + 1);
    } else if (event.key === 'ArrowLeft') {
      event.preventDefault();
      goTo(activeIndex - 1);
    }
  };

  return (
    <div
      role="group"
      aria-roledescription="carousel"
      aria-label={`Photos of ${label}`}
      tabIndex={0}
      onKeyDown={handleKeyDown}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      className="relative h-44 overflow-hidden rounded-xl outline-none focus-visible:ring-2 focus-visible:ring-[#8FAF6A] focus-visible:ring-offset-2"
    >
      <div
        className="flex h-full transition-transform duration-500 ease-out"
        style={{ transform: `translateX(-${activeIndex * 100}%)` }}
      >
        {images.map((color, index) => (
          <div
            key={index}
            aria-hidden={index !== activeIndex}
            className="flex h-full w-full shrink-0 items-center justify-center"
            style={{ backgroundColor: color }}
          >
            <span className="font-[family-name:var(--font-display)] text-sm tracking-wide text-[#F9F5EE]/80">
              {label} — photo {index + 1}
            </span>
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={() => goTo(activeIndex - 1)}
        aria-label={`Previous photo of ${label}`}
        className="absolute left-2 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-[#1A1A1A]/30 text-lg text-[#F9F5EE] backdrop-blur-sm transition-colors hover:bg-[#1A1A1A]/50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#F9F5EE]"
      >
        ‹
      </button>
      <button
        type="button"
        onClick={() => goTo(activeIndex + 1)}
        aria-label={`Next photo of ${label}`}
        className="absolute right-2 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-[#1A1A1A]/30 text-lg text-[#F9F5EE] backdrop-blur-sm transition-colors hover:bg-[#1A1A1A]/50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#F9F5EE]"
      >
        ›
      </button>

      <div className="absolute bottom-2 left-1/2 flex -translate-x-1/2 gap-1.5">
        {images.map((_, index) => (
          <button
            key={index}
            type="button"
            aria-label={`Show photo ${index + 1} of ${images.length}`}
            aria-current={index === activeIndex}
            onClick={() => goTo(index)}
            className={`h-1.5 rounded-full transition-all ${
              index === activeIndex ? 'w-5 bg-[#F9F5EE]' : 'w-1.5 bg-[#F9F5EE]/50'
            }`}
          />
        ))}
      </div>
    </div>
  );
}

/* ----------------------------------------------------------------------- */
/* Store card                                                               */
/* ----------------------------------------------------------------------- */

function StoreCard({ store }: { store: Store }) {
  const cardRef = useRef<HTMLElement>(null);

  const handleFocus = () => {
    cardRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'nearest' });
  };

  return (
    <article
      ref={cardRef}
      tabIndex={0}
      onFocus={handleFocus}
      aria-label={`${store.name} store details`}
      className="flex flex-col rounded-2xl border border-[#2D5016]/10 bg-white p-5 shadow-sm outline-none transition-shadow hover:shadow-lg focus-visible:shadow-lg focus-visible:ring-2 focus-visible:ring-[#8FAF6A] focus-visible:ring-offset-2"
    >
      <ImageCarousel images={store.images} label={store.name} />

      <h3 className="mt-4 font-[family-name:var(--font-display)] text-xl font-semibold text-[#2D5016]">
        {store.name}
      </h3>

      <dl className="mt-3 space-y-1.5 text-sm leading-relaxed text-[#1A1A1A]/80">
        <div className="flex flex-wrap gap-x-2">
          <dt className="font-medium text-[#2D5016]">Email</dt>
          <dd>
            <a href={`mailto:${store.email}`} className="underline-offset-2 hover:underline">
              {store.email}
            </a>
          </dd>
        </div>
        {store.address && (
          <div className="flex flex-wrap gap-x-2">
            <dt className="font-medium text-[#2D5016]">Address</dt>
            <dd>{store.address}</dd>
          </div>
        )}
        {store.phone && (
          <div className="flex flex-wrap gap-x-2">
            <dt className="font-medium text-[#2D5016]">Phone</dt>
            <dd>
              <a href={`tel:${store.phone.replace(/\s+/g, '')}`} className="underline-offset-2 hover:underline">
                {store.phone}
              </a>
            </dd>
          </div>
        )}
      </dl>

      <h4 className="mt-4 text-xs font-semibold uppercase tracking-[0.2em] text-[#2D5016]/60">Operating Hours</h4>
      <ul className="mt-1.5 space-y-1 text-sm text-[#1A1A1A]/80">
        {store.hours.map((slot) => (
          <li key={slot.days} className="flex items-baseline justify-between gap-3">
            <span>{slot.days}</span>
            <span className="font-medium text-[#1A1A1A]">{slot.hours}</span>
          </li>
        ))}
      </ul>

      <a
        href={mapsUrl(store.mapsQuery)}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Get directions to ${store.name} on Google Maps`}
        className="mt-5 inline-flex items-center justify-center gap-2 rounded-full bg-[#2D5016] px-5 py-2.5 text-sm font-medium text-[#F9F5EE] transition-colors hover:bg-[#23400f] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8FAF6A]"
      >
        Get Directions
        <span aria-hidden="true">→</span>
      </a>
    </article>
  );
}

/* ----------------------------------------------------------------------- */
/* Store locator section                                                    */
/* ----------------------------------------------------------------------- */

function StoreLocator() {
  return (
    <section aria-labelledby="store-locator-heading" className="mx-auto max-w-7xl px-6 py-16 sm:py-24">
      <div className="mx-auto max-w-2xl text-center">
        <h2 id="store-locator-heading" className="font-[family-name:var(--font-display)] text-3xl font-semibold text-[#2D5016] sm:text-4xl">
          Our Stores
        </h2>
        <p className="mt-3 text-base leading-relaxed text-[#1A1A1A]/70">
          Eleven stores, one ritual. Tap a card for hours, contact details, and directions to your nearest Love Matcha.
        </p>
      </div>

      <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {STORES.map((store) => (
          <StoreCard key={store.id} store={store} />
        ))}
      </div>
    </section>
  );
}

/* ----------------------------------------------------------------------- */
/* Contact form                                                             */
/* ----------------------------------------------------------------------- */

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

function ContactForm() {
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

/* ----------------------------------------------------------------------- */
/* Manufacturer / supplier info                                            */
/* ----------------------------------------------------------------------- */

function ManufacturerInfo() {
  return (
    <section aria-labelledby="manufacturer-heading" className="mx-auto max-w-5xl px-6 py-16 sm:py-24">
      <h2 id="manufacturer-heading" className="font-[family-name:var(--font-display)] text-3xl font-semibold text-[#2D5016] sm:text-4xl">
        Made With Care, By Partners We Trust
      </h2>
      <div className="mt-10 grid grid-cols-1 gap-10 sm:grid-cols-2">
        {MANUFACTURERS.map((manufacturer) => (
          <div key={manufacturer.name} className="border-t border-[#2D5016]/15 pt-5">
            <h3 className="font-[family-name:var(--font-display)] text-xl font-semibold text-[#2D5016]">
              {manufacturer.name}
            </h3>
            <p className="mt-1 text-sm font-medium uppercase tracking-[0.2em] text-[#8FAF6A]">{manufacturer.location}</p>
            <p className="mt-3 text-sm leading-relaxed text-[#1A1A1A]/75">{manufacturer.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ----------------------------------------------------------------------- */
/* Footer                                                                   */
/* ----------------------------------------------------------------------- */

function Footer() {
  return (
    <footer className="bg-[#1A1A1A] px-6 py-12 text-[#F9F5EE]">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="font-[family-name:var(--font-display)] text-xl font-semibold">Love Matcha</p>
          <p className="mt-2 max-w-xs text-sm leading-relaxed text-[#F9F5EE]/65">
            Ceremonial-grade matcha, poured slowly, for eleven communities across South Africa.
          </p>
          <ul className="mt-5 flex gap-4" aria-label="Love Matcha on social media">
            {SOCIAL_LINKS.map((social) => (
              <li key={social.name}>
                <a
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Love Matcha on ${social.name}`}
                  className="text-sm font-medium text-[#F9F5EE]/75 underline-offset-4 transition-colors hover:text-[#8FAF6A] hover:underline"
                >
                  {social.name}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <nav aria-label="Policies">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#F9F5EE]/50">Policies</p>
          <ul className="mt-3 space-y-2">
            {POLICY_LINKS.map((policy) => (
              <li key={policy.name}>
                <a
                  href={policy.href}
                  className="text-sm text-[#F9F5EE]/75 underline-offset-4 transition-colors hover:text-[#8FAF6A] hover:underline"
                >
                  {policy.name}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <p className="mx-auto mt-10 max-w-7xl border-t border-[#F9F5EE]/10 pt-6 text-xs text-[#F9F5EE]/50">
        © {new Date().getFullYear()} Love Matcha. All rights reserved.
      </p>
    </footer>
  );
}

/* ----------------------------------------------------------------------- */
/* Page                                                                     */
/* ----------------------------------------------------------------------- */

export default function ContactPage() {
  return (
    <main className={`${playfair.variable} ${inter.variable} font-[family-name:var(--font-body)] bg-[#F9F5EE]`}>
      <Hero />
      <StoreLocator />
      <ContactForm />
      <ManufacturerInfo />
      <Footer />
    </main>
  );
}
