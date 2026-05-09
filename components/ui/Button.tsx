'use client'

import { ButtonHTMLAttributes, forwardRef } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'gold'
  size?: 'sm' | 'md' | 'lg'
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = '', variant = 'primary', size = 'md', children, ...props }, ref) => {
    const base =
      'inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 active:scale-95 disabled:opacity-50 disabled:pointer-events-none'

    const variants = {
      primary:
        'bg-brand-blue text-white hover:bg-brand-blue-light focus-visible:ring-brand-blue',
      secondary:
        'bg-surface border-2 border-brand-blue text-brand-blue hover:bg-brand-blue-muted focus-visible:ring-brand-blue',
      ghost:
        'text-brand-blue hover:bg-brand-blue-muted focus-visible:ring-brand-blue',
      gold:
        'bg-brand-gold text-white hover:bg-brand-gold-light focus-visible:ring-brand-gold',
    }

    const sizes = {
      sm: 'px-4 py-2 text-sm gap-1.5',
      md: 'px-6 py-3 text-base gap-2',
      lg: 'px-8 py-4 text-lg gap-2.5',
    }

    return (
      <button
        ref={ref}
        className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
        {...props}
      >
        {children}
      </button>
    )
  }
)
Button.displayName = 'Button'
export default Button
