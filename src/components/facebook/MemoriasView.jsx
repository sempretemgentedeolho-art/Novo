import React, { useState } from "react";
import { History } from "lucide-react";
import Pulse from "@/components/youtube/Pulse";
import { MEMORIAS } from "@/components/facebook/facebookData";

// A tela Memórias: o que a pessoa publicou em outros anos
export default function MemoriasView({ target, onAvancar }) {
  const [guardadas, setGuardadas] = useState([]);

  const tocar = (id) => {
    setGuardadas((anteriores) =>
      anteriores.includes(id) ? anteriores.filter((x) => x !== id) : [...anteriores, id]
    );
    onAvancar("memorias_item");
  };

  return (
    <div className="flex-1 overflow-y-auto bg-gray-100">
      <div className="bg-white p-3">
        <h2 className="text-lg font-bold text-gray-900">Memórias</h2>
        <p className="text-xs text-gray-600 mt-0.5 leading-snug">
          De vez em quando o Facebook lembra você do que publicou em outros anos. É como abrir um
          álbum de fotos antigas. Toque na lembrança para guardá-la.
        </p>
      </div>

      {MEMORIAS.map((lembranca, index) => (
        <div key={lembranca.id} className="bg-white mt-2">
          <Pulse
            active={target === "memorias_item" && index === 0}
            className="w-full"
            ring="rounded-xl"
          >
            <button onClick={() => tocar(lembranca.id)} className="w-full text-left">
              <p className="px-3 pt-3 text-xs font-semibold text-[#1877F2] flex items-center gap-1">
                <History className="w-3.5 h-3.5" /> {lembranca.quando}
              </p>
              <p className="px-3 pt-1 pb-3 text-sm text-gray-900 leading-snug">{lembranca.texto}</p>
              <img src={lembranca.imagem} alt="" className="w-full h-44 object-cover" />
            </button>
          </Pulse>
          {guardadas.includes(lembranca.id) && (
            <p className="px-3 py-2 text-xs font-semibold text-[#1877F2]">
              Lembrança guardada. Você pode ver de novo quando quiser.
            </p>
          )}
        </div>
      ))}

      <p className="px-3 py-4 text-xs text-gray-600 leading-snug">
        Se aparecer uma lembrança que você não quer mais ver, é só tocar nos três pontinhos da
        publicação e escolher Ocultar.
      </p>
    </div>
  );
}