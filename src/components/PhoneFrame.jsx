import React from 'react';
import { cn } from '@/components/ui/utils';

export function PhoneFrame({ children, className }) {
  return (
    <div className="w-full h-full flex items-center justify-center bg-black">
      <div
        className={cn(
          "relative bg-white overflow-hidden h-full w-full max-w-[480px] mx-auto rounded-[2.5rem]",
          className
        )}
      >
        {children}
      </div>
    </div>
  );
}