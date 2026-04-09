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
  position = "full",
  width = "w-full",
  height = "h-full",
}) => {
  const positionStyles = {
    right: "absolute top-0 right-0",
    left: "absolute top-0 left-0",
    top: "absolute top-0 left-0 w-full h-32",
    bottom: "absolute bottom-0 left-0 w-full h-32",
    full: "fixed inset-0",
  };

  return (
    <div
      className={clsx(
        "pointer-events-none select-none",
        "bg-[repeating-linear-gradient(45deg,_var(--union-primary)_0px,_var(--union-primary)_0.5px,_transparent_0.5px,_transparent_12px)] opacity-[0.02] dark:opacity-[0.04]",
        positionStyles[position],
        width,
        height,
        "mask-radial-subtle",
        className
      )}
      style={{
        maskImage: 'radial-gradient(circle at center, black 40%, transparent 100%)',
        WebkitMaskImage: 'radial-gradient(circle at center, black 40%, transparent 100%)',
      }}
    />
  );
};

export default StripesBackground;
