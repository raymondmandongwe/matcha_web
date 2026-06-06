const BENEFITS = [
  {
    title: 'Clean, Sustained Energy',
    body: 'L-theanine paired with natural caffeine delivers a smooth lift without the jitters or crash of coffee.',
  },
  {
    title: 'Focus & Calm Together',
    body: 'Used by Buddhist monks for centuries to achieve alert, distraction-free concentration.',
  },
  {
    title: 'Antioxidant Powerhouse',
    body: 'One cup of matcha contains the antioxidants of up to 10 cups of regular green tea.',
  },
  {
    title: 'Gut & Skin Health',
    body: 'Supports digestion, reduces inflammation, and gives skin a natural, consistent glow.',
  },
  {
    title: 'Endlessly Versatile',
    body: 'Perfect hot, iced, in a latte, a smoothie, or baked into your favourite recipes.',
  },
  {
    title: 'Ceremonial Grade Quality',
    body: 'Every batch is stone-ground from first-harvest shade-grown leaves — the highest available grade.',
  },
] as const;

export function WhyMatcha() {
  return (
    <section aria-labelledby="why-matcha-heading" className="bg-matcha-dark px-6 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-medium uppercase tracking-[0.3em] text-gold">The Science &amp; Ritual</p>
          <h2
            id="why-matcha-heading"
            className="mt-3 font-[family-name:var(--font-display)] text-3xl font-semibold text-cream sm:text-5xl"
          >
            Why Choose Matcha?
          </h2>
          <p className="mt-4 text-base leading-relaxed text-cream/70">
            Matcha isn&apos;t a trend — it&apos;s a thousand-year practice that science has since confirmed.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-px bg-cream/10 sm:grid-cols-2 lg:grid-cols-3">
          {BENEFITS.map((benefit, i) => (
            <div
              key={benefit.title}
              className="group bg-matcha-dark p-8 transition-colors hover:bg-[#128A00]"
            >
              <span className="font-[family-name:var(--font-display)] text-4xl font-semibold text-gold/30">
                {String(i + 1).padStart(2, '0')}
              </span>
              <h3 className="mt-3 font-[family-name:var(--font-display)] text-lg font-semibold text-cream">
                {benefit.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-cream/65">{benefit.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
