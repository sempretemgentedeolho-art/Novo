import React from "react";
import { motion } from "framer-motion";
import { Play } from "lucide-react";
import fotoShorts from "@/assets/imagens/shorts-pessoa.jpg";

const FOTO = fotoShorts;

const ALINHAMENTO = {
  esquerda: "text-left",
  centro: "text-center",
  direita: "text-right",
};

// O vídeo gravado aparece repetindo, com o texto, o adesivo e a legenda por cima
export default function ShortsPreview({
  duracao,
  texto,
  cor,
  estilo,
  alinhamento,
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
    <div className="relative w-full h-full rounded overflow-hidden bg-gray-900">
      {/* Vídeo gravado */}
      <img
        src={FOTO}
        alt="Vídeo gravado"
        className="absolute inset-0 w-full h-full object-cover"
        style={{ filter: filtroCss || undefined }}
      />

      {efeito?.overlay && (
        <div
          className={`absolute inset-0 ${efeito.overlay}`}
          style={{ opacity: (intensidade ?? 70) / 100 }}
        />
      )}

      {texto && (
        <motion.div
          drag
          dragMomentum={false}
          dragConstraints={{ left: -70, right: 70, top: -90, bottom: 90 }}
          className="absolute left-1/2 top-1/3 -ml-24 w-48 cursor-move"
        >
          <p
            className={`${ALINHAMENTO[alinhamento] || "text-center"} text-lg drop-shadow-lg ${
              estilo?.classe || "font-bold"
            } ${cor?.texto || "text-white"} ${estilo?.caixa ? "bg-black/60 rounded-lg px-2 py-1" : ""}`}
          >
            {texto}
          </p>
        </motion.div>
      )}

      {adesivo && <div className="absolute bottom-16 left-4 text-5xl drop-shadow-lg">{adesivo}</div>}

      {legenda && (
        <div className="absolute bottom-10 left-3 right-3 flex justify-center">
          <span
            className={`rounded-md bg-black/75 px-2 py-1 text-white text-center ${
              legendaClasse || "text-xs"
            }`}
          >
            {legenda}
          </span>
        </div>
      )}

      {/* Tempo do vídeo, no canto de baixo do lado esquerdo */}
      <div className="absolute bottom-3 left-2 flex items-center gap-1.5 rounded-full bg-black/60 px-3 py-1.5">
        <Play className="w-3.5 h-3.5 text-white" fill="currentColor" />
        <span className="text-white text-[11px] font-medium drop-shadow">
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