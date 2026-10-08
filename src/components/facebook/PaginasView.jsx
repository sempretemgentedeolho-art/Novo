import React, { useState } from "react";
import { Flag, Check } from "lucide-react";
import Pulse from "@/components/youtube/Pulse";
import { PAGINAS } from "@/components/facebook/facebookData";

// A tela Páginas: as lojas e páginas que a pessoa acompanha
export default function PaginasView({ target, onAvancar }) {
  const [paginas, setPaginas] = useState(PAGINAS);

  const alternar = (id) => {
    setPaginas((anteriores) =>
      anteriores.map((pagina) =>
        pagina.id === id ? { ...pagina, seguindo: !pagina.seguindo } : pagina
      )
    );
    onAvancar("paginas_seguir");
  };

  return (
    <div className="flex-1 overflow-y-auto bg-white">
      <div className="p-3">
        <h2 className="text-lg font-bold text-gray-900">Páginas</h2>
        <p className="text-xs text-gray-600 mt-0.5 leading-snug">
          Página é como um perfil de uma loja, de um grupo musical ou de um restaurante. Quando você
          segue uma página, o que ela publica aparece para você no Início.
        </p>
      </div>

      {paginas.map((pagina, index) => (
        <div key={pagina.id} className="flex items-center gap-3 px-3 py-3 border-t border-gray-100">
          <img src={pagina.imagem} alt="" className="w-14 h-14 rounded-full object-cover" />
          <div className="flex-1">
            <p className="text-sm font-bold text-gray-900 flex items-center gap-1">
              <Flag className="w-3.5 h-3.5 text-[#1877F2]" /> {pagina.nome}
            </p>
            <p className="text-xs text-gray-600 leading-snug mt-0.5">{pagina.sobre}</p>
            <div className="mt-1.5">
              <Pulse
                active={target === "paginas_seguir" && index === 1}
                ring="rounded-full"
                className="inline-flex"
              >
                <button
                  onClick={() => alternar(pagina.id)}
                  className={`px-3 py-1.5 rounded-full text-sm font-semibold flex items-center gap-1 ${
                    pagina.seguindo
                      ? "bg-green-100 text-green-800"
                      : "bg-[#1877F2] text-white"
                  }`}
                >
                  {pagina.seguindo && <Check className="w-4 h-4" />}
                  {pagina.seguindo ? "Seguindo" : "Seguir"}
                </button>
              </Pulse>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}