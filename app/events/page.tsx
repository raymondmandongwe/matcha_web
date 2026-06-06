import Link from 'next/link';
import { PageHero } from '../components/PageHero';

const EVENTS = [
  {
    id: 1,
    type: 'Workshop',
    title: 'Matcha Ceremony & Tasting',
    date: 'Every Saturday',
    time: '10:00 – 12:00',
    location: 'Kloof Street, Cape Town',
    description: 'Learn the traditional Japanese tea ceremony, explore our full product range, and leave with a sample kit.',
    color: '#A8D58D',
  },
  {
    id: 2,
    type: 'Pop-Up',
    title: 'Matcha at the Market',
    date: 'Monthly',
    time: '09:00 – 15:00',
    location: 'Mojo Market, Sea Point',
    description: 'Find us at Sea Point\'s Mojo Market with exclusive market-only pricing and seasonal matcha drinks.',
    color: '#A8D58D',
  },
  {
    id: 3,
    type: 'Partner Event',
    title: 'Wellness Wednesday',
    date: 'Every Wednesday',
    time: '07:00 – 09:00',
    location: 'Neelsie, Stellenbosch University',
    description: 'Morning matcha sessions for students and staff. Free tasters for first-timers.',
    color: '#FF8ACB',
  },
] as const;

const PARTNERS = [
  { name: 'Can It', category: 'Manufacturing', location: 'Germiston, Gauteng' },
  { name: 'Dalcoure Coffee', category: 'Production & Roasting', location: 'Epping, Cape Town' },
  { name: 'Mojo Market', category: 'Retail Partner', location: 'Sea Point, Cape Town' },
  { name: 'Stellenbosch University', category: 'Campus Partner', location: 'Stellenbosch' },
] as const;

export default function EventsPage() {
  return (
    <main>
      <PageHero
        eyebrow="Events & Partners"
        title="Experience Love Matcha Live"
        description="Workshops, pop-ups, and wellness events across our locations — plus the partners who make it all possible."
      />

      {/* Upcoming events */}
      <section aria-labelledby="events-heading" className="mx-auto max-w-7xl px-6 py-16 sm:py-24">
        <h2
          id="events-heading"
          className="font-[family-name:var(--font-display)] text-3xl font-semibold text-matcha-dark sm:text-4xl"
        >
          Upcoming Events
        </h2>
        <p className="mt-2 text-base text-charcoal/65">
          All events are free or pay-what-you-can unless otherwise noted.
        </p>

        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {EVENTS.map((event) => (
            <article
              key={event.id}
              aria-label={event.title}
              className="overflow-hidden rounded-2xl border border-matcha-dark/10 bg-card transition-all hover:-translate-y-0.5"
            >
              <div className="flex h-28 items-end p-5" style={{ backgroundColor: event.color }}>
                <span className="rounded-full bg-cream/15 px-2.5 py-1 text-xs font-medium text-cream">
                  {event.type}
                </span>
              </div>
              <div className="p-6">
                <h3 className="font-[family-name:var(--font-display)] text-xl font-semibold text-matcha-dark">
                  {event.title}
                </h3>
                <dl className="mt-3 space-y-1 text-sm text-charcoal/65">
                  <div className="flex gap-2">
                    <dt className="font-medium text-matcha-dark">When</dt>
                    <dd>{event.date} · {event.time}</dd>
                  </div>
                  <div className="flex gap-2">
                    <dt className="font-medium text-matcha-dark">Where</dt>
                    <dd>{event.location}</dd>
                  </div>
                </dl>
                <p className="mt-3 text-sm leading-relaxed text-charcoal/70">{event.description}</p>
                <Link
                  href="/contact"
                  className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-matcha-mid hover:underline underline-offset-4"
                >
                  Register Interest →
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Partners */}
      <section aria-labelledby="partners-heading" className="bg-matcha-dark px-6 py-16 sm:py-24">
        <div className="mx-auto max-w-7xl">
          <h2
            id="partners-heading"
            className="font-[family-name:var(--font-display)] text-3xl font-semibold text-cream sm:text-4xl"
          >
            Our Partners
          </h2>
          <p className="mt-3 text-base text-cream/60">
            We work with trusted South African businesses at every stage — from production to retail.
          </p>
          <div className="mt-10 grid grid-cols-1 gap-px bg-cream/10 sm:grid-cols-2 lg:grid-cols-4">
            {PARTNERS.map((partner) => (
              <div key={partner.name} className="bg-matcha-dark p-8 transition-colors hover:bg-[#9B2E52]">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold/70">{partner.category}</p>
                <h3 className="mt-2 font-[family-name:var(--font-display)] text-xl font-semibold text-cream">
                  {partner.name}
                </h3>
                <p className="mt-1 text-sm text-cream/50">{partner.location}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Become a partner CTA */}
      <section className="px-6 py-20 text-center">
        <div className="mx-auto max-w-xl">
          <p className="text-sm font-medium uppercase tracking-[0.3em] text-matcha-mid">Collaborate</p>
          <h2 className="mt-2 font-[family-name:var(--font-display)] text-3xl font-semibold text-matcha-dark">
            Want to Partner With Us?
          </h2>
          <p className="mt-3 text-base text-charcoal/65">
            We welcome brand collaborations, co-events, and retail partnerships across South Africa.
          </p>
          <Link
            href="/contact"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-matcha-dark px-7 py-3.5 text-sm font-semibold text-cream transition-colors hover:bg-[#5E1530]"
          >
            Get in Touch →
          </Link>
        </div>
      </section>
    </main>
  );
}
