import React, { useState } from "react";
import { ChevronRight } from "lucide-react";
import Pulse from "@/components/youtube/Pulse";
import { CONFIG_FACEBOOK } from "@/components/facebook/facebookData";

// A tela Configurações e privacidade do Facebook
export default function ConfigFacebookView({ target, onAvancar }) {
  const [abertoId, setAbertoId] = useState(null);

  const tocar = (id) => {
    setAbertoId((atual) => (atual === id ? null : id));
    onAvancar("config_item");
  };

  return (
    <div className="flex-1 overflow-y-auto bg-white">
      <div className="p-3">
        <h2 className="text-lg font-bold text-gray-900">Configurações e privacidade</h2>
        <p className="text-xs text-gray-600 mt-0.5 leading-snug">
          É aqui que você manda no seu Facebook: troca a senha, escolhe quem vê o que você publica
          e bloqueia quem incomoda. Toque em um item para saber o que ele faz.
        </p>
      </div>

      {CONFIG_FACEBOOK.map((item, index) => {
        const aberto = abertoId === item.id;
        return (
          <Pulse
            key={item.id}
            active={target === "config_item" && index === 0}
            className="w-full"
            ring="rounded-xl"
          >
            <button
              onClick={() => tocar(item.id)}
              className="w-full flex items-start gap-3 px-3 py-3 border-t border-gray-100 text-left"
            >
              <div className="flex-1">
                <p className="text-sm font-bold text-gray-900">{item.titulo}</p>
                <p className="text-xs text-gray-600 leading-snug mt-0.5">{item.recado}</p>
                {aberto && (
                  <p className="text-xs text-gray-800 leading-snug mt-1 bg-blue-50 rounded-lg p-2">
                    {item.detalhe}
                  </p>
                )}
              </div>
              <ChevronRight
                className={`w-5 h-5 text-gray-400 shrink-0 transition-transform ${
                  aberto ? "rotate-90" : ""
                }`}
              />
            </button>
          </Pulse>
        );
      })}
    </div>
  );
}