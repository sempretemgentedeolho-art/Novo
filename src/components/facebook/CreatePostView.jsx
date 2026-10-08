import React from "react";
import { Check } from "lucide-react";
import Pulse from "@/components/youtube/Pulse";
import { GALERIA } from "@/components/facebook/facebookData";

// Criar uma publicação: escolher a foto, escrever a legenda e publicar
export default function CreatePostView({
  target,
  fotoEscolhida,
  legenda,
  publicado,
  onEscolherFoto,
  onMudarLegenda,
  onFocarLegenda,
  onPublicar,
  onVerNoFeed,
}) {
  if (publicado) {
    return (
      <div className="flex-1 bg-white flex flex-col items-center justify-center gap-3 p-6">
        <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
          <Check className="w-10 h-10 text-green-600" />
        </div>
        <h2 className="text-xl font-bold text-gray-900 text-center">
          Sua publicação está no ar!
        </h2>
        <p className="text-sm text-gray-600 text-center leading-snug">
          Todas as suas amizades podem ver a foto e a legenda que você escreveu. Se quiser
          apagar depois, é só tocar nos três pontinhos da publicação.
        </p>
        <Pulse active={target === "ver_publicacao"} className="w-full mt-2" ring="rounded-2xl">
          <button
            onClick={onVerNoFeed}
            className="w-full py-4 rounded-2xl bg-[#1877F2] text-white font-bold text-lg"
          >
            Ver no Feed
          </button>
        </Pulse>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto bg-gray-100">
      <div className="bg-white p-3">
        <p className="text-sm font-bold text-gray-900 mb-2">Escolha uma foto do seu celular</p>
        <Pulse active={target === "escolher_foto"} className="w-full" ring="rounded-2xl">
          <div className="grid grid-cols-3 gap-2">
            {GALERIA.map((item) => (
              <button
                key={item.id}
                onClick={() => onEscolherFoto(item.foto)}
                aria-label={`Escolher a foto ${item.nome}`}
                className={`aspect-square rounded-xl overflow-hidden border-2 ${
                  fotoEscolhida === item.foto ? "border-[#1877F2]" : "border-transparent"
                }`}
              >
                <img src={item.foto} alt={item.nome} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </Pulse>
      </div>

      <div className="bg-white mt-2 p-3">
        <p className="text-sm font-bold text-gray-900 mb-2">Escreva uma legenda</p>
        <Pulse active={target === "campo_legenda"} className="w-full" ring="rounded-2xl">
          <textarea
            value={legenda}
            onChange={(e) => onMudarLegenda(e.target.value)}
            onFocus={onFocarLegenda}
            rows={3}
            placeholder="Ex.: Bom dia a todos! Hoje o dia está lindo."
            aria-label="Escreva uma legenda"
            className="w-full rounded-2xl bg-gray-100 p-3 text-sm text-gray-900"
          />
        </Pulse>
      </div>

      <div className="p-3 pb-6">
        <Pulse active={target === "publicar_botao"} className="w-full" ring="rounded-2xl">
          <button
            onClick={onPublicar}
            className="w-full py-4 rounded-2xl bg-[#1877F2] text-white font-bold text-lg"
          >
            Publicar
          </button>
        </Pulse>
        {!fotoEscolhida && (
          <p className="text-xs text-gray-600 text-center mt-2">
            Toque numa foto acima para escolher. Se tocar em Publicar, vai a primeira foto.
          </p>
        )}
      </div>
    </div>
  );
}