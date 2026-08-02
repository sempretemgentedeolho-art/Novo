import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { ArrowLeft, Heart, MessageCircle, Send, Bookmark } from "lucide-react";

export default function AppInstagram() {
  const navigate = useNavigate();

  useEffect(() => {
    const synth = window.speechSynthesis;
    if (!synth) return;
    synth.cancel();

    const utter = new SpeechSynthesisUtterance(
      "Este é o Instagram. Aqui você vê fotos e vídeos de amigos e pessoas que você segue. Toque na seta para voltar."
    );
    utter.lang = "pt-BR";
    utter.rate = 0.95;
    synth.speak(utter);
    return () => synth.cancel();
  }, []);

  const posts = [
    { usuario: "Maria Silva", foto: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400", likes: 245 },
    { usuario: "João Santos", foto: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400", likes: 189 },
    { usuario: "Ana Costa", foto: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400", likes: 312 },
  ];

  return (
    <div className="h-[100dvh] bg-white overflow-hidden flex flex-col">
            {/* Header Instagram */}
            <div className="bg-white border-b border-gray-200 p-4 pt-8">
              <div className="flex items-center justify-between">
                <button onClick={() => navigate(createPageUrl("TelaInicial"))}>
                  <ArrowLeft className="w-6 h-6" />
                </button>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-500 via-pink-500 to-orange-400 bg-clip-text text-transparent">
                  Instagram
                </h1>
                <div className="w-6"></div>
              </div>
            </div>

            {/* Feed */}
            <div className="overflow-y-auto" style={{ height: "calc(100% - 80px)" }}>
              {posts.map((post, idx) => (
                <div key={idx} className="mb-4 bg-white">
                  {/* Cabeçalho do post */}
                  <div className="flex items-center gap-3 p-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500"></div>
                    <span className="font-semibold text-sm">{post.usuario}</span>
                  </div>
                  
                  {/* Imagem */}
                  <img src={post.foto} alt="Post" className="w-full aspect-square object-cover" />
                  
                  {/* Botões */}
                  <div className="flex items-center gap-4 p-3">
                    <Heart className="w-6 h-6" />
                    <MessageCircle className="w-6 h-6" />
                    <Send className="w-6 h-6" />
                    <Bookmark className="w-6 h-6 ml-auto" />
                  </div>
                  
                  {/* Curtidas */}
                  <div className="px-3 pb-2">
                    <span className="font-semibold text-sm">{post.likes} curtidas</span>
                  </div>
                </div>
              ))}
            </div>
    </div>
  );
}