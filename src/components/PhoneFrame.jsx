import React from 'react';
import { cn } from '@/components/ui/utils';

export function PhoneFrame({ children, className }) {
  return (
    <div className="w-full h-full flex items-center justify-center bg-black">
      <div
        className={cn(
          "relative bg-white overflow-hidden mx-auto w-full h-full max-w-[360px]",
          className
        )}
        style={{ borderRadius: '2rem' }}
      >
        {children}
      </div>
    </div>
  );
}