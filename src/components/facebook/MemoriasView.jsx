import React from "react";
import { History } from "lucide-react";
import { MEMORIAS } from "@/components/facebook/facebookData";

// A tela Memórias: o que a pessoa publicou em outros anos
export default function MemoriasView() {
  return (
    <div className="flex-1 overflow-y-auto bg-gray-100">
      <div className="bg-white p-3">
        <h2 className="text-lg font-bold text-gray-900">Memórias</h2>
        <p className="text-xs text-gray-600 mt-0.5 leading-snug">
          De vez em quando o Facebook lembra você do que publicou em outros anos. É como abrir um
          álbum de fotos antigas, sem apertar nada.
        </p>
      </div>

      {MEMORIAS.map((lembranca) => (
        <div key={lembranca.id} className="bg-white mt-2">
          <p className="px-3 pt-3 text-xs font-semibold text-[#1877F2] flex items-center gap-1">
            <History className="w-3.5 h-3.5" /> {lembranca.quando}
          </p>
          <p className="px-3 pt-1 pb-3 text-sm text-gray-900 leading-snug">{lembranca.texto}</p>
          <img src={lembranca.imagem} alt="" className="w-full h-44 object-cover" />
        </div>
      ))}

      <p className="px-3 py-4 text-xs text-gray-600 leading-snug">
        Se aparecer uma lembrança que você não quer mais ver, é só tocar nos três pontinhos da
        publicação e escolher Ocultar.
      </p>
    </div>
  );
}