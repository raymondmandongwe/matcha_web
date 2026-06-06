const MANUFACTURERS = [
  {
    name: 'Can It',
    location: 'Germiston, Gauteng',
    description: 'Our canning partner — responsible for filling and sealing every can that leaves the line.',
  },
  {
    name: 'Dalcoure Coffee',
    location: 'Epping, Cape Town',
    description: 'Our roasting and beverage production partner, blending and bottling each batch to spec.',
  },
] as const;

export function ManufacturerInfo() {
  return (
    <section aria-labelledby="manufacturer-heading" className="mx-auto max-w-5xl px-6 py-16 sm:py-24">
      <h2 id="manufacturer-heading" className="font-[family-name:var(--font-display)] text-3xl font-semibold text-[#2D5016] sm:text-4xl">
        Our Partners
      </h2>
      <div className="mt-10 grid grid-cols-1 gap-10 sm:grid-cols-2">
        {MANUFACTURERS.map((manufacturer) => (
          <div key={manufacturer.name} className="border-t border-[#2D5016]/15 pt-5">
            <h3 className="font-[family-name:var(--font-display)] text-xl font-semibold text-[#2D5016]">
              {manufacturer.name}
            </h3>
            <p className="mt-1 text-sm font-medium uppercase tracking-[0.2em] text-[#8FAF6A]">{manufacturer.location}</p>
            <p className="mt-3 text-sm leading-relaxed text-[#1A1A1A]/75">{manufacturer.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
