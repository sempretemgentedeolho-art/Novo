import React from 'react';
import { cn } from '@/components/ui/utils';

export function PhoneFrame({ children, className }) {
  return (
    <div className="w-full h-[100dvh] bg-black flex items-center justify-center">
      <div className="relative w-full h-full max-w-[480px] mx-auto bg-black p-[3px] rounded-[2.75rem] shadow-2xl">
        {/* Notch */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-black rounded-b-2xl z-20 flex items-center justify-center gap-2">
          <div className="w-14 h-1.5 bg-slate-800 rounded-full"></div>
          <div className="w-2.5 h-2.5 bg-slate-900 rounded-full border border-slate-700"></div>
        </div>

        {/* Screen */}
        <div className={cn(
          "relative bg-white overflow-hidden h-full w-full rounded-[2.5rem]",
          className
        )}>
          {children}
        </div>
      </div>
    </div>
  );
}