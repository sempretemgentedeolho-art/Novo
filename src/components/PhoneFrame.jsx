import React from 'react';
import { cn } from '@/components/ui/utils';

export function PhoneFrame({ children, className }) {
  return (
    <div className="w-full min-h-[100dvh] bg-black flex items-center justify-center">
      <div className="relative w-full max-w-md h-[100dvh]">
        {/* Phone Border */}
        <div className="relative bg-black h-full p-2 sm:p-3">
          {/* Notch */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-7 bg-black rounded-b-3xl z-20 flex items-center justify-center gap-2">
            <div className="w-16 h-1.5 bg-slate-800 rounded-full"></div>
            <div className="w-3 h-3 bg-slate-900 rounded-full border border-slate-700"></div>
          </div>
          {/* Screen */}
          <div className={cn(
            "relative bg-white rounded-[2rem] overflow-hidden h-full",
            className
          )}>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}