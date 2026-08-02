import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { ArrowLeft, Phone, Delete, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export default function AppTelefone() {
  const navigate = useNavigate();
  const [number, setNumber] = useState("");

  useEffect(() => {
    const synth = window.speechSynthesis;
    if (synth) {
      synth.cancel();
      const utter = new SpeechSynthesisUtterance(
        "Este é o aplicativo Telefone. Use o teclado numérico para discar um número e toque no botão verde para ligar."
      );
      utter.lang = "pt-BR";
      utter.rate = 0.9;
      synth.speak(utter);
    }
    return () => window.speechSynthesis.cancel();
  }, []);

  const handleNumberClick = (num) => {
    if (number.length < 15) {
      setNumber(number + num);
    }
  };

  const handleDelete = () => {
    setNumber(number.slice(0, -1));
  };

  const handleCall = () => {
    if (number) {
      const synth = window.speechSynthesis;
      const utter = new SpeechSynthesisUtterance(`Ligando para ${number}`);
      utter.lang = "pt-BR";
      synth.speak(utter);
    }
  };

  const buttons = [
    "1", "2", "3",
    "4", "5", "6",
    "7", "8", "9",
    "*", "0", "#"
  ];

  return (
    <div className="min-h-[100dvh] bg-black flex items-center justify-center p-4">
      <div className="relative w-full max-w-sm">
        <div className="relative bg-black rounded-[50px] p-3 shadow-2xl">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-6 bg-black rounded-b-3xl z-10"></div>
          
          <div
            className="relative rounded-[46px] overflow-hidden bg-white"
            style={{ aspectRatio: "9/19.5" }}
          >
            {/* Header */}
            <div className="bg-green-500 text-white p-4 pt-8">
              <div className="flex items-center gap-4 mb-4">
                <button onClick={() => navigate(createPageUrl("TelaInicial"))}>
                  <ArrowLeft className="w-6 h-6" />
                </button>
                <h1 className="text-2xl font-bold">Telefone</h1>
              </div>
            </div>

            {/* Número Digitado */}
            <div className="px-6 py-8">
              <div className="text-center mb-2">
                <div className="text-4xl font-light text-gray-800 min-h-[48px] flex items-center justify-center">
                  {number || "Digite um número"}
                </div>
              </div>
            </div>

            {/* Teclado Numérico */}
            <div className="px-6 pb-6">
              <div className="grid grid-cols-3 gap-4 mb-6">
                {buttons.map((btn) => (
                  <motion.button
                    key={btn}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleNumberClick(btn)}
                    className="w-full aspect-square rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-2xl font-medium text-gray-800 transition-colors"
                  >
                    {btn}
                  </motion.button>
                ))}
              </div>

              {/* Botões de Ação */}
              <div className="flex items-center justify-between gap-4">
                <Button
                  variant="outline"
                  size="icon"
                  className="w-16 h-16 rounded-full"
                  onClick={() => navigate(createPageUrl("AppContatos"))}
                >
                  <User className="w-6 h-6" />
                </Button>

                <Button
                  onClick={handleCall}
                  disabled={!number}
                  className="w-20 h-20 rounded-full bg-green-500 hover:bg-green-600"
                >
                  <Phone className="w-8 h-8" />
                </Button>

                <Button
                  variant="outline"
                  size="icon"
                  className="w-16 h-16 rounded-full"
                  onClick={handleDelete}
                  disabled={!number}
                >
                  <Delete className="w-6 h-6" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}