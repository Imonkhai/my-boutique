import { cn } from '@/utils';

interface BadgeProps {
  variant?: 'new' | 'sale' | 'bestseller' | 'limited' | 'gold';
  children: React.ReactNode;
  className?: string;
}

const variants = {
  new: 'bg-[#111111] text-white',
  sale: 'bg-red-600 text-white',
  bestseller: 'bg-[#D4AF37] text-[#111111]',
  limited: 'bg-[#8B4513] text-white',
  gold: 'bg-[#D4AF37] text-[#111111]',
};

export default function Badge({ variant = 'new', children, className }: BadgeProps) {
  return (
    <span className={cn('inline-block px-2 py-0.5 text-[10px] font-semibold uppercase tracking-widest', variants[variant], className)}>
      {children}
    </span>
  );
}
