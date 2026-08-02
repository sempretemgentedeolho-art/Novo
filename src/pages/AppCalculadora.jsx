import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";

export default function AppCalculadora() {
  const navigate = useNavigate();
  const [display, setDisplay] = useState("0");
  const [previousValue, setPreviousValue] = useState(null);
  const [operation, setOperation] = useState(null);

  useEffect(() => {
    const synth = window.speechSynthesis;
    if (synth) {
      synth.cancel();
      const utter = new SpeechSynthesisUtterance(
        "Este é o aplicativo Calculadora. Use os botões para fazer contas de somar, subtrair, multiplicar e dividir."
      );
      utter.lang = "pt-BR";
      utter.rate = 0.9;
      synth.speak(utter);
    }
    return () => window.speechSynthesis.cancel();
  }, []);

  const handleNumber = (num) => {
    setDisplay(display === "0" ? num : display + num);
  };

  const handleOperation = (op) => {
    setPreviousValue(parseFloat(display));
    setOperation(op);
    setDisplay("0");
  };

  const handleEquals = () => {
    if (previousValue !== null && operation) {
      const current = parseFloat(display);
      let result;
      switch (operation) {
        case "+": result = previousValue + current; break;
        case "-": result = previousValue - current; break;
        case "×": result = previousValue * current; break;
        case "÷": result = previousValue / current; break;
        default: return;
      }
      setDisplay(result.toString());
      setPreviousValue(null);
      setOperation(null);
    }
  };

  const handleClear = () => {
    setDisplay("0");
    setPreviousValue(null);
    setOperation(null);
  };

  const buttons = [
    { label: "C", action: handleClear, className: "bg-red-100 text-red-600" },
    { label: "( )", className: "bg-gray-100" },
    { label: "%", className: "bg-gray-100" },
    { label: "÷", action: () => handleOperation("÷"), className: "bg-purple-100 text-purple-600" },
    { label: "7", action: () => handleNumber("7") },
    { label: "8", action: () => handleNumber("8") },
    { label: "9", action: () => handleNumber("9") },
    { label: "×", action: () => handleOperation("×"), className: "bg-purple-100 text-purple-600" },
    { label: "4", action: () => handleNumber("4") },
    { label: "5", action: () => handleNumber("5") },
    { label: "6", action: () => handleNumber("6") },
    { label: "-", action: () => handleOperation("-"), className: "bg-purple-100 text-purple-600" },
    { label: "1", action: () => handleNumber("1") },
    { label: "2", action: () => handleNumber("2") },
    { label: "3", action: () => handleNumber("3") },
    { label: "+", action: () => handleOperation("+"), className: "bg-purple-100 text-purple-600" },
    { label: "0", action: () => handleNumber("0"), className: "col-span-2" },
    { label: ".", action: () => handleNumber(".") },
    { label: "=", action: handleEquals, className: "bg-purple-500 text-white" },
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
            <div className="bg-purple-500 text-white p-4 pt-8">
              <button onClick={() => navigate(createPageUrl("TelaInicial"))} className="mb-4">
                <ArrowLeft className="w-6 h-6" />
              </button>
              <h1 className="text-2xl font-bold">Calculadora</h1>
            </div>

            {/* Display */}
            <div className="p-6 bg-gray-50">
              <div className="text-right">
                {operation && <div className="text-gray-400 text-lg mb-1">{previousValue} {operation}</div>}
                <div className="text-5xl font-light text-gray-800 break-all">{display}</div>
              </div>
            </div>

            {/* Botões */}
            <div className="p-4 grid grid-cols-4 gap-3">
              {buttons.map((btn, index) => (
                <motion.button
                  key={index}
                  whileTap={{ scale: 0.95 }}
                  onClick={btn.action}
                  className={`
                    ${btn.className || 'bg-white'} 
                    ${btn.label === "0" ? 'col-span-2' : ''}
                    h-16 rounded-2xl text-xl font-medium shadow-sm hover:shadow-md transition-all
                  `}
                >
                  {btn.label}
                </motion.button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}