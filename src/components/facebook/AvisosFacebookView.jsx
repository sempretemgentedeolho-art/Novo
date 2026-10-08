import React from "react";
import { AVISOS } from "@/components/facebook/facebookData";

// Campainha: curtidas, comentários e quem começou a seguir você
export default function AvisosFacebookView() {
  return (
    <div className="flex-1 overflow-y-auto bg-white">
      <div className="p-3">
        <h2 className="text-lg font-bold text-gray-900">Avisos</h2>
        <p className="text-xs text-gray-600 mt-0.5">
          É aqui que o Facebook avisa quem curtiu, quem comentou e quem começou a seguir você.
        </p>
      </div>

      {AVISOS.map((aviso) => (
        <div key={aviso.id} className="flex items-start gap-3 px-3 py-3 border-t border-gray-100">
          <img src={aviso.foto} alt="" className="w-12 h-12 rounded-full object-cover" />
          <div className="flex-1">
            <p className="text-sm text-gray-900 leading-snug">{aviso.texto}</p>
            <p className="text-xs text-gray-500 mt-0.5">{aviso.quando}</p>
          </div>
        </div>
      ))}
    </div>
  );
}