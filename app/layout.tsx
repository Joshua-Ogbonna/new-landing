// app/layout.tsx
// import { poppins } from '../fonts/fonts';
import './globals.css'; // adjust path if needed
import { ReactNode } from 'react';

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    // <html lang="en" className={poppins.variable}>
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}