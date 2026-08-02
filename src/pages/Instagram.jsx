import React from "react";
import { useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { ArrowLeft, Heart, MessageCircle, Send, Bookmark, PlusSquare } from "lucide-react";

const posts = [
  { user: "viagens_incriveis", location: "Paris, França", likes: 1234, caption: "Torre Eiffel ao pôr do sol 🗼✨" },
  { user: "chef_carlos", location: "São Paulo, BR", likes: 892, caption: "Prato do dia: Risoto de cogumelos 🍄" },
  { user: "fitness_motivation", location: "Academia", likes: 2456, caption: "Treino de hoje concluído! 💪 #fitness" },
];

export default function Instagram() {
  const navigate = useNavigate();

  return (
    <div className="h-[100dvh] bg-white overflow-hidden flex flex-col">
            {/* Header */}
            <div className="border-b border-gray-200 p-4">
              <div className="flex justify-between items-center">
                <button onClick={() => navigate(createPageUrl("Home"))}>
                  <ArrowLeft className="w-6 h-6" />
                </button>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 bg-clip-text text-transparent">
                  Instagram
                </h1>
                <div className="flex gap-4">
                  <PlusSquare className="w-6 h-6" />
                  <Heart className="w-6 h-6" />
                </div>
              </div>
            </div>

            {/* Stories */}
            <div className="border-b border-gray-200 p-4">
              <div className="flex gap-4 overflow-x-auto">
                {["Seu story", "maria_s", "joao_p", "ana_costa", "pedro_23"].map((user, i) => (
                  <div key={i} className="flex flex-col items-center min-w-[70px]">
                    <div className={`w-16 h-16 rounded-full p-0.5 ${i === 0 ? 'bg-gray-300' : 'bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600'}`}>
                      <div className="w-full h-full rounded-full bg-white p-0.5">
                        <div className="w-full h-full rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center">
                          <span className="text-xl">{i === 0 ? "+" : "👤"}</span>
                        </div>
                      </div>
                    </div>
                    <span className="text-xs text-gray-700 mt-1 truncate w-full text-center">{user}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Feed */}
            <div className="overflow-y-auto h-[calc(100%-200px)]">
              {posts.map((post, index) => (
                <div key={index} className="border-b border-gray-200 mb-4">
                  {/* Post Header */}
                  <div className="p-3 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500"></div>
                      <div>
                        <h3 className="font-semibold text-sm">{post.user}</h3>
                        <p className="text-xs text-gray-500">{post.location}</p>
                      </div>
                    </div>
                    <button className="text-gray-600">⋮</button>
                  </div>

                  {/* Post Image */}
                  <div className="w-full aspect-square bg-gradient-to-br from-pink-400 via-purple-400 to-blue-400"></div>

                  {/* Post Actions */}
                  <div className="p-3">
                    <div className="flex justify-between items-center mb-2">
                      <div className="flex gap-4">
                        <Heart className="w-6 h-6" />
                        <MessageCircle className="w-6 h-6" />
                        <Send className="w-6 h-6" />
                      </div>
                      <Bookmark className="w-6 h-6" />
                    </div>

                    <p className="font-semibold text-sm mb-1">{post.likes.toLocaleString()} curtidas</p>
                    <p className="text-sm">
                      <span className="font-semibold">{post.user}</span> {post.caption}
                    </p>
                    <p className="text-gray-500 text-sm mt-1">Ver todos os comentários</p>
                    <p className="text-gray-400 text-xs mt-1">HÁ 2 HORAS</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Barra Inferior */}
            <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex justify-around py-3">
              <button className="text-gray-900">
                <span className="text-2xl">🏠</span>
              </button>
              <button className="text-gray-500">
                <span className="text-2xl">🔍</span>
              </button>
              <button className="text-gray-500">
                <span className="text-2xl">🎬</span>
              </button>
              <button className="text-gray-500">
                <span className="text-2xl">🛍️</span>
              </button>
              <button className="text-gray-500">
                <div className="w-6 h-6 rounded-full bg-gradient-to-br from-purple-500 to-pink-500"></div>
              </button>
            </div>
    </div>
  );
}