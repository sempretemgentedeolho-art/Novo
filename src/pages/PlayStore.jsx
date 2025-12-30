import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { ArrowLeft, Search, Star, Download } from "lucide-react";
import { PhoneFrame } from "@/components/PhoneFrame";
import { StatusBar } from "@/components/StatusBar";

const featuredApps = [
  { name: "WhatsApp", icon: "💬", category: "Comunicação", rating: 4.2, downloads: "5 bi+", color: "bg-green-500" },
  { name: "Instagram", icon: "📸", category: "Redes sociais", rating: 4.5, downloads: "1 bi+", color: "bg-gradient-to-br from-purple-500 to-pink-500" },
  { name: "TikTok", icon: "🎵", category: "Entretenimento", rating: 4.6, downloads: "1 bi+", color: "bg-black" },
  { name: "YouTube", icon: "▶️", category: "Vídeos", rating: 4.4, downloads: "10 bi+", color: "bg-red-500" },
  { name: "Facebook", icon: "👤", category: "Redes sociais", rating: 4.0, downloads: "5 bi+", color: "bg-blue-600" },
  { name: "Spotify", icon: "🎧", category: "Música", rating: 4.5, downloads: "500 mi+", color: "bg-green-600" },
];

const categories = [
  { name: "Jogos", icon: "🎮", count: "1000+" },
  { name: "Apps", icon: "📱", count: "2000+" },
  { name: "Filmes", icon: "🎬", count: "500+" },
  { name: "Livros", icon: "📚", count: "300+" },
];

export default function PlayStore() {
  const navigate = useNavigate();

  useEffect(() => {
    const synth = window.speechSynthesis;
    if (synth) {
      synth.cancel();
      const utter = new SpeechSynthesisUtterance(
        "Play Store. Aqui você encontra aplicativos para baixar no seu celular. Aplicativos são programas que você instala para fazer diferentes coisas, como conversar, tirar fotos, jogar e muito mais."
      );
      utter.lang = "pt-BR";
      utter.rate = 0.9;
      synth.speak(utter);
    }
    return () => window.speechSynthesis.cancel();
  }, []);

  return (
    <PhoneFrame>
      <div className="h-full bg-white flex flex-col">
        <StatusBar variant="light" />

        {/* Header */}
        <div className="bg-gradient-to-r from-green-500 to-blue-500 text-white p-6 pb-4">
          <button onClick={() => navigate(createPageUrl("Home"))} className="mb-4">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-2xl font-bold mb-4">Play Store</h1>
          
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar aplicativos"
              className="w-full pl-10 pr-4 py-2 rounded-full bg-white text-gray-900 outline-none"
            />
          </div>
        </div>

        {/* Explicação */}
        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 m-4">
          <p className="text-sm text-blue-900">
            💡 <strong>O que são aplicativos?</strong> São programas que você baixa para usar no celular. Como jogos, mensagens, fotos e muito mais!
          </p>
        </div>

        {/* Categorias */}
        <div className="px-6 py-4">
          <h2 className="text-lg font-bold text-gray-900 mb-3">Categorias</h2>
          <div className="grid grid-cols-4 gap-3">
            {categories.map((cat, index) => (
              <div key={index} className="flex flex-col items-center">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center text-3xl mb-2">
                  {cat.icon}
                </div>
                <p className="text-xs font-medium text-gray-900 text-center">{cat.name}</p>
                <p className="text-[10px] text-gray-500">{cat.count}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Apps em Destaque */}
        <div className="flex-1 overflow-y-auto px-6 pb-6">
          <h2 className="text-lg font-bold text-gray-900 mb-3">Populares</h2>
          <div className="space-y-3">
            {featuredApps.map((app, index) => (
              <div
                key={index}
                className="bg-white border border-gray-200 rounded-2xl p-4 flex items-center gap-4 hover:shadow-lg transition-shadow"
              >
                <div className={`w-14 h-14 rounded-2xl ${app.color} flex items-center justify-center text-2xl shadow-md`}>
                  {app.icon}
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-gray-900">{app.name}</h3>
                  <p className="text-xs text-gray-500 mb-1">{app.category}</p>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1">
                      <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                      <span className="text-xs text-gray-600">{app.rating}</span>
                    </div>
                    <span className="text-xs text-gray-400">•</span>
                    <div className="flex items-center gap-1">
                      <Download className="w-3 h-3 text-gray-400" />
                      <span className="text-xs text-gray-600">{app.downloads}</span>
                    </div>
                  </div>
                </div>
                <button className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white text-sm font-medium rounded-full">
                  Instalar
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </PhoneFrame>
  );
}