import React from 'react';
import { cn } from '@/components/ui/utils';

export function PhoneFrame({ children, className }) {
  return (
    <div className={cn("w-full h-full bg-white overflow-hidden relative", className)}>
      {children}
    </div>
  );
}