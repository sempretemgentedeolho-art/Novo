import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { ArrowLeft } from "lucide-react";
import galeria1 from "@/assets/imagens/galeria-1.jpg";
import galeria2 from "@/assets/imagens/galeria-2.jpg";
import galeria3 from "@/assets/imagens/galeria-3.jpg";
import galeria4 from "@/assets/imagens/galeria-4.jpg";
import galeria5 from "@/assets/imagens/galeria-5.jpg";
import galeria6 from "@/assets/imagens/galeria-6.jpg";

export default function AppGaleria() {
  const navigate = useNavigate();

  useEffect(() => {
    const synth = window.speechSynthesis;
    if (!synth) return;

    const utter = new SpeechSynthesisUtterance(
      "Esta é a galeria. Aqui ficam todas as suas fotos e vídeos. Toque na seta para voltar."
    );
    utter.lang = "pt-BR";
    utter.rate = 0.95;
    synth.speak(utter);
  }, []);

  const fotos = [galeria1, galeria2, galeria3, galeria4, galeria5, galeria6];

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="relative w-full max-w-sm">
        <div className="relative bg-black rounded-[50px] p-3 shadow-2xl">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-6 bg-black rounded-b-3xl z-10"></div>
          
          <div
            className="relative rounded-[46px] overflow-hidden bg-white"
            style={{ aspectRatio: "9/19.5" }}
          >
            {/* Header */}
            <div className="bg-blue-500 text-white p-4 pt-8">
              <div className="flex items-center gap-4 mb-4">
                <button onClick={() => navigate(createPageUrl("TelaInicial"))}>
                  <ArrowLeft className="w-6 h-6" />
                </button>
                <h1 className="text-2xl font-bold">Galeria</h1>
              </div>
            </div>

            {/* Grid de Fotos */}
            <div className="p-2 overflow-y-auto" style={{ height: "calc(100% - 80px)" }}>
              <div className="grid grid-cols-3 gap-1">
                {fotos.map((foto, idx) => (
                  <div key={idx} className="aspect-square bg-gray-200">
                    <img src={foto} alt={`Foto ${idx + 1}`} className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}