import type { Metadata } from 'next';
import { Playfair_Display, Inter } from 'next/font/google';
import './globals.css';
import { DeliveryBanner } from './components/DeliveryBanner';
import { NavBar } from './components/NavBar';
import { Footer } from './components/Footer';

const playfair = Playfair_Display({ subsets: ['latin'], weight: ['500', '600', '700'], variable: '--font-display' });
const inter = Inter({ subsets: ['latin'], weight: ['400', '500', '600'], variable: '--font-body' });

export const metadata: Metadata = {
  title: {
    default: 'Love Matcha — Premium Ceremonial Matcha',
    template: '%s | Love Matcha',
  },
  description:
    'Premium ceremonial-grade matcha drinks, powders, and starter kits. 12 stores across South Africa. Nationwide delivery R89.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <body className="font-[family-name:var(--font-body)] bg-gold text-charcoal">
        <DeliveryBanner />
        <NavBar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
