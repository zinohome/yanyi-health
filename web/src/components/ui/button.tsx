import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full font-medium transition-all duration-300 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 outline-none focus-visible:ring-[3px] focus-visible:ring-ring/40",
  {
    variants: {
      variant: {
        default:
          'bg-primary text-primary-foreground shadow-[0_2px_12px_-2px_color-mix(in_oklch,var(--primary)_50%,transparent)] hover:-translate-y-0.5 hover:shadow-[0_12px_36px_-8px_color-mix(in_oklch,var(--primary)_60%,transparent)]',
        accent:
          'bg-accent text-accent-foreground shadow-[0_2px_12px_-2px_color-mix(in_oklch,var(--accent)_50%,transparent)] hover:-translate-y-0.5 hover:shadow-[0_12px_36px_-8px_color-mix(in_oklch,var(--accent)_60%,transparent)]',
        outline:
          'border border-border bg-card/50 backdrop-blur hover:border-primary/40 hover:bg-card',
        ghost: 'hover:bg-muted hover:text-foreground',
        secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
        link: 'text-primary underline-offset-4 hover:underline rounded-none',
      },
      size: {
        default: 'h-10 px-5 text-sm has-[>svg]:px-4',
        sm: 'h-9 px-4 text-xs has-[>svg]:px-3',
        lg: 'h-13 px-8 text-base has-[>svg]:px-7',
        icon: 'size-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
)

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : 'button'
  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
