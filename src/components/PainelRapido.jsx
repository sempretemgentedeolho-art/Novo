import React, { useState } from "react";
import { X, Wifi, Bluetooth, Volume2, Flashlight, Plane, Sun, BatteryCharging, MapPin, Lock, RotateCcw, Settings } from "lucide-react";
import { Slider } from "@/components/ui/slider";

export default function PainelRapido({ isOpen, onClose }) {
  const [wifi, setWifi] = useState(true);
  const [bluetooth, setBluetooth] = useState(false);
  const [flashlight, setFlashlight] = useState(false);
  const [airplaneMode, setAirplaneMode] = useState(false);
  const [location, setLocation] = useState(true);
  const [autoRotate, setAutoRotate] = useState(true);
  const [brightness, setBrightness] = useState([70]);
  const [volume, setVolume] = useState([60]);

  const quickToggles = [
    { icon: Wifi, label: "Wi-Fi", active: wifi, onToggle: () => setWifi(!wifi), color: "bg-blue-500" },
    { icon: Bluetooth, label: "Bluetooth", active: bluetooth, onToggle: () => setBluetooth(!bluetooth), color: "bg-blue-600" },
    { icon: Flashlight, label: "Lanterna", active: flashlight, onToggle: () => setFlashlight(!flashlight), color: "bg-yellow-500" },
    { icon: Plane, label: "Modo Avião", active: airplaneMode, onToggle: () => setAirplaneMode(!airplaneMode), color: "bg-orange-500" },
    { icon: MapPin, label: "Local", active: location, onToggle: () => setLocation(!location), color: "bg-green-500" },
    { icon: RotateCcw, label: "Auto-girar", active: autoRotate, onToggle: () => setAutoRotate(!autoRotate), color: "bg-purple-500" },
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm" onClick={onClose}>
      <div
        className="bg-white rounded-b-[2rem] shadow-2xl max-w-md mx-auto overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 pt-12 text-white">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold">Configurações Rápidas</h2>
            <button
              onClick={onClose}
              className="w-10 h-10 rounded-full bg-white/20 backdrop-blur flex items-center justify-center hover:bg-white/30"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Status Info */}
          <div className="flex items-center justify-between text-sm opacity-90">
            <div className="flex items-center gap-2">
              <BatteryCharging className="w-4 h-4" />
              <span>98%</span>
            </div>
            <div className="flex items-center gap-2">
              <span>Casa_WiFi</span>
            </div>
            <div className="flex items-center gap-2">
              <span>📶 4G</span>
            </div>
          </div>
        </div>

        {/* Quick Toggles */}
        <div className="p-4 grid grid-cols-3 gap-3">
          {quickToggles.map((toggle, idx) => {
            const Icon = toggle.icon;
            return (
              <button
                key={idx}
                onClick={toggle.onToggle}
                className={`p-4 rounded-2xl transition-all ${
                  toggle.active
                    ? `${toggle.color} text-white shadow-lg scale-105`
                    : "bg-gray-100 text-gray-600"
                }`}
              >
                <Icon className="w-6 h-6 mx-auto mb-2" />
                <span className="text-xs block text-center">{toggle.label}</span>
              </button>
            );
          })}
        </div>

        {/* Sliders */}
        <div className="px-6 py-4 space-y-6">
          {/* Brilho */}
          <div>
            <div className="flex items-center gap-3 mb-3">
              <Sun className="w-5 h-5 text-orange-500" />
              <span className="text-sm font-medium text-gray-700">Brilho</span>
              <span className="ml-auto text-sm text-gray-500">{brightness[0]}%</span>
            </div>
            <Slider
              value={brightness}
              onValueChange={setBrightness}
              max={100}
              step={1}
              className="w-full"
            />
          </div>

          {/* Volume */}
          <div>
            <div className="flex items-center gap-3 mb-3">
              <Volume2 className="w-5 h-5 text-blue-500" />
              <span className="text-sm font-medium text-gray-700">Volume</span>
              <span className="ml-auto text-sm text-gray-500">{volume[0]}%</span>
            </div>
            <Slider
              value={volume}
              onValueChange={setVolume}
              max={100}
              step={1}
              className="w-full"
            />
          </div>
        </div>

        {/* Quick Actions */}
        <div className="p-4 pt-0 grid grid-cols-2 gap-3">
          <button className="p-3 bg-gray-100 rounded-xl flex items-center gap-3 hover:bg-gray-200">
            <Lock className="w-5 h-5 text-gray-600" />
            <span className="text-sm text-gray-700">Bloqueio de tela</span>
          </button>
          <button className="p-3 bg-gray-100 rounded-xl flex items-center gap-3 hover:bg-gray-200">
            <Settings className="w-5 h-5 text-gray-600" />
            <span className="text-sm text-gray-700">Configurações</span>
          </button>
        </div>

        <div className="h-4"></div>
      </div>
    </div>
  );
}