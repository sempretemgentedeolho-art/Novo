import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { PhoneFrame } from '@/components/PhoneFrame';
import { motion } from 'framer-motion';
import { Heart, Youtube } from 'lucide-react';
import logoForja from '@/assets/imagens/logo-forja.png';

export default function Inicio() {
  const navigate = useNavigate();

  useEffect(() => {
    const synth = window.speechSynthesis;
    if (synth) {
      synth.cancel();
      const utter = new SpeechSynthesisUtterance(
        "Seja bem-vindo ao tutorial da Forja da Consciência. Um aplicativo feito com muito carinho para você aprender a usar seu celular de forma fácil e segura. Antes de começar, uma dica rápida sobre o YouTube: você não precisa de conta para assistir aos vídeos. Se quiser curtir, comentar ou salvar seus canais favoritos, é só entrar com a sua conta do Google, o mesmo e-mail do Gmail. Toque na tela para começar."
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
        role="button"
        tabIndex={0}
        aria-label="Toque na tela para começar o tutorial"
        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleStart(); }}
        className="h-full bg-gradient-to-br from-cyan-100 via-blue-100 to-teal-100 flex flex-col items-center justify-center p-6 cursor-pointer relative overflow-y-auto"
      >
        {/* Logo Forja da Consciência */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
          className="mb-5"
        >
          <div className="w-28 h-28 rounded-3xl bg-white shadow-2xl flex items-center justify-center p-4 relative overflow-hidden">
            {/* Brilho de fundo */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-transparent"></div>
            
            {/* Logo Oficial */}
            <img 
              src={logoForja}
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
          className="text-center mb-5"
        >
          <h1 className="text-3xl font-bold text-gray-800 mb-2 drop-shadow-sm">
            Bem-vindo!
          </h1>
         
          <h2 className="text-2xl font-bold text-teal-700 drop-shadow-sm mb-2">
            Forja da Consciência
          </h2>
          <div className="flex items-center justify-center gap-2 text-gray-600">
            <Heart className="w-5 h-5 text-red-500" />
            <p className="text-sm">
              Feito com carinho para você
            </p>
          </div>
        </motion.div>

        {/* Dica rápida sobre o YouTube */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="bg-white/85 backdrop-blur-sm rounded-2xl shadow-lg border-2 border-red-200 px-4 py-3 max-w-sm text-center mb-5"
        >
          <div className="flex items-center justify-center gap-2 mb-1.5">
            <Youtube className="w-4 h-4 text-red-600" />
            <h3 className="text-sm font-bold text-gray-800">Dica rápida sobre o YouTube</h3>
          </div>
          <p className="text-sm text-gray-700 leading-snug">
            Você <strong>não precisa de conta</strong> para assistir aos vídeos. Para curtir,
            comentar e salvar seus canais favoritos, entre com a sua conta do Google, o mesmo
            e-mail do Gmail.
          </p>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="text-center"
        >
          <div className="bg-white/70 backdrop-blur-sm px-6 py-3 rounded-full shadow-lg border-2 border-teal-300">
            <p className="text-teal-800 font-semibold text-base">
              Toque na tela para começar
            </p>
          </div>
          
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="mt-3"
          >
            <div className="text-teal-700 text-3xl">👇</div>
          </motion.div>
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="mt-6 text-center"
        >
          <p className="text-gray-600 text-xs">
            Aprenda a usar seu celular<br />de forma fácil e segura
          </p>
        </motion.div>
      </motion.div>
    </PhoneFrame>
  );
}