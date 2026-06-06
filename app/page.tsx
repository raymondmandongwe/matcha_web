import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 bg-[#F9F5EE] px-6 text-center">
      <h1 className="font-serif text-3xl font-semibold text-[#2D5016]">Love Matcha</h1>
      <Link
        href="/contact"
        className="rounded-full bg-[#2D5016] px-6 py-3 text-sm font-medium text-[#F9F5EE] transition-colors hover:bg-[#23400f]"
      >
        Find a Store →
      </Link>
    </main>
  );
}
