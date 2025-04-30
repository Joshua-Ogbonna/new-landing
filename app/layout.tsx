// app/layout.tsx
// import { poppins } from '../fonts/fonts';
import './globals.css'; // adjust path if needed
import { ReactNode } from 'react';
import type { Metadata } from 'next'; // Import Metadata type
import Providers from './providers'; // Import the Providers component

interface RootLayoutProps {
  children: ReactNode;
}

// Add default metadata
export const metadata: Metadata = {
  title: {
    template: '%s | MySound',
    default: 'MySound - Explore New Music & Listen On The Go',
  },
  description: 'Discover and stream the latest tracks, manage your music, and connect with artists on MySound. Your ultimate music platform.',
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'), // Set base URL
  openGraph: {
    siteName: 'MySound',
  },
  // Add other potential default tags like theme color, icons etc. if needed
  // icons: {
  //   icon: '/icon.png', // Example for different icon sizes/types
  //   apple: '/apple-icon.png',
  // },
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    // <html lang="en" className={poppins.variable}>
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}