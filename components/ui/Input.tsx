import { InputHTMLAttributes, forwardRef } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  hint?: string
  error?: string
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, hint, error, className = '', id, ...props }, ref) => (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label htmlFor={id} className="text-sm font-semibold text-ink">
          {label}
        </label>
      )}
      {hint && <p className="text-xs text-ink-muted -mt-1">{hint}</p>}
      <input
        ref={ref}
        id={id}
        className={`w-full rounded-xl border-2 border-cream-dark bg-surface px-4 py-3 text-base text-ink placeholder:text-ink-muted
          focus:border-brand-blue focus:outline-none transition-colors
          ${error ? 'border-red-400' : ''}
          ${className}`}
        {...props}
      />
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  )
)
Input.displayName = 'Input'
export default Input
