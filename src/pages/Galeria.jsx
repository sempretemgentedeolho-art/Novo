import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { ArrowLeft, Search, MoreVertical } from "lucide-react";
import { PhoneFrame } from "@/components/PhoneFrame";
import { StatusBar } from "@/components/StatusBar";
import galeria1 from "@/assets/imagens/galeria-1.jpg";
import galeria2 from "@/assets/imagens/galeria-2.jpg";
import galeria3 from "@/assets/imagens/galeria-3.jpg";
import galeria4 from "@/assets/imagens/galeria-4.jpg";
import galeria5 from "@/assets/imagens/galeria-5.jpg";
import galeria6 from "@/assets/imagens/galeria-6.jpg";
import galeria7 from "@/assets/imagens/galeria-7.jpg";
import galeria8 from "@/assets/imagens/galeria-8.jpg";
import galeria9 from "@/assets/imagens/galeria-9.jpg";

const photos = [
  galeria1,
  galeria2,
  galeria3,
  galeria4,
  galeria5,
  galeria6,
  galeria7,
  galeria8,
  galeria9,
];

export default function Galeria() {
  const navigate = useNavigate();

  useEffect(() => {
    const synth = window.speechSynthesis;
    if (synth) {
      synth.cancel();
      const utter = new SpeechSynthesisUtterance(
        "Aplicativo Galeria. Suas fotos e vídeos."
      );
      utter.lang = "pt-BR";
      utter.rate = 0.9;
      synth.speak(utter);
    }
    return () => window.speechSynthesis.cancel();
  }, []);

  return (
    <PhoneFrame>
      <div className="h-full bg-white flex flex-col">
        <StatusBar variant="light" />

        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex justify-between items-center mb-4">
            <button onClick={() => navigate(createPageUrl("Home"))}>
              <ArrowLeft className="w-6 h-6 text-gray-700" />
            </button>
            <div className="flex gap-3">
              <Search className="w-6 h-6 text-gray-700" />
              <MoreVertical className="w-6 h-6 text-gray-700" />
            </div>
          </div>
          <h1 className="text-2xl font-semibold text-gray-900">Galeria</h1>
        </div>

        {/* Photos Grid */}
        <div className="flex-1 overflow-y-auto p-4">
          <div className="mb-4">
            <h2 className="text-sm font-semibold text-gray-600 mb-3">Hoje</h2>
            <div className="grid grid-cols-3 gap-2">
              {photos.map((photo, index) => (
                <div
                  key={index}
                  className="aspect-square bg-gray-100 rounded-lg overflow-hidden cursor-pointer hover:opacity-80 transition-opacity"
                >
                  <img
                    src={photo}
                    alt={`Foto ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </PhoneFrame>
  );
}