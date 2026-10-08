import React from "react";
import { MapPin } from "lucide-react";
import { MERCADO } from "@/components/facebook/facebookData";

// A tela Mercado: a feirinha onde as pessoas anunciam o que vendem perto de você
export default function MercadoView() {
  return (
    <div className="flex-1 overflow-y-auto bg-gray-100">
      <div className="bg-white p-3">
        <h2 className="text-lg font-bold text-gray-900">Mercado</h2>
        <p className="text-xs text-gray-600 mt-0.5 leading-snug">
          O Mercado é como uma feirinha: as pessoas que moram perto anunciam o que querem vender,
          com o preço e a distância. Você só olha, sem compromisso nenhum.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-2 p-2">
        {MERCADO.map((item) => (
          <div key={item.id} className="bg-white rounded-xl overflow-hidden">
            <img src={item.imagem} alt="" className="w-full h-24 object-cover" />
            <div className="p-2">
              <p className="text-sm font-bold text-gray-900 leading-snug">{item.preco}</p>
              <p className="text-xs text-gray-700 leading-snug mt-0.5">{item.titulo}</p>
              <p className="text-[11px] text-gray-500 flex items-center gap-1 mt-1">
                <MapPin className="w-3 h-3 shrink-0" /> {item.cidade}
              </p>
            </div>
          </div>
        ))}
      </div>

      <p className="px-3 pb-4 pt-1 text-xs text-gray-600 leading-snug">
        Esta tela é só para você conhecer o Mercado. Nada aqui é comprado nem vendido de verdade, e
        ninguém está pedindo dinheiro para você.
      </p>
    </div>
  );
}