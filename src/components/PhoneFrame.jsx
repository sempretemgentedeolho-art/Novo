import React from 'react';
import { cn } from '@/components/ui/utils';

export function PhoneFrame({ children, className }) {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="relative w-full max-w-sm">
        {/* Phone Border */}
        <div className="relative bg-black rounded-[3rem] p-3 shadow-2xl">
          {/* Notch */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-7 bg-black rounded-b-3xl z-20 flex items-center justify-center gap-2">
            <div className="w-16 h-1.5 bg-slate-800 rounded-full"></div>
            <div className="w-3 h-3 bg-slate-900 rounded-full border border-slate-700"></div>
          </div>
          
          {/* Screen */}
          <div className={cn(
            "relative bg-white rounded-[2.5rem] overflow-hidden aspect-[9/19.5]",
            className
          )}>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}