import type { Metadata } from 'next';
import SignInClient from './sign-in-client';

// Add metadata for Sign In page
export const metadata: Metadata = {
  title: 'Log In',
  description: 'Access your MySound account to continue managing your music, earnings, and courses. Log in now.',
  openGraph: {
    title: 'Log In - MySound',
    description: 'Access your MySound account. Log in now.',
    url: '/signIn',
  },
};

export default function SignInPage() {
  return <SignInClient />;
}