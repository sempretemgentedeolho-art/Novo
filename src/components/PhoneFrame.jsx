import React from 'react';
import { cn } from '@/components/ui/utils';

export function PhoneFrame({ children, className }) {
  return (
    <div className="w-full h-full flex justify-center items-stretch bg-gray-100">
      <div className={cn("w-full max-w-[420px] h-full bg-white overflow-hidden relative", className)}>
        {children}
      </div>
    </div>
  );
}