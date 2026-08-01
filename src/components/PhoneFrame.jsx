import React from 'react';
import { cn } from '@/components/ui/utils';

export function PhoneFrame({ children, className }) {
  return (
    <div className="w-full h-full min-h-[100dvh] bg-white overflow-hidden">
      <div className={cn(
        "w-full h-full min-h-[100dvh] relative overflow-hidden",
        className
      )}>
        {children}
      </div>
    </div>
  );
}