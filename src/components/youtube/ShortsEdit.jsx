import React, { useState } from "react";
import { X, Search, Music2, Play, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import Pulse from "@/components/youtube/Pulse";

const CORES = [
  { nome: "Branco", ponto: "bg-white", texto: "text-white" },
  { nome: "Amarelo", ponto: "bg-yellow-400", texto: "text-yellow-400" },
  { nome: "Rosa", ponto: "bg-pink-500", texto: "text-pink-500" },
  { nome: "Azul", ponto: "bg-sky-400", texto: "text-sky-400" },
  { nome: "Verde", ponto: "bg-emerald-400", texto: "text-emerald-400" },
];

const MUSICAS = [
  { id: "m1", nome: "Marchinha da alegria", artista: "Banda do Coração", tempo: "20s" },
  { id: "m2", nome: "Modão de viola", artista: "Dupla Sertaneja", tempo: "15s" },
  { id: "m3", nome: "Melodia calma de piano", artista: "Piano Suave", tempo: "15s" },
];

export default function ShortsEdit({ target, duracao, onTap, onNext, onClose }) {
  const [painel, setPainel] = useState("none");
  const [texto, setTexto] = useState("");
  const [cor, setCor] = useState(CORES[1]);
  const [textoAplicado, setTextoAplicado] = useState("");
  const [musica, setMusica] = useState(null);

  const concluirTexto = () => {
    setTextoAplicado(texto.trim() || "Minha primeira receita");
    setPainel("none");
    onTap("concluido");
  };

  const escolherMusica = (m) => {
    setMusica(m);
    setPainel("none");
    onTap("musica");
  };

  const abrirTexto = () => {
    setPainel("texto");
    onTap("aa");
  };

  const abrirAudio = () => {
    setPainel("audio");
    onTap("audio");
  };

  return (
    <div className="absolute inset-0 bg-gray-900 flex flex-col">
      {/* Cabeçalho: fechar e próximo */}
      <div className="relative z-10 flex items-center justify-between px-4 pt-7 pb-2">
        <Pulse ring="rounded-full" onClick={onClose}>
          <button
            type="button"
            className="w-10 h-10 rounded-full bg-black/45 flex items-center justify-center"
          >
            <X className="w-5 h-5 text-white" />
          </button>
        </Pulse>

        <Pulse active={target === "next"} ring="rounded-full" onClick={onNext}>
          <button
            type="button"
            className="flex items-center gap-1 px-4 py-2 rounded-full bg-white/90"
          >
            <span className="text-gray-900 text-sm font-semibold">Próximo</span>
            <ChevronRight className="w-4 h-4 text-gray-900" />
          </button>
        </Pulse>
      </div>

      {/* Vídeo gravado */}
      <div className="relative z-10 flex-1 px-6 py-2">
        <div className="relative w-full h-full rounded-2xl overflow-hidden bg-gradient-to-b from-indigo-500 via-purple-500 to-rose-500">
          <div className="absolute top-3 left-3 flex items-center gap-2 rounded-full bg-black/45 px-3 py-1">
            <Play className="w-3.5 h-3.5 text-white" fill="currentColor" />
            <span className="text-white text-[11px]">Seu vídeo de {duracao}s</span>
          </div>

          {musica && (
            <div className="absolute top-3 right-3 flex items-center gap-1 rounded-full bg-black/45 px-3 py-1">
              <Music2 className="w-3.5 h-3.5 text-white" />
              <span className="text-white text-[11px]">{musica.nome}</span>
            </div>
          )}

          {textoAplicado && (
            <motion.div
              drag
              dragMomentum={false}
              dragConstraints={{ left: -70, right: 70, top: -90, bottom: 90 }}
              className="absolute left-1/2 top-1/3 -ml-24 w-48 text-center cursor-move"
            >
              <p className={`text-lg font-bold drop-shadow-lg ${cor.texto}`}>{textoAplicado}</p>
            </motion.div>
          )}
        </div>
      </div>

      {/* Enfeites: texto e áudio */}
      {painel === "none" && (
        <div className="relative z-10 flex items-center justify-around bg-gray-950 py-3">
          <Pulse active={target === "aa"} ring="rounded-xl" onClick={abrirTexto}>
            <button type="button" className="flex flex-col items-center gap-1 px-4">
              <span className="text-white font-bold text-lg leading-none">Aa</span>
              <span className="text-white/70 text-[10px]">Texto</span>
            </button>
          </Pulse>

          <Pulse active={target === "audio"} ring="rounded-xl" onClick={abrirAudio}>
            <button type="button" className="flex flex-col items-center gap-1 px-4">
              <Music2 className="w-6 h-6 text-white" />
              <span className="text-white/70 text-[10px]">Áudio</span>
            </button>
          </Pulse>
        </div>
      )}

      {/* Painel de texto com as cores */}
      {painel === "texto" && (
        <div className="relative z-10 bg-gray-950 px-4 pt-3 pb-4">
          <div className="flex items-center justify-between mb-3">
            <span className="text-white/80 text-xs">Escolha a cor da letra e escreva a frase</span>
            <Pulse active={target === "concluido"} ring="rounded-full" onClick={concluirTexto}>
              <button
                type="button"
                className="px-4 py-1.5 rounded-full bg-sky-600 text-white text-sm font-semibold"
              >
                Concluído
              </button>
            </Pulse>
          </div>

          <div className="flex items-center justify-center gap-3 mb-3">
            {CORES.map((c) => (
              <button
                key={c.nome}
                type="button"
                onClick={() => setCor(c)}
                className={`w-8 h-8 rounded-full ${c.ponto} ${
                  cor.nome === c.nome ? "ring-4 ring-white" : ""
                }`}
              />
            ))}
          </div>

          <input
            value={texto}
            onChange={(e) => setTexto(e.target.value)}
            placeholder="Escreva aqui sua frase"
            className="w-full rounded-xl px-3 py-2 bg-white text-gray-900 text-sm"
          />
        </div>
      )}

      {/* Painel de música */}
      {painel === "audio" && (
        <div className="relative z-10 bg-gray-950 px-4 pt-3 pb-4">
          <div className="flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 mb-3">
            <Search className="w-4 h-4 text-white/70" />
            <span className="text-white/70 text-sm">Digite a música ou o cantor</span>
          </div>

          <div className="space-y-2">
            {MUSICAS.map((m, i) => (
              <Pulse
                key={m.id}
                active={target === "musica" && i === 0}
                className="w-full"
                ring="rounded-xl"
              >
                <button
                  type="button"
                  onClick={() => escolherMusica(m)}
                  className="w-full flex items-center gap-3 p-3 rounded-xl bg-white/10 text-left"
                >
                  <Music2 className="w-5 h-5 text-white shrink-0" />
                  <div className="flex-1">
                    <p className="text-white text-sm font-medium">{m.nome}</p>
                    <p className="text-white/60 text-xs">
                      {m.artista} · {m.tempo}
                    </p>
                  </div>
                </button>
              </Pulse>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}