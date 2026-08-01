import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { ArrowLeft, Search, Phone, MessageSquare, Plus, MoreVertical, Edit, Trash2, Star, User, Camera } from "lucide-react";
import { motion } from "framer-motion";
import { PhoneFrame } from "@/components/PhoneFrame";
import { StatusBar } from "@/components/StatusBar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

const initialContacts = [
  { id: 1, name: "Ana Costa", phone: "(11) 98765-4321", email: "ana@email.com", favorite: true },
  { id: 2, name: "Carlos Silva", phone: "(11) 97654-3210", email: "carlos@email.com", favorite: false },
  { id: 3, name: "Maria Silva", phone: "(11) 99876-5432", email: "maria@email.com", favorite: true },
];

// Sequência do tutorial: cada etapa tem um alvo que pisca.
const STEPS = [
  {
    id: "intro",
    text: "Bem-vindo ao aplicativo Contatos! Aqui você guarda os números de telefone das pessoas. Cada linha é um contato, com o nome e o telefone. Agora vou te ensinar a adicionar um novo contato. Lá embaixo, do lado direito, tem um botão laranja com um sinal de mais que está piscando. Toque nele.",
    target: "add_button",
  },
  {
    id: "form",
    text: "Muito bem! Esta é a tela para criar um novo contato. Primeiro escolha onde salvar: no aparelho ou na conta Google. Depois preencha o nome e o telefone. Você também pode adicionar uma foto tocando no ícone da câmera. Preencha o nome e o telefone e depois toque no botão Salvar que vai piscar.",
    target: "form",
  },
  {
    id: "save_button",
    text: "Muito bem! Agora toque no botão Salvar que está piscando para salvar o contato.",
    target: "save_button",
  },
  {
    id: "saved",
    text: "Parabéns! Contato criado com sucesso! Agora clique na seta para voltar que está piscando para retornar aos aplicativos.",
    target: "back",
  },
];

