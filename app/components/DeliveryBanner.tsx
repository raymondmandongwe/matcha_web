'use client';

import { useState } from 'react';

export function DeliveryBanner() {
  const [visible, setVisible] = useState(true);
  if (!visible) return null;

  return (
    <div className="relative bg-matcha-dark px-4 py-2.5 text-center text-sm text-cream">
      <span className="font-medium text-gold">Nationwide Delivery</span>
      <span className="mx-2 text-cream/50">—</span>
      <span>R89 anywhere in South Africa · Tracking included · Secure checkout</span>
      <button
        type="button"
        onClick={() => setVisible(false)}
        aria-label="Dismiss delivery banner"
        className="absolute right-4 top-1/2 -translate-y-1/2 text-cream/60 transition-colors hover:text-cream"
      >
        ✕
      </button>
    </div>
  );
}
