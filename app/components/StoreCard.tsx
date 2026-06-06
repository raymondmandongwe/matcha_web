'use client';

import { useRef } from 'react';
import { ImageCarousel } from './ImageCarousel';
import { mapsUrl, type Store } from '../lib/stores';

export function StoreCard({ store }: { store: Store }) {
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
