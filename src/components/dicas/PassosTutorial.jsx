import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Check, ChevronLeft, ChevronRight, RotateCcw } from "lucide-react";
import { useAcessibilidade } from "@/lib/acessibilidade";

// Divide o texto do tutorial em passos: um passo por parágrafo
const criarPassos = (conteudo) =>
  conteudo.split(/\n{2,}/).map((p) => p.trim()).filter(Boolean);

// Tutorial guiado passo a passo: cada passo é lido em voz alta e fica destacado
export default function PassosTutorial({ tutorial, onFechar }) {
  const passos = criarPassos(tutorial.content);
  const [indice, setIndice] = useState(0);
  const { reduzirAnimacoes } = useAcessibilidade();
  const concluido = indice >= passos.length;
  const ultimo = indice === passos.length - 1;

  // Fala o passo atual, sempre uma fala por vez
  useEffect(() => {
    const synth = window.speechSynthesis;
    if (!synth) return;
    synth.cancel();
    const texto = concluido
      ? `Tutorial concluído. Você viu todos os ${passos.length} passos de ${tutorial.title}.`
      : `Passo ${indice + 1} de ${passos.length}. ${passos[indice]}`;
    const utter = new SpeechSynthesisUtterance(texto);
    utter.lang = "pt-BR";
    utter.rate = 0.85;
    const timer = setTimeout(() => synth.speak(utter), 150);
    return () => {
      clearTimeout(timer);
      window.speechSynthesis.cancel();
    };
  }, [indice, concluido, passos.length, tutorial.title]);

  const irPara = (i) => setIndice(Math.max(0, Math.min(i, passos.length)));

  if (concluido) {
    return (
      <motion.div
        initial={reduzirAnimacoes ? false : { opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-yellow-50 border-4 border-yellow-400 rounded-2xl p-6 text-center"
      >
        <div className="w-16 h-16 rounded-full bg-yellow-500 mx-auto flex items-center justify-center mb-3">
          <Check className="w-9 h-9 text-white" />
        </div>
        <h2 className="text-xl font-bold text-gray-900 mb-2">Tutorial concluído!</h2>
        <p className="text-gray-700 mb-5">
          Você viu todos os {passos.length} passos de “{tutorial.title}”.
        </p>
        <button
          onClick={() => setIndice(0)}
          className="w-full py-3 mb-2 bg-white border-2 border-yellow-500 text-yellow-700 rounded-xl font-bold flex items-center justify-center gap-2"
        >
          <RotateCcw className="w-5 h-5" /> Ver de novo
        </button>
        <button
          onClick={onFechar}
          className="w-full py-3 bg-yellow-500 hover:bg-yellow-600 text-white rounded-xl font-bold"
        >
          Fechar tutorial
        </button>
      </motion.div>
    );
  }

  return (
    <>
      <div className="flex items-center justify-between text-sm font-semibold text-yellow-800">
        <span>Passo {indice + 1} de {passos.length}</span>
        <span>{Math.round(((indice + 1) / passos.length) * 100)}%</span>
      </div>

      <div className="h-2 rounded-full bg-yellow-200 overflow-hidden">
        <motion.div
          className="h-full bg-yellow-500"
          animate={{ width: `${((indice + 1) / passos.length) * 100}%` }}
        />
      </div>

      {/* Passo atual, em destaque e piscando devagar */}
      <motion.div
        animate={reduzirAnimacoes ? {} : { scale: [1, 1.02, 1] }}
        transition={reduzirAnimacoes ? {} : { repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
        className="bg-white rounded-2xl p-6 border-4 border-yellow-400 shadow-lg"
      >
        <h2 className="text-lg font-bold text-gray-900 mb-3">{tutorial.title}</h2>
        <p className="text-gray-800 text-lg leading-relaxed whitespace-pre-line">
          {passos[indice]}
        </p>
        <p className="mt-4 text-sm font-semibold text-yellow-700">
          🔊 Este passo está sendo lido em voz alta
        </p>
      </motion.div>

      <div className="flex gap-3">
        <button
          onClick={() => irPara(indice - 1)}
          disabled={indice === 0}
          className="flex-1 py-4 rounded-xl font-bold bg-white border-2 border-yellow-500 text-yellow-700 disabled:opacity-40 flex items-center justify-center gap-1"
        >
          <ChevronLeft className="w-5 h-5" /> Antes
        </button>
        <button
          onClick={() => irPara(indice + 1)}
          className="flex-1 py-4 rounded-xl font-bold bg-yellow-500 hover:bg-yellow-600 text-white flex items-center justify-center gap-1"
        >
          {ultimo ? "Concluir" : "Próximo"} <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </>
  );
}