import React, { useEffect, useState } from "react";
import {
  X,
  Check,
  Music2,
  RefreshCcw,
  Timer,
  Sparkles,
  Smile,
  Wand2,
  ChevronDown,
} from "lucide-react";
import Pulse from "@/components/youtube/Pulse";

const MODOS = ["Vídeo", "Shorts", "Ao vivo", "Post"];

export default function ShortsCamera({ target, onTap, onRecorded, onCheck, onClose }) {
  const [modo, setModo] = useState("Shorts");
  const [limite, setLimite] = useState(15);
  const [gravando, setGravando] = useState(false);
  const [tempo, setTempo] = useState(0);
  const [gravados, setGravados] = useState(0);

  useEffect(() => {
    if (!gravando) return;
    const t = setInterval(() => setTempo((s) => s + 1), 1000);
    return () => clearInterval(t);
  }, [gravando]);

  // Quando o tempo máximo acaba, a gravação para sozinha
  useEffect(() => {
    if (!gravando || tempo < limite) return;
    setGravando(false);
    setGravados(limite);
    onRecorded(limite);
    onTap("record");
  }, [tempo, gravando, limite]);

  const iniciar = () => {
    setTempo(0);
    setGravando(true);
  };

  const parar = () => {
    if (!gravando) return;
    const segundos = Math.max(tempo, 1);
    setGravando(false);
    setGravados(segundos);
    onRecorded(segundos);
    onTap("record");
  };

  return (
    <div className="absolute inset-0 bg-gradient-to-b from-gray-200 via-gray-300 to-gray-500 flex flex-col">
      {/* Cabeçalho: fechar, adicionar música e tempo máximo */}
      <div className="relative z-10 flex items-center justify-between px-4 pt-7 pb-3">
        <Pulse active={target === "close_create"} ring="rounded-full" onClick={onClose}>
          <button
            type="button"
            className="w-11 h-11 rounded-full bg-black/45 flex items-center justify-center"
          >
            <X className="w-6 h-6 text-white" />
          </button>
        </Pulse>

        <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-black/45">
          <Music2 className="w-5 h-5 text-white" />
          <span className="text-white text-sm font-semibold">Adicionar música</span>
        </div>

        <button
          type="button"
          onClick={() => setLimite((l) => (l === 15 ? 60 : 15))}
          className="w-11 h-11 rounded-full bg-black/45 flex items-center justify-center"
        >
          <span className="text-white text-sm font-bold">{limite}</span>
        </button>
      </div>

      {/* Aviso de gravação */}
      <div className="relative z-10 px-4 h-6">
        {gravando ? (
          <div className="w-max flex items-center gap-2 rounded-full bg-red-600 px-3 py-1">
            <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
            <span className="text-white text-xs font-semibold">
              Gravando {tempo}s de {limite}s
            </span>
          </div>
        ) : (
          gravados > 0 && (
            <div className="w-max flex items-center gap-2 rounded-full bg-black/45 px-3 py-1">
              <span className="text-white text-xs font-semibold">
                Vídeo gravado: {gravados}s
              </span>
            </div>
          )
        )}
      </div>

      {/* Ferramentas laterais */}
      <div className="relative z-10 flex-1 flex justify-end px-4 pt-3">
        <div className="self-start flex flex-col items-center gap-5 px-3 py-4 rounded-2xl bg-black/40">
          <RefreshCcw className="w-6 h-6 text-white" />
          <span className="text-white text-sm font-bold">1x</span>
          <Timer className="w-6 h-6 text-white" />
          <Sparkles className="w-6 h-6 text-white" />
          <Smile className="w-6 h-6 text-white" />
          <Wand2 className="w-6 h-6 text-white" />
          <ChevronDown className="w-6 h-6 text-white" />
        </div>
      </div>

      {/* Barra do tempo gravado */}
      {gravando && (
        <div className="relative z-10 mx-6 mb-3 h-1.5 rounded-full bg-white/50 overflow-hidden">
          <div className="h-full bg-red-600" style={{ width: `${(tempo / limite) * 100}%` }} />
        </div>
      )}

      {/* Galeria, botão de gravar e visto */}
      <div className="relative z-10 px-6 pb-3 flex items-end justify-between">
        <div className="w-14 flex flex-col items-center gap-1">
          <div className="w-12 h-12 rounded-lg border-2 border-white bg-gradient-to-br from-sky-400 to-emerald-500" />
          <span className="text-white text-xs font-medium">Adicionar</span>
        </div>

        <Pulse active={target === "record"} ring="rounded-full">
          <button
            type="button"
            onPointerDown={iniciar}
            onPointerUp={parar}
            onPointerLeave={parar}
            className="w-20 h-20 rounded-full bg-white/30 flex items-center justify-center touch-none"
          >
            <div
              className={`w-16 h-16 border-4 border-white transition-all ${
                gravando ? "rounded-xl bg-red-800" : "rounded-full bg-red-600"
              }`}
            />
          </button>
        </Pulse>

        <div className="w-14 flex justify-center">
          {gravados > 0 && !gravando && (
            <Pulse active={target === "check"} ring="rounded-full" onClick={onCheck}>
              <button
                type="button"
                className="w-12 h-12 rounded-full bg-white flex items-center justify-center"
              >
                <Check className="w-7 h-7 text-gray-900" />
              </button>
            </Pulse>
          )}
        </div>
      </div>

      {/* Modos de criação */}
      <div className="relative z-10 px-3 pb-6">
        <div className="flex items-center justify-center gap-1 bg-black/75 rounded-full p-1.5">
          {MODOS.map((m) => (
            <button
              key={m}
              type="button"
              onClick={() => setModo(m)}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap ${
                modo === m ? "bg-gray-600 text-white" : "text-white/70"
              }`}
            >
              {m}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}