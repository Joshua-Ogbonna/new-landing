import type { Metadata } from 'next';
import ArtistProfileClient from './artist-profile-client';

// Adjust metadata for Artist Profile Setup page
export const metadata: Metadata = {
  title: 'Artist Profile Setup',
  description: 'Complete your MySound artist profile by adding your name, bio, image, and social links.',
  // Prevent indexing of this setup page if desired
  robots: { index: false, follow: true }, 
  openGraph: {
    title: 'Artist Profile Setup - MySound',
    description: 'Complete your MySound artist profile.',
    url: '/artistSignIn', // Stays same as the route
  },
};

export default function ArtistProfilePage() {
  return <ArtistProfileClient />;
}