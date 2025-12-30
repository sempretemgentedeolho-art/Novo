import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { PhoneFrame } from '@/components/PhoneFrame';
import { StatusBar } from '@/components/StatusBar';
import { motion } from 'framer-motion';
import { ChevronUp, Lock } from 'lucide-react';

export default function TelaBloqueio() {
  const navigate = useNavigate();
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const synth = window.speechSynthesis;
    if (synth) {
      synth.cancel();
      const utter = new SpeechSynthesisUtterance(
        "Tela de bloqueio. Deslize o dedo de baixo para cima para desbloquear o aparelho."
      );
      utter.lang = "pt-BR";
      utter.rate = 0.9;
      synth.speak(utter);
    }
    return () => window.speechSynthesis.cancel();
  }, []);

  const handleUnlock = () => {
    window.speechSynthesis.cancel();
    navigate(createPageUrl('Home'));
  };

  return (
    <PhoneFrame>
      <div className="h-full bg-gradient-to-br from-cyan-400 via-green-300 to-yellow-200 relative overflow-hidden">
        <StatusBar variant="dark" />

        {/* Clock */}
        <div className="absolute top-1/4 left-0 right-0 text-center px-6">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="text-7xl font-extralight text-white drop-shadow-lg mb-2">
              {time.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
            </div>
            <div className="text-lg text-white/90 font-medium drop-shadow">
              {time.toLocaleDateString('pt-BR', { 
                weekday: 'long', 
                day: 'numeric', 
                month: 'long' 
              })}
            </div>
          </motion.div>
        </div>

        {/* Notifications Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        >
          <div className="flex flex-col items-center gap-3">
            <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-xl flex items-center justify-center shadow-xl">
              <Lock className="w-8 h-8 text-white" />
            </div>
            <p className="text-white/90 text-sm font-medium drop-shadow">
              Forja da Consciência
            </p>
          </div>
        </motion.div>

        {/* Unlock Indicator */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          onClick={handleUnlock}
          className="absolute bottom-16 left-0 right-0 flex flex-col items-center cursor-pointer"
        >
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          >
            <ChevronUp className="w-12 h-12 text-white drop-shadow-lg mb-2" />
          </motion.div>
          <p className="text-white font-medium drop-shadow text-lg">
            Deslize para cima para desbloquear
          </p>
        </motion.div>

        {/* Bottom Icons */}
        <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-8 px-8">
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8 }}
            className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-xl flex items-center justify-center"
          >
            <span className="text-2xl">📞</span>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.9 }}
            className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-xl flex items-center justify-center"
          >
            <span className="text-2xl">📷</span>
          </motion.div>
        </div>
      </div>
    </PhoneFrame>
  );
}