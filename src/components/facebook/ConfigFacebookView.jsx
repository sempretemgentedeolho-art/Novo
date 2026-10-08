import React from "react";
import { ChevronRight } from "lucide-react";
import { CONFIG_FACEBOOK } from "@/components/facebook/facebookData";

// A tela Configurações e privacidade do Facebook
export default function ConfigFacebookView() {
  return (
    <div className="flex-1 overflow-y-auto bg-white">
      <div className="p-3">
        <h2 className="text-lg font-bold text-gray-900">Configurações e privacidade</h2>
        <p className="text-xs text-gray-600 mt-0.5 leading-snug">
          É aqui que você manda no seu Facebook: troca a senha, escolhe quem vê o que você publica
          e bloqueia quem incomoda. Ninguém mexe aqui por você.
        </p>
      </div>

      {CONFIG_FACEBOOK.map((item) => (
        <div key={item.id} className="flex items-center gap-3 px-3 py-3 border-t border-gray-100">
          <div className="flex-1">
            <p className="text-sm font-bold text-gray-900">{item.titulo}</p>
            <p className="text-xs text-gray-600 leading-snug mt-0.5">{item.recado}</p>
          </div>
          <ChevronRight className="w-5 h-5 text-gray-400" />
        </div>
      ))}
    </div>
  );
}