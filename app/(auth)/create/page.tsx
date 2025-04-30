import type { Metadata } from 'next';
import CreateClient from './create-client';

// Add metadata for Sign Up page
export const metadata: Metadata = {
  title: 'Sign Up',
  description: 'Create your MySound account to explore new music, listen on the go, and kickstart your music experience.',
  openGraph: {
    title: 'Sign Up - MySound',
    description: 'Create your MySound account to explore new music and listen on the go.',
    url: '/create',
  },
};

export default function CreatePage() {
  return <CreateClient />;
}