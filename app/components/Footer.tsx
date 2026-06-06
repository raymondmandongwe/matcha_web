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

export function Footer() {
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
