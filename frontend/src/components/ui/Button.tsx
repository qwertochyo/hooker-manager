import { type VariantProps, cva } from 'class-variance-authority';
import type { ComponentProps } from 'react';

import { cn } from '../../utils/lib';

const buttonVariants = cva('block cursor-pointer', {
  variants: {
    variant: {
      default: 'bg-primary hover:bg-primary-hover',
      complete: 'bg-complete hover:bg-complete-hover',
      round: 'border rounded-full',
      ghost: 'transparent hover:bg-black/10',
    },
    size: {
      default: 'px-4 py-2 text-base',
      icon: 'p-1',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'default',
  },
});

type ButtonProps = ComponentProps<'button'> &
  VariantProps<typeof buttonVariants>;

export const Button = ({ className, variant, size, ...props }: ButtonProps) => {
  return (
    <button
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
};
