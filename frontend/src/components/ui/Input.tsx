import type { ComponentProps } from 'react';
import { cn } from '../../utils/lib';

export const Input = ({
  className,
  type = "text",
  ...props
}: ComponentProps<'input'>) => {
  return (
    <input
      type={type}
      className={cn(
        "inline-flex flex-1 w-full px-3 py-2 text-base",
        "bg-background text-foreground",
        "border border-border",
        "transition-colors",
        "hover:border-primary",
        "focus:outline-none",
        "focus:ring-1 focus:ring-ring",
        "focus:border-primary",
        "placeholder:text-foreground/50",
        "disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    />
  );
};