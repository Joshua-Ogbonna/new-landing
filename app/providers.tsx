'use client';

import { SessionProvider } from 'next-auth/react';
import type { ReactNode } from 'react';
import { Toaster } from 'react-hot-toast';

interface ProvidersProps {
  children: ReactNode;
}

export default function Providers({ children }: ProvidersProps) {
  // You could add other global providers here if needed (e.g., ThemeProvider, QueryClientProvider)
  return (
    <SessionProvider>
      {children}
      <Toaster 
        position="top-center" 
        reverseOrder={false}
        toastOptions={{
            // Define default options
            className: '',
            duration: 5000,
            style: {
              background: '#333',
              color: '#fff',
            },
            // Default options for specific types
            success: {
              duration: 3000,
               style: {
                 background: '#161717', // Dark background
                 color: '#C2EE03', // Lime text
                 border: '1px solid #C2EE0347', // Subtle border
              },
               iconTheme: {
                 primary: '#C2EE03',
                 secondary: '#161717',
               },
            },
             error: {
                 style: {
                     background: '#5c1f1f', // Dark red background
                     color: '#fde8e8', // Light text
                     border: '1px solid #993131',
                 },
                  iconTheme: {
                     primary: '#ef4444', // Red icon
                     secondary: '#fde8e8', // Light background for icon
                 },
             },
          }}
       />
    </SessionProvider>
  );
} 