import React from 'react';
import { cn } from '@/components/ui/utils';

export function PhoneFrame({ children, className }) {
  return (
    <div className="w-full h-[100dvh] bg-black flex items-center justify-center">
      <div className="relative w-full h-full max-w-[480px] mx-auto bg-black">
        {/* Notch */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-7 bg-black rounded-b-3xl z-20 flex items-center justify-center gap-2">
          <div className="w-16 h-1.5 bg-slate-800 rounded-full"></div>
          <div className="w-3 h-3 bg-slate-900 rounded-full border border-slate-700"></div>
        </div>

        {/* Screen */}
        <div className={cn(
          "relative bg-white overflow-hidden h-full w-full",
          className
        )}>
          {children}
        </div>
      </div>
    </div>
  );
}