import React, { useState } from "react";
import {
  LayoutDashboard,
  BarChart3,
  ListVideo,
  Eye,
  MessageSquare,
  ThumbsUp,
  CircleDollarSign,
} from "lucide-react";
import Pulse from "@/components/youtube/Pulse";
import MonetizacaoView from "@/components/youtube/MonetizacaoView";

const ABAS = [
  { id: "studio_painel", label: "Painel", icon: LayoutDashboard },
  { id: "studio_estatisticas", label: "Estatísticas", icon: BarChart3 },
  { id: "studio_gerenciador", label: "Meus vídeos", icon: ListVideo },
  { id: "tab_monetizacao", label: "Monetização", icon: CircleDollarSign },
];

const GRAFICO = [
  { dia: "Seg", altura: "h-6" },
  { dia: "Ter", altura: "h-10" },
  { dia: "Qua", altura: "h-8" },
  { dia: "Qui", altura: "h-14" },
  { dia: "Sex", altura: "h-20" },
  { dia: "Sáb", altura: "h-12" },
  { dia: "Dom", altura: "h-16" },
];

const MEUS_VIDEOS = [
  { id: 1, titulo: "Minha primeira receita", data: "Publicado hoje", views: "128" },
  { id: 2, titulo: "Dica de como usar o celular", data: "Publicado na semana passada", views: "76" },
];

// YouTube Studio: o painel de quem publica vídeos
export default function StudioView({ target, onTab }) {
  const [aba, setAba] = useState("studio_painel");

  const abrir = (id) => {
    setAba(id);
    onTab(id);
  };

  return (
    <div className="flex-1 overflow-y-auto px-4 pb-4">
      <h2 className="text-xl font-bold text-gray-900 pt-3">YouTube Studio</h2>
      <p className="text-base text-gray-700 mt-1 mb-3 leading-snug">
        É o painel de quem publica vídeos: mostra quantas pessoas assistiram e deixa você editar o
        que já publicou.
      </p>

      <div className="flex gap-2 overflow-x-auto pb-1">
        {ABAS.map((a) => {
          const Icon = a.icon;
          return (
            <Pulse key={a.id} active={target === a.id} ring="rounded-full">
              <button
                type="button"
                onClick={() => abrir(a.id)}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-full border-2 text-sm font-semibold whitespace-nowrap shrink-0 ${
                  aba === a.id
                    ? "border-gray-900 bg-gray-900 text-white"
                    : "border-gray-200 text-gray-800"
                }`}
              >
                <Icon className="w-4 h-4" />
                {a.label}
              </button>
            </Pulse>
          );
        })}
      </div>

      {aba === "studio_estatisticas" ? (
        <div className="mt-4">
          <div className="rounded-2xl border border-gray-200 px-4 py-4">
            <p className="text-sm font-bold text-gray-500 uppercase">Últimos 28 dias</p>
            <p className="text-3xl font-bold text-gray-900 mt-1">1.240</p>
            <p className="text-base text-gray-700">pessoas assistiram aos seus vídeos</p>
          </div>

          <div className="mt-3 rounded-2xl border border-gray-200 px-4 py-4">
            <p className="text-base font-bold text-gray-900">Visualizações na semana</p>
            <div className="flex items-end justify-between gap-2 mt-3 h-24">
              {GRAFICO.map((g) => (
                <div key={g.dia} className="flex-1 flex flex-col items-center justify-end h-full">
                  <div className={`w-full rounded-t-lg bg-red-600 ${g.altura}`} />
                  <span className="text-xs text-gray-600 mt-1">{g.dia}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-3 flex gap-3">
            <div className="flex-1 rounded-2xl bg-gray-50 px-3 py-3">
              <MessageSquare className="w-5 h-5 text-gray-700" />
              <p className="text-xl font-bold text-gray-900 mt-1">18</p>
              <p className="text-sm text-gray-600">comentários</p>
            </div>
            <div className="flex-1 rounded-2xl bg-gray-50 px-3 py-3">
              <ThumbsUp className="w-5 h-5 text-gray-700" />
              <p className="text-xl font-bold text-gray-900 mt-1">54</p>
              <p className="text-sm text-gray-600">gostei</p>
            </div>
          </div>
        </div>
      ) : aba === "studio_gerenciador" ? (
        <div className="mt-4 space-y-3">
          {MEUS_VIDEOS.map((v) => (
            <div key={v.id} className="rounded-2xl border border-gray-200 px-3 py-3">
              <div className="flex items-start gap-3">
                <div className="w-16 h-12 rounded-lg bg-gradient-to-br from-orange-400 to-rose-600 shrink-0" />
                <div className="flex-1">
                  <p className="text-base font-semibold text-gray-900 leading-snug">{v.titulo}</p>
                  <p className="text-sm text-gray-600 mt-0.5">{v.data}</p>
                  <p className="text-sm text-gray-600 flex items-center gap-1 mt-1">
                    <Eye className="w-3.5 h-3.5" /> {v.views} visualizações
                  </p>
                </div>
              </div>
              <div className="flex gap-2 mt-3">
                <button
                  type="button"
                  className="px-4 py-2 rounded-full border border-gray-300 text-sm font-semibold text-gray-900"
                >
                  Editar
                </button>
                <button
                  type="button"
                  className="px-4 py-2 rounded-full border border-gray-300 text-sm font-semibold text-gray-900"
                >
                  Ver comentários
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : aba === "tab_monetizacao" ? (
        <MonetizacaoView target={target} onTap={onTab} />
      ) : (
        <div className="mt-4 space-y-3">
          <div className="rounded-2xl border border-gray-200 px-4 py-4">
            <p className="text-sm font-bold text-gray-500 uppercase">Seu último vídeo</p>
            <p className="text-base font-semibold text-gray-900 mt-1">Minha primeira receita</p>
            <div className="flex gap-4 mt-3">
              <div>
                <p className="text-2xl font-bold text-gray-900">128</p>
                <p className="text-sm text-gray-600">visualizações</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">18</p>
                <p className="text-sm text-gray-600">comentários</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">12</p>
                <p className="text-sm text-gray-600">gostei</p>
              </div>
            </div>
          </div>

          <div className="rounded-2xl bg-gray-50 px-4 py-4">
            <p className="text-base font-bold text-gray-900">Novidades do YouTube</p>
            <p className="text-base text-gray-700 mt-2 leading-snug">
              Agora você pode responder aos comentários pelo celular.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}