export default function Contatos() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [contacts, setContacts] = useState(initialContacts);
  const [editingContact, setEditingContact] = useState(null);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [storageLocation, setStorageLocation] = useState("device");
  const [stepIndex, setStepIndex] = useState(0);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    birthday: "",
    notes: "",
    favorite: false,
  });

  const currentStep = STEPS[stepIndex];

  // Única fonte de narração: dispara ao mudar de etapa. Cancela qualquer fala anterior.
  useEffect(() => {
    const synth = window.speechSynthesis;
    if (synth) {
      synth.cancel();
      const utter = new SpeechSynthesisUtterance(currentStep.text);
      utter.lang = "pt-BR";
      utter.rate = 0.82;
      const timer = setTimeout(() => synth.speak(utter), 150);
      return () => {
        clearTimeout(timer);
        window.speechSynthesis.cancel();
      };
    }
  }, [stepIndex]);

  // Avança para a etapa "save_button" quando nome e telefone estiverem preenchidos
  useEffect(() => {
    if (showAddDialog && formData.name && formData.phone && currentStep.id === "form") {
      setStepIndex((i) => i + 1);
    }
  }, [formData.name, formData.phone, showAddDialog, currentStep.id]);

  const goNext = () => {
    setStepIndex((i) => Math.min(i + 1, STEPS.length - 1));
  };

  const filteredContacts = contacts
    .filter(contact => contact.name.toLowerCase().includes(searchQuery.toLowerCase()))
    .sort((a, b) => {
      if (a.favorite && !b.favorite) return -1;
      if (!a.favorite && b.favorite) return 1;
      return a.name.localeCompare(b.name);
    });

  const handleEditContact = (contact) => {
    setEditingContact(contact);
    setFormData({
      name: contact.name,
      phone: contact.phone,
      email: contact.email || "",
      address: contact.address || "",
      birthday: contact.birthday || "",
      notes: contact.notes || "",
      favorite: contact.favorite,
    });
    setShowEditDialog(true);
  };

  const handleSaveEdit = () => {
    setContacts(contacts.map(c =>
      c.id === editingContact.id
        ? { ...c, ...formData }
        : c
    ));
    setShowEditDialog(false);
    setEditingContact(null);
  };

  const handleDeleteContact = (contactId) => {
    if (confirm("Deseja realmente excluir este contato?")) {
      setContacts(contacts.filter(c => c.id !== contactId));
    }
  };

  const handleToggleFavorite = (contactId) => {
    setContacts(contacts.map(c =>
      c.id === contactId
        ? { ...c, favorite: !c.favorite }
        : c
    ));
  };

  const handleAddContact = () => {
    if (currentStep.target !== "add_button") return;
    setFormData({
      name: "",
      phone: "",
      email: "",
      address: "",
      birthday: "",
      notes: "",
      favorite: false,
    });
    setShowAddDialog(true);
    goNext();
  };

  const handleSaveNewContact = () => {
    if (!formData.name || !formData.phone) {
      alert("Por favor, preencha pelo menos o nome e o telefone.");
      return;
    }

    const newContact = {
      id: Math.max(...contacts.map(c => c.id)) + 1,
      ...formData,
    };
    setContacts([...contacts, newContact]);
    setShowAddDialog(false);
    if (currentStep.target === "save_button") {
      goNext();
    }
  };

  const handleBack = () => {
    if (currentStep.target !== "back") return;
    navigate(createPageUrl("Home"));
  };

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

  return (
    <PhoneFrame>
      <div className="h-full bg-white flex flex-col">
        <StatusBar variant="light" />

        {/* Header */}
        <div className="bg-orange-500 text-white p-6 pb-4">
          <div className="flex justify-between items-center mb-4">
            <Halo active={currentStep.target === "back"}>
              <button onClick={handleBack}>
                <ArrowLeft className="w-6 h-6" />
              </button>
            </Halo>
          </div>
          <h1 className="text-2xl font-bold mb-4">Contatos</h1>

          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar contatos"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-full bg-white/20 border border-white/30 text-white placeholder:text-white/70 outline-none"
            />
          </div>
        </div>

        {/* Lista de Contatos */}
        <div className="flex-1 overflow-y-auto">
          {filteredContacts.some(c => c.favorite) && (
            <div className="px-6 py-2 bg-gray-50 border-b border-gray-200">
              <h3 className="text-sm font-semibold text-gray-600">⭐ FAVORITOS</h3>
            </div>
          )}

          {filteredContacts.filter(c => c.favorite).map((contact) => (
            <div
              key={contact.id}
              className="flex items-center gap-4 p-4 border-b border-gray-100 hover:bg-gray-50"
            >
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center text-white font-bold text-lg">
                {contact.name[0]}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold text-gray-900 truncate">{contact.name}</h3>
                  <span className="text-yellow-500">⭐</span>
                </div>
                <p className="text-sm text-gray-500">{contact.phone}</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => alert(`Ligando para ${contact.name}...`)}
                  className="w-10 h-10 rounded-full bg-green-100 hover:bg-green-200 flex items-center justify-center"
                >
                  <Phone className="w-5 h-5 text-green-600" />
                </button>
                <button
                  onClick={() => alert(`Enviando mensagem para ${contact.name}...`)}
                  className="w-10 h-10 rounded-full bg-blue-100 hover:bg-blue-200 flex items-center justify-center"
                >
                  <MessageSquare className="w-5 h-5 text-blue-600" />
                </button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center">
                      <MoreVertical className="w-5 h-5 text-gray-600" />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem onClick={() => handleEditContact(contact)}>
                      <Edit className="w-4 h-4 mr-2" />
                      Editar
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleToggleFavorite(contact.id)}>
                      <Star className="w-4 h-4 mr-2" />
                      Remover dos favoritos
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => handleDeleteContact(contact.id)}
                      className="text-red-600"
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      Excluir
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          ))}

          {filteredContacts.filter(c => c.favorite).length > 0 && (
            <div className="px-6 py-2 bg-gray-50 border-b border-gray-200">
              <h3 className="text-sm font-semibold text-gray-600">TODOS OS CONTATOS</h3>
            </div>
          )}

          {filteredContacts.filter(c => !c.favorite).map((contact) => (
            <div
              key={contact.id}
              className="flex items-center gap-4 p-4 border-b border-gray-100 hover:bg-gray-50"
            >
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gray-400 to-gray-600 flex items-center justify-center text-white font-bold text-lg">
                {contact.name[0]}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-gray-900 truncate">{contact.name}</h3>
                <p className="text-sm text-gray-500">{contact.phone}</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => alert(`Ligando para ${contact.name}...`)}
                  className="w-10 h-10 rounded-full bg-green-100 hover:bg-green-200 flex items-center justify-center"
                >
                  <Phone className="w-5 h-5 text-green-600" />
                </button>
                <button
                  onClick={() => alert(`Enviando mensagem para ${contact.name}...`)}
                  className="w-10 h-10 rounded-full bg-blue-100 hover:bg-blue-200 flex items-center justify-center"
                >
                  <MessageSquare className="w-5 h-5 text-blue-600" />
                </button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center">
                      <MoreVertical className="w-5 h-5 text-gray-600" />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem onClick={() => handleEditContact(contact)}>
                      <Edit className="w-4 h-4 mr-2" />
                      Editar
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleToggleFavorite(contact.id)}>
                      <Star className="w-4 h-4 mr-2" />
                      Adicionar aos favoritos
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => handleDeleteContact(contact.id)}
                      className="text-red-600"
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      Excluir
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          ))}
        </div>

        {/* Botão Adicionar Contato */}
        <div className="absolute bottom-8 right-6 z-30">
          <Halo active={currentStep.target === "add_button"}>
            <button
              onClick={handleAddContact}
              className="w-14 h-14 rounded-full bg-orange-500 hover:bg-orange-600 shadow-lg flex items-center justify-center"
            >
              <Plus className="w-7 h-7 text-white" />
            </button>
          </Halo>
        </div>
      </div>

      {/* Dialog de Adicionar */}
      <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
        <DialogContent className="sm:max-w-md max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Criar Novo Contato</DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            {/* Local de Armazenamento */}
            <div>
              <Label>Onde salvar?</Label>
              <select
                value={storageLocation}
                onChange={(e) => setStorageLocation(e.target.value)}
                className="w-full mt-2 p-2 border rounded-lg"
              >
                <option value="device">📱 Aparelho</option>
                <option value="google">☁️ Conta Google</option>
              </select>
              <p className="text-xs text-gray-500 mt-1">
                💡 Salvar na conta Google permite acessar de outros aparelhos
              </p>
            </div>

            {/* Foto */}
            <div className="flex justify-center">
              <button className="w-24 h-24 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center">
                <div className="text-center">
                  <Camera className="w-8 h-8 text-gray-400 mx-auto mb-1" />
                  <span className="text-xs text-gray-500">Adicionar foto</span>
                </div>
              </button>
            </div>

            {/* Nome */}
            <div>
              <Label htmlFor="add-name">Nome *</Label>
              <Input
                id="add-name"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                placeholder="Nome completo"
                className="mt-2"
              />
            </div>

            {/* Telefone */}
            <div>
              <Label htmlFor="add-phone">Telefone *</Label>
              <Input
                id="add-phone"
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                placeholder="(00) 00000-0000"
                className="mt-2"
              />
            </div>

            {/* Email */}
            <div>
              <Label htmlFor="add-email">Email</Label>
              <Input
                id="add-email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                placeholder="email@exemplo.com"
                className="mt-2"
              />
            </div>

            {/* Endereço */}
            <div>
              <Label htmlFor="add-address">Endereço</Label>
              <Input
                id="add-address"
                value={formData.address}
                onChange={(e) => setFormData({...formData, address: e.target.value})}
                placeholder="Rua, número, bairro"
                className="mt-2"
              />
            </div>

            {/* Aniversário */}
            <div>
              <Label htmlFor="add-birthday">Aniversário</Label>
              <Input
                id="add-birthday"
                type="date"
                value={formData.birthday}
                onChange={(e) => setFormData({...formData, birthday: e.target.value})}
                className="mt-2"
              />
            </div>

            {/* Observações */}
            <div>
              <Label htmlFor="add-notes">Observações</Label>
              <Input
                id="add-notes"
                value={formData.notes}
                onChange={(e) => setFormData({...formData, notes: e.target.value})}
                placeholder="Notas adicionais"
                className="mt-2"
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAddDialog(false)}>
              Cancelar
            </Button>
            <div className="relative">
              {currentStep.target === "save_button" && (
                <motion.div
                  animate={{ scale: [1, 1.5, 1.5], opacity: [0.7, 0.2, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5, ease: "easeOut" }}
                  className="absolute -inset-2 rounded-full bg-yellow-400 z-0 pointer-events-none"
                />
              )}
              <motion.div
                animate={currentStep.target === "save_button" ? { scale: [1, 1.12, 1] } : {}}
                transition={currentStep.target === "save_button" ? { repeat: Infinity, duration: 1, ease: "easeInOut" } : {}}
                className="relative z-10"
              >
                <Button
                  onClick={handleSaveNewContact}
                  className="bg-orange-500 hover:bg-orange-600"
                  disabled={!formData.name || !formData.phone}
                >
                  Salvar
                </Button>
              </motion.div>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialog de Edição */}
      <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
        <DialogContent className="sm:max-w-md max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Editar Contato</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="edit-name">Nome</Label>
              <Input
                id="edit-name"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                placeholder="Nome completo"
              />
            </div>
            <div>
              <Label htmlFor="edit-phone">Telefone</Label>
              <Input
                id="edit-phone"
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                placeholder="(00) 00000-0000"
              />
            </div>
            <div>
              <Label htmlFor="edit-email">Email</Label>
              <Input
                id="edit-email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                placeholder="email@exemplo.com"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowEditDialog(false)}>
              Cancelar
            </Button>
            <Button onClick={handleSaveEdit} className="bg-orange-500 hover:bg-orange-600">
              Salvar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </PhoneFrame>
  );
}