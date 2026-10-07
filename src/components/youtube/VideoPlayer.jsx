import React, { useState } from "react";
import { Play, ThumbsUp, Share2, Bookmark, Bell, MessageSquare, Maximize } from "lucide-react";
import Pulse from "@/components/youtube/Pulse";

// Tela do vídeo aberto: canal, curtir, salvar, compartilhar e comentários
export default function VideoPlayer({ target, compartilhado, onTap, onComentario }) {
  const [curtido, setCurtido] = useState(false);
  const [inscrito, setInscrito] = useState(false);
  const [salvo, setSalvo] = useState(false);
  const [comentarioAberto, setComentarioAberto] = useState(false);
  const [comentario, setComentario] = useState("");
  const [comentarioEnviado, setComentarioEnviado] = useState(false);

  const curtir = () => {
    setCurtido(true);
    onTap("like");
  };

  const inscrever = () => {
    setInscrito(true);
    onTap("inscrever");
  };

  const salvar = () => {
    setSalvo(true);
    onTap("salvar");
  };

  const abrirComentario = () => {
    if (!comentario) setComentario("Que receita fácil, gostei muito!");
    setComentarioAberto(true);
    onTap("comentar");
  };

  const enviarComentario = () => {
    setComentarioEnviado(true);
    setComentarioAberto(false);
    onComentario(comentario);
    onTap("enviar_comentario");
  };

  return (
    <div className="flex-1 overflow-y-auto bg-white">
      <div className="relative w-full aspect-video bg-black flex items-center justify-center">
        <div className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center">
          <Play className="w-8 h-8 text-gray-900 ml-1" fill="currentColor" />
        </div>
        <span className="absolute bottom-2 left-3 text-white text-xs">12:40 / 12:40</span>
        <div className="absolute bottom-2 right-2 z-10">
          <Pulse active={target === "telacheia_btn"} ring="rounded-lg">
            <button
              type="button"
              onClick={() => onTap("telacheia_btn")}
              className="w-9 h-9 rounded-lg bg-black/60 flex items-center justify-center"
            >
              <Maximize className="w-4 h-4 text-white" />
            </button>
          </Pulse>
        </div>
      </div>

      <div className="p-4">
        <p className="font-bold text-gray-900 text-base leading-snug">
          Receita de bolo de cenoura fácil e fofinho
        </p>
        <p className="text-xs text-gray-600 mt-1">1,2 mi de visualizações · há 2 anos</p>

        {/* Canal do vídeo e botão de inscrever */}
        <div className="mt-4 flex items-center gap-3 rounded-2xl bg-gray-50 px-3 py-3">
          <div className="w-10 h-10 rounded-full bg-orange-500 text-white text-xs font-bold flex items-center justify-center shrink-0">
            CV
          </div>
          <div className="flex-1">
            <p className="text-sm font-semibold text-gray-900">Cozinha da Vovó</p>
            <p className="text-xs text-gray-600">1,2 mi de inscritos</p>
          </div>
          <Pulse active={target === "inscrever"} ring="rounded-full">
            <button
              type="button"
              onClick={inscrever}
              className={`flex items-center gap-1 px-3 py-2 rounded-full text-xs font-bold ${
                inscrito ? "bg-gray-200 text-gray-800" : "bg-red-600 text-white"
              }`}
            >
              {inscrito ? (
                <>
                  <Bell className="w-3.5 h-3.5" />
                  Inscrito
                </>
              ) : (
                "Inscrever"
              )}
            </button>
          </Pulse>
        </div>

        {compartilhado && (
          <p className="mt-3 text-xs text-emerald-800 bg-emerald-50 rounded-xl px-3 py-2">
            Link do vídeo enviado pelo WhatsApp.
          </p>
        )}

        <div className="mt-4 flex items-center gap-5 overflow-x-auto pb-2">
          <Pulse active={target === "like"} ring="rounded-xl">
            <button type="button" onClick={curtir} className="flex flex-col items-center gap-1 px-2">
              <ThumbsUp className={`w-6 h-6 ${curtido ? "text-blue-600" : "text-gray-900"}`} />
              <span className="text-xs text-gray-700">{curtido ? "Curtido" : "Curtir"}</span>
            </button>
          </Pulse>

          <Pulse active={target === "compartilhar"} ring="rounded-xl">
            <button
              type="button"
              onClick={() => onTap("compartilhar")}
              className="flex flex-col items-center gap-1 px-2"
            >
              <Share2 className="w-6 h-6 text-gray-900" />
              <span className="text-xs text-gray-700">Compartilhar</span>
            </button>
          </Pulse>

          <Pulse active={target === "salvar"} ring="rounded-xl">
            <button type="button" onClick={salvar} className="flex flex-col items-center gap-1 px-2">
              <Bookmark
                className={`w-6 h-6 ${salvo ? "text-blue-600" : "text-gray-900"}`}
                fill={salvo ? "currentColor" : "none"}
              />
              <span className="text-xs text-gray-700">{salvo ? "Salvo" : "Salvar"}</span>
            </button>
          </Pulse>
        </div>

        {salvo && (
          <p className="mt-1 text-xs text-gray-600">Guardado na lista Assistir mais tarde.</p>
        )}

        <div className="mt-4 border-t border-gray-100 pt-4">
          <p className="text-sm font-medium text-gray-900 mb-3">Comentários</p>

          {comentarioEnviado && (
            <div className="mb-3 rounded-2xl bg-blue-50 px-3 py-3">
              <p className="text-xs font-semibold text-blue-900">Você · agora</p>
              <p className="text-xs text-gray-800 mt-1 leading-snug">{comentario}</p>
            </div>
          )}

          <p className="text-xs text-gray-600 mb-3 leading-snug">
            Maria: Fiz ontem e ficou uma delícia! Muito fácil de entender.
          </p>

          {comentarioAberto ? (
            <div className="rounded-2xl border border-gray-200 p-3">
              <textarea
                value={comentario}
                onChange={(e) => setComentario(e.target.value)}
                rows={2}
                className="w-full text-sm text-gray-900 outline-none resize-none"
              />
              <div className="flex justify-end">
                <Pulse active={target === "enviar_comentario"} ring="rounded-full">
                  <button
                    type="button"
                    onClick={enviarComentario}
                    className="px-5 py-2 rounded-full bg-blue-600 text-white text-sm font-bold"
                  >
                    Comentar
                  </button>
                </Pulse>
              </div>
            </div>
          ) : (
            <Pulse active={target === "comentar"} className="w-full" ring="rounded-2xl">
              <button
                type="button"
                onClick={abrirComentario}
                className="w-full flex items-center gap-2 rounded-2xl border border-gray-200 px-3 py-3 text-left"
              >
                <MessageSquare className="w-4 h-4 text-gray-500" />
                <span className="text-sm text-gray-500">Adicionar um comentário...</span>
              </button>
            </Pulse>
          )}

          <Pulse active={target === "ver_comentarios"} className="w-full" ring="rounded-2xl">
            <button
              type="button"
              onClick={() => onTap("ver_comentarios")}
              className="w-full mt-3 flex items-center justify-between rounded-2xl border border-gray-200 px-3 py-3 text-left"
            >
              <span className="text-sm font-medium text-gray-900">
                Ver todos os comentários
              </span>
              <span className="text-xs text-gray-600">128</span>
            </button>
          </Pulse>
        </div>
      </div>
    </div>
  );
}