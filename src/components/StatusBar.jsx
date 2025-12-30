import React from 'react';
import { Wifi, Signal, Battery, Clock } from 'lucide-react';
import { cn } from '@/components/ui/utils';

export function StatusBar({ variant = 'dark', hideTime = false }) {
  const [time, setTime] = React.useState(new Date());

  React.useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const isDark = variant === 'dark';

  return (
    <div className={cn(
      "px-6 pt-8 pb-2 flex items-center justify-between text-sm z-50",
      isDark ? "text-white" : "text-gray-900"
    )}>
      <div className="flex items-center gap-1">
        {!hideTime && (
          <span className="font-medium">
            {time.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
          </span>
        )}
      </div>
      <div className="flex items-center gap-2">
        <Signal className="w-4 h-4" />
        <Wifi className="w-4 h-4" />
        <Battery className="w-4 h-4" />
        <span className="text-xs">98%</span>
      </div>
    </div>
  );
}