"use client";

import * as React from "react";
import * as RadixAvatar from "@radix-ui/react-avatar";

interface AvatarProps extends React.ComponentPropsWithoutRef<typeof RadixAvatar.Root> {
  src?: string;
  alt?: string;
  fallback?: string;
  size?: number; // optional, default 40
}

export const Avatar = React.forwardRef<React.ElementRef<typeof RadixAvatar.Root>, AvatarProps>(
  ({ src, alt, fallback, size = 40, className, ...props }, ref) => {
    return (
      <RadixAvatar.Root
        ref={ref}
        className={`inline-flex items-center justify-center rounded-full overflow-hidden bg-gray-200 ${className}`}
        style={{ width: size, height: size }}
        {...props}
      >
        {src ? (
          <RadixAvatar.Image
            className="w-full h-full object-cover"
            src={src}
            alt={alt}
          />
        ) : null}
        <RadixAvatar.Fallback
          className="text-gray-600 font-medium"
          delayMs={0} // show immediately if image fails
        >
          {fallback || "?"}
        </RadixAvatar.Fallback>
      </RadixAvatar.Root>
    );
  }
);

Avatar.displayName = "Avatar";

// Optional: export subcomponents for more advanced usage
export const AvatarImage = RadixAvatar.Image;
export const AvatarFallback = RadixAvatar.Fallback;
