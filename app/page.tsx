import Link from 'next/link';
import { WhyMatcha } from './components/WhyMatcha';
import { ReviewsSection } from './components/ReviewsSection';
import { FranchiseCTA } from './components/FranchiseCTA';
import { MatchaLeafWatermark } from './components/MatchaLeafWatermark';

const TRUST_BADGES = [
  { icon: '→', label: 'Nationwide Delivery', detail: 'R89 anywhere in SA' },
  { icon: '◈', label: 'Tracked & Secure', detail: 'Real-time tracking' },
  { icon: '◉', label: 'Store Pickup', detail: '12 locations' },
  { icon: '◎', label: 'WhatsApp Support', detail: 'Reply in under 1 hr' },
] as const;

const GALLERY_COLORS = [
  '#128A00', '#128A00', '#F8A8D8', '#128A00', '#128A00', '#F8A8D8',
] as const;

export default function HomePage() {
  return (
    <main>
      {/* ── Hero ── */}
      <section className="relative min-h-[90vh] overflow-hidden bg-[url('/matcha_web/matcha-home-bg.png')] bg-cover bg-center">
        <MatchaLeafWatermark />

        <div className="relative mx-auto flex min-h-[90vh] max-w-7xl flex-col items-center justify-center px-6 py-24 lg:flex-row lg:gap-16">
          <div className="max-w-xl text-center lg:text-left">
            <p className="text-sm font-medium uppercase tracking-[0.35em] text-gold">
              Premium Ceremonial Grade
            </p>
            <h1 className="mt-4 font-[family-name:var(--font-display)] text-5xl font-semibold leading-[1.1] tracking-tight text-matcha-dark sm:text-6xl lg:text-7xl">
              Premium Matcha.{' '}
              <span className="text-matcha-mid">Calm Energy.</span>{' '}
              Made for South Africa.
            </h1>
            <p className="mt-6 text-lg font-medium leading-relaxed text-charcoal/75">
              Discover Love Matcha&apos;s ceremonial-grade drinks, powders, starter kits and store locations across SA.
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-4 lg:justify-start">
              <Link
                href="/products"
                className="rounded-full bg-gold px-7 py-3.5 text-sm font-semibold text-matcha-dark transition-colors hover:bg-[#128A00] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
              >
                Shop Products
              </Link>
              <Link
                href="/stores"
                className="rounded-full border border-matcha-dark/25 bg-white/40 px-7 py-3.5 text-sm font-semibold text-matcha-dark backdrop-blur-sm transition-colors hover:border-matcha-dark/45 hover:bg-white/65 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-matcha-dark"
              >
                Find a Store
              </Link>
            </div>
          </div>

          <div className="mt-12 w-full max-w-sm shrink-0 lg:mt-0">
            <div className="relative mx-auto aspect-[3/4] w-full max-w-xs overflow-hidden rounded-3xl border border-white/40 bg-white/35 shadow-[0_20px_60px_-15px_rgba(18,138,0,0.25)] backdrop-blur-sm">
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 p-6 text-center">
                <div className="h-20 w-20 rounded-full bg-matcha-mid/15" />
                <p className="font-[family-name:var(--font-display)] text-xl font-semibold text-matcha-dark">
                  Love Matcha
                </p>
                <p className="text-xs font-medium text-charcoal/55">Product photography coming soon</p>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-1.5">
          <div className="h-8 w-px bg-matcha-dark/20" />
          <span className="text-xs font-medium text-matcha-dark/55">Scroll</span>
        </div>
      </section>

      {/* ── Trust badges ── */}
      <section aria-label="Delivery and service highlights" className="border-b border-matcha-dark/10 bg-card/85 px-6 py-6">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-4 lg:grid-cols-4">
          {TRUST_BADGES.map((badge) => (
            <div key={badge.label} className="flex items-center gap-3 py-2">
              <span aria-hidden="true" className="text-xl text-matcha-mid">{badge.icon}</span>
              <div>
                <p className="text-sm font-semibold text-matcha-dark">{badge.label}</p>
                <p className="text-xs text-charcoal/55">{badge.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Why Matcha ── */}
      <WhyMatcha />

      {/* ── Lifestyle Gallery ── */}
      <section aria-labelledby="gallery-heading" className="bg-gold/85 px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 text-center">
            <p className="text-sm font-medium uppercase tracking-[0.3em] text-matcha-mid">The Ritual</p>
            <h2
              id="gallery-heading"
              className="mt-2 font-[family-name:var(--font-display)] text-3xl font-semibold text-matcha-dark"
            >
              Life Tastes Better With Matcha
            </h2>
          </div>

          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-6">
            {GALLERY_COLORS.map((color, i) => (
              <div
                key={i}
                className="aspect-square overflow-hidden rounded-xl"
                style={{ backgroundColor: color }}
                aria-hidden="true"
              />
            ))}
          </div>

          <p className="mt-6 text-center text-sm text-charcoal/50">
            Follow us{' '}
            <a
              href="https://www.instagram.com/lovematcha.co.za"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-matcha-mid underline-offset-4 hover:underline"
            >
              @lovematcha.co.za
            </a>
          </p>
        </div>
      </section>

      {/* ── Reviews ── */}
      <ReviewsSection />

      {/* ── Franchise CTA ── */}
      <FranchiseCTA />
    </main>
  );
}
