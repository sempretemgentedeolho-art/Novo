import React from 'react';
import { cn } from '@/components/ui/utils';

export function PhoneFrame({ children, className }) {
  return (
    <div className="w-full h-full flex items-center justify-center bg-black">
      <div
        className={cn(
          "relative bg-white overflow-hidden mx-auto",
          className
        )}
        style={{
          width: 'min(100%, 390px)',
          height: 'min(100dvh, 844px)',
          borderRadius: '2.5rem',
        }}
      >
        {children}
      </div>
    </div>
  );
}