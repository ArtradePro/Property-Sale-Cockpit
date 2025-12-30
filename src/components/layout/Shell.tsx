import { ReactNode } from 'react';
import { Sidebar } from './Sidebar';

interface ShellProps {
  children: ReactNode;
  title: string;
  description?: string;
  actions?: ReactNode;
}

export function Shell({ children, title, description, actions }: ShellProps) {
  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-50">
      <a href="#main-content" className="sr-only focus:not-sr-only absolute top-2 left-2 z-50 bg-blue-700 text-white px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-600">Skip to main content</a>
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <header className="bg-white border-b border-gray-200 px-4 py-4 md:px-8 md:py-6" role="banner">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
            <div>
              <h1 className="text-xl md:text-2xl font-bold text-gray-900">{title}</h1>
              {description && (
                <p className="mt-1 text-sm text-gray-500">{description}</p>
              )}
            </div>
            {actions && <div className="flex items-center gap-3">{actions}</div>}
          </div>
        </header>
        <main id="main-content" className="flex-1 p-4 md:p-8" role="main" tabIndex={-1}>
          {children}
        </main>
      </div>
    </div>
  );
}
