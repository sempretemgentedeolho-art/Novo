import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/components/ui/utils';
import { 
  Wifi, Bluetooth, Volume2, Flashlight, RotateCw, 
  Plane, MapPin, VolumeX, Radio, Battery, Moon,
  WifiOff, Sun, Settings, X
} from 'lucide-react';
import { Slider } from '@/components/ui/slider';

const quickToggles = [
  { id: 'wifi', icon: Wifi, label: 'Wi-Fi', activeIcon: Wifi, inactiveIcon: WifiOff, color: 'bg-blue-500' },
  { id: 'bluetooth', icon: Bluetooth, label: 'Bluetooth', color: 'bg-blue-600' },
  { id: 'sound', icon: Volume2, label: 'Som', activeIcon: Volume2, inactiveIcon: VolumeX, color: 'bg-purple-500' },
  { id: 'flashlight', icon: Flashlight, label: 'Lanterna', color: 'bg-yellow-500' },
  { id: 'rotation', icon: RotateCw, label: 'Rotação', color: 'bg-orange-500' },
  { id: 'airplane', icon: Plane, label: 'Avião', color: 'bg-red-500' },
  { id: 'location', icon: MapPin, label: 'Local', color: 'bg-green-500' },
  { id: 'mobile', icon: Radio, label: 'Dados', color: 'bg-indigo-500' },
  { id: 'battery', icon: Battery, label: 'Economia', color: 'bg-green-600' },
  { id: 'night', icon: Moon, label: 'Noturno', activeIcon: Moon, inactiveIcon: Sun, color: 'bg-slate-700' },
];

export function QuickPanel({ isOpen, onClose, onOpenSettings }) {
  const [toggleStates, setToggleStates] = useState({
    wifi: true,
    bluetooth: false,
    sound: true,
    flashlight: false,
    rotation: true,
    airplane: false,
    location: true,
    mobile: true,
    battery: false,
    night: false,
  });

  const [brightness, setBrightness] = useState([70]);
  const [volume, setVolume] = useState([60]);

  const handleToggle = (id) => {
    setToggleStates(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black z-40"
          />

          {/* Panel */}
          <motion.div
            initial={{ y: '-100%' }}
            animate={{ y: 0 }}
            exit={{ y: '-100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed top-0 left-0 right-0 bg-gradient-to-b from-slate-800 to-slate-900 text-white rounded-b-3xl shadow-2xl z-50 max-h-[90vh] overflow-auto"
          >
            {/* Header */}
            <div className="p-6 pt-12 flex justify-between items-start">
              <div>
                <h2 className="text-2xl font-bold">Configurações Rápidas</h2>
                <p className="text-sm text-slate-300 mt-1">
                  {new Date().toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long' })}
                </p>
              </div>
              <button onClick={onClose} className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Brightness */}
            <div className="px-6 pb-4">
              <div className="bg-white/10 rounded-2xl p-4 backdrop-blur-sm">
                <div className="flex items-center gap-3 mb-3">
                  <Sun className="w-5 h-5 text-yellow-400" />
                  <span className="font-medium">Brilho</span>
                  <span className="ml-auto text-sm text-slate-300">{brightness[0]}%</span>
                </div>
                <Slider
                  value={brightness}
                  onValueChange={setBrightness}
                  max={100}
                  step={1}
                  className="[&_.relative]:bg-white/20 [&_[role=slider]]:bg-white"
                />
              </div>
            </div>

            {/* Volume */}
            <div className="px-6 pb-4">
              <div className="bg-white/10 rounded-2xl p-4 backdrop-blur-sm">
                <div className="flex items-center gap-3 mb-3">
                  <Volume2 className="w-5 h-5 text-blue-400" />
                  <span className="font-medium">Volume</span>
                  <span className="ml-auto text-sm text-slate-300">{volume[0]}%</span>
                </div>
                <Slider
                  value={volume}
                  onValueChange={setVolume}
                  max={100}
                  step={1}
                  className="[&_.relative]:bg-white/20 [&_[role=slider]]:bg-white"
                />
              </div>
            </div>

            {/* Quick Toggles */}
            <div className="px-6 pb-6">
              <div className="grid grid-cols-3 gap-3">
                {quickToggles.map((toggle) => {
                  const isActive = toggleStates[toggle.id];
                  const Icon = isActive && toggle.activeIcon ? toggle.activeIcon : 
                               !isActive && toggle.inactiveIcon ? toggle.inactiveIcon : 
                               toggle.icon;
                  
                  return (
                    <motion.button
                      key={toggle.id}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleToggle(toggle.id)}
                      className={cn(
                        "flex flex-col items-center gap-2 p-4 rounded-2xl transition-all",
                        isActive 
                          ? `${toggle.color} shadow-lg` 
                          : "bg-white/10 hover:bg-white/15"
                      )}
                    >
                      <Icon className={cn(
                        "w-6 h-6",
                        isActive ? "text-white" : "text-slate-300"
                      )} />
                      <span className={cn(
                        "text-xs font-medium",
                        isActive ? "text-white" : "text-slate-300"
                      )}>
                        {toggle.label}
                      </span>
                    </motion.button>
                  );
                })}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="px-6 pb-8">
              <button
                onClick={onOpenSettings}
                className="w-full bg-white/10 hover:bg-white/15 rounded-2xl p-4 flex items-center justify-between transition-all"
              >
                <div className="flex items-center gap-3">
                  <Settings className="w-5 h-5" />
                  <span className="font-medium">Todas as Configurações</span>
                </div>
                <span className="text-slate-400">›</span>
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}