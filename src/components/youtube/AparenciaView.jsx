import React, { useState } from "react";
import { Sun, Moon, Smartphone, ChevronRight, Check, Type } from "lucide-react";
import Pulse from "@/components/youtube/Pulse";

const TEMAS = [
  { id: "tema_claro", label: "Tema claro", sub: "Fundo branco, como está agora", icon: Sun },
  { id: "tema_escuro", label: "Tema escuro", sub: "Fundo preto, mais confortável para a vista", icon: Moon },
  { id: "tema_celular", label: "Usar o tema do celular", sub: "O YouTube fica igual ao seu aparelho", icon: Smartphone },
];

// Aparência: tema claro ou escuro e o atalho para deixar a letra maior
export default function AparenciaView({ target, onTap }) {
  const [tema, setTema] = useState("tema_claro");

  return (
    <div className="flex-1 overflow-y-auto px-4 pb-4">
      <h2 className="text-xl font-bold text-gray-900 pt-3">Aparência</h2>
      <p className="text-base text-gray-700 mt-1 mb-4 leading-snug">
        Escolha como o YouTube aparece na tela. O tema escuro tem fundo preto e letras claras.
      </p>

      <div className="space-y-2">
        {TEMAS.map((t) => {
          const Icon = t.icon;
          return (
            <Pulse key={t.id} active={target === t.id} className="w-full" ring="rounded-2xl">
              <button
                type="button"
                onClick={() => {
                  setTema(t.id);
                  onTap(t.id);
                }}
                className={`w-full flex items-center gap-3 rounded-2xl border-2 px-3 py-3 text-left ${
                  tema === t.id ? "border-red-600 bg-red-50" : "border-gray-200"
                }`}
              >
                <Icon className="w-5 h-5 text-gray-700 shrink-0" />
                <div className="flex-1">
                  <p className="text-base font-medium text-gray-900">{t.label}</p>
                  <p className="text-sm text-gray-600">{t.sub}</p>
                </div>
                {tema === t.id && <Check className="w-5 h-5 text-red-600 shrink-0" />}
              </button>
            </Pulse>
          );
        })}
      </div>

      <Pulse active={target === "letra_grande"} className="w-full mt-6" ring="rounded-2xl">
        <button
          type="button"
          onClick={() => onTap("letra_grande")}
          className="w-full flex items-center gap-3 rounded-2xl border border-gray-200 px-3 py-3 text-left"
        >
          <Type className="w-5 h-5 text-gray-700 shrink-0" />
          <div className="flex-1">
            <p className="text-base font-medium text-gray-900">Letra maior no celular</p>
            <p className="text-sm text-gray-600">Aumente o texto do YouTube e de todos os apps</p>
          </div>
          <ChevronRight className="w-5 h-5 text-gray-400 shrink-0" />
        </button>
      </Pulse>
    </div>
  );
}