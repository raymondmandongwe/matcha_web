'use client';

import { useState } from 'react';
import { StoreCard } from './StoreCard';
import type { Store, StoreArea } from '../lib/stores';

const AREAS: StoreArea[] = ['Cape Town', 'Johannesburg', 'Durban', 'Stellenbosch', 'Somerset West'];

export function StoreFilterGrid({ stores }: { stores: Store[] }) {
  const [activeArea, setActiveArea] = useState<StoreArea | null>(null);
  const filtered = activeArea ? stores.filter((s) => s.area === activeArea) : stores;

  return (
    <div>
      <div
        role="group"
        aria-label="Filter stores by area"
        className="mb-10 flex flex-wrap justify-center gap-2"
      >
        <button
          type="button"
          onClick={() => setActiveArea(null)}
          aria-pressed={activeArea === null}
          className={`rounded-full px-5 py-2 text-sm font-medium transition-all ${
            activeArea === null
              ? 'bg-matcha-dark text-cream'
              : 'border border-matcha-dark/20 text-matcha-dark/70 hover:border-matcha-dark/50 hover:text-matcha-dark'
          }`}
        >
          All Stores
        </button>
        {AREAS.map((area) => (
          <button
            key={area}
            type="button"
            onClick={() => setActiveArea(area === activeArea ? null : area)}
            aria-pressed={activeArea === area}
            className={`rounded-full px-5 py-2 text-sm font-medium transition-all ${
              activeArea === area
                ? 'bg-matcha-dark text-cream'
                : 'border border-matcha-dark/20 text-matcha-dark/70 hover:border-matcha-dark/50 hover:text-matcha-dark'
            }`}
          >
            {area}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((store) => (
          <StoreCard key={store.id} store={store} />
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="py-16 text-center text-charcoal/50">No stores found in this area.</p>
      )}
    </div>
  );
}
