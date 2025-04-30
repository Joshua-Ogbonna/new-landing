import type { Metadata } from 'next';
import HomeClient from './home-client'; // Import the Client Component

// Define metadata for the index page
export const metadata: Metadata = {
  title: 'MySound - Explore New Music & Listen On The Go',
  description: 'Discover and stream the latest tracks, manage your music, and connect with artists on MySound. Your ultimate music platform.',
  openGraph: {
    title: 'MySound - Explore New Music & Listen On The Go',
    description: 'Discover and stream the latest tracks, manage your music, and connect with artists on MySound.',
    url: '/',
    type: 'website',
    images: [
      {
        url: '/auth-logo.svg',
        width: 1200,
        height: 630,
        alt: 'MySound Platform Promotion',
      },
    ],
  },
};

// This is the Server Component Page
export default function Page() {
  return <HomeClient />; // Render the Client Component
}
