import { MatchaLeafWatermark } from './MatchaLeafWatermark';

interface PageHeroProps {
  eyebrow: string;
  title: string;
  description: string;
}

export function PageHero({ eyebrow, title, description }: PageHeroProps) {
  return (
    <header className="relative overflow-hidden bg-gradient-to-br from-[#2D5016] via-[#3d6a20] to-[#8FAF6A] py-20 text-center sm:py-28">
      <MatchaLeafWatermark />
      <div className="relative mx-auto max-w-3xl px-6">
        <p className="text-sm font-medium uppercase tracking-[0.3em] text-[#F9F5EE]/70">{eyebrow}</p>
        <h1 className="mt-4 font-[family-name:var(--font-display)] text-4xl font-semibold tracking-tight text-[#F9F5EE] sm:text-6xl">
          {title}
        </h1>
        <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-[#F9F5EE]/85 sm:text-lg">{description}</p>
      </div>
    </header>
  );
}
