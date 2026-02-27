import { type VariantProps, cva } from 'class-variance-authority';
import type { ComponentProps } from 'react';

import { cn } from '../../utils/lib';

const buttonVariants = cva(
  "inline-flex",
  {
    variants: {
      variant: {
        default: 'bg-primary',
        outline: 'border rounded-full hover:',
      },
      size: {
        default: 'px-3 py-2 text-base',
        icon: 'p-1',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  } 
);

type ButtonProps = ComponentProps<'button'> & VariantProps<typeof buttonVariants>;

export const Button = ({
  className,
  variant,
  size,
  ...props
}: ButtonProps) => {
  return (
    <button
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
};
