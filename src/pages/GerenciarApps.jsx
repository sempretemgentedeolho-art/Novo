import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { ArrowLeft, Search, Trash2, Info } from "lucide-react";
import { Input } from "@/components/ui/input";

const apps = [
  { name: "Chrome", size: "156 MB", icon: "🌐", category: "Navegadores" },
  { name: "Instagram", size: "234 MB", icon: "📷", category: "Redes Sociais" },
  { name: "WhatsApp", size: "189 MB", icon: "💬", category: "Mensagens" },
  { name: "YouTube", size: "312 MB", icon: "▶️", category: "Vídeos" },
  { name: "Spotify", size: "278 MB", icon: "🎵", category: "Música" },
  { name: "Gmail", size: "145 MB", icon: "📧", category: "Email" },
  { name: "Maps", size: "198 MB", icon: "🗺️", category: "Navegação" },
  { name: "Netflix", size: "267 MB", icon: "🎬", category: "Vídeos" },
  { name: "Uber", size: "134 MB", icon: "🚗", category: "Transporte" },
  { name: "iFood", size: "156 MB", icon: "🍔", category: "Comida" },
];

export default function GerenciarApps() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredApps = apps.filter(app => 
    app.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-[100dvh] bg-gray-900 flex items-center justify-center p-4">
      <div className="relative w-full max-w-sm">
        <div className="relative bg-black rounded-[3rem] p-3 shadow-2xl">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-black rounded-b-2xl z-10"></div>
          
          <div className="relative bg-white rounded-[2.5rem] overflow-hidden aspect-[9/19]">
            {/* Header */}
            <div className="bg-indigo-500 text-white p-6 pb-4">
              <button onClick={() => navigate(createPageUrl("Configuracoes"))} className="mb-4">
                <ArrowLeft className="w-6 h-6" />
              </button>
              <h1 className="text-2xl font-bold mb-4">Gerenciar Aplicativos</h1>
              
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Buscar aplicativo"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-white/20 border-white/30 text-white placeholder:text-white/70"
                />
              </div>
            </div>

            {/* Estatísticas */}
            <div className="grid grid-cols-3 gap-3 p-4 bg-gray-50">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">{apps.length}</div>
                <div className="text-xs text-gray-500">Apps</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">2.1 GB</div>
                <div className="text-xs text-gray-500">Em uso</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">5.9 GB</div>
                <div className="text-xs text-gray-500">Livre</div>
              </div>
            </div>

            {/* Lista de Apps */}
            <div className="overflow-y-auto h-[calc(100%-240px)]">
              {filteredApps.map((app, index) => (
                <div
                  key={index}
                  className="flex items-center gap-4 p-4 border-b border-gray-100 hover:bg-gray-50"
                >
                  <div className="text-3xl">{app.icon}</div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-gray-900 truncate">{app.name}</h3>
                    <p className="text-sm text-gray-500">{app.size} • {app.category}</p>
                  </div>
                  <div className="flex gap-2">
                    <button className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center">
                      <Info className="w-4 h-4 text-gray-600" />
                    </button>
                    <button className="w-8 h-8 rounded-full bg-red-100 hover:bg-red-200 flex items-center justify-center">
                      <Trash2 className="w-4 h-4 text-red-600" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}