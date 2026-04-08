// components/ui/StripesBackground.tsx
import React from "react";
import clsx from "clsx";

interface StripesBackgroundProps {
  className?: string;
  position?: "left" | "right" | "top" | "bottom" | "full";
  width?: string;
  height?: string;
  opacity?: string;
}

const StripesBackground: React.FC<StripesBackgroundProps> = ({
  className,
  position = "right",
  width = "w-full",
  height = "h-full",
}) => {
  const positionStyles = {
    right: "absolute top-0 right-0",
    left: "absolute top-0 left-0",
    top: "absolute top-0 left-0 w-full h-32",
    bottom: "absolute bottom-0 left-0 w-full h-32",
    full: "absolute inset-0",
  };

  return (
    <div
      className={clsx(
        "pointer-events-none",
        // More visible stripes in both modes
        "bg-[repeating-linear-gradient(45deg,_var(--union-primary)_0px,_var(--union-primary)_1px,_transparent_1px,_transparent_10px)] opacity-[0.03] dark:opacity-[0.05]",
        positionStyles[position],
        width,
        height,
        className
      )}
    />
  );
};

export default StripesBackground;
