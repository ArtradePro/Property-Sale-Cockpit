"use client";
import { useRouter } from 'next/navigation';

export function LanguageSwitcher({ locale }: { locale: string }) {
  const router = useRouter();
  return (
    <div className="flex gap-2 items-center">
      <button
        className={`px-2 py-1 rounded ${locale === 'en' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
        onClick={() => router.push('/en')}
        aria-label="Switch to English"
      >
        EN
      </button>
      <button
        className={`px-2 py-1 rounded ${locale === 'de' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
        onClick={() => router.push('/de')}
        aria-label="Switch to German"
      >
        DE
      </button>
    </div>
  );
}
