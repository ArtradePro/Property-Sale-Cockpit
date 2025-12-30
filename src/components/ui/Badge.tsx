import clsx from 'clsx';

type BadgeVariant = 'default' | 'success' | 'warning' | 'error' | 'info';

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
}

const variantStyles: Record<BadgeVariant, string> = {
  default: 'bg-gray-100 text-gray-800',
  success: 'bg-green-100 text-green-800',
  warning: 'bg-yellow-100 text-yellow-800',
  error: 'bg-red-100 text-red-800',
  info: 'bg-blue-100 text-blue-800'
};

export function Badge({ children, variant = 'default' }: BadgeProps) {
  return (
    <span className={clsx(
      'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
      variantStyles[variant]
    )}>
      {children}
    </span>
  );
}

export function StatusBadge({ status }: { status: string }) {
  const variants: Record<string, BadgeVariant> = {
    'pending': 'warning',
    'in-progress': 'info',
    'complete': 'success',
    'not-required': 'default',
    'not-started': 'default',
    'draft': 'warning',
    'published': 'success',
    'paused': 'error',
    'new': 'info',
    'qualified': 'info',
    'viewed': 'info',
    'offer': 'warning',
    'accepted': 'success',
    'in-transfer': 'success',
    'completed': 'success',
    'lost': 'error',
    'active': 'success',
    'under-offer': 'warning',
    'sold': 'default'
  };
  
  return <Badge variant={variants[status] || 'default'}>{status.replace('-', ' ')}</Badge>;
}
