import { cva, type VariantProps } from "class-variance-authority";
import type * as React from "react";

import { cn } from "@/lib/utils";

const badgeVariants = cva("badge cursor-pointer", {
  variants: {
    variant: {
      default: "badge-primary",
      secondary: "badge-secondary",
      accent: "badge-accent",
      neutral: "badge-neutral",
      info: "badge-info",
      success: "badge-success",
      warning: "badge-warning",
      destructive: "badge-destructive",
      outline: "badge-outline",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

export interface BadgeProps
  extends React.HTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <button
      type="button"
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  );
}

export { Badge, badgeVariants };
