import React from "react";
import { useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { ArrowLeft, Search, Bell, Menu, ThumbsUp, MessageCircle, Share2 } from "lucide-react";

const posts = [
  { author: "Maria Santos", time: "2h", content: "Que dia lindo! ☀️", likes: 45, comments: 12 },
  { author: "João Silva", time: "5h", content: "Alguém sabe um bom restaurante na região?", likes: 23, comments: 8 },
  { author: "Ana Costa", time: "1d", content: "Férias chegando! 🏖️", likes: 156, comments: 34 },
];

export default function Facebook() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <div className="relative w-full max-w-sm">
        <div className="relative bg-black rounded-[3rem] p-3 shadow-2xl">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-black rounded-b-2xl z-10"></div>
          
          <div className="relative bg-gray-100 rounded-[2.5rem] overflow-hidden aspect-[9/19]">
            {/* Header */}
            <div className="bg-blue-600 text-white p-4">
              <div className="flex justify-between items-center">
                <button onClick={() => navigate(createPageUrl("Home"))}>
                  <ArrowLeft className="w-6 h-6" />
                </button>
                <h1 className="text-xl font-bold">facebook</h1>
                <div className="flex gap-3">
                  <Search className="w-6 h-6" />
                  <Bell className="w-6 h-6" />
                  <Menu className="w-6 h-6" />
                </div>
              </div>
            </div>

            {/* Feed */}
            <div className="overflow-y-auto h-[calc(100%-130px)]">
              {/* Stories */}
              <div className="bg-white p-4 mb-2">
                <div className="flex gap-3 overflow-x-auto">
                  {["Seu story", "Maria", "João", "Ana", "Pedro"].map((name, i) => (
                    <div key={i} className="flex flex-col items-center min-w-[70px]">
                      <div className={`w-16 h-16 rounded-full ${i === 0 ? 'bg-gray-300' : 'bg-gradient-to-br from-blue-400 to-purple-600'} flex items-center justify-center mb-1`}>
                        <span className="text-2xl">{i === 0 ? "+" : "👤"}</span>
                      </div>
                      <span className="text-xs text-gray-700 truncate w-full text-center">{name}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Posts */}
              {posts.map((post, index) => (
                <div key={index} className="bg-white mb-2">
                  <div className="p-4 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white">
                      {post.author[0]}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{post.author}</h3>
                      <p className="text-xs text-gray-500">{post.time}</p>
                    </div>
                  </div>

                  <p className="px-4 pb-4 text-gray-800">{post.content}</p>

                  <div className="border-t border-gray-200 px-4 py-2 flex justify-between text-gray-600 text-sm">
                    <span>👍 {post.likes}</span>
                    <span>{post.comments} comentários</span>
                  </div>

                  <div className="border-t border-gray-200 p-3 flex justify-around">
                    <button className="flex items-center gap-2 text-gray-600">
                      <ThumbsUp className="w-5 h-5" />
                      <span className="text-sm font-medium">Curtir</span>
                    </button>
                    <button className="flex items-center gap-2 text-gray-600">
                      <MessageCircle className="w-5 h-5" />
                      <span className="text-sm font-medium">Comentar</span>
                    </button>
                    <button className="flex items-center gap-2 text-gray-600">
                      <Share2 className="w-5 h-5" />
                      <span className="text-sm font-medium">Compartilhar</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Barra Inferior */}
            <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex justify-around py-2">
              <button className="flex flex-col items-center text-blue-600">
                <span className="text-xl mb-1">🏠</span>
                <span className="text-xs">Início</span>
              </button>
              <button className="flex flex-col items-center text-gray-500">
                <span className="text-xl mb-1">👥</span>
                <span className="text-xs">Amigos</span>
              </button>
              <button className="flex flex-col items-center text-gray-500">
                <span className="text-xl mb-1">▶️</span>
                <span className="text-xs">Vídeos</span>
              </button>
              <button className="flex flex-col items-center text-gray-500">
                <span className="text-xl mb-1">🛒</span>
                <span className="text-xs">Market</span>
              </button>
              <button className="flex flex-col items-center text-gray-500">
                <span className="text-xl mb-1">🔔</span>
                <span className="text-xs">Notif.</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}