import React from 'react';

export function Avatar({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <div
      className={`relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-full ${className}`}
    >
      {children}
    </div>
  );
}

export function AvatarImage({ src, alt }: { src: string; alt?: string }) {
  return (
    <img
      src={src}
      alt={alt || 'Avatar'}
      className="h-full w-full object-cover"
    />
  );
}

export function AvatarFallback({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-green-400 to-blue-500 text-white text-sm font-medium">
      {children}
    </div>
  );
}
