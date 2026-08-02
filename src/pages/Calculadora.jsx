import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { ArrowLeft, Delete } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export default function Calculadora() {
  const navigate = useNavigate();
  const [display, setDisplay] = useState("0");
  const [previousValue, setPreviousValue] = useState(null);
  const [operation, setOperation] = useState(null);

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
    <div className="h-[100dvh] bg-white overflow-hidden flex flex-col">
            {/* Header */}
            <div className="bg-purple-500 text-white p-6 pb-4">
              <button onClick={() => navigate(createPageUrl("Home"))} className="mb-4">
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
  );
}