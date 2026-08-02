import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { ArrowLeft, ThumbsUp, MessageCircle, Share2 } from "lucide-react";

export default function AppFacebook() {
  const navigate = useNavigate();

  useEffect(() => {
    const synth = window.speechSynthesis;
    if (!synth) return;
    synth.cancel();

    const utter = new SpeechSynthesisUtterance(
      "Este é o Facebook. Aqui você vê publicações de amigos e familiares. Toque na seta para voltar."
    );
    utter.lang = "pt-BR";
    utter.rate = 0.95;
    synth.speak(utter);
    return () => synth.cancel();
  }, []);

  const posts = [
    { nome: "Maria Silva", texto: "Que dia lindo! ☀️", likes: 45, comentarios: 12 },
    { nome: "João Santos", texto: "Alguém para um café? ☕", likes: 23, comentarios: 8 },
    { nome: "Ana Costa", texto: "Finalmente férias! 🏖️", likes: 67, comentarios: 15 },
  ];

  return (
    <div className="h-[100dvh] bg-gray-100 overflow-hidden flex flex-col">
            {/* Header Facebook */}
            <div className="bg-[#1877F2] text-white p-4 pt-8">
              <div className="flex items-center justify-between">
                <button onClick={() => navigate(createPageUrl("TelaInicial"))}>
                  <ArrowLeft className="w-6 h-6" />
                </button>
                <h1 className="text-2xl font-bold">facebook</h1>
                <div className="w-6"></div>
              </div>
            </div>

            {/* Feed */}
            <div className="overflow-y-auto" style={{ height: "calc(100% - 80px)" }}>
              {posts.map((post, idx) => (
                <div key={idx} className="bg-white mb-2 p-4">
                  {/* Cabeçalho */}
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-full bg-blue-500"></div>
                    <span className="font-semibold">{post.nome}</span>
                  </div>
                  
                  {/* Texto */}
                  <p className="mb-3 text-gray-800">{post.texto}</p>
                  
                  {/* Stats */}
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-3 pb-3 border-b">
                    <span>👍 {post.likes}</span>
                    <span>{post.comentarios} comentários</span>
                  </div>
                  
                  {/* Botões */}
                  <div className="flex items-center justify-around">
                    <button className="flex items-center gap-2 text-gray-600">
                      <ThumbsUp className="w-5 h-5" />
                      <span>Curtir</span>
                    </button>
                    <button className="flex items-center gap-2 text-gray-600">
                      <MessageCircle className="w-5 h-5" />
                      <span>Comentar</span>
                    </button>
                    <button className="flex items-center gap-2 text-gray-600">
                      <Share2 className="w-5 h-5" />
                      <span>Compartilhar</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
    </div>
  );
}