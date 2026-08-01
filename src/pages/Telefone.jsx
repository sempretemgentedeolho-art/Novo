import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { ArrowLeft, Phone, Delete, User, MoreVertical, Ban, Clock, Settings, Search } from "lucide-react";
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

// Contatos de exemplo
const CONTACTS = [
  { name: "Maria Silva", number: "(11) 98123-4567" },
  { name: "João Santos", number: "(11) 97777-8888" },
  { name: "Ana Costa", number: "(11) 96666-5555" },
  { name: "Pedro Oliveira", number: "(11) 95555-4444" },
  { name: "Clara Mendes", number: "(11) 94444-3333" },
];

// Sequência do tutorial: cada etapa tem um alvo que pisca.
const STEPS = [
  {
    id: "intro",
    text: "Bem-vindo ao aplicativo Telefone! Aqui é onde você faz ligações. No meio da tela tem um teclado com números. Toque no número um que está piscando para começar a digitar o telefone.",
    target: "keypad",
  },
  {
    id: "typed",
    text: "Muito bem! Você digitou um número. Agora, lá embaixo no meio, tem um botão verde grande com o desenho de um telefone. Toque nele para fazer a ligação.",
    target: "call",
  },
  {
    id: "called",
    text: "Muito bem! Você ligou e ligou! Agora vou te ensinar a apagar um número se você digitar errado. Lá embaixo, do lado direito, tem um botão com uma setinha para trás. Toque nele.",
    target: "delete",
  },
  {
    id: "deleted",
    text: "Muito bem! O número foi apagado. Agora vou te ensinar a ligar para alguém que já está salvo no seu celular. Lá embaixo, do lado esquerdo, tem um botão com o desenho de uma pessoa. Toque nele para ver seus contatos.",
    target: "contacts",
  },
  {
    id: "contacts_open",
    text: "Estes são seus contatos, as pessoas salvas no seu celular. Toque em um dos contatos que está piscando para ligar para ele.",
    target: "contacts_list",
  },
  {
    id: "contact_selected",
    text: "Muito bem! O número do contato apareceu na tela. Agora toque no botão verde com o telefone que está piscando para fazer a ligação.",
    target: "call",
  },
  {
    id: "called2",
    text: "Muito bem! Você ligou e ligou! Agora vou te ensinar a bloquear números indesejados, como vendedores chatos ou golpistas. Lá em cima, do lado direito, tem três pontinhos que estão piscando. Toque neles.",
    target: "menu",
  },
  {
    id: "menu_open",
    text: "Muito bem! Este é o menu. Aqui você pode bloquear números, ver o histórico de chamadas e mudar as configurações. Parabéns! Você aprendeu a usar o Telefone! Toque na seta no canto esquerdo em cima para voltar.",
    target: "back",
  },
];

