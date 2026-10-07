import React from "react";
import { motion } from "framer-motion";
import { Play, Music2, Repeat2, VolumeX } from "lucide-react";

// O vídeo gravado aparece repetindo, com o texto, o adesivo e a legenda por cima
export default function ShortsPreview({
  duracao,
  musica,
  mudo,
  texto,
  cor,
  estilo,
  adesivo,
  legenda,
  filtro,
  efeito,
  intensidade,
}) {
  const segundos = Math.max(duracao || 4, 4);

  return (
    <div
      className={`relative w-full h-full rounded-2xl overflow-hidden bg-gradient-to-b from-indigo-500 via-purple-500 to-rose-500 ${
        filtro?.classe || ""
      }`}
    >
      {efeito?.overlay && (
        <div
          className={`absolute inset-0 ${efeito.overlay}`}
          style={{ opacity: (intensidade ?? 60) / 100 }}
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
          <p className={`text-lg drop-shadow-lg ${estilo?.classe || "font-bold"} ${cor?.texto || "text-white"}`}>
            {texto}
          </p>
        </motion.div>
      )}

      {adesivo && <div className="absolute bottom-16 left-4 text-5xl drop-shadow-lg">{adesivo}</div>}

      {legenda && (
        <div className="absolute bottom-8 left-3 right-3 flex justify-center">
          <span className="rounded-md bg-black/75 px-2 py-1 text-white text-xs text-center">
            {legenda}
          </span>
        </div>
      )}

      {/* Barra do vídeo repetindo */}
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