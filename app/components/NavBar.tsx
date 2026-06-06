'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/products', label: 'Products' },
  { href: '/stores', label: 'Stores' },
  { href: '/franchise', label: 'Franchise' },
  { href: '/events', label: 'Events' },
  { href: '/suppliers', label: 'Suppliers' },
  { href: '/contact', label: 'Contact' },
] as const;

export function NavBar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav aria-label="Primary" className="sticky top-0 z-30 border-b border-matcha-dark/10 bg-cream/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link
          href="/"
          className="font-[family-name:var(--font-display)] text-xl font-semibold text-matcha-dark"
          onClick={() => setMobileOpen(false)}
        >
          Love Matcha
        </Link>

        {/* Desktop nav */}
        <ul className="hidden items-center gap-6 lg:flex">
          {NAV_LINKS.map((link) => {
            const isActive = pathname === link.href;
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  aria-current={isActive ? 'page' : undefined}
                  className={`text-sm font-medium transition-colors hover:text-matcha-dark ${
                    isActive ? 'text-matcha-dark' : 'text-charcoal/55'
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="hidden items-center gap-3 lg:flex">
          <Link
            href="/products"
            className="rounded-full bg-matcha-dark px-4 py-2 text-sm font-semibold text-cream transition-colors hover:bg-[#128A00]"
          >
            Shop Now
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          type="button"
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((o) => !o)}
          className="flex h-9 w-9 flex-col items-center justify-center gap-1.5 rounded-lg lg:hidden"
        >
          <span className={`h-0.5 w-5 bg-matcha-dark transition-all ${mobileOpen ? 'translate-y-2 rotate-45' : ''}`} />
          <span className={`h-0.5 w-5 bg-matcha-dark transition-all ${mobileOpen ? 'opacity-0' : ''}`} />
          <span className={`h-0.5 w-5 bg-matcha-dark transition-all ${mobileOpen ? '-translate-y-2 -rotate-45' : ''}`} />
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="border-t border-matcha-dark/10 bg-cream lg:hidden">
          <ul className="mx-auto max-w-7xl space-y-1 px-6 py-4">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href;
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    aria-current={isActive ? 'page' : undefined}
                    onClick={() => setMobileOpen(false)}
                    className={`block rounded-lg px-4 py-2.5 text-sm font-medium transition-colors hover:bg-matcha-dark/5 ${
                      isActive ? 'text-matcha-dark' : 'text-charcoal/70'
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
            <li className="pt-2">
              <Link
                href="/products"
                onClick={() => setMobileOpen(false)}
                className="block rounded-full bg-matcha-dark py-2.5 text-center text-sm font-semibold text-cream"
              >
                Shop Now
              </Link>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}
