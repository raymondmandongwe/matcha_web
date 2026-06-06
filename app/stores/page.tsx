import { PageHero } from '../components/PageHero';
import { StoreFilterGrid } from '../components/StoreFilterGrid';
import { STORES } from '../lib/stores';

export default function StoresPage() {
  return (
    <main>
      <PageHero
        eyebrow="Love Matcha"
        title="Find Us Near You"
        description="Twelve locations across South Africa — each serving the same ceremonial-grade matcha. Filter by area or browse all."
      />

      <section aria-labelledby="store-locator-heading" className="mx-auto max-w-7xl px-6 py-16 sm:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <h2
            id="store-locator-heading"
            className="font-[family-name:var(--font-display)] text-3xl font-semibold text-matcha-dark sm:text-4xl"
          >
            Our Stores
          </h2>
          <p className="mt-3 text-base leading-relaxed text-charcoal/65">
            Cards show live open / closed status. Tap <strong>Get Directions</strong> for Google Maps navigation.
          </p>
        </div>

        <div className="mt-12">
          <StoreFilterGrid stores={STORES} />
        </div>
      </section>
    </main>
  );
}
