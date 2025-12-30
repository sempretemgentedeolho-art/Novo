import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { PhoneFrame } from '@/components/PhoneFrame';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

export default function Inicio() {
  const navigate = useNavigate();

  useEffect(() => {
    const synth = window.speechSynthesis;
    if (synth) {
      synth.cancel();
      const utter = new SpeechSynthesisUtterance(
        "Seja bem-vindo ao tutorial gratuito da Forja da Consciência. Um aplicativo feito com muito carinho para você aprender a usar seu celular de forma fácil e segura. Toque na tela para começar."
      );
      utter.lang = "pt-BR";
      utter.rate = 0.9;
      synth.speak(utter);
    }
    return () => window.speechSynthesis.cancel();
  }, []);

  const handleStart = () => {
    window.speechSynthesis.cancel();
    navigate(createPageUrl('TelaBloqueio'));
  };

  return (
    <PhoneFrame>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        onClick={handleStart}
        className="h-full bg-gradient-to-br from-cyan-100 via-blue-100 to-teal-100 flex flex-col items-center justify-center p-8 cursor-pointer relative"
      >
        {/* Logo Forja da Consciência */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
          className="mb-8"
        >
          <div className="w-40 h-40 rounded-3xl bg-white shadow-2xl flex items-center justify-center p-4 relative overflow-hidden">
            {/* Brilho de fundo */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-transparent"></div>
            
            {/* Logo Oficial */}
            <img 
              src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68e15e54f0b0a5a83d550cb2/4bab0b48e_logo.png"
              alt="Forja da Consciência"
              className="w-full h-full object-contain relative z-10"
            />
          </div>
        </motion.div>

        {/* Welcome Text */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-800 mb-4 drop-shadow-sm">
            Bem-vindo!
          </h1>
          <p className="text-xl text-gray-700 mb-2">
            Tutorial Gratuito da
          </p>
          <h2 className="text-3xl font-bold text-teal-700 drop-shadow-sm mb-4">
            Forja da Consciência
          </h2>
          <div className="flex items-center justify-center gap-2 text-gray-600">
            <Heart className="w-5 h-5 text-red-500" />
            <p className="text-sm">
              Feito com carinho para você
            </p>
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="text-center"
        >
          <div className="bg-white/70 backdrop-blur-sm px-8 py-4 rounded-full shadow-lg border-2 border-teal-300">
            <p className="text-teal-800 font-semibold text-lg">
              Toque na tela para começar
            </p>
          </div>
          
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="mt-8"
          >
            <div className="text-teal-700 text-4xl">👇</div>
          </motion.div>
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-8 text-center"
        >
          <p className="text-gray-600 text-sm">
            Aprenda a usar seu celular<br />de forma fácil e segura
          </p>
        </motion.div>
      </motion.div>
    </PhoneFrame>
  );
}