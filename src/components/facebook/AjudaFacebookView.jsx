import React from "react";
import { ChevronRight } from "lucide-react";
import { AJUDA_FACEBOOK } from "@/components/facebook/facebookData";

// A tela Ajuda e suporte: onde tirar dúvidas com o próprio Facebook
export default function AjudaFacebookView() {
  return (
    <div className="flex-1 overflow-y-auto bg-white">
      <div className="p-3">
        <h2 className="text-lg font-bold text-gray-900">Ajuda e suporte</h2>
        <p className="text-xs text-gray-600 mt-0.5 leading-snug">
          Ficou com dúvida? Aqui dentro tem as respostas do próprio Facebook, e também um lugar para
          avisar quando alguma coisa não funciona ou quando alguém incomoda você.
        </p>
      </div>

      {AJUDA_FACEBOOK.map((item) => (
        <div key={item.id} className="flex items-center gap-3 px-3 py-3 border-t border-gray-100">
          <div className="flex-1">
            <p className="text-sm font-bold text-gray-900">{item.titulo}</p>
            <p className="text-xs text-gray-600 leading-snug mt-0.5">{item.recado}</p>
          </div>
          <ChevronRight className="w-5 h-5 text-gray-400" />
        </div>
      ))}

      <p className="px-3 py-4 text-xs text-gray-600 leading-snug">
        Nesta tela de treino nada é enviado de verdade para o Facebook. É só para você conhecer
        onde fica cada coisa.
      </p>
    </div>
  );
}