export default function Telefone() {
  const navigate = useNavigate();
  const [number, setNumber] = useState("");
  const [stepIndex, setStepIndex] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [showBlockDialog, setShowBlockDialog] = useState(false);
  const [blockNumber, setBlockNumber] = useState("");
  const [blockedNumbers, setBlockedNumbers] = useState([
    { number: "(11) 99999-8888", reason: "Spam" },
    { number: "(11) 98888-7777", reason: "Telemarketing" },
  ]);

  const currentStep = STEPS[stepIndex];

  // Narração da etapa atual — dispara automaticamente ao mudar de etapa
  useEffect(() => {
    const synth = window.speechSynthesis;
    if (synth) {
      synth.cancel();
      const utter = new SpeechSynthesisUtterance(currentStep.text);
      utter.lang = "pt-BR";
      utter.rate = 0.82;
      synth.speak(utter);
    }
    return () => window.speechSynthesis.cancel();
  }, [stepIndex]);

  const goNext = () => {
    setStepIndex((i) => Math.min(i + 1, STEPS.length - 1));
  };

  const speak = (text) => {
    const synth = window.speechSynthesis;
    if (synth) {
      synth.cancel();
      const utter = new SpeechSynthesisUtterance(text);
      utter.lang = "pt-BR";
      utter.rate = 0.82;
      synth.speak(utter);
    }
  };

  const handleNumberClick = (num) => {
    if (currentStep.target !== "keypad") return;
    setNumber(number + num);
    speak(num);
    goNext();
  };

  const handleDelete = () => {
    if (currentStep.target !== "delete") return;
    setNumber(number.slice(0, -1));
    goNext();
  };

  const handleCall = () => {
    if (currentStep.target !== "call") return;
    speak("Ligando!");
    goNext();
  };

  const handleContacts = () => {
    if (currentStep.target !== "contacts") return;
    goNext();
  };

  const handleContactClick = (contact) => {
    if (currentStep.target !== "contacts_list") return;
    setNumber(contact.number);
    speak(contact.name);
    goNext();
  };

  const handleMenu = () => {
    if (currentStep.target !== "menu") return;
    setMenuOpen(true);
    goNext();
  };

  const handleBack = () => {
    if (currentStep.target !== "back") return;
    navigate(createPageUrl("Home"));
  };

  const handleBlockNumber = () => {
    setMenuOpen(false);
    speak(
      "Bloquear Números. Aqui você pode bloquear números de telefone indesejados, como vendedores chatos ou golpistas. Números bloqueados não conseguem mais te ligar. Digite o número que você quer bloquear."
    );
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
    speak(`Número ${blockNumber} bloqueado com sucesso! Este número não pode mais te ligar. Você está protegido.`);
  };

  const handleUnblock = (number) => {
    if (confirm(`Deseja desbloquear o número ${number}?`)) {
      setBlockedNumbers(blockedNumbers.filter(b => b.number !== number));
      speak(`Número ${number} desbloqueado.`);
    }
  };

  const buttons = [
    "1", "2", "3",
    "4", "5", "6",
    "7", "8", "9",
    "*", "0", "#"
  ];

  // Halo pulsante (overlay) — não interfere em refs/clicks do botão
  const Halo = ({ active, children, className = "" }) => (
    <div className={`relative ${className}`}>
      {active && (
        <motion.div
          animate={{ scale: [1, 1.5, 1.5], opacity: [0.7, 0.2, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeOut" }}
          className="absolute -inset-2 rounded-full bg-yellow-400 z-0 pointer-events-none"
        />
      )}
      <motion.div
        animate={active ? { scale: [1, 1.12, 1] } : {}}
        transition={active ? { repeat: Infinity, duration: 1, ease: "easeInOut" } : {}}
        className="relative z-10"
      >
        {children}
      </motion.div>
    </div>
  );

  const showContactsPanel = currentStep.target === "contacts_list";

  return (
    <PhoneFrame>
      <div className="h-full bg-white flex flex-col">
        <StatusBar variant="light" />

        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex justify-between items-center mb-2">
            <Halo active={currentStep.target === "back"}>
              <button onClick={handleBack}>
                <ArrowLeft className="w-6 h-6 text-gray-700" />
              </button>
            </Halo>

            {/* Menu 3 pontinhos — Halo fora do DropdownMenuTrigger para não quebrar o asChild */}
            <div className="relative">
              {currentStep.target === "menu" && (
                <motion.div
                  animate={{ scale: [1, 1.5, 1.5], opacity: [0.7, 0.2, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5, ease: "easeOut" }}
                  className="absolute -inset-1 rounded-full bg-yellow-400 z-0 pointer-events-none"
                />
              )}
              <DropdownMenu open={menuOpen} onOpenChange={setMenuOpen}>
                <DropdownMenuTrigger asChild>
                  <motion.button
                    animate={currentStep.target === "menu" ? { scale: [1, 1.12, 1] } : {}}
                    transition={currentStep.target === "menu" ? { repeat: Infinity, duration: 1, ease: "easeInOut" } : {}}
                    onClick={handleMenu}
                    className="relative z-10 w-10 h-10 rounded-full hover:bg-gray-100 flex items-center justify-center"
                  >
                    <MoreVertical className="w-6 h-6 text-gray-700" />
                  </motion.button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={handleBlockNumber}>
                    <Ban className="w-4 h-4 mr-2" />
                    Bloquear números
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => { setMenuOpen(false); alert("Histórico de chamadas"); }}>
                    <Clock className="w-4 h-4 mr-2" />
                    Histórico
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => { setMenuOpen(false); alert("Configurações"); }}>
                    <Settings className="w-4 h-4 mr-2" />
                    Configurações
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
          <h1 className="text-2xl font-semibold text-gray-900">Telefone</h1>
        </div>

        {/* Painel de Contatos (overlay dentro da tela) */}
        {showContactsPanel && (
          <div className="absolute inset-0 top-0 z-40 bg-white flex flex-col">
            <StatusBar variant="light" />
            <div className="px-6 py-4 border-b border-gray-200 flex items-center gap-3">
              <User className="w-6 h-6 text-gray-700" />
              <h2 className="text-xl font-semibold text-gray-900">Seus Contatos</h2>
            </div>
            <div className="flex-1 overflow-y-auto px-4 py-3 space-y-2">
              {CONTACTS.map((contact, index) => (
                <div key={index} className="relative">
                  {index === 0 && (
                    <motion.div
                      animate={{ scale: [1, 1.3, 1.3], opacity: [0.7, 0.2, 0] }}
                      transition={{ repeat: Infinity, duration: 1.5, ease: "easeOut" }}
                      className="absolute -inset-1 rounded-2xl bg-yellow-400 z-0 pointer-events-none"
                    />
                  )}
                  <motion.button
                    animate={index === 0 ? { scale: [1, 1.05, 1] } : {}}
                    transition={index === 0 ? { repeat: Infinity, duration: 1, ease: "easeInOut" } : {}}
                    onClick={() => handleContactClick(contact)}
                    className="relative z-10 w-full flex items-center gap-3 p-3 rounded-2xl bg-gray-50 hover:bg-gray-100 text-left"
                  >
                    <div className="w-12 h-12 rounded-full bg-blue-500 text-white flex items-center justify-center text-lg font-semibold">
                      {contact.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{contact.name}</p>
                      <p className="text-sm text-gray-500">{contact.number}</p>
                    </div>
                  </motion.button>
                </div>
              ))}
            </div>
          </div>
        )}

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
              <Halo key={btn} active={currentStep.target === "keypad" && btn === "1"}>
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleNumberClick(btn)}
                  className="aspect-square rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-2xl font-medium text-gray-900 transition-colors"
                >
                  {btn}
                </motion.button>
              </Halo>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-between gap-4">
            <Halo active={currentStep.target === "contacts"}>
              <Button
                variant="outline"
                size="icon"
                className="w-14 h-14 rounded-full"
                onClick={handleContacts}
              >
                <User className="w-6 h-6" />
              </Button>
            </Halo>

            <Halo active={currentStep.target === "call"}>
              <Button
                onClick={handleCall}
                className="w-20 h-20 rounded-full bg-green-600 hover:bg-green-700"
              >
                <Phone className="w-8 h-8" />
              </Button>
            </Halo>

            <Halo active={currentStep.target === "delete"}>
              <Button
                variant="outline"
                size="icon"
                className="w-14 h-14 rounded-full"
                onClick={handleDelete}
              >
                <Delete className="w-6 h-6" />
              </Button>
            </Halo>
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