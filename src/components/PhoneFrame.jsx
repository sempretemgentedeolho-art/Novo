import React from 'react';
import { cn } from '@/components/ui/utils';

export function PhoneFrame({ children, className }) {
  return (
    <div
      style={{
        width: '100%',
        height: '100dvh',
        background: 'black',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          position: 'relative',
          height: '100dvh',
          aspectRatio: '9 / 20',
          background: 'black',
          padding: '3px',
          borderRadius: '44px',
          boxShadow: '0 0 40px rgba(0,0,0,0.5)',
        }}
      >
        {/* Notch */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: '50%',
            transform: 'translateX(-50%)',
            width: '128px',
            height: '24px',
            background: 'black',
            borderBottomLeftRadius: '16px',
            borderBottomRightRadius: '16px',
            zIndex: 20,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
          }}
        >
          <div style={{ width: '56px', height: '6px', background: '#1e293b', borderRadius: '9999px' }} />
          <div style={{ width: '10px', height: '10px', background: '#0f172a', borderRadius: '9999px', border: '1px solid #334155' }} />
        </div>

        {/* Screen */}
        <div
          className={cn(
            "relative bg-white overflow-hidden h-full w-full",
            className
          )}
          style={{ borderRadius: '40px' }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}