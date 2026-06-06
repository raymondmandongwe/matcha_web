'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const NAV_LINKS = [
  { href: '/stores', label: 'Stores' },
  { href: '/contact', label: 'Contact' },
  { href: '/suppliers', label: 'Suppliers' },
] as const;

export function NavBar() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-30 border-b border-[#2D5016]/10 bg-[#F9F5EE]/90 backdrop-blur">
      <nav aria-label="Primary" className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link href="/" className="font-[family-name:var(--font-display)] text-xl font-semibold text-[#2D5016]">
          Love Matcha
        </Link>
        <ul className="flex items-center gap-6">
          {NAV_LINKS.map((link) => {
            const isActive = pathname === link.href;
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  aria-current={isActive ? 'page' : undefined}
                  className={`text-sm font-medium transition-colors hover:text-[#2D5016] ${
                    isActive ? 'text-[#2D5016]' : 'text-[#1A1A1A]/60'
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
}
