'use client';

import { useRef, useState } from 'react';
import type { KeyboardEvent, TouchEvent } from 'react';

interface ImageCarouselProps {
  images: readonly string[];
  label: string;
}

export function ImageCarousel({ images, label }: ImageCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const touchStartX = useRef<number | null>(null);

  const goTo = (next: number) => {
    setActiveIndex(((next % images.length) + images.length) % images.length);
  };

  const handleTouchStart = (event: TouchEvent<HTMLDivElement>) => {
    touchStartX.current = event.touches[0]?.clientX ?? null;
  };

  const handleTouchEnd = (event: TouchEvent<HTMLDivElement>) => {
    if (touchStartX.current === null) return;
    const deltaX = event.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(deltaX) > 40) {
      goTo(activeIndex + (deltaX < 0 ? 1 : -1));
    }
    touchStartX.current = null;
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'ArrowRight') {
      event.preventDefault();
      goTo(activeIndex + 1);
    } else if (event.key === 'ArrowLeft') {
      event.preventDefault();
      goTo(activeIndex - 1);
    }
  };

  return (
    <div
      role="group"
      aria-roledescription="carousel"
      aria-label={`Photos of ${label}`}
      tabIndex={0}
      onKeyDown={handleKeyDown}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      className="relative h-44 overflow-hidden rounded-xl outline-none focus-visible:ring-2 focus-visible:ring-[#8FAF6A] focus-visible:ring-offset-2"
    >
      <div
        className="flex h-full transition-transform duration-500 ease-out"
        style={{ transform: `translateX(-${activeIndex * 100}%)` }}
      >
        {images.map((color, index) => (
          <div
            key={index}
            aria-hidden={index !== activeIndex}
            className="flex h-full w-full shrink-0 items-center justify-center"
            style={{ backgroundColor: color }}
          >
            <span className="font-[family-name:var(--font-display)] text-sm tracking-wide text-[#F9F5EE]/80">
              {label} — photo {index + 1}
            </span>
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={() => goTo(activeIndex - 1)}
        aria-label={`Previous photo of ${label}`}
        className="absolute left-2 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-[#1A1A1A]/30 text-lg text-[#F9F5EE] backdrop-blur-sm transition-colors hover:bg-[#1A1A1A]/50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#F9F5EE]"
      >
        ‹
      </button>
      <button
        type="button"
        onClick={() => goTo(activeIndex + 1)}
        aria-label={`Next photo of ${label}`}
        className="absolute right-2 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-[#1A1A1A]/30 text-lg text-[#F9F5EE] backdrop-blur-sm transition-colors hover:bg-[#1A1A1A]/50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#F9F5EE]"
      >
        ›
      </button>

      <div className="absolute bottom-2 left-1/2 flex -translate-x-1/2 gap-1.5">
        {images.map((_, index) => (
          <button
            key={index}
            type="button"
            aria-label={`Show photo ${index + 1} of ${images.length}`}
            aria-current={index === activeIndex}
            onClick={() => goTo(index)}
            className={`h-1.5 rounded-full transition-all ${
              index === activeIndex ? 'w-5 bg-[#F9F5EE]' : 'w-1.5 bg-[#F9F5EE]/50'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
