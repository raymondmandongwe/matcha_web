import { PageHero } from '../components/PageHero';
import { ProductCard } from '../components/ProductCard';
import { PRODUCTS, STORE_BASE_URL, whatsappOrderUrl } from '../lib/products';

export default function ProductsPage() {
  return (
    <main>
      <PageHero
        eyebrow="Shop Love Matcha"
        title="Premium Matcha, Delivered to Your Door"
        description="Ceremonial-grade powders, starter kits, and capsules — nationwide delivery for R89. Order online or via WhatsApp."
      />

      {/* Product grid */}
      <section aria-labelledby="products-grid-heading" className="mx-auto max-w-7xl px-6 py-16 sm:py-24">
        <h2
          id="products-grid-heading"
          className="font-[family-name:var(--font-display)] text-3xl font-semibold text-matcha-dark sm:text-4xl"
        >
          All Products
        </h2>
        <p className="mt-2 text-base text-charcoal/65">
          Prices in ZAR. Nationwide delivery R89. Free delivery on orders over R1,200.
        </p>

        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {PRODUCTS.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Ordering info */}
      <section aria-labelledby="ordering-heading" className="bg-matcha-dark/90 px-6 py-16">
        <div className="mx-auto max-w-5xl">
          <h2
            id="ordering-heading"
            className="font-[family-name:var(--font-display)] text-2xl font-semibold text-cream sm:text-3xl"
          >
            How to Order
          </h2>
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-3">
            {[
              {
                step: '01',
                title: 'Shop Online',
                body: 'Browse and checkout directly on our store. Secure payment, tracked delivery.',
                href: STORE_BASE_URL,
                cta: 'Visit Store',
              },
              {
                step: '02',
                title: 'Order on WhatsApp',
                body: 'Message us your order and we\'ll send you a payment link within the hour.',
                href: whatsappOrderUrl(''),
                cta: 'Open WhatsApp',
              },
              {
                step: '03',
                title: 'Pick Up In-Store',
                body: 'Order ahead or walk in to any of our 12 locations across South Africa.',
                href: '/stores',
                cta: 'Find a Store',
              },
            ].map((item) => (
              <div key={item.step} className="rounded-2xl border border-cream/10 p-7">
                <p className="font-[family-name:var(--font-display)] text-4xl font-semibold text-gold/30">
                  {item.step}
                </p>
                <h3 className="mt-3 font-[family-name:var(--font-display)] text-lg font-semibold text-cream">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-cream/60">{item.body}</p>
                <a
                  href={item.href}
                  target={item.href.startsWith('http') ? '_blank' : undefined}
                  rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-gold hover:underline"
                >
                  {item.cta} →
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
