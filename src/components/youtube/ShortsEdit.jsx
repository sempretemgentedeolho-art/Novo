import React, { useState } from "react";
import {
  ArrowLeft,
  Music2,
  Volume2,
  Sparkles,
  SlidersHorizontal,
  Sticker,
  Captions,
  ChevronDown,
  Film,
  Mic,
} from "lucide-react";
import Pulse from "@/components/youtube/Pulse";
import ShortsPreview from "@/components/youtube/ShortsPreview";
import TextPanel, { CORES, ESTILOS } from "@/components/youtube/TextPanel";
import MusicPanel from "@/components/youtube/MusicPanel";
import EffectsPanel, { EFEITOS } from "@/components/youtube/EffectsPanel";
import FiltersPanel, { FILTROS } from "@/components/youtube/FiltersPanel";
import StickersPanel from "@/components/youtube/StickersPanel";
import CaptionsPanel, { ESTILOS_LEGENDA } from "@/components/youtube/CaptionsPanel";
import EditarPanel from "@/components/youtube/EditarPanel";
import NarracaoPanel from "@/components/youtube/NarracaoPanel";

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
  const [narracao, setNarracao] = useState(false);
  const [texto, setTexto] = useState("");
  const [corIndex, setCorIndex] = useState(0);
  const [estiloIndex, setEstiloIndex] = useState(0);
  const [musica, setMusica] = useState(null);
  const [efeitoIndex, setEfeitoIndex] = useState(0);
  const [intensidade, setIntensidade] = useState(70);
  const [filtroIndex, setFiltroIndex] = useState(0);
  const [intensidadeFiltro, setIntensidadeFiltro] = useState(70);
  const [adesivo, setAdesivo] = useState(null);
  const [legenda, setLegenda] = useState("");
  const [legendaAtiva, setLegendaAtiva] = useState(true);
  const [legendaEstiloIndex, setLegendaEstiloIndex] = useState(0);

  const segundos = Math.max(duracao || 15, 1);

  const abrir = (id) => {
    setPainel(id);
    onTap(id);
  };

  const fecharPainel = () => setPainel("none");

  const concluirTexto = () => {
    if (!texto.trim()) setTexto("Meu primeiro Short");
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
        <MusicPanel
          target={target}
          musica={musica}
          onEscolher={escolherMusica}
          onConcluir={fecharPainel}
        />
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
        <FiltersPanel
          filtroIndex={filtroIndex}
          intensidade={intensidadeFiltro}
          onFiltroIndex={setFiltroIndex}
          onIntensidade={setIntensidadeFiltro}
          onConcluir={fecharPainel}
        />
      );
    }

    if (painel === "adesivos") {
      return <StickersPanel adesivo={adesivo} onAdesivo={setAdesivo} onConcluir={fecharPainel} />;
    }

    if (painel === "legendas") {
      return (
        <CaptionsPanel
          legenda={legenda}
          onLegenda={setLegenda}
          ativas={legendaAtiva}
          onAtivas={setLegendaAtiva}
          estiloIndex={legendaEstiloIndex}
          onEstiloIndex={setLegendaEstiloIndex}
          onConcluir={fecharPainel}
        />
      );
    }

    if (painel === "editar") {
      return <EditarPanel onConcluir={fecharPainel} />;
    }

    if (painel === "narracao") {
      return <NarracaoPanel onGravar={() => setNarracao(true)} onConcluir={fecharPainel} />;
    }

    return null;
  };

  return (
    <div className="absolute inset-0 bg-gray-900 flex flex-col">
      {/* Cabeçalho: voltar, adicionar som e ligar/desligar o som */}
      <div className="relative z-20 flex items-center justify-between px-3 pt-7 pb-2">
        <Pulse ring="rounded-full" onClick={onClose}>
          <button
            type="button"
            className="w-10 h-10 rounded-full bg-black/45 flex items-center justify-center"
          >
            <ArrowLeft className="w-5 h-5 text-white" />
          </button>
        </Pulse>

        <Pulse active={target === "musica_pill"} ring="rounded-full" onClick={() => abrir("musica")}>
          <button
            type="button"
            className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-black/45"
          >
            <Music2 className="w-4 h-4 text-white" />
            <span className="text-white text-sm font-semibold">Adicionar som</span>
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
            narracao={narracao}
            texto={texto}
            cor={CORES[corIndex]}
            estilo={ESTILOS[estiloIndex]}
            adesivo={adesivo}
            legenda={legendaAtiva ? legenda : ""}
            legendaClasse={ESTILOS_LEGENDA[legendaEstiloIndex].classe}
            filtro={FILTROS[filtroIndex]}
            efeito={EFEITOS[efeitoIndex]}
            intensidade={intensidade}
            intensidadeFiltro={intensidadeFiltro}
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

      {/* Editar Short, linha do tempo, narração e Avançar */}
      <div className="relative z-10 px-4 pb-5 pt-2">
        <p className="text-white text-base font-semibold">Editar Short</p>
        <p className="text-white/60 text-xs">{segundos} segundos</p>

        <div className="flex gap-2 mt-2.5">
          <Pulse ring="rounded-xl" className="flex-1" onClick={() => abrir("editar")}>
            <button
              type="button"
              className="w-full flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl bg-white/15"
            >
              <Film className="w-4 h-4 text-white shrink-0" />
              <span className="text-white text-xs font-semibold">Linha do tempo</span>
            </button>
          </Pulse>

          <Pulse ring="rounded-xl" className="flex-1" onClick={() => abrir("narracao")}>
            <button
              type="button"
              className="w-full flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl bg-white/15"
            >
              <Mic className="w-4 h-4 text-white shrink-0" />
              <span className="text-white text-xs font-semibold">Narração</span>
            </button>
          </Pulse>
        </div>

        <p className="text-white/50 text-[11px] mt-2">
          Toque nas ferramentas para personalizar seu vídeo.
        </p>

        <Pulse active={target === "next"} className="w-full mt-2.5" ring="rounded-xl" onClick={onNext}>
          <button type="button" className="w-full py-3 rounded-xl bg-white">
            <span className="text-gray-900 text-sm font-semibold">Avançar</span>
          </button>
        </Pulse>
      </div>

      {renderPainel()}
    </div>
  );
}