import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ToastProvider } from '@/components/ui/ToastProvider';
import { AuthProvider } from '@/app/auth/AuthProvider';
import { I18nProvider } from '@/app/i18n/I18nProvider';
import enMessages from '@/messages/en.json';
import deMessages from '@/messages/de.json';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Property Sale Cockpit',
  description: 'Private property sale management dashboard',
};

export default function RootLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const messages = params.locale === 'de' ? deMessages : enMessages;
  return (
    <html lang={params.locale || 'en'}>
      <body className={inter.className}>
        <I18nProvider messages={messages}>
          <AuthProvider>
            <ToastProvider />
            {children}
            <Analytics />
          </AuthProvider>
        </I18nProvider>
      </body>
    </html>
  );
}
