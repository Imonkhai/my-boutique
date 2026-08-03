'use client';
import { forwardRef } from 'react';
import { cn } from '@/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'gold';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  as?: 'button' | 'a';
  href?: string;
}

const variants = {
  primary: 'bg-[#111111] text-white hover:bg-[#333333] focus-visible:ring-[#111111]',
  secondary: 'bg-white text-[#111111] hover:bg-[#F8F8F8] border border-[#E5E5E5]',
  outline: 'border border-[#111111] text-[#111111] hover:bg-[#111111] hover:text-white',
  ghost: 'text-[#111111] hover:bg-[#F8F8F8]',
  gold: 'bg-[#D4AF37] text-[#111111] hover:bg-[#C4A030] font-semibold',
};

const sizes = {
  sm: 'px-4 py-2 text-xs tracking-widest',
  md: 'px-6 py-3 text-sm tracking-widest',
  lg: 'px-8 py-4 text-sm tracking-widest',
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', loading, className, children, disabled, ...props }, ref) => (
    <button
      ref={ref}
      disabled={disabled || loading}
      className={cn(
        'inline-flex items-center justify-center gap-2 uppercase font-medium transition-all duration-300 rounded-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer',
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {loading && (
        <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
      )}
      {children}
    </button>
  )
);

Button.displayName = 'Button';
export default Button;
