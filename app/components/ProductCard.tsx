import { whatsappOrderUrl, STORE_BASE_URL, type Product } from '../lib/products';

export function ProductCard({ product }: { product: Product }) {
  return (
    <article
      aria-label={product.name}
      className="group flex flex-col overflow-hidden rounded-2xl border border-matcha-dark/10 bg-card transition-all hover:-translate-y-0.5"
    >
      <div
        className="relative flex h-52 items-end overflow-hidden p-4"
        style={{ backgroundColor: product.color }}
      >
        {product.badge && (
          <span className="absolute right-3 top-3 rounded-full bg-gold px-2.5 py-1 text-xs font-semibold text-matcha-dark">
            {product.badge}
          </span>
        )}
        <span className="font-[family-name:var(--font-display)] text-base font-semibold text-cream/90 drop-shadow">
          {product.name}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <p className="text-sm leading-relaxed text-charcoal/70">{product.description}</p>

        <div className="mt-4 flex items-center justify-between">
          <span className="font-[family-name:var(--font-display)] text-2xl font-semibold text-matcha-dark">
            R{product.price.toLocaleString()}
          </span>
        </div>

        <div className="mt-4 flex gap-2">
          <a
            href={product.storeUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`View ${product.name} on the Love Matcha store`}
            className="flex-1 rounded-full bg-matcha-dark py-2.5 text-center text-sm font-medium text-cream transition-colors hover:bg-[#5E1530] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-matcha-mid"
          >
            View Product
          </a>
          <a
            href={whatsappOrderUrl(product.name)}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Order ${product.name} on WhatsApp`}
            className="flex-1 rounded-full border border-matcha-dark py-2.5 text-center text-sm font-medium text-matcha-dark transition-colors hover:bg-matcha-dark/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-matcha-mid"
          >
            Order via WhatsApp
          </a>
        </div>
      </div>
    </article>
  );
}
