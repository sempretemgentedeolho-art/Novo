import React, { useState } from "react";
import {
  X,
  Music2,
  Volume2,
  Sparkles,
  SlidersHorizontal,
  Sticker,
  Captions,
  ChevronDown,
  ChevronUp,
  Undo2,
} from "lucide-react";
import Pulse from "@/components/youtube/Pulse";
import ShortsPreview from "@/components/youtube/ShortsPreview";
import TextPanel, { CORES, ESTILOS } from "@/components/youtube/TextPanel";
import MusicPanel from "@/components/youtube/MusicPanel";
import EffectsPanel, { EFEITOS } from "@/components/youtube/EffectsPanel";
import FiltersPanel, { FILTROS } from "@/components/youtube/FiltersPanel";
import StickersPanel from "@/components/youtube/StickersPanel";
import CaptionsPanel from "@/components/youtube/CaptionsPanel";
import EditarPanel from "@/components/youtube/EditarPanel";

// Ferramentas do lado direito do vídeo, como no YouTube de verdade
const FERRAMENTAS = [
  { id: "aa", label: "Texto", letra: "Aa" },
  { id: "efeitos", label: "Efeitos", Icone: Sparkles },
  { id: "filtros", label: "Filtros", Icone: SlidersHorizontal },
  { id: "adesivos", label: "Adesivos", Icone: Sticker },
  { id: "legendas", label: "Legendas", Icone: Captions },
];

export default function ShortsEdit({ target, duracao, onTap, onNext, onClose }) {
  const [painel, setPainel] = useState("none");
  const [mudo, setMudo] = useState(false);
  const [texto, setTexto] = useState("");
  const [corIndex, setCorIndex] = useState(1);
  const [estiloIndex, setEstiloIndex] = useState(0);
  const [musica, setMusica] = useState(null);
  const [efeitoIndex, setEfeitoIndex] = useState(0);
  const [intensidade, setIntensidade] = useState(60);
  const [filtroIndex, setFiltroIndex] = useState(0);
  const [adesivo, setAdesivo] = useState(null);
  const [legenda, setLegenda] = useState("");

  const abrir = (id) => {
    setPainel(id);
    onTap(id);
  };

  const fecharPainel = () => setPainel("none");

  const concluirTexto = () => {
    if (!texto.trim()) setTexto("Minha primeira receita");
    setPainel("none");
    onTap("concluido");
  };

  const escolherMusica = (m) => {
    setMusica(m);
    setPainel("none");
    onTap("musica");
  };

  const renderPainel = () => {
    if (painel === "aa") {
      return (
        <TextPanel
          texto={texto}
          corIndex={corIndex}
          estiloIndex={estiloIndex}
          onTexto={setTexto}
          onCorIndex={setCorIndex}
          onEstiloIndex={setEstiloIndex}
          concluirAtivo={target === "concluido"}
          onConcluir={concluirTexto}
        />
      );
    }

    if (painel === "musica") {
      return (
        <MusicPanel target={target} musica={musica} onEscolher={escolherMusica} onConcluir={fecharPainel} />
      );
    }

    if (painel === "efeitos") {
      return (
        <EffectsPanel
          efeitoIndex={efeitoIndex}
          intensidade={intensidade}
          onEfeitoIndex={setEfeitoIndex}
          onIntensidade={setIntensidade}
          onConcluir={fecharPainel}
        />
      );
    }

    if (painel === "filtros") {
      return (
        <FiltersPanel filtroIndex={filtroIndex} onFiltroIndex={setFiltroIndex} onConcluir={fecharPainel} />
      );
    }

    if (painel === "adesivos") {
      return <StickersPanel adesivo={adesivo} onAdesivo={setAdesivo} onConcluir={fecharPainel} />;
    }

    if (painel === "legendas") {
      return <CaptionsPanel legenda={legenda} onLegenda={setLegenda} onConcluir={fecharPainel} />;
    }

    if (painel === "editar") {
      return <EditarPanel onConcluir={fecharPainel} />;
    }

    return null;
  };

  return (
    <div className="absolute inset-0 bg-gray-900 flex flex-col">
      {/* Cabeçalho: fechar, adicionar música e som */}
      <div className="relative z-20 flex items-center justify-between px-3 pt-7 pb-2">
        <Pulse ring="rounded-full" onClick={onClose}>
          <button
            type="button"
            className="w-10 h-10 rounded-full bg-black/45 flex items-center justify-center"
          >
            <X className="w-5 h-5 text-white" />
          </button>
        </Pulse>

        <Pulse active={target === "musica_pill"} ring="rounded-full" onClick={() => abrir("musica")}>
          <button
            type="button"
            className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-black/45"
          >
            <Music2 className="w-4 h-4 text-white" />
            <span className="text-white text-sm font-semibold">Adicionar música</span>
          </button>
        </Pulse>

        <Pulse ring="rounded-full" onClick={() => setMudo((m) => !m)}>
          <button
            type="button"
            className="w-10 h-10 rounded-full bg-black/45 flex items-center justify-center"
          >
            <Volume2 className="w-5 h-5 text-white" />
          </button>
        </Pulse>
      </div>

      {/* Vídeo repetindo e as ferramentas do lado direito */}
      <div className="relative z-10 flex-1 flex gap-2 px-3 py-2">
        <div className="flex-1">
          <ShortsPreview
            duracao={duracao}
            musica={musica}
            mudo={mudo}
            texto={texto}
            cor={CORES[corIndex]}
            estilo={ESTILOS[estiloIndex]}
            adesivo={adesivo}
            legenda={legenda}
            filtro={FILTROS[filtroIndex]}
            efeito={EFEITOS[efeitoIndex]}
            intensidade={intensidade}
          />
        </div>

        <div className="self-start flex flex-col items-center gap-4 px-2.5 py-3 rounded-2xl bg-black/50">
          {FERRAMENTAS.map((f) => (
            <Pulse key={f.id} active={target === f.id} ring="rounded-xl" onClick={() => abrir(f.id)}>
              <button type="button" className="flex flex-col items-center gap-0.5 w-9">
                {f.letra ? (
                  <span className="text-white font-bold text-lg leading-none">{f.letra}</span>
                ) : (
                  <f.Icone className="w-5 h-5 text-white" />
                )}
                <span className="text-white/70 text-[9px]">{f.label}</span>
              </button>
            </Pulse>
          ))}
          <ChevronDown className="w-5 h-5 text-white/70" />
        </div>
      </div>

      {/* Dica e barra de baixo */}
      <div className="relative z-10 flex flex-col items-center pb-1">
        <ChevronUp className="w-4 h-4 text-white/70" />
        <span className="text-white/70 text-[11px]">Deslize para cima para editar</span>
      </div>

      <div className="relative z-10 flex items-center justify-between px-4 pb-5 pt-3">
        <Pulse ring="rounded-xl" onClick={() => abrir("editar")}>
          <button
            type="button"
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/15"
          >
            <Undo2 className="w-4 h-4 text-white" />
            <span className="text-white text-sm font-semibold">Editar</span>
          </button>
        </Pulse>

        <Pulse active={target === "next"} ring="rounded-full" onClick={onNext}>
          <button type="button" className="px-7 py-2.5 rounded-full bg-white">
            <span className="text-gray-900 text-sm font-semibold">Avançar</span>
          </button>
        </Pulse>
      </div>

      {renderPainel()}
    </div>
  );
}