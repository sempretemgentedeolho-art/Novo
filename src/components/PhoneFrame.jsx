import React from 'react';
import { cn } from '@/components/ui/utils';

export function PhoneFrame({ children, className }) {
  return (
    <div className="w-full h-full flex justify-center items-center bg-slate-100">
      <div className={cn("relative h-full max-h-full aspect-[9/19.5] max-w-full", className)}>
        {/* Moldura do aparelho */}
        <div className="absolute inset-0 rounded-[2.5rem] bg-gradient-to-b from-slate-700 via-slate-900 to-slate-800 shadow-2xl" />

        {/* Botões laterais */}
        <div className="absolute -left-[3px] top-28 h-14 w-[3px] rounded-l-full bg-slate-600" />
        <div className="absolute -right-[3px] top-24 h-10 w-[3px] rounded-r-full bg-slate-600" />
        <div className="absolute -right-[3px] top-40 h-16 w-[3px] rounded-r-full bg-slate-600" />

        {/* Tela */}
        <div className="absolute inset-[6px] rounded-[2.1rem] overflow-hidden bg-white">
          <div className="relative w-full h-full overflow-hidden">
            {children}

            {/* Câmera frontal */}
            <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 z-[80] h-5 w-20 rounded-b-2xl bg-slate-900" />
          </div>
        </div>
      </div>
    </div>
  );
}