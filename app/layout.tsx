import type { Metadata } from 'next';
import { Playfair_Display, Inter } from 'next/font/google';
import './globals.css';
import { NavBar } from './components/NavBar';
import { Footer } from './components/Footer';

const playfair = Playfair_Display({ subsets: ['latin'], weight: ['500', '600', '700'], variable: '--font-display' });
const inter = Inter({ subsets: ['latin'], weight: ['400', '500', '600'], variable: '--font-body' });

export const metadata: Metadata = {
  title: 'Love Matcha',
  description: 'Locate your nearest Love Matcha store, get directions, hours, and get in touch with us.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <body className="font-[family-name:var(--font-body)] bg-[#F9F5EE] text-[#1A1A1A]">
        <NavBar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
