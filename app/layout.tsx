import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  metadataBase: new URL(
    'https://eclipse-louxor-2027.emma-vellard.chatgpt.site',
  ),
  title: 'Sous l’ombre du Soleil — Louxor 2027',
  description:
    'Le compte à rebours jusqu’à l’éclipse solaire totale du 2 août 2027 à Louxor, en Égypte.',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    title: 'Sous l’ombre du Soleil — Louxor 2027',
    description:
      'Le compte à rebours jusqu’à l’éclipse solaire totale du 2 août 2027 à Louxor, en Égypte.',
    images: [
      {
        url: '/og.png',
        width: 1731,
        height: 906,
        alt: 'Sous l’ombre du Soleil — Louxor, 2 août 2027 à 13:05',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sous l’ombre du Soleil — Louxor 2027',
    description:
      'Le compte à rebours jusqu’à l’éclipse solaire totale du 2 août 2027 à Louxor, en Égypte.',
    images: ['/og.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="dark">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {children}
      </body>
    </html>
  );
}
