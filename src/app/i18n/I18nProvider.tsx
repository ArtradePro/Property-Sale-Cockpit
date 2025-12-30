"use client";
import { NextIntlProvider } from 'next-intl';

export function I18nProvider({ children, messages }: { children: React.ReactNode; messages: any }) {
  return <NextIntlProvider messages={messages}>{children}</NextIntlProvider>;
}
