import React, { useEffect, useState } from "react";
import { Mic, Square } from "lucide-react";
import ToolPanel from "@/components/youtube/ToolPanel";

// Painel de narração: gravar a voz por cima do vídeo
export default function NarracaoPanel({ concluirAtivo, onConcluir }) {
  const [gravando, setGravando] = useState(false);
  const [tempo, setTempo] = useState(0);

  const alternar = () => setGravando((g) => !g);

  useEffect(() => {
    if (!gravando) return;
    const t = setInterval(() => setTempo((s) => s + 1), 1000);
    return () => clearInterval(t);
  }, [gravando]);

  return (
    <ToolPanel
      titulo="Narração"
      dica="Grave a sua voz para explicar o vídeo"
      rodape="Fale pertinho do celular, com a sua voz normal."
      concluirAtivo={concluirAtivo}
      onConcluir={onConcluir}
    >
      <div className="flex flex-col items-center py-2">
        <button
          type="button"
          onClick={alternar}
          className={`w-24 h-24 rounded-full flex items-center justify-center ${
            gravando ? "bg-red-600" : "bg-white"
          }`}
        >
          {gravando ? (
            <Square className="w-8 h-8 text-white" fill="currentColor" />
          ) : (
            <Mic className="w-10 h-10 text-gray-900" />
          )}
        </button>

        <p className="text-white text-sm font-medium mt-3">
          {gravando ? `Gravando a sua voz: ${tempo}s` : tempo > 0 ? "Narração gravada" : "Toque para gravar"}
        </p>
        <p className="text-white/60 text-xs mt-0.5">
          {gravando ? "Toque no quadrado para parar" : "A sua voz vai ficar por cima da música"}
        </p>
      </div>
    </ToolPanel>
  );
}