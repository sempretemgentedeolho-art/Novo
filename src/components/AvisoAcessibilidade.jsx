import React from "react";
import { motion } from "framer-motion";
import { useAcessibilidade } from "@/lib/acessibilidade";

// Faixa que acompanha os tutoriais mostrando quais opções estão ligadas.
// As etiquetas piscam devagar; com "menos animações" ficam paradas, mas visíveis.
export default function AvisoAcessibilidade() {
  const { talkback, contraste, reduzirAnimacoes, gestos } = useAcessibilidade();

  const itens = [
    talkback && { id: "talkback", texto: "🔊 TalkBack: cada passo é falado devagar" },
    contraste && { id: "contraste", texto: "🌗 Contraste elevado" },
    reduzirAnimacoes && { id: "reduzir", texto: "🐢 Menos animações" },
    gestos && { id: "gestos", texto: "↔️ Para voltar, deslize da borda" },
  ].filter(Boolean);

  if (itens.length === 0) return null;

  return (
    <div className="flex flex-wrap items-center justify-center gap-1 px-2 py-1 bg-gray-900/90">
      {itens.map((item) => (
        <motion.span
          key={item.id}
          animate={reduzirAnimacoes ? { opacity: 1 } : { opacity: [1, 0.5, 1] }}
          transition={
            reduzirAnimacoes
              ? { duration: 0 }
              : { repeat: Infinity, duration: 1.6, ease: "easeInOut" }
          }
          className={`px-2 py-0.5 rounded-full text-[11px] font-semibold ${
            contraste ? "bg-yellow-300 text-black border-2 border-black" : "bg-white text-gray-900"
          }`}
        >
          {item.texto}
        </motion.span>
      ))}
    </div>
  );
}