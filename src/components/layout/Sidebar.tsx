'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import {
  LayoutDashboard,
  Home,
  FileCheck,
  Megaphone,
  Users,
  Calculator,
  FileText
} from 'lucide-react';

const navigation = [
  { name: 'Dashboard', href: '/', icon: LayoutDashboard },
  { name: 'Property', href: '/property', icon: Home },
  { name: 'Legal', href: '/legal', icon: FileCheck },
  { name: 'Marketing', href: '/marketing', icon: Megaphone },
  { name: 'Buyers', href: '/buyers', icon: Users },
  { name: 'Financials', href: '/financials', icon: Calculator },
  { name: 'Content', href: '/content', icon: FileText },
];

export function Sidebar() {
  const pathname = usePathname();
  return (
    <aside className="w-full md:w-64 shrink-0 bg-gray-900 min-h-0 md:min-h-screen flex flex-row md:flex-col overflow-x-auto md:overflow-visible" aria-label="Main navigation">
      <div className="flex items-center h-14 md:h-16 px-4 md:px-6 bg-gray-800 w-full md:w-auto">
        <span className="text-lg md:text-xl font-bold text-white">Sale Cockpit</span>
      </div>
      <nav className="flex-1 px-2 md:px-4 py-4 md:py-6 space-y-1 flex flex-row md:flex-col overflow-x-auto md:overflow-visible" role="navigation" aria-label="Sidebar">
        <ul className="flex flex-row md:flex-col w-full">
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            return (
              <li key={item.name} className="w-full">
                <Link
                  href={item.href}
                  className={clsx(
                    'flex items-center px-2 md:px-3 py-2 text-xs md:text-sm font-medium rounded-md transition-colors whitespace-nowrap',
                    isActive
                      ? 'bg-gray-800 text-white'
                      : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                  )}
                  aria-current={isActive ? 'page' : undefined}
                >
                  <item.icon className="w-4 h-4 md:w-5 md:h-5 mr-2 md:mr-3" aria-hidden="true" />
                  {item.name}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
      <div className="hidden md:block px-4 py-4 border-t border-gray-800">
        <div className="text-xs text-gray-500">Albertinia Property</div>
        <div className="text-sm text-gray-300 truncate">Aloe Park Estate</div>
      </div>
    </aside>
  );
}
