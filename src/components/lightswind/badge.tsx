import * as React from "react";
import { type VariantProps } from "class-variance-authority";
import { cn } from "../lib/utils";

import { badgeVariants } from "./badge-variants";

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {
  withDot?: boolean;
  dotColor?: string;
  interactive?: boolean;
  highlighted?: boolean;
}

function Badge({
  className,
  variant,
  size,
  shape,
  withDot,
  dotColor = "currentColor",
  interactive,
  highlighted,
  ...props
}: BadgeProps) {
  return (
    <div
      className={cn(
        badgeVariants({ variant, size, shape }),
        interactive && "cursor-pointer hover:opacity-80",
        highlighted && "ring-2 ring-offset-2 ring-ring",
        className
      )}
      {...props}
    >
      {withDot && (
        <span
          className="mr-1 h-1.5 w-1.5 rounded-full inline-block"
          style={{ backgroundColor: dotColor }}
        />
      )}
      {props.children}
    </div>
  );
}

export { Badge };
