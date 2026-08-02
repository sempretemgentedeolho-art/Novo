import React from 'react';
import { cn } from '@/components/ui/utils';

export function PhoneFrame({ children, className }) {
  return (
    <div className="w-full h-full flex justify-center items-stretch">
      <div className={cn("h-full aspect-[9/19.5] max-w-full bg-white overflow-hidden relative", className)}>
        {children}
      </div>
    </div>
  );
}