import React from 'react';
import { useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { PhoneFrame } from '@/components/PhoneFrame';
import { StatusBar } from '@/components/StatusBar';
import { ArrowLeft, Cloud, Sun, Wind, Droplets, Eye } from 'lucide-react';
import { motion } from 'framer-motion';

const forecast = [
  { day: 'Seg', temp: '28°', icon: '☀️' },
  { day: 'Ter', temp: '26°', icon: '⛅' },
  { day: 'Qua', temp: '24°', icon: '🌧️' },
  { day: 'Qui', temp: '27°', icon: '☀️' },
  { day: 'Sex', temp: '29°', icon: '☀️' },
  { day: 'Sáb', temp: '30°', icon: '🌤️' },
  { day: 'Dom', temp: '28°', icon: '⛅' },
];

const hourly = [
  { time: 'Agora', temp: '28°', icon: '☀️' },
  { time: '15:00', temp: '29°', icon: '☀️' },
  { time: '16:00', temp: '30°', icon: '🌤️' },
  { time: '17:00', temp: '29°', icon: '⛅' },
  { time: '18:00', temp: '27°', icon: '🌥️' },
  { time: '19:00', temp: '25°', icon: '🌙' },
];

export default function AppWeather() {
  const navigate = useNavigate();

  return (
    <PhoneFrame>
      <div className="h-full bg-gradient-to-br from-sky-400 via-blue-500 to-indigo-600 text-white overflow-hidden flex flex-col">
        <StatusBar variant="dark" />

        {/* Header */}
        <div className="px-6 py-4">
          <div className="flex items-center gap-4 mb-6">
            <button onClick={() => navigate(createPageUrl('Home'))}>
              <ArrowLeft className="w-6 h-6" />
            </button>
            <h1 className="text-xl font-bold flex-1">Clima</h1>
          </div>

          {/* Current Weather */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center mb-8"
          >
            <p className="text-2xl font-light mb-2">São Paulo</p>
            <div className="text-8xl font-light mb-4">28°</div>
            <div className="flex items-center justify-center gap-2 text-xl mb-2">
              <Cloud className="w-8 h-8" />
              <span>Parcialmente Nublado</span>
            </div>
            <p className="text-lg opacity-90">
              Sensação térmica: 30° • Máx: 32° • Mín: 22°
            </p>
          </motion.div>
        </div>

        {/* Details */}
        <div className="flex-1 bg-white/10 backdrop-blur-md rounded-t-3xl overflow-y-auto">
          {/* Hourly Forecast */}
          <div className="p-6 border-b border-white/20">
            <h3 className="font-bold mb-4">Previsão por Hora</h3>
            <div className="flex gap-4 overflow-x-auto pb-2">
              {hourly.map((hour, index) => (
                <div key={index} className="flex flex-col items-center gap-2 min-w-[70px]">
                  <p className="text-sm">{hour.time}</p>
                  <span className="text-3xl">{hour.icon}</span>
                  <p className="font-bold">{hour.temp}</p>
                </div>
              ))}
            </div>
          </div>

          {/* 7-Day Forecast */}
          <div className="p-6 border-b border-white/20">
            <h3 className="font-bold mb-4">Próximos 7 Dias</h3>
            <div className="space-y-3">
              {forecast.map((day, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="w-12 font-medium">{day.day}</span>
                  <span className="text-2xl">{day.icon}</span>
                  <span className="w-12 text-right font-bold">{day.temp}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Conditions */}
          <div className="p-6">
            <h3 className="font-bold mb-4">Condições</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/10 rounded-xl p-4">
                <Wind className="w-6 h-6 mb-2" />
                <p className="text-sm opacity-80">Vento</p>
                <p className="text-xl font-bold">15 km/h</p>
              </div>
              <div className="bg-white/10 rounded-xl p-4">
                <Droplets className="w-6 h-6 mb-2" />
                <p className="text-sm opacity-80">Umidade</p>
                <p className="text-xl font-bold">65%</p>
              </div>
              <div className="bg-white/10 rounded-xl p-4">
                <Eye className="w-6 h-6 mb-2" />
                <p className="text-sm opacity-80">Visibilidade</p>
                <p className="text-xl font-bold">10 km</p>
              </div>
              <div className="bg-white/10 rounded-xl p-4">
                <Sun className="w-6 h-6 mb-2" />
                <p className="text-sm opacity-80">Índice UV</p>
                <p className="text-xl font-bold">Alto</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PhoneFrame>
  );
}