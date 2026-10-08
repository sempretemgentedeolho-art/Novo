import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { Youtube } from "lucide-react";
import { StatusBar } from "@/components/StatusBar";

// Menu de capítulos: a pessoa escolhe por onde quer começar o tutorial
export default function ChapterPicker({
  chapters,
  onSelect,
  marca = "YouTube",
  Icone = Youtube,
  corBarra = "bg-red-600",
  corIcone = "text-red-600",
  corIconeFundo = "bg-red-50",
  fala = "Por onde você quer começar? Toque na parte do YouTube que você quer aprender hoje. A primeira opção é o tutorial completo, do começo.",
}) {
  useEffect(() => {
    const synth = window.speechSynthesis;
    if (synth) {
      synth.cancel();
      const utter = new SpeechSynthesisUtterance(fala);
      utter.lang = "pt-BR";
      utter.rate = 0.9;
      synth.speak(utter);
    }
    return () => window.speechSynthesis.cancel();
  }, [fala]);

  return (
    <div className="absolute inset-0 z-[75] bg-white flex flex-col overflow-hidden">
      <div className={`${corBarra} shrink-0`}>
        <StatusBar variant="dark" />
        <div className="px-5 pb-5">
          <div className="flex items-center gap-2">
            <Icone className="w-7 h-7 text-white" />
            <span className="text-xl font-bold text-white">{marca}</span>
          </div>
          <h1 className="text-2xl font-bold text-white leading-snug mt-2">
            Por onde você quer começar?
          </h1>
          <p className="text-sm text-white/90 mt-1">
            Escolha a parte que você quer aprender hoje. Você pode voltar aqui sempre que quiser.
          </p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {chapters.map((cap, index) => {
          const Icon = cap.icon;
          return (
            <motion.button
              key={cap.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.06 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => onSelect(cap)}
              className="w-full flex items-center gap-4 rounded-2xl border-2 border-gray-200 px-4 py-4 text-left active:bg-gray-50"
            >
              <div
                className={`w-12 h-12 rounded-2xl ${corIconeFundo} flex items-center justify-center shrink-0`}
              >
                <Icon className={`w-6 h-6 ${corIcone}`} />
              </div>
              <div className="flex-1">
                <p className="text-base font-bold text-gray-900">{cap.label}</p>
                <p className="text-xs text-gray-600 mt-0.5 leading-snug">{cap.description}</p>
              </div>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}