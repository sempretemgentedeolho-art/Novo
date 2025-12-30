import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { PhoneFrame } from "@/components/PhoneFrame";
import { StatusBar } from "@/components/StatusBar";
import { 
  ArrowLeft, Search, Camera, MoreVertical, Send, Mic, Paperclip, 
  Smile, Phone, Video, Plus, Users, MessageCircle, Star,
  Reply, Trash2, Share2, Info as InfoIcon, Edit, Pin, Check,
  FileText, Image as ImageIcon, Music, DollarSign, MapPin, User,
  BarChart3, List, Bell, MessageSquare, Wallpaper, ChevronRight, Settings, X
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const initialChats = [
  { 
    id: 1, 
    name: "Vôlei da Galera", 
    message: "Sandro: 🟢 Figurinha", 
    time: "29/01/2025", 
    unread: 0,
    avatar: "🏐",
    messages: [
      { id: 1, text: "Bom dia!", sender: "other", time: "10:25" },
      { id: 2, text: "Bom dia! 😊", sender: "me", time: "10:27" },
      { id: 3, text: "Figurinha", sender: "other", time: "20:59" }
    ]
  },
  { 
    id: 2, 
    name: "Vôlei Operário", 
    message: "+55 51 9860-2942: Blzz", 
    time: "28/01/2025", 
    unread: 0,
    avatar: "🏐",
    messages: [
      { id: 1, text: "Boa tarde!", sender: "other", time: "14:30" },
      { id: 2, text: "Blzz", sender: "other", time: "14:35" }
    ]
  },
  { 
    id: 3, 
    name: "+55 51 9535-8008", 
    message: "✓ 👍", 
    time: "24/01/2025", 
    unread: 0,
    avatar: "M",
    messages: []
  },
  { 
    id: 4, 
    name: "+55 51 9673-4754", 
    message: "+55 51 9673-4754 usa uma duração padrã...", 
    time: "13/08/2024", 
    unread: 0,
    avatar: "📞",
    messages: []
  },
  { 
    id: 5, 
    name: "Sebrae Apoia", 
    message: "Olá! 😊 Tudo bem? Não esqueça que hoje...", 
    time: "20/01/2025", 
    unread: 0,
    avatar: "🏢",
    messages: []
  },
  { 
    id: 6, 
    name: "+55 51 9765-3263", 
    message: "Bm dia Eu tenho O carro dai fica ruim dx...", 
    time: "17/01/2025", 
    unread: 0,
    avatar: "R",
    messages: []
  },
  { 
    id: 7, 
    name: "Sebrae Facilita", 
    message: "👏 Olá! Precificar corretamente é esser", 
    time: "16/01/2025", 
    unread: 0,
    avatar: "🏢",
    messages: []
  },
  { 
    id: 8, 
    name: "Lisiane", 
    message: "✓ ok", 
    time: "15/01/2025", 
    unread: 0,
    avatar: "👩",
    messages: []
  },
  { 
    id: 9, 
    name: "Maria Silva", 
    message: "Boa tarde! Como você está?", 
    time: "14/01/2025", 
    unread: 0,
    avatar: "👩",
    messages: []
  },
  { 
    id: 10, 
    name: "João Pedro", 
    message: "Obrigado pela ajuda!", 
    time: "13/01/2025", 
    unread: 0,
    avatar: "👨",
    messages: []
  },
  { 
    id: 11, 
    name: "Ana Costa", 
    message: "Até logo! 👋", 
    time: "12/01/2025", 
    unread: 0,
    avatar: "👩",
    messages: []
  },
];

const statusList = [
  { id: 1, name: "Robert Fox", time: "12:45 PM", avatar: "👨‍🔧", hasUpdate: true },
  { id: 2, name: "Wade Warren", time: "02:45 PM", avatar: "👨‍🦱", hasUpdate: true },
];

const channelsList = [
  { 
    id: 1, 
    name: "Mark Zuckerberg", 
    message: "Feliz em ver que a Civ conseguiu mais alguns votos depois da minha nota de voz", 
    date: "1/20/24",
    avatar: "👨‍💼"
  },
  { 
    id: 2, 
    name: "Esther Howard", 
    message: "Feliz em ver que a Civ conseguiu mais alguns votos depois da minha nota de voz", 
    date: "1/20/24",
    avatar: "👩"
  },
];

const contactsList = [
  { id: 1, name: "Alexandre Tadeu", status: "Disponível", avatar: "🏖️" },
  { id: 2, name: "Susi", status: "🤗", avatar: "👩" },
  { id: 3, name: "Manu", status: "Não posso falar, somente WhatsApp", avatar: "👩" },
  { id: 4, name: "Mãe Novo", status: "", avatar: "👩" },
  { id: 5, name: "Robinho Ar Condicionado", status: "", avatar: "🏢" },
  { id: 6, name: "Cleiton Newats", status: "", avatar: "👨" },
  { id: 7, name: "david Volei", status: "🏐", avatar: "👨" },
  { id: 8, name: "Nilva", status: "Tu te tornas eternamente responsáv...", avatar: "❤️" },
  { id: 9, name: "Camila Schumacher", status: "", avatar: "👩" },
  { id: 10, name: "Pedro Santos", status: "Ocupado", avatar: "👨" },
];

export default function WhatsApp() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("chats");
  const [chatsFilter, setChatsFilter] = useState("all");
  const [chats, setChats] = useState(initialChats);
  const [selectedChat, setSelectedChat] = useState(null);
  const [messageText, setMessageText] = useState("");
  const [messages, setMessages] = useState([]);
  const [showMenu, setShowMenu] = useState(false);
  const [showChatMenu, setShowChatMenu] = useState(false);
  const [showAttachMenu, setShowAttachMenu] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [showMessageMenu, setShowMessageMenu] = useState(false);
  const [statusTab, setStatusTab] = useState("status");
  const [showChannelMenu, setShowChannelMenu] = useState(false);
  const [selectionMode, setSelectionMode] = useState(false);
  const [selectedMessages, setSelectedMessages] = useState([]);
  const [creatingGroup, setCreatingGroup] = useState(false);
  const [groupStep, setGroupStep] = useState(1);
  const [selectedContacts, setSelectedContacts] = useState([]);
  const [groupName, setGroupName] = useState("");

  useEffect(() => {
    const synth = window.speechSynthesis;
    if (synth) {
      synth.cancel();
      const utter = new SpeechSynthesisUtterance(
        "Bem vindo ao WhatsApp, clique nos três pontinhos à sua direita no topo."
      );
      utter.lang = "pt-BR";
      utter.rate = 0.85;
      synth.speak(utter);
    }
    return () => window.speechSynthesis.cancel();
  }, []);

  const handleHelp = () => {
    const synth = window.speechSynthesis;
    if (synth) {
      synth.cancel();
      const utter = new SpeechSynthesisUtterance(
        "WhatsApp. Aplicativo de mensagens. Aqui você pode conversar com seus contatos, ver status de amigos, fazer chamadas de voz e vídeo. " +
        "Na aba Conversas você vê todas as suas conversas. Toque em uma conversa para abrir e enviar mensagens. " +
        "Para enviar uma mensagem, digite no campo Mensagem na parte de baixo e toque no botão verde de enviar. " +
        "Você também pode tocar no clipe para enviar fotos, vídeos, documentos e muito mais. " +
        "Para fazer uma chamada, toque no ícone de telefone ou vídeo no topo da conversa. " +
        "Na aba Atualizações você pode ver os status dos seus contatos e acessar canais. " +
        "O botão verde flutuante no canto inferior direito serve para iniciar uma nova conversa ou adicionar status. " +
        "Toque nos três pontinhos no topo para ver mais opções."
      );
      utter.lang = "pt-BR";
      utter.rate = 0.85;
      synth.speak(utter);
    }
  };

  const handleMenuClick = () => {
    setShowMenu(!showMenu);
    if (!showMenu) {
      const synth = window.speechSynthesis;
      if (synth) {
        synth.cancel();
        const utter = new SpeechSynthesisUtterance("Clique em novo grupo para configurar.");
        utter.lang = "pt-BR";
        utter.rate = 0.85;
        synth.speak(utter);
      }
    }
  };

  const handleNewGroup = () => {
    setShowMenu(false);
    setCreatingGroup(true);
    setGroupStep(1);
    setSelectedContacts([]);
    const synth = window.speechSynthesis;
    if (synth) {
      synth.cancel();
      const utter = new SpeechSynthesisUtterance(
        "Para criar um grupo selecione o número, clique na bolinha vai ficar verde, logo abaixo tem uma seta verde do seu lado direito clique nela."
      );
      utter.lang = "pt-BR";
      utter.rate = 0.85;
      synth.speak(utter);
    }
  };

  const toggleContactSelection = (contactId) => {
    if (selectedContacts.includes(contactId)) {
      setSelectedContacts(selectedContacts.filter(id => id !== contactId));
    } else {
      setSelectedContacts([...selectedContacts, contactId]);
    }
  };

  const handleNextStep = () => {
    setGroupStep(2);
    const synth = window.speechSynthesis;
    if (synth) {
      synth.cancel();
      const utter = new SpeechSynthesisUtterance(
        "Coloque o nome no grupo, e clique em confirmar no botão verde à sua direita abaixo."
      );
      utter.lang = "pt-BR";
      utter.rate = 0.85;
      synth.speak(utter);
    }
  };

  const handleCreateGroup = () => {
    const synth = window.speechSynthesis;
    if (synth) {
      synth.cancel();
      const utter = new SpeechSynthesisUtterance("Grupo criado com sucesso");
      utter.lang = "pt-BR";
      utter.rate = 0.85;
      synth.speak(utter);
    }
    
    setTimeout(() => {
      setCreatingGroup(false);
      setGroupStep(1);
      setSelectedContacts([]);
      setGroupName("");
    }, 2000);
  };

  const handleChatClick = (chat) => {
    setSelectedChat(chat);
    setMessages(chat.messages);
    setChats(chats.map(c => c.id === chat.id ? { ...c, unread: 0 } : c));
  };

  const handleSendMessage = () => {
    if (messageText.trim()) {
      const newMessage = {
        id: messages.length + 1,
        text: messageText,
        sender: "me",
        time: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }).toUpperCase()
      };
      setMessages([...messages, newMessage]);
      setMessageText("");
    }
  };

  const handleLongPressMessage = (msg) => {
    setSelectionMode(true);
    setSelectedMessages([msg.id]);
  };

  const toggleMessageSelection = (msgId) => {
    if (selectedMessages.includes(msgId)) {
      const newSelection = selectedMessages.filter(id => id !== msgId);
      setSelectedMessages(newSelection);
      if (newSelection.length === 0) {
        setSelectionMode(false);
      }
    } else {
      setSelectedMessages([...selectedMessages, msgId]);
    }
  };

  const attachmentOptions = [
    { icon: FileText, label: "Documento", color: "bg-purple-500" },
    { icon: Camera, label: "Câmera", color: "bg-pink-500" },
    { icon: ImageIcon, label: "Galeria", color: "bg-purple-600" },
    { icon: Music, label: "Áudio", color: "bg-orange-500" },
    { icon: DollarSign, label: "Pagamento", color: "bg-teal-500" },
    { icon: MapPin, label: "Localização", color: "bg-green-500" },
    { icon: User, label: "Contato", color: "bg-blue-500" },
    { icon: BarChart3, label: "Enquete", color: "bg-indigo-500" },
    { icon: List, label: "Lista", color: "bg-yellow-600" },
  ];

  const chatMenuOptions = [
    { icon: InfoIcon, label: "Ver contato" },
    { icon: ImageIcon, label: "Mídia, links e docs", hasChevron: true },
    { icon: Search, label: "Pesquisar" },
    { icon: Star, label: "Adicionar aos favoritos" },
    { icon: Bell, label: "Silenciar notificações" },
    { icon: MessageSquare, label: "Mensagens temporárias", hasChevron: true },
    { icon: Wallpaper, label: "Papel de parede" },
    { icon: MoreVertical, label: "Mais" },
  ];

  const filteredChats = chats.filter(chat => {
    if (chatsFilter === "all") return true;
    if (chatsFilter === "unread") return chat.unread > 0;
    if (chatsFilter === "groups") return chat.isGroup;
    return true;
  });

  // Tela de criação de grupo - Etapa 1: Seleção de contatos
  if (creatingGroup && groupStep === 1) {
    return (
      <PhoneFrame>
        <div className="h-full bg-white flex flex-col">
          <StatusBar variant="light" />

          {/* Header */}
          <div className="bg-[#008069] text-white px-4 py-3 flex items-center gap-4">
            <button onClick={() => setCreatingGroup(false)}>
              <ArrowLeft className="w-6 h-6" />
            </button>
            <div className="flex-1">
              <h2 className="text-lg font-medium">Novo grupo</h2>
              <p className="text-sm text-white/80">Adicionar participantes</p>
            </div>
            <button>
              <Search className="w-6 h-6" />
            </button>
          </div>

          {/* Barra de pesquisa */}
          <div className="px-4 py-3 border-b border-gray-200">
            <input
              type="text"
              placeholder="Pesquisar nome ou número..."
              className="w-full bg-gray-100 rounded-lg px-4 py-2 outline-none text-sm"
            />
          </div>

          {/* Contatos selecionados (horizontal scroll) */}
          {selectedContacts.length > 0 && (
            <div className="px-4 py-3 border-b border-gray-200">
              <div className="flex gap-3 overflow-x-auto">
                {selectedContacts.map(contactId => {
                  const contact = contactsList.find(c => c.id === contactId);
                  return (
                    <div key={contactId} className="flex flex-col items-center gap-1 flex-shrink-0">
                      <div className="relative">
                        <div className="w-14 h-14 rounded-full bg-gray-300 flex items-center justify-center text-xl">
                          {contact.avatar}
                        </div>
                        <button
                          onClick={() => toggleContactSelection(contactId)}
                          className="absolute -top-1 -right-1 w-5 h-5 bg-gray-500 rounded-full flex items-center justify-center"
                        >
                          <X className="w-3 h-3 text-white" />
                        </button>
                      </div>
                      <span className="text-xs text-gray-700 max-w-[60px] truncate">{contact.name.split(' ')[0]}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Lista de contatos */}
          <div className="flex-1 overflow-y-auto">
            <h3 className="px-4 py-2 text-sm text-gray-500 font-medium">Contatos frequentes</h3>
            {contactsList.map(contact => (
              <div
                key={contact.id}
                onClick={() => toggleContactSelection(contact.id)}
                className="flex items-center gap-3 px-4 py-3 active:bg-gray-50"
              >
                <div className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center text-xl flex-shrink-0">
                  {contact.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-gray-900 text-[16px]">{contact.name}</h3>
                  {contact.status && (
                    <p className="text-sm text-gray-600 truncate">{contact.status}</p>
                  )}
                </div>
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                  selectedContacts.includes(contact.id)
                    ? "bg-[#25D366] border-[#25D366]"
                    : "border-gray-300"
                }`}>
                  {selectedContacts.includes(contact.id) && (
                    <Check className="w-4 h-4 text-white" strokeWidth={3} />
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Botão próximo */}
          {selectedContacts.length > 0 && (
            <button
              onClick={handleNextStep}
              className="absolute bottom-6 right-6 w-14 h-14 bg-[#25D366] rounded-full shadow-lg flex items-center justify-center z-10"
            >
              <ArrowLeft className="w-6 h-6 text-white transform rotate-180" />
            </button>
          )}
        </div>
      </PhoneFrame>
    );
  }

  // Tela de criação de grupo - Etapa 2: Nome do grupo
  if (creatingGroup && groupStep === 2) {
    return (
      <PhoneFrame>
        <div className="h-full bg-white flex flex-col">
          <StatusBar variant="light" />

          {/* Header */}
          <div className="bg-[#008069] text-white px-4 py-3 flex items-center gap-4">
            <button onClick={() => setGroupStep(1)}>
              <ArrowLeft className="w-6 h-6" />
            </button>
            <h2 className="text-lg font-medium">Novo grupo</h2>
          </div>

          {/* Foto e nome do grupo */}
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center">
                <Camera className="w-6 h-6 text-gray-500" />
              </div>
              <input
                type="text"
                value={groupName}
                onChange={(e) => setGroupName(e.target.value)}
                placeholder="Nome do grupo (opcional)"
                className="flex-1 border-b-2 border-[#25D366] py-2 outline-none text-lg"
              />
              <button>
                <Smile className="w-6 h-6 text-gray-500" />
              </button>
            </div>
          </div>

          {/* Opções do grupo */}
          <div className="flex-1">
            <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between">
              <div>
                <h3 className="font-medium text-gray-900">Mensagens temporárias</h3>
                <p className="text-sm text-gray-500">Desativadas</p>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </div>

            <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between">
              <h3 className="font-medium text-gray-900">Permissões do grupo</h3>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </div>

            {/* Membros selecionados */}
            <div className="px-4 py-3">
              <p className="text-sm text-gray-500 mb-3">Membros: {selectedContacts.length}</p>
              <div className="flex gap-3 overflow-x-auto">
                {selectedContacts.map(contactId => {
                  const contact = contactsList.find(c => c.id === contactId);
                  return (
                    <div key={contactId} className="flex flex-col items-center gap-1 flex-shrink-0">
                      <div className="w-14 h-14 rounded-full bg-gray-300 flex items-center justify-center text-xl">
                        {contact.avatar}
                      </div>
                      <span className="text-xs text-gray-700 max-w-[60px] truncate">{contact.name.split(' ')[0]}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Botão criar */}
          <button
            onClick={handleCreateGroup}
            disabled={!groupName.trim()}
            className={`absolute bottom-6 right-6 w-14 h-14 rounded-full shadow-lg flex items-center justify-center z-10 ${
              groupName.trim() ? "bg-[#25D366]" : "bg-gray-300"
            }`}
          >
            <Check className="w-6 h-6 text-white" strokeWidth={3} />
          </button>
        </div>
      </PhoneFrame>
    );
  }

  if (selectedChat) {
    return (
      <PhoneFrame>
        <div className="h-full bg-[#ECE5DD] flex flex-col relative">
          <StatusBar variant="light" />

          {/* Header da Conversa */}
          {selectionMode ? (
            <div className="bg-[#008069] text-white px-3 py-2 flex items-center gap-3">
              <button onClick={() => {
                setSelectionMode(false);
                setSelectedMessages([]);
              }}>
                <ArrowLeft className="w-6 h-6" />
              </button>
              <span className="flex-1 text-lg font-medium">{selectedMessages.length}</span>
              <Reply className="w-5 h-5" />
              <Star className="w-5 h-5 mx-3" />
              <Trash2 className="w-5 h-5 mx-3" />
              <Share2 className="w-5 h-5 mx-3" />
              <MoreVertical className="w-5 h-5" />
            </div>
          ) : (
            <div className="bg-[#008069] text-white px-3 py-2 flex items-center gap-3">
              <button onClick={() => {
                setSelectedChat(null);
                setSelectionMode(false);
                setSelectedMessages([]);
              }}>
                <ArrowLeft className="w-6 h-6" />
              </button>
              <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center text-xl flex-shrink-0">
                {selectedChat.avatar}
              </div>
              <div className="flex-1">
                <h2 className="font-medium text-[17px]">{selectedChat.name}</h2>
                <p className="text-xs text-white/80">toque para mais informações</p>
              </div>
              <button onClick={() => alert("Chamada de vídeo")}>
                <Video className="w-5 h-5 mx-2" />
              </button>
              <button onClick={() => alert("Chamada de voz")}>
                <Phone className="w-5 h-5 mx-2" />
              </button>
              <button onClick={() => setShowChatMenu(!showChatMenu)}>
                <MoreVertical className="w-5 h-5" />
              </button>
            </div>
          )}

          {/* Fundo com padrão do WhatsApp */}
          <div 
            className="flex-1 overflow-y-auto p-2"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23d9d9d9' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              backgroundColor: '#ECE5DD'
            }}
          >
            <div className="space-y-1">
              {messages.map((msg, idx) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className={`flex ${msg.sender === "me" ? "justify-end" : "justify-start"}`}
                  onClick={() => selectionMode && toggleMessageSelection(msg.id)}
                  onContextMenu={(e) => {
                    e.preventDefault();
                    handleLongPressMessage(msg);
                  }}
                >
                  <div
                    className={`max-w-[85%] rounded-lg px-3 py-2 shadow-sm relative ${
                      msg.sender === "me"
                        ? "bg-[#D9FDD3] rounded-br-none"
                        : "bg-white rounded-bl-none"
                    } ${
                      selectedMessages.includes(msg.id) ? "ring-2 ring-[#008069]" : ""
                    }`}
                  >
                    {msg.author && (
                      <p className="text-xs font-semibold text-[#008069] mb-1">{msg.author}</p>
                    )}
                    <p className="text-[15px] text-gray-900 break-words">{msg.text}</p>
                    <div className="flex items-center justify-end gap-1 mt-1">
                      <span className="text-[11px] text-gray-500">{msg.time}</span>
                      {msg.sender === "me" && (
                        <Check className="w-4 h-4 text-[#53BDEB]" strokeWidth={2.5} />
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Input de Mensagem */}
          <div className="bg-[#F0F2F5] px-2 py-1.5 flex items-center gap-1">
            <div className="flex-1 bg-white rounded-full px-4 py-2 flex items-center gap-2">
              <button className="flex-shrink-0">
                <Smile className="w-6 h-6 text-gray-500" />
              </button>
              <input
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                placeholder="Mensagem"
                className="flex-1 bg-transparent outline-none text-[15px]"
              />
              <button 
                onClick={() => setShowAttachMenu(!showAttachMenu)}
                className="flex-shrink-0"
              >
                <Paperclip className="w-5 h-5 text-gray-500" />
              </button>
              {!messageText && (
                <button className="flex-shrink-0">
                  <Camera className="w-5 h-5 text-gray-500" />
                </button>
              )}
            </div>
            <button
              onClick={() => messageText ? handleSendMessage() : alert("Segure para gravar áudio")}
              className="w-12 h-12 bg-[#25D366] rounded-full shadow-lg flex items-center justify-center flex-shrink-0"
            >
              {messageText ? (
                <Send className="w-5 h-5 text-white ml-1" />
              ) : (
                <Mic className="w-5 h-5 text-white" />
              )}
            </button>
          </div>

          {/* Menu de Anexos */}
          <AnimatePresence>
            {showAttachMenu && (
              <>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.5 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setShowAttachMenu(false)}
                  className="absolute inset-0 bg-black z-40"
                />
                <motion.div
                  initial={{ opacity: 0, scale: 0.9, y: 50 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: 50 }}
                  className="absolute bottom-20 right-4 bg-white rounded-2xl shadow-2xl z-50 p-6"
                >
                  <div className="grid grid-cols-3 gap-6">
                    {attachmentOptions.map((option, idx) => {
                      const Icon = option.icon;
                      return (
                        <button
                          key={idx}
                          onClick={() => {
                            alert(option.label);
                            setShowAttachMenu(false);
                          }}
                          className="flex flex-col items-center gap-2"
                        >
                          <div className={`w-14 h-14 rounded-full ${option.color} flex items-center justify-center shadow-lg`}>
                            <Icon className="w-6 h-6 text-white" />
                          </div>
                          <span className="text-xs text-gray-700">{option.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>

          {/* Menu do Chat */}
          <AnimatePresence>
            {showChatMenu && (
              <>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.5 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setShowChatMenu(false)}
                  className="absolute inset-0 bg-black z-40"
                />
                <motion.div
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 100 }}
                  className="absolute top-14 right-2 bg-white rounded-lg shadow-2xl z-50 py-2 min-w-[260px]"
                >
                  {chatMenuOptions.map((option, idx) => {
                    const Icon = option.icon;
                    return (
                      <button
                        key={idx}
                        onClick={() => {
                          alert(option.label);
                          setShowChatMenu(false);
                        }}
                        className="w-full px-4 py-3 flex items-center gap-3 hover:bg-gray-50"
                      >
                        <Icon className="w-5 h-5 text-gray-600" />
                        <span className="text-[15px] text-gray-900 flex-1 text-left">{option.label}</span>
                        {option.hasChevron && <ChevronRight className="w-4 h-4 text-gray-400" />}
                      </button>
                    );
                  })}
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>
      </PhoneFrame>
    );
  }

  return (
    <PhoneFrame>
      <div className="h-full bg-white flex flex-col">
        <StatusBar variant="light" />

        {/* Header */}
        <div className="bg-white px-4 py-3">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-semibold text-[#008069]">WhatsApp</h1>
            <div className="flex gap-5 items-center">
              <button onClick={handleHelp} className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                <span className="text-sm font-bold text-gray-700">?</span>
              </button>
              <button onClick={() => alert("Câmera")}>
                <Camera className="w-6 h-6 text-gray-700" />
              </button>
              <button onClick={() => setShowMenu(!showMenu)}>
                <MoreVertical className="w-6 h-6 text-gray-700" />
              </button>
            </div>
          </div>
          
          {/* Barra de Pesquisa */}
          <div className="mt-3 bg-gray-100 rounded-lg px-4 py-2 flex items-center gap-2">
            <Search className="w-5 h-5 text-gray-500" />
            <input 
              type="text" 
              placeholder="Pergunte à Meta AI ou pesquise"
              className="flex-1 bg-transparent outline-none text-sm text-gray-700"
            />
          </div>
        </div>



        {/* Lista de Conversas */}
        <div className="flex-1 overflow-y-auto bg-white">
          {filteredChats.map((chat) => (
            <div
              key={chat.id}
              onClick={() => handleChatClick(chat)}
              className="flex items-center gap-3 px-4 py-3 border-b border-gray-100 active:bg-gray-50"
            >
              <div className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center text-xl flex-shrink-0">
                {chat.avatar}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start mb-0.5">
                  <h3 className="font-medium text-gray-900 text-[16px] truncate">
                    {chat.name}
                  </h3>
                  <span className="text-xs text-gray-500 flex-shrink-0 ml-2">
                    {chat.time}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <p className="text-sm text-gray-600 truncate flex-1">
                    {chat.message}
                  </p>
                </div>
              </div>
            </div>
          ))}

        </div>

        {/* Bottom Navigation */}
        <div className="bg-white border-t border-gray-200 flex justify-around py-2">
          <button 
            onClick={() => setActiveTab("chats")}
            className={`flex flex-col items-center gap-1 py-1 px-4 ${activeTab === "chats" ? "text-[#008069]" : "text-gray-500"}`}
          >
            <MessageCircle className="w-6 h-6" />
            <span className="text-xs font-medium">Conversas</span>
          </button>
          <button 
            onClick={() => setActiveTab("updates")}
            className={`flex flex-col items-center gap-1 py-1 px-4 ${activeTab === "updates" ? "text-[#008069]" : "text-gray-500"}`}
          >
            <Bell className="w-6 h-6" />
            <span className="text-xs font-medium">Atualizações</span>
          </button>
          <button 
            onClick={() => setActiveTab("communities")}
            className={`flex flex-col items-center gap-1 py-1 px-4 ${activeTab === "communities" ? "text-[#008069]" : "text-gray-500"}`}
          >
            <Users className="w-6 h-6" />
            <span className="text-xs font-medium">Comunidades</span>
          </button>
          <button 
            onClick={() => setActiveTab("calls")}
            className={`flex flex-col items-center gap-1 py-1 px-4 ${activeTab === "calls" ? "text-[#008069]" : "text-gray-500"}`}
          >
            <Phone className="w-6 h-6" />
            <span className="text-xs font-medium">Ligações</span>
          </button>
        </div>

        {/* Botão Flutuante */}
        <button className="absolute bottom-20 right-6 w-14 h-14 bg-[#25D366] rounded-full shadow-lg flex items-center justify-center text-white z-10">
          <Plus className="w-6 h-6" />
        </button>

        {/* Menu Principal */}
        <AnimatePresence>
          {showMenu && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.5 }}
                exit={{ opacity: 0 }}
                onClick={() => setShowMenu(false)}
                className="absolute inset-0 bg-black z-40"
              />
              <motion.div
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 100 }}
                className="absolute top-14 right-2 bg-white rounded-lg shadow-2xl z-50 py-2 min-w-[220px]"
              >
                <button
                  onClick={handleNewGroup}
                  className="w-full px-4 py-3 flex items-center gap-3 hover:bg-gray-50"
                >
                  <Users className="w-5 h-5 text-gray-600" />
                  <span className="text-[15px] text-gray-900">Novo grupo</span>
                </button>
                <button
                  onClick={() => {
                    alert("Nova comunidade");
                    setShowMenu(false);
                  }}
                  className="w-full px-4 py-3 flex items-center gap-3 hover:bg-gray-50"
                >
                  <Users className="w-5 h-5 text-gray-600" />
                  <span className="text-[15px] text-gray-900">Nova comunidade</span>
                </button>
                <button
                  onClick={() => {
                    alert("Listas de transmissão");
                    setShowMenu(false);
                  }}
                  className="w-full px-4 py-3 flex items-center gap-3 hover:bg-gray-50"
                >
                  <MessageSquare className="w-5 h-5 text-gray-600" />
                  <span className="text-[15px] text-gray-900">Listas de transmissão</span>
                </button>
                <button
                  onClick={() => {
                    alert("Dispositivos conectados");
                    setShowMenu(false);
                  }}
                  className="w-full px-4 py-3 flex items-center gap-3 hover:bg-gray-50"
                >
                  <Phone className="w-5 h-5 text-gray-600" />
                  <span className="text-[15px] text-gray-900">Dispositivos conectados</span>
                </button>
                <button
                  onClick={() => {
                    alert("Favoritas");
                    setShowMenu(false);
                  }}
                  className="w-full px-4 py-3 flex items-center gap-3 hover:bg-gray-50"
                >
                  <Star className="w-5 h-5 text-gray-600" />
                  <span className="text-[15px] text-gray-900">Favoritas</span>
                </button>
                <button
                  onClick={() => {
                    alert("Encontrar empresas");
                    setShowMenu(false);
                  }}
                  className="w-full px-4 py-3 flex items-center gap-3 hover:bg-gray-50"
                >
                  <Search className="w-5 h-5 text-gray-600" />
                  <span className="text-[15px] text-gray-900">Encontrar empresas</span>
                </button>
                <button
                  onClick={() => {
                    alert("Pagamentos");
                    setShowMenu(false);
                  }}
                  className="w-full px-4 py-3 flex items-center gap-3 hover:bg-gray-50"
                >
                  <DollarSign className="w-5 h-5 text-gray-600" />
                  <span className="text-[15px] text-gray-900">Pagamentos</span>
                </button>
                <button
                  onClick={() => {
                    alert("Marcar tudo como lido");
                    setShowMenu(false);
                  }}
                  className="w-full px-4 py-3 flex items-center gap-3 hover:bg-gray-50"
                >
                  <Check className="w-5 h-5 text-gray-600" />
                  <span className="text-[15px] text-gray-900">Marcar tudo como lido</span>
                </button>
                <button
                  onClick={() => {
                    navigate(createPageUrl("Configuracoes"));
                    setShowMenu(false);
                  }}
                  className="w-full px-4 py-3 flex items-center gap-3 hover:bg-gray-50"
                >
                  <Settings className="w-5 h-5 text-gray-600" />
                  <span className="text-[15px] text-gray-900">Configurações</span>
                </button>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </PhoneFrame>
  );
}