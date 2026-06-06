import Link from 'next/link';

const LANDING_LINKS = [
  { href: '/stores', label: 'Find a Store', description: 'Browse all eleven Love Matcha locations and get directions.' },
  { href: '/contact', label: 'Get in Touch', description: 'Send us a message — questions, feedback, or enquiries.' },
  { href: '/suppliers', label: 'Our Partners', description: 'Meet the manufacturing partners behind every batch.' },
] as const;

export default function HomePage() {
  return (
    <main className="relative isolate flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center gap-10 overflow-hidden bg-[url('/matcha_web/matcha-home-poster.jpg')] bg-cover bg-center px-6 py-20 text-center">
      <video
        className="absolute inset-0 -z-20 h-full w-full object-cover motion-reduce:hidden"
        autoPlay
        loop
        muted
        poster="/matcha_web/matcha-home-poster.jpg"
        preload="metadata"
        playsInline
        aria-hidden="true"
      >
        <source src="/matcha_web/matcha-home-video.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 -z-10 bg-white/20" aria-hidden="true" />
      <div className="rounded-[8px] border border-white/20 bg-transparent px-6 py-5">
        <h1 className="font-[family-name:var(--font-display)] text-4xl font-semibold text-[#2D5016] drop-shadow-[0_2px_8px_rgba(255,255,255,0.85)] sm:text-5xl">
          Love Matcha
        </h1>
        <p className="mx-auto mt-3 max-w-md text-base font-medium leading-relaxed text-[#1A1A1A] drop-shadow-[0_1px_6px_rgba(255,255,255,0.9)]">
          Ceremonial-grade matcha, poured slowly, across South Africa.
        </p>
      </div>

      <div className="grid w-full max-w-3xl grid-cols-1 gap-6 sm:grid-cols-3">
        {LANDING_LINKS.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="flex flex-col items-start gap-2 rounded-[8px] border border-white/30 bg-transparent p-6 text-left transition-shadow hover:shadow-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8FAF6A]"
          >
            <span className="font-[family-name:var(--font-display)] text-lg font-semibold text-[#2D5016] drop-shadow-[0_2px_8px_rgba(255,255,255,0.85)]">
              {link.label} →
            </span>
            <span className="text-sm font-medium leading-relaxed text-[#1A1A1A] drop-shadow-[0_1px_6px_rgba(255,255,255,0.9)]">
              {link.description}
            </span>
          </Link>
        ))}
      </div>
    </main>
  );
}
