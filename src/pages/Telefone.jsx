import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { ArrowLeft, Phone, Delete, User, MoreVertical, Ban, Clock, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { PhoneFrame } from "@/components/PhoneFrame";
import { StatusBar } from "@/components/StatusBar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function Telefone() {
  const navigate = useNavigate();
  const [number, setNumber] = useState("");
  const [showBlockDialog, setShowBlockDialog] = useState(false);
  const [blockNumber, setBlockNumber] = useState("");
  const [blockedNumbers, setBlockedNumbers] = useState([
    { number: "(11) 99999-8888", reason: "Spam" },
    { number: "(11) 98888-7777", reason: "Telemarketing" },
  ]);

  useEffect(() => {
    const synth = window.speechSynthesis;
    if (synth) {
      synth.cancel();
      const utter = new SpeechSynthesisUtterance(
        "Aplicativo Telefone. Aqui é para fazer ligações. Digite o número para ligar. Você também pode bloquear números indesejados no menu de três pontinhos."
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
      const synth = window.speechSynthesis;
      if (synth) {
        synth.cancel();
        const utter = new SpeechSynthesisUtterance(num);
        utter.lang = "pt-BR";
        utter.rate = 0.8;
        synth.speak(utter);
      }
    }
  };

  const handleDelete = () => {
    setNumber(number.slice(0, -1));
  };

  const handleCall = () => {
    if (number) {
      const synth = window.speechSynthesis;
      if (synth) {
        synth.cancel();
        const utter = new SpeechSynthesisUtterance(`Ligando para ${number}`);
        utter.lang = "pt-BR";
        utter.rate = 0.9;
        synth.speak(utter);
      }
      alert(`Ligando para ${number}...`);
    }
  };

  const handleBlockNumber = () => {
    const synth = window.speechSynthesis;
    if (synth) {
      synth.cancel();
      const utter = new SpeechSynthesisUtterance(
        "Bloquear Números. Aqui você pode bloquear números de telefone indesejados, como vendedores chatos ou golpistas. Números bloqueados não conseguem mais te ligar. Digite o número que você quer bloquear."
      );
      utter.lang = "pt-BR";
      utter.rate = 0.9;
      synth.speak(utter);
    }
    setShowBlockDialog(true);
  };

  const handleSaveBlock = () => {
    if (!blockNumber) {
      alert("Digite o número que deseja bloquear.");
      return;
    }

    setBlockedNumbers([...blockedNumbers, { number: blockNumber, reason: "Bloqueado manualmente" }]);
    setBlockNumber("");
    setShowBlockDialog(false);

    const synth = window.speechSynthesis;
    if (synth) {
      synth.cancel();
      const utter = new SpeechSynthesisUtterance(
        `Número ${blockNumber} bloqueado com sucesso! Este número não pode mais te ligar. Você está protegido.`
      );
      utter.lang = "pt-BR";
      utter.rate = 0.9;
      synth.speak(utter);
    }
  };

  const handleUnblock = (number) => {
    if (confirm(`Deseja desbloquear o número ${number}?`)) {
      setBlockedNumbers(blockedNumbers.filter(b => b.number !== number));
      const synth = window.speechSynthesis;
      if (synth) {
        synth.cancel();
        const utter = new SpeechSynthesisUtterance(`Número ${number} desbloqueado.`);
        utter.lang = "pt-BR";
        utter.rate = 0.9;
        synth.speak(utter);
      }
    }
  };

  const buttons = [
    "1", "2", "3",
    "4", "5", "6",
    "7", "8", "9",
    "*", "0", "#"
  ];

  return (
    <PhoneFrame>
      <div className="h-full bg-white flex flex-col">
        <StatusBar variant="light" />

        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex justify-between items-center mb-2">
            <button onClick={() => navigate(createPageUrl("Home"))}>
              <ArrowLeft className="w-6 h-6 text-gray-700" />
            </button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="w-10 h-10 rounded-full hover:bg-gray-100 flex items-center justify-center">
                  <MoreVertical className="w-6 h-6 text-gray-700" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={handleBlockNumber}>
                  <Ban className="w-4 h-4 mr-2" />
                  Bloquear números
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => alert("Histórico de chamadas")}>
                  <Clock className="w-4 h-4 mr-2" />
                  Histórico
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => alert("Configurações")}>
                  <Settings className="w-4 h-4 mr-2" />
                  Configurações
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <h1 className="text-2xl font-semibold text-gray-900">Telefone</h1>
        </div>

        {/* Dica */}
        <div className="bg-green-50 border-l-4 border-green-500 p-4 m-4">
          <p className="text-sm text-green-900">
            💡 <strong>Dica:</strong> Use o menu de três pontinhos para bloquear números indesejados. Proteja-se de vendedores chatos e golpistas!
          </p>
        </div>

        {/* Display */}
        <div className="px-6 py-12 text-center flex-1">
          <div className="text-4xl font-light text-gray-900 min-h-[48px]">
            {number || "Digite um número"}
          </div>
        </div>

        {/* Keypad */}
        <div className="px-8 pb-8">
          <div className="grid grid-cols-3 gap-4 mb-6">
            {buttons.map((btn) => (
              <motion.button
                key={btn}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleNumberClick(btn)}
                className="aspect-square rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-2xl font-medium text-gray-900 transition-colors"
              >
                {btn}
              </motion.button>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-between gap-4">
            <Button
              variant="outline"
              size="icon"
              className="w-14 h-14 rounded-full"
              onClick={() => navigate(createPageUrl("Contatos"))}
            >
              <User className="w-6 h-6" />
            </Button>

            <Button
              onClick={handleCall}
              disabled={!number}
              className="w-20 h-20 rounded-full bg-green-600 hover:bg-green-700 disabled:bg-gray-300"
            >
              <Phone className="w-8 h-8" />
            </Button>

            <Button
              variant="outline"
              size="icon"
              className="w-14 h-14 rounded-full"
              onClick={handleDelete}
              disabled={!number}
            >
              <Delete className="w-6 h-6" />
            </Button>
          </div>
        </div>
      </div>

      {/* Dialog de Bloquear Número */}
      <Dialog open={showBlockDialog} onOpenChange={setShowBlockDialog}>
        <DialogContent className="sm:max-w-md max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Bloquear Números</DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            {/* Explicação */}
            <div className="bg-orange-50 border-l-4 border-orange-500 p-4 rounded-r-xl">
              <p className="text-sm text-orange-900">
                🛡️ <strong>Importante:</strong> Bloqueie números de vendedores chatos, golpistas e pessoas indesejadas. Números bloqueados não conseguem mais te ligar. Você fica protegido!
              </p>
            </div>

            {/* Adicionar Número */}
            <div>
              <Label htmlFor="block-number">Número para Bloquear</Label>
              <Input
                id="block-number"
                value={blockNumber}
                onChange={(e) => setBlockNumber(e.target.value)}
                placeholder="(00) 00000-0000"
                className="mt-2 text-lg"
              />
              <p className="text-xs text-gray-500 mt-1">
                💡 Digite o número completo com DDD
              </p>
            </div>

            {/* Números Bloqueados */}
            <div>
              <h3 className="text-sm font-semibold text-gray-600 mb-3">NÚMEROS BLOQUEADOS</h3>
              {blockedNumbers.length === 0 ? (
                <p className="text-sm text-gray-500 text-center py-4">
                  Nenhum número bloqueado ainda
                </p>
              ) : (
                <div className="space-y-2 max-h-60 overflow-y-auto">
                  {blockedNumbers.map((blocked, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                    >
                      <div className="flex-1">
                        <p className="font-medium text-gray-900">{blocked.number}</p>
                        <p className="text-xs text-gray-500">{blocked.reason}</p>
                      </div>
                      <button
                        onClick={() => handleUnblock(blocked.number)}
                        className="px-3 py-1 text-sm text-red-600 hover:bg-red-50 rounded-lg"
                      >
                        Desbloquear
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowBlockDialog(false)}>
              Fechar
            </Button>
            <Button 
              onClick={handleSaveBlock}
              className="bg-red-500 hover:bg-red-600"
              disabled={!blockNumber}
            >
              Bloquear
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </PhoneFrame>
  );
}