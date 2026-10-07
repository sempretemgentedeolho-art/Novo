import React, { useState } from "react";
import {
  ArrowLeft,
  Music2,
  MoreVertical,
  Wand2,
  Blend,
  Smile,
  MessageSquareText,
  ChevronDown,
  Film,
  Mic,
  Info,
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
  { id: "efeitos", label: "Efeitos", Icone: Wand2 },
  { id: "filtros", label: "Filtros", Icone: Blend },
  { id: "adesivos", label: "Adesivos", Icone: Smile },
  { id: "legendas", label: "Legendas", Icone: MessageSquareText },
];

export default function ShortsEdit({ target, duracao, onTap, onNext, onClose }) {
  const [painel, setPainel] = useState("none");
  const [texto, setTexto] = useState("");
  const [corIndex, setCorIndex] = useState(0);
  const [estiloIndex, setEstiloIndex] = useState(0);
  const [alinhamento, setAlinhamento] = useState("centro");
  const [musica, setMusica] = useState(null);
  const [efeitoIndex, setEfeitoIndex] = useState(0);
  const [intensidade, setIntensidade] = useState(70);
  const [filtroIndex, setFiltroIndex] = useState(0);
  const [intensidadeFiltro, setIntensidadeFiltro] = useState(70);
  const [adesivo, setAdesivo] = useState(null);
  const [legenda, setLegenda] = useState("");
  const [legendaAtiva, setLegendaAtiva] = useState(true);
  const [legendaEstiloIndex, setLegendaEstiloIndex] = useState(1);

  const segundos = Math.max(duracao || 15, 1);

  const abrir = (id) => {
    setPainel(id);
    onTap(id);
  };

  const fecharPainel = () => setPainel("none");

  // Fecha o painel do enfeite e avança o tutorial quando é a vez dele
  const concluirEnfeite = (id) => {
    setPainel("none");
    onTap(id);
  };

  const concluirLegenda = () => {
    if (!legenda.trim()) setLegenda("Hoje eu vou criar meu primeiro Short!");
    concluirEnfeite("legendas_concluir");
  };

  // O botão Adicionar som abre o painel de música e avança o tutorial
  const abrirMusica = () => {
    setPainel("musica");
    onTap("musica_pill");
  };

  const concluirTexto = () => {
    if (!texto.trim()) setTexto("Meu primeiro Short ✨");
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
          alinhamento={alinhamento}
          onTexto={setTexto}
          onCorIndex={setCorIndex}
          onEstiloIndex={setEstiloIndex}
          onAlinhamento={setAlinhamento}
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
          target={target}
          efeitoIndex={efeitoIndex}
          intensidade={intensidade}
          onEfeitoIndex={setEfeitoIndex}
          onIntensidade={setIntensidade}
          onTap={onTap}
          concluirAtivo={target === "efeitos_concluir"}
          onConcluir={() => concluirEnfeite("efeitos_concluir")}
        />
      );
    }

    if (painel === "filtros") {
      return (
        <FiltersPanel
          target={target}
          filtroIndex={filtroIndex}
          intensidade={intensidadeFiltro}
          onFiltroIndex={setFiltroIndex}
          onIntensidade={setIntensidadeFiltro}
          onTap={onTap}
          concluirAtivo={target === "filtros_concluir"}
          onConcluir={() => concluirEnfeite("filtros_concluir")}
        />
      );
    }

    if (painel === "adesivos") {
      return (
        <StickersPanel
          target={target}
          adesivo={adesivo}
          onAdesivo={setAdesivo}
          onTap={onTap}
          concluirAtivo={target === "adesivos_concluir"}
          onConcluir={() => concluirEnfeite("adesivos_concluir")}
        />
      );
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
          concluirAtivo={target === "legendas_concluir"}
          onConcluir={concluirLegenda}
        />
      );
    }

    if (painel === "editar") {
      return <EditarPanel onConcluir={fecharPainel} />;
    }

    if (painel === "narracao") {
      return <NarracaoPanel onConcluir={fecharPainel} />;
    }

    return null;
  };

  return (
    <div className="absolute inset-0 bg-neutral-950 flex flex-col">
      {/* Área do vídeo: a pessoa ocupa a tela e os botões ficam por cima */}
      <div className="relative z-10 flex-1 bg-neutral-500 pt-7">
      {/* Cabeçalho: voltar, adicionar som e as opções */}
      <div className="absolute top-7 left-0 right-0 z-20 flex items-center justify-between px-4 pt-2">
        <Pulse ring="rounded-full" onClick={onClose}>
          <button type="button" className="w-10 h-10 rounded-full bg-neutral-800/60 flex items-center justify-center">
            <ArrowLeft className="w-6 h-6 text-white" />
          </button>
        </Pulse>

        <Pulse active={target === "musica_pill"} ring="rounded-full" onClick={abrirMusica}>
          <button
            type="button"
            className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-neutral-800/60"
          >
            <Music2 className="w-4 h-4 text-white" />
            <span className="text-white text-sm font-semibold">
              {musica ? musica.nome : "Adicionar som"}
            </span>
          </button>
        </Pulse>

        <button type="button" className="w-10 h-10 rounded-full bg-neutral-800/60 flex items-center justify-center">
          <MoreVertical className="w-6 h-6 text-white" />
        </button>
      </div>

      {/* Vídeo repetindo, com as ferramentas por cima do lado direito */}
      <div className="absolute inset-x-5 top-[5.5rem] bottom-3">
        <div className="w-full h-full">
          <ShortsPreview
            duracao={duracao}
            texto={texto}
            cor={CORES[corIndex]}
            estilo={ESTILOS[estiloIndex]}
            alinhamento={alinhamento}
            adesivo={adesivo}
            legenda={legendaAtiva ? legenda : ""}
            legendaClasse={ESTILOS_LEGENDA[legendaEstiloIndex].classe}
            filtro={FILTROS[filtroIndex]}
            efeito={EFEITOS[efeitoIndex]}
            intensidade={intensidade}
            intensidadeFiltro={intensidadeFiltro}
          />
        </div>

        <div className="absolute -right-1 top-4 z-20 w-14 flex flex-col items-center gap-2 py-3 rounded-full bg-neutral-800/60">
          {FERRAMENTAS.map((f) => (
            <Pulse key={f.id} active={target === f.id} ring="rounded-xl" onClick={() => abrir(f.id)}>
              <button
                type="button"
                className={`flex flex-col items-center gap-0.5 w-11 py-2 rounded-xl ${
                  painel === f.id ? "bg-white" : ""
                }`}
              >
                {f.letra ? (
                  <span
                    className={`font-bold text-lg leading-none ${
                      painel === f.id ? "text-gray-900" : "text-white"
                    }`}
                  >
                    {f.letra}
                  </span>
                ) : (
                  <f.Icone
                    className={`w-5 h-5 ${painel === f.id ? "text-gray-900" : "text-white"}`}
                  />
                )}
                <span
                  className={`text-[9px] ${painel === f.id ? "text-gray-900" : "text-white/70"}`}
                >
                  {f.label}
                </span>
              </button>
            </Pulse>
          ))}
          <ChevronDown className="w-5 h-5 text-white/70" />
        </div>
      </div>
      </div>

      {/* Editar Short, linha do tempo, narração e Avançar */}
      <div className="relative z-10 bg-neutral-900 px-5 pb-5 pt-4">
        <div className="flex items-baseline justify-between">
          <p className="text-white text-base font-semibold">Editar Short</p>
          <p className="text-white/60 text-xs">{segundos} segundos</p>
        </div>

        <div className="flex gap-2 mt-2.5">
          <Pulse ring="rounded-xl" className="flex-1" onClick={() => abrir("editar")}>
            <button
              type="button"
              className="w-full flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-full bg-white/15"
            >
              <Film className="w-4 h-4 text-white shrink-0" />
              <span className="text-white text-xs font-semibold">Linha do tempo</span>
            </button>
          </Pulse>

          <Pulse ring="rounded-xl" className="flex-1" onClick={() => abrir("narracao")}>
            <button
              type="button"
              className="w-full flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-full bg-white/15"
            >
              <Mic className="w-4 h-4 text-white shrink-0" />
              <span className="text-white text-xs font-semibold">Narração</span>
            </button>
          </Pulse>
        </div>

        <div className="flex items-center gap-1.5 mt-2">
          <Info className="w-3.5 h-3.5 text-white/50 shrink-0" />
          <p className="text-white/50 text-[11px]">
            Toque nas ferramentas para personalizar seu vídeo.
          </p>
        </div>

        <Pulse active={target === "next"} className="w-full mt-2.5" ring="rounded-full" onClick={onNext}>
          <button type="button" className="w-full py-3 rounded-full bg-white">
            <span className="text-gray-900 text-sm font-semibold">Avançar</span>
          </button>
        </Pulse>
      </div>

      {renderPainel()}
    </div>
  );
}