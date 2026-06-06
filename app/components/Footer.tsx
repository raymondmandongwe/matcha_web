import Link from 'next/link';

const SOCIAL_LINKS = [
  { name: 'Facebook', href: 'https://www.facebook.com/lovematchaza' },
  { name: 'Instagram', href: 'https://www.instagram.com/lovematcha.co.za' },
  { name: 'TikTok', href: 'https://www.tiktok.com/@lovematcha.co.za' },
  { name: 'YouTube', href: 'https://www.youtube.com/@lovematcha' },
] as const;

const FOOTER_LINKS = [
  {
    heading: 'Explore',
    links: [
      { label: 'Products', href: '/products' },
      { label: 'Find a Store', href: '/stores' },
      { label: 'Events & Partners', href: '/events' },
      { label: 'Franchise', href: '/franchise' },
    ],
  },
  {
    heading: 'Company',
    links: [
      { label: 'Suppliers', href: '/suppliers' },
      { label: 'Contact', href: '/contact' },
    ],
  },
  {
    heading: 'Legal',
    links: [
      { label: 'Privacy Policy', href: '/policies/privacy-policy' },
      { label: 'Refund Policy', href: '/policies/refund-policy' },
      { label: 'Terms of Service', href: '/policies/terms-of-service' },
    ],
  },
] as const;

export function Footer() {
  return (
    <footer className="bg-matcha-dark px-6 py-16 text-cream">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-2 gap-10 sm:grid-cols-4 lg:grid-cols-5">
          <div className="col-span-2 lg:col-span-2">
            <p className="font-[family-name:var(--font-display)] text-2xl font-semibold">Love Matcha</p>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-cream/60">
              Ceremonial-grade matcha, poured slowly, for communities across South Africa.
            </p>
            <p className="mt-4 text-sm text-cream/60">
              <a href="mailto:info@love-matcha.co.za" className="hover:text-gold transition-colors">
                info@love-matcha.co.za
              </a>
            </p>
            <ul className="mt-5 flex gap-4" aria-label="Love Matcha on social media">
              {SOCIAL_LINKS.map((social) => (
                <li key={social.name}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Love Matcha on ${social.name}`}
                    className="text-sm font-medium text-cream/60 transition-colors hover:text-gold"
                  >
                    {social.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {FOOTER_LINKS.map((col) => (
            <nav key={col.heading} aria-label={col.heading}>
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-cream/40">{col.heading}</p>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-cream/65 transition-colors hover:text-gold"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-cream/10 pt-8 sm:flex-row">
          <p className="text-xs text-cream/40">
            © {new Date().getFullYear()} Love Matcha. All rights reserved.
          </p>
          <p className="text-xs text-cream/40">Nationwide Delivery R89 · Secure Checkout · WhatsApp Support</p>
        </div>
      </div>
    </footer>
  );
}
