import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '@/styles/globals.css';
import { ConditionalLayout } from '@/components/layout/ConditionalLayout';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Eco Teppichreinigung - Umweltfreundliche Teppichreinigung',
  description: 'Professionelle und umweltfreundliche Teppichreinigung mit kostenlosem Versand',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de">
      <body className={inter.className}>
        <ConditionalLayout>{children}</ConditionalLayout>
      </body>
    </html>
  );
}
