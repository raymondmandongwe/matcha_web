'use client';

import { useEffect, useRef, useState } from 'react';
import { ImageCarousel } from './ImageCarousel';
import { mapsUrl, type Store } from '../lib/stores';
import { isOpenNow } from '../lib/hours';

export function StoreCard({ store }: { store: Store }) {
  const cardRef = useRef<HTMLElement>(null);
  const [openStatus, setOpenStatus] = useState<boolean | null>(null);

  useEffect(() => {
    const update = () => setOpenStatus(isOpenNow(store.hours));
    update();
    const id = setInterval(update, 60_000);
    return () => clearInterval(id);
  }, [store.hours]);

  const handleFocus = () => {
    cardRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'nearest' });
  };

  return (
    <article
      ref={cardRef}
      tabIndex={0}
      onFocus={handleFocus}
      aria-label={`${store.name} store details`}
      className="flex flex-col rounded-2xl border border-matcha-dark/10 bg-card p-5 outline-none transition-all hover:-translate-y-0.5 focus-visible:ring-2 focus-visible:ring-matcha-mid focus-visible:ring-offset-2"
    >
      <div className="relative">
        <ImageCarousel images={store.images} label={store.name} />
        {openStatus !== null && (
          <span
            aria-label={openStatus ? 'Currently open' : 'Currently closed'}
            className={`absolute right-2 top-2 rounded-full px-2.5 py-1 text-xs font-semibold ${
              openStatus ? 'bg-gold text-white' : 'bg-charcoal/70 text-white'
            }`}
          >
            {openStatus ? 'Open Now' : 'Closed'}
          </span>
        )}
      </div>

      <h3 className="mt-4 font-[family-name:var(--font-display)] text-xl font-semibold text-matcha-dark">
        {store.name}
      </h3>

      <dl className="mt-3 space-y-1.5 text-sm leading-relaxed text-charcoal/80">
        <div className="flex flex-wrap gap-x-2">
          <dt className="font-medium text-matcha-dark">Email</dt>
          <dd>
            <a href={`mailto:${store.email}`} className="underline-offset-2 hover:underline">
              {store.email}
            </a>
          </dd>
        </div>
        {store.address && (
          <div className="flex flex-wrap gap-x-2">
            <dt className="font-medium text-matcha-dark">Address</dt>
            <dd>{store.address}</dd>
          </div>
        )}
        {store.phone && (
          <div className="flex flex-wrap gap-x-2">
            <dt className="font-medium text-matcha-dark">Phone</dt>
            <dd>
              <a href={`tel:${store.phone.replace(/\s+/g, '')}`} className="underline-offset-2 hover:underline">
                {store.phone}
              </a>
            </dd>
          </div>
        )}
      </dl>

      <h4 className="mt-4 text-xs font-semibold uppercase tracking-[0.2em] text-matcha-dark/60">
        Operating Hours
      </h4>
      <ul className="mt-1.5 space-y-1 text-sm text-charcoal/80">
        {store.hours.map((slot) => (
          <li key={slot.days} className="flex items-baseline justify-between gap-3">
            <span>{slot.days}</span>
            <span className="font-medium text-charcoal">{slot.hours}</span>
          </li>
        ))}
      </ul>

      <a
        href={mapsUrl(store.mapsQuery)}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Get directions to ${store.name} on Google Maps`}
        className="mt-5 inline-flex items-center justify-center gap-2 rounded-full bg-matcha-dark px-5 py-2.5 text-sm font-medium text-cream transition-colors hover:bg-[#5E1530] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-matcha-mid"
      >
        Get Directions
        <span aria-hidden="true">→</span>
      </a>
    </article>
  );
}
