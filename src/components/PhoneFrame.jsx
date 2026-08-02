import React from 'react';
import { cn } from '@/components/ui/utils';

export function PhoneFrame({ children, className }) {
  return (
    <div className="w-full h-full flex items-center justify-center bg-gray-800">
      <div
        className="relative mx-auto bg-gray-900"
        style={{
          width: 'min(100%, 380px)',
          height: '100dvh',
          padding: '10px',
          borderRadius: '2.5rem',
          boxShadow: '0 0 30px rgba(0,0,0,0.4)',
        }}
      >
        {/* Notch */}
        <div
          style={{
            position: 'absolute',
            top: '10px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '120px',
            height: '22px',
            background: '#1a1a1a',
            borderBottomLeftRadius: '14px',
            borderBottomRightRadius: '14px',
            zIndex: 30,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '6px',
          }}
        >
          <div style={{ width: '48px', height: '5px', background: '#333', borderRadius: '9999px' }} />
          <div style={{ width: '8px', height: '8px', background: '#222', borderRadius: '9999px', border: '1px solid #444' }} />
        </div>

        {/* Screen */}
        <div
          className={cn(
            "relative bg-white overflow-hidden w-full h-full",
            className
          )}
          style={{ borderRadius: '2rem' }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}