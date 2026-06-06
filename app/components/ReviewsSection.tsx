const REVIEWS = [
  {
    id: 1,
    body: 'Best matcha latte I\'ve had in Cape Town. Silky, vibrant, and not bitter at all. I come every week.',
    author: 'Samantha K.',
    location: 'Kloof Street',
    rating: 5,
  },
  {
    id: 2,
    body: 'Smooth, creamy and nothing like the powdery stuff elsewhere. The starter kit made me a proper home barista.',
    author: 'Thabo M.',
    location: 'Rondebosch',
    rating: 5,
  },
  {
    id: 3,
    body: 'Ordered online and received it next day. The 100g powder lasts me a month. Incredible quality for the price.',
    author: 'Priya N.',
    location: 'Online Order',
    rating: 5,
  },
] as const;

function StarRating({ rating }: { rating: number }) {
  return (
    <div aria-label={`${rating} out of 5 stars`} className="flex gap-0.5">
      {Array.from({ length: 5 }, (_, i) => (
        <span key={i} aria-hidden="true" className={i < rating ? 'text-gold' : 'text-charcoal/20'}>
          ★
        </span>
      ))}
    </div>
  );
}

export function ReviewsSection() {
  return (
    <section aria-labelledby="reviews-heading" className="bg-cream px-6 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-medium uppercase tracking-[0.3em] text-matcha-mid">Social Proof</p>
          <h2
            id="reviews-heading"
            className="mt-3 font-[family-name:var(--font-display)] text-3xl font-semibold text-matcha-dark sm:text-5xl"
          >
            Loved by Matcha Drinkers Across SA
          </h2>
          <div className="mt-4 flex items-center justify-center gap-3">
            <StarRating rating={5} />
            <span className="text-sm font-medium text-charcoal/70">4.9 rating · 800+ reviews</span>
          </div>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-3">
          {REVIEWS.map((review) => (
            <blockquote
              key={review.id}
              className="flex flex-col rounded-2xl bg-card p-7"
            >
              <StarRating rating={review.rating} />
              <p className="mt-4 flex-1 text-base leading-relaxed text-charcoal/80">&ldquo;{review.body}&rdquo;</p>
              <footer className="mt-5 border-t border-matcha-dark/10 pt-4">
                <p className="text-sm font-semibold text-matcha-dark">{review.author}</p>
                <p className="text-xs text-charcoal/50">{review.location}</p>
              </footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
