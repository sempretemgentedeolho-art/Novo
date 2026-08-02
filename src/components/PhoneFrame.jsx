import React from 'react';
import { cn } from '@/components/ui/utils';

export function PhoneFrame({ children, className }) {
  return (
    <div className="w-full h-full bg-white overflow-hidden relative">
      {children}
    </div>
  );
}