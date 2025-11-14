import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "./utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium transition-all duration-300 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive relative overflow-hidden group",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90 shadow-md hover:shadow-lg active:scale-[0.98]",
        destructive:
          "bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60 shadow-md hover:shadow-lg active:scale-[0.98]",
        outline:
          "border-2 bg-transparent text-foreground hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50 hover:shadow-md active:scale-[0.98]",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80 shadow-sm hover:shadow-md active:scale-[0.98]",
        ghost:
          "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50 hover:shadow-sm active:scale-[0.98]",
        link: "text-primary underline-offset-4 hover:underline",
        premium: "bg-gradient-to-r from-[var(--monastery-saffron)] to-[var(--monastery-gold)] text-white shadow-lg hover:shadow-xl hover:scale-105 active:scale-100 font-semibold",
        glass: "glass border border-white/20 text-foreground hover:bg-white/10 dark:hover:bg-white/5 shadow-sm hover:shadow-md active:scale-[0.98]",
        glow: "bg-gradient-to-r from-[var(--monastery-emerald)] to-[var(--monastery-gold)] text-white shadow-[0_0_20px_rgba(255,215,0,0.3)] hover:shadow-[0_0_30px_rgba(255,215,0,0.5)] active:scale-[0.98]",
      },
      size: {
        default: "h-10 px-5 py-2.5 text-sm",
        sm: "h-9 px-4 py-2 text-xs gap-1.5",
        lg: "h-12 px-8 py-3 text-base gap-3",
        xl: "h-14 px-10 py-4 text-lg gap-3",
        icon: "size-10 rounded-lg",
        iconSm: "size-8 rounded-md",
        iconLg: "size-12 rounded-lg",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  children,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    >
      {/* Ripple effect for premium buttons */}
      {(variant === "premium" || variant === "glow") && (
        <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700" />
        </span>
      )}
      {/* Button content */}
      <span className="relative z-10">{children}</span>
    </Comp>
  );
}

export { Button, buttonVariants };
