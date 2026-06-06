import Link from 'next/link';
import { PageHero } from '../components/PageHero';

const STEPS = [
  { step: '01', title: 'Express Interest', body: 'Fill in our franchise enquiry form or send us an email. We review all applications within 5 business days.' },
  { step: '02', title: 'Discovery Call', body: 'Meet the Love Matcha team virtually or in person. We\'ll walk you through the model, numbers, and expectations.' },
  { step: '03', title: 'Site Selection', body: 'Our operations team assists with location scouting, lease negotiations, and store layout planning.' },
  { step: '04', title: 'Training & Launch', body: 'Full training on our menu, systems, and brand. Ongoing support from day one through your grand opening.' },
] as const;

const BENEFITS = [
  { title: 'Proven Brand', body: 'An established brand with 4+ years of operation, 12 active locations, and thousands of loyal customers.' },
  { title: 'Full Support', body: 'Training, marketing assets, supplier relationships, and operational playbooks — everything included.' },
  { title: 'Strong Unit Economics', body: 'Low overhead model designed for high-traffic retail and food-court environments.' },
  { title: 'Growing Market', body: 'The matcha and functional wellness category is growing 20%+ year-on-year across South Africa.' },
] as const;

export default function FranchisePage() {
  return (
    <main>
      <PageHero
        eyebrow="Franchise Opportunities"
        title="Open a Love Matcha in Your City"
        description="Join South Africa's leading ceremonial-grade matcha brand. We offer a proven model, full support, and a product that sells itself."
      />

      {/* Why franchise */}
      <section aria-labelledby="franchise-why-heading" className="mx-auto max-w-7xl px-6 py-16 sm:py-24">
        <h2
          id="franchise-why-heading"
          className="font-[family-name:var(--font-display)] text-3xl font-semibold text-matcha-dark sm:text-4xl"
        >
          Why Partner With Us?
        </h2>
        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2">
          {BENEFITS.map((b) => (
            <div key={b.title} className="rounded-2xl border border-matcha-dark/10 bg-card p-7">
              <h3 className="font-[family-name:var(--font-display)] text-xl font-semibold text-matcha-dark">{b.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-charcoal/70">{b.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Process */}
      <section aria-labelledby="franchise-process-heading" className="bg-matcha-dark/90 px-6 py-16 sm:py-24">
        <div className="mx-auto max-w-7xl">
          <h2
            id="franchise-process-heading"
            className="font-[family-name:var(--font-display)] text-3xl font-semibold text-cream sm:text-4xl"
          >
            How It Works
          </h2>
          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {STEPS.map((s) => (
              <div key={s.step} className="border-t border-cream/15 pt-6">
                <p className="font-[family-name:var(--font-display)] text-4xl font-semibold text-gold/30">{s.step}</p>
                <h3 className="mt-3 font-[family-name:var(--font-display)] text-lg font-semibold text-cream">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-cream/60">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section aria-labelledby="franchise-cta" className="px-6 py-20 text-center">
        <div className="mx-auto max-w-xl">
          <h2 id="franchise-cta" className="font-[family-name:var(--font-display)] text-3xl font-semibold text-matcha-dark">
            Ready to Get Started?
          </h2>
          <p className="mt-3 text-base leading-relaxed text-charcoal/65">
            Send us an email with your location of interest and a brief introduction.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <a
              href="mailto:franchise@love-matcha.co.za"
              className="rounded-full bg-matcha-dark px-7 py-3.5 text-sm font-semibold text-cream transition-colors hover:bg-[#128A00]"
            >
              Email Us About Franchising
            </a>
            <Link
              href="/contact"
              className="rounded-full border border-matcha-dark px-7 py-3.5 text-sm font-semibold text-matcha-dark transition-colors hover:bg-matcha-dark/5"
            >
              General Enquiry
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
