import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { ThemeProvider } from '@/contexts/ThemeContext';

export const metadata: Metadata = {
  title: {
    default: 'Harry Yu - Personal Blog',
    template: '%s | Harry Yu'
  },
  description: 'Personal blog and portfolio of Harry Yu - Computer Science graduate, Software Developer, and tech enthusiast sharing insights on web development, programming, and technology.',
  authors: [{ name: 'Harry Yu', url: 'https://harryyu.dev' }],
  creator: 'Harry Yu',
  publisher: 'Harry Yu',
  keywords: ['Harry Yu', 'blog', 'portfolio', 'software development', 'web development', 'computer science', 'programming', 'tech', 'React', 'Next.js', 'JavaScript', 'TypeScript'],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://harryyu.dev',
    siteName: 'Harry Yu - Personal Blog',
    title: 'Harry Yu - Personal Blog',
    description: 'Personal blog and portfolio of Harry Yu - Software Developer sharing insights on web development and technology.',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Harry Yu - Personal Blog',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Harry Yu - Personal Blog',
    description: 'Personal blog and portfolio of Harry Yu - Software Developer',
    images: ['/images/og-image.jpg'],
    creator: '@harryyu',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Noto+Serif:ital,wght@0,400;0,700;1,400;1,700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-serif bg-cream dark:bg-gray-900 text-gray-900 dark:text-cream transition-colors duration-300">
        <ThemeProvider>
          <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-grow">
              {children}
            </main>
            <Footer />
          </div>
          <Analytics />
          <SpeedInsights />
        </ThemeProvider>
      </body>
    </html>
  );
}