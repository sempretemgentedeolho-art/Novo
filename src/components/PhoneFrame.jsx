import React from 'react';
import { cn } from '@/components/ui/utils';

export function PhoneFrame({ children, className }) {
  return (
    <div className="w-full h-[100dvh] bg-white overflow-hidden">
      {children}
    </div>
  );
}