import React from "react";
import { motion } from "framer-motion";
import { Play, Music2, Mic, Repeat2, VolumeX } from "lucide-react";

// O vídeo gravado aparece repetindo, com o texto, o adesivo e a legenda por cima
export default function ShortsPreview({
  duracao,
  musica,
  mudo,
  narracao,
  texto,
  cor,
  estilo,
  adesivo,
  legenda,
  legendaClasse,
  filtro,
  efeito,
  intensidade,
  intensidadeFiltro,
}) {
  const total = 15;
  const segundos = Math.min(Math.max(duracao || 4, 4), total);
  const filtroCss = filtro?.aplicar ? filtro.aplicar((intensidadeFiltro ?? 70) / 100) : "";

  return (
    <div className="relative w-full h-full rounded-2xl overflow-hidden bg-gray-900">
      {/* Vídeo gravado */}
      <div
        className="absolute inset-0 bg-gradient-to-b from-indigo-500 via-purple-500 to-rose-500"
        style={{ filter: filtroCss || undefined }}
      />

      {efeito?.overlay && (
        <div
          className={`absolute inset-0 ${efeito.overlay}`}
          style={{ opacity: (intensidade ?? 70) / 100 }}
        />
      )}

      <div className="absolute top-3 left-3 flex items-center gap-1.5 rounded-full bg-black/45 px-3 py-1">
        <Play className="w-3.5 h-3.5 text-white" fill="currentColor" />
        <span className="text-white text-[11px]">Seu vídeo de {segundos}s</span>
      </div>

      <div className="absolute top-3 right-3 flex items-center gap-1.5 rounded-full bg-black/45 px-3 py-1">
        {mudo ? (
          <>
            <VolumeX className="w-3.5 h-3.5 text-white" />
            <span className="text-white text-[11px]">Sem som</span>
          </>
        ) : (
          <>
            <Repeat2 className="w-3.5 h-3.5 text-white" />
            <span className="text-white text-[11px]">Repetindo</span>
          </>
        )}
      </div>

      {narracao && (
        <div className="absolute top-11 left-3 flex items-center gap-1.5 rounded-full bg-black/45 px-3 py-1">
          <Mic className="w-3.5 h-3.5 text-white" />
          <span className="text-white text-[11px]">Sua narração</span>
        </div>
      )}

      {musica && (
        <div className="absolute top-11 right-3 flex items-center gap-1.5 rounded-full bg-black/45 px-3 py-1">
          <Music2 className="w-3.5 h-3.5 text-white" />
          <span className="text-white text-[11px]">{musica.nome}</span>
        </div>
      )}

      {texto && (
        <motion.div
          drag
          dragMomentum={false}
          dragConstraints={{ left: -70, right: 70, top: -90, bottom: 90 }}
          className="absolute left-1/2 top-1/3 -ml-24 w-48 text-center cursor-move"
        >
          <p
            className={`text-lg drop-shadow-lg ${estilo?.classe || "font-bold"} ${cor?.texto || "text-white"} ${
              estilo?.caixa ? "bg-black/60 rounded-lg px-2 py-1" : ""
            }`}
          >
            {texto}
          </p>
        </motion.div>
      )}

      {adesivo && <div className="absolute bottom-16 left-4 text-5xl drop-shadow-lg">{adesivo}</div>}

      {legenda && (
        <div className="absolute bottom-8 left-3 right-3 flex justify-center">
          <span className={`rounded-md bg-black/75 px-2 py-1 text-white text-center ${legendaClasse || "text-xs"}`}>
            {legenda}
          </span>
        </div>
      )}

      {/* Tempo do vídeo repetindo */}
      <div className="absolute bottom-3 left-0 right-0 flex items-center justify-center">
        <span className="text-white text-[10px] font-medium drop-shadow">
          0:{String(segundos).padStart(2, "0")} / 0:{total}
        </span>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/25">
        <motion.div
          className="h-full bg-white"
          animate={{ width: ["0%", "100%"] }}
          transition={{ repeat: Infinity, duration: segundos, ease: "linear" }}
        />
      </div>
    </div>
  );
}