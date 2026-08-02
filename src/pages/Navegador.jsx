import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { ArrowLeft, Search, RotateCw, MoreVertical, Home } from "lucide-react";
import { Input } from "@/components/ui/input";

export default function Navegador() {
  const navigate = useNavigate();
  const [url, setUrl] = useState("google.com");

  return (
    <div className="min-h-[100dvh] bg-gray-900 flex items-center justify-center p-4">
      <div className="relative w-full max-w-sm">
        <div className="relative bg-black rounded-[3rem] p-3 shadow-2xl">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-black rounded-b-2xl z-10"></div>
          
          <div className="relative bg-white rounded-[2.5rem] overflow-hidden aspect-[9/19]">
            {/* Barra de Navegação */}
            <div className="bg-indigo-500 text-white p-4">
              <div className="flex items-center gap-3 mb-3">
                <button onClick={() => navigate(createPageUrl("Home"))}>
                  <ArrowLeft className="w-6 h-6" />
                </button>
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    type="text"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    className="pl-10 bg-white rounded-full"
                  />
                </div>
                <button>
                  <MoreVertical className="w-6 h-6" />
                </button>
              </div>
            </div>

            {/* Página do Navegador */}
            <div className="p-6 overflow-y-auto h-[calc(100%-140px)] bg-gray-50">
              <div className="text-center mb-8">
                <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-500 rounded-3xl mx-auto mb-4 flex items-center justify-center">
                  <span className="text-4xl font-bold text-white">G</span>
                </div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Google</h2>
                <p className="text-gray-600">Pesquise ou digite um URL</p>
              </div>

              {/* Links Rápidos */}
              <div className="grid grid-cols-4 gap-4 mb-6">
                {["YouTube", "Gmail", "Maps", "Drive", "News", "Fotos", "Play", "Meet"].map((site) => (
                  <div key={site} className="text-center">
                    <div className="w-14 h-14 bg-white rounded-2xl shadow-sm mx-auto mb-2 flex items-center justify-center">
                      <span className="text-2xl">{site[0]}</span>
                    </div>
                    <span className="text-xs text-gray-600">{site}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Barra Inferior */}
            <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 flex justify-around">
              <button className="flex flex-col items-center gap-1">
                <Home className="w-6 h-6 text-indigo-500" />
                <span className="text-xs text-gray-600">Início</span>
              </button>
              <button className="flex flex-col items-center gap-1">
                <Search className="w-6 h-6 text-gray-400" />
                <span className="text-xs text-gray-600">Buscar</span>
              </button>
              <button className="flex flex-col items-center gap-1">
                <RotateCw className="w-6 h-6 text-gray-400" />
                <span className="text-xs text-gray-600">Abas</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}