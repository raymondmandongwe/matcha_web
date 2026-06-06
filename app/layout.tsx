import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Love Matcha — Find Us Near You',
  description: 'Locate your nearest Love Matcha store, get directions, hours, and get in touch with us.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
