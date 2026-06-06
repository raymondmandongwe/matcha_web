import Link from 'next/link';

const LANDING_LINKS = [
  { href: '/stores', label: 'Find a Store', description: 'Browse all eleven Love Matcha locations and get directions.' },
  { href: '/contact', label: 'Get in Touch', description: 'Send us a message — questions, feedback, or enquiries.' },
  { href: '/suppliers', label: 'Our Partners', description: 'Meet the manufacturing partners behind every batch.' },
] as const;

export default function HomePage() {
  return (
    <main className="flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center gap-10 px-6 py-20 text-center">
      <div>
        <h1 className="font-[family-name:var(--font-display)] text-4xl font-semibold text-[#2D5016] sm:text-5xl">
          Love Matcha
        </h1>
        <p className="mx-auto mt-3 max-w-md text-base leading-relaxed text-[#1A1A1A]/70">
          Ceremonial-grade matcha, poured slowly, across South Africa.
        </p>
      </div>

      <div className="grid w-full max-w-3xl grid-cols-1 gap-6 sm:grid-cols-3">
        {LANDING_LINKS.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="flex flex-col items-start gap-2 rounded-2xl border border-[#2D5016]/10 bg-white p-6 text-left shadow-sm transition-shadow hover:shadow-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8FAF6A]"
          >
            <span className="font-[family-name:var(--font-display)] text-lg font-semibold text-[#2D5016]">
              {link.label} →
            </span>
            <span className="text-sm leading-relaxed text-[#1A1A1A]/70">{link.description}</span>
          </Link>
        ))}
      </div>
    </main>
  );
}
