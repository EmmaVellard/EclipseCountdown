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

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  'https://eclipse-louxor-2027.emma-vellard.chatgpt.site';
const socialImageUrl = `${siteUrl.replace(/\/$/, '')}/og.png`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: 'In the Shadow of the Sun — Luxor 2027',
  description:
    'The countdown to the total solar eclipse over Luxor, Egypt, on August 2, 2027.',
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteUrl,
    title: 'In the Shadow of the Sun — Luxor 2027',
    description:
      'The countdown to the total solar eclipse over Luxor, Egypt, on August 2, 2027.',
    images: [
      {
        url: socialImageUrl,
        width: 1731,
        height: 906,
        alt: 'In the Shadow of the Sun — Luxor, August 2, 2027 at 1:05 PM',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'In the Shadow of the Sun — Luxor 2027',
    description:
      'The countdown to the total solar eclipse over Luxor, Egypt, on August 2, 2027.',
    images: [socialImageUrl],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {children}
      </body>
    </html>
  );
}
