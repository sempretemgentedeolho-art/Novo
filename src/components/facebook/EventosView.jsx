import React, { useState } from "react";
import { CalendarDays, MapPin, Users, Check } from "lucide-react";
import Pulse from "@/components/youtube/Pulse";
import { EVENTOS } from "@/components/facebook/facebookData";

// A tela Eventos: festas e encontros com data marcada
export default function EventosView({ target, onAvancar }) {
  const [vou, setVou] = useState([]);

  const alternar = (id) => {
    setVou((anteriores) =>
      anteriores.includes(id) ? anteriores.filter((x) => x !== id) : [...anteriores, id]
    );
    onAvancar("eventos_vou");
  };

  return (
    <div className="flex-1 overflow-y-auto bg-white">
      <div className="p-3">
        <h2 className="text-lg font-bold text-gray-900">Eventos</h2>
        <p className="text-xs text-gray-600 mt-0.5 leading-snug">
          Evento é uma festa, uma feira ou um encontro com dia e lugar marcados. Toque em VOU
          PARTICIPAR para avisar quem organiza, e toque de novo se mudar de ideia.
        </p>
      </div>

      {EVENTOS.map((evento, index) => (
        <div key={evento.id} className="px-3 py-3 border-t border-gray-100">
          <div className="flex gap-3">
            <img src={evento.imagem} alt="" className="w-16 h-16 rounded-xl object-cover shrink-0" />
            <div className="flex-1">
              <p className="text-sm font-bold text-gray-900 leading-snug">{evento.nome}</p>
              <p className="text-xs text-gray-700 flex items-center gap-1 mt-1">
                <CalendarDays className="w-3.5 h-3.5 shrink-0" /> {evento.quando}
              </p>
              <p className="text-xs text-gray-700 flex items-center gap-1 mt-0.5">
                <MapPin className="w-3.5 h-3.5 shrink-0" /> {evento.onde}
              </p>
              <p className="text-xs text-gray-500 flex items-center gap-1 mt-0.5">
                <Users className="w-3.5 h-3.5 shrink-0" /> {evento.pessoas}
              </p>
            </div>
          </div>

          <div className="mt-2">
            <Pulse
              active={target === "eventos_vou" && index === 0}
              ring="rounded-full"
              className="inline-flex"
            >
              <button
                onClick={() => alternar(evento.id)}
                className={`px-4 py-2 rounded-full text-sm font-bold flex items-center gap-1 ${
                  vou.includes(evento.id)
                    ? "bg-green-100 text-green-800"
                    : "bg-[#1877F2] text-white"
                }`}
              >
                {vou.includes(evento.id) && <Check className="w-4 h-4" />}
                {vou.includes(evento.id) ? "Você vai participar" : "Vou participar"}
              </button>
            </Pulse>
          </div>
        </div>
      ))}
    </div>
  );
}