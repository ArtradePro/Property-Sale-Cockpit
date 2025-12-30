import { ReactNode } from 'react';
import clsx from 'clsx';

interface CardProps {
  children: ReactNode;
  className?: string;
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

export function Card({ children, className, padding = 'md' }: CardProps) {
  return (
    <section className={clsx(
      'bg-white rounded-lg border border-gray-200 shadow-sm',
      padding === 'sm' && 'p-3 md:p-4',
      padding === 'md' && 'p-4 md:p-6',
      padding === 'lg' && 'p-6 md:p-8',
      className
    )}>
      {children}
    </section>
  );
}

export function CardHeader({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={clsx('mb-4', className)}>
      {children}
    </div>
  );
}

export function CardTitle({ children }: { children: ReactNode }) {
  return <h3 className="text-lg font-semibold text-gray-900">{children}</h3>;
}

export function CardDescription({ children }: { children: ReactNode }) {
  return <p className="text-sm text-gray-500 mt-1">{children}</p>;
}
