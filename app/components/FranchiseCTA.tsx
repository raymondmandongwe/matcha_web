import Link from 'next/link';

export function FranchiseCTA() {
  return (
    <section aria-labelledby="franchise-cta-heading" className="bg-gold px-6 py-20">
      <div className="mx-auto max-w-5xl overflow-hidden rounded-3xl bg-matcha-dark">
        <div className="grid grid-cols-1 gap-0 lg:grid-cols-2">
          <div className="p-10 sm:p-14">
            <p className="text-sm font-medium uppercase tracking-[0.3em] text-gold">Grow With Us</p>
            <h2
              id="franchise-cta-heading"
              className="mt-3 font-[family-name:var(--font-display)] text-3xl font-semibold text-cream sm:text-4xl"
            >
              Open a Love Matcha in Your City
            </h2>
            <p className="mt-4 text-base leading-relaxed text-cream/70">
              We&apos;re expanding across South Africa and beyond. Join our franchise network with full support,
              training, and a proven model.
            </p>
            <Link
              href="/franchise"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-gold px-6 py-3 text-sm font-semibold text-matcha-dark transition-colors hover:bg-[#128A00]"
            >
              Learn About Franchising →
            </Link>
          </div>

          <div className="flex flex-col justify-center gap-6 border-t border-cream/10 p-10 sm:p-14 lg:border-l lg:border-t-0">
            {[
              { label: 'Active locations', value: '12+' },
              { label: 'Provinces covered', value: '3' },
              { label: 'Years operating', value: '4+' },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="font-[family-name:var(--font-display)] text-4xl font-semibold text-gold">{stat.value}</p>
                <p className="mt-1 text-sm text-cream/60">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
