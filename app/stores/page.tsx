import { PageHero } from '../components/PageHero';
import { StoreCard } from '../components/StoreCard';
import { STORES } from '../lib/stores';

export default function StoresPage() {
  return (
    <main>
      <PageHero
        eyebrow="Love Matcha"
        title="Find Us Near You"
        description="Eleven calm corners across South Africa, each pouring the same ceremonial-grade matcha. Step in, slow down, and find your nearest store below."
      />

      <section aria-labelledby="store-locator-heading" className="mx-auto max-w-7xl px-6 py-16 sm:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <h2
            id="store-locator-heading"
            className="font-[family-name:var(--font-display)] text-3xl font-semibold text-[#2D5016] sm:text-4xl"
          >
            Our Stores
          </h2>
          <p className="mt-3 text-base leading-relaxed text-[#1A1A1A]/70">
            Tap a card for hours, contact details, and directions to your nearest Love Matcha.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {STORES.map((store) => (
            <StoreCard key={store.id} store={store} />
          ))}
        </div>
      </section>
    </main>
  );
}
