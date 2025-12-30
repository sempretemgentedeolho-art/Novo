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
  BarChart3, List, Bell, MessageSquare, Wallpaper, ChevronRight
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const initialChats = [
  { 
    id: 1, 
    name: "Jane Cooper", 
    message: "Eu vou fazer as compras!", 
    time: "20:59", 
    unread: 0,
    avatar: "👩",
    messages: [
      { id: 1, text: "Bom dia!", sender: "other", time: "10:25" },
      { id: 2, text: "Bom dia! 😊", sender: "me", time: "10:27" },
      { id: 3, text: "Eu vou fazer as compras!", sender: "other", time: "20:59" }
    ]
  },
  { 
    id: 2, 
    name: "Albert Flores", 
    message: "Eu vou fazer as compras!", 
    time: "20:59", 
    unread: 0,
    avatar: "👨",
    messages: [
      { id: 1, text: "Não, eu irei com você assim como pratiquei Rasengan com Jiraya sensei semana passada!", sender: "other", time: "10:12" },
      { id: 2, text: "Eu vou sozinho.", sender: "me", time: "10:16" },
      { id: 3, text: "Não, eu irei com você assim como pratiquei Rasengan com Jiraya sensei semana passada!", sender: "other", time: "10:12" },
      { id: 4, text: "Eu vou sozinho.", sender: "me", time: "10:16" }
    ]
  },
  { 
    id: 3, 
    name: "Darlene Robertson", 
    message: "Eu vou fazer as compras!", 
    time: "20:59", 
    unread: 0,
    avatar: "👩‍🦰",
    messages: []
  },
  { 
    id: 4, 
    name: "Kristin Watson", 
    message: "Eu vou fazer as compras!", 
    time: "20:59", 
    unread: 0,
    avatar: "👩‍🦱",
    messages: []
  },
  { 
    id: 5, 
    name: "Ronald Richards", 
    message: "Eu vou fazer as compras!", 
    time: "20:59", 
    unread: 0,
    avatar: "👨‍🦲",
    messages: []
  },
  { 
    id: 6, 
    name: "Wade Warren", 
    message: "Eu vou fazer as compras!", 
    time: "20:59", 
    unread: 0,
    avatar: "👨‍🦱",
    messages: []
  },
  { 
    id: 7, 
    name: "Darrell Steward", 
    message: "Eu vou fazer as compras!", 
    time: "20:59", 
    unread: 0,
    avatar: "👨‍💼",
    messages: []
  },
  { 
    id: 8, 
    name: "Guy Hawkins", 
    message: "Eu vou fazer as compras!", 
    time: "20:59", 
    unread: 0,
    avatar: "👨‍🎓",
    messages: []
  },
  { 
    id: 9, 
    name: "Savannah Nguyen", 
    message: "Eu vou fazer as compras!", 
    time: "20:59", 
    unread: 0,
    avatar: "👩‍💼",
    messages: []
  },
  { 
    id: 10, 
    name: "Bessie Cooper", 
    message: "Eu vou fazer as compras!", 
    time: "20:59", 
    unread: 0,
    avatar: "👩‍🎨",
    messages: []
  },
  { 
    id: 11, 
    name: "Robert Fox", 
    message: "Eu vou fazer as compras!", 
    time: "20:59", 
    unread: 0,
    avatar: "👨‍🔧",
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
        <div className="bg-[#008069] text-white px-4 py-3">
          <div className="flex justify-between items-center mb-4">
            <button onClick={() => navigate(createPageUrl("Home"))}>
              <ArrowLeft className="w-6 h-6" />
            </button>
            <h1 className="text-xl font-medium flex-1 ml-4">WhatsApp</h1>
            <div className="flex gap-5">
              <button onClick={handleHelp} className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                <span className="text-sm font-bold">?</span>
              </button>
              <button onClick={() => alert("Câmera")}>
                <Camera className="w-5 h-5" />
              </button>
              <button onClick={() => alert("Pesquisar")}>
                <Search className="w-5 h-5" />
              </button>
              <button onClick={() => setShowMenu(!showMenu)}>
                <MoreVertical className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-[#008069] text-white flex items-center">
          <button 
            onClick={() => setActiveTab("communities")}
            className={`px-4 py-3 ${activeTab === "communities" ? "border-b-2 border-white" : ""}`}
          >
            <Users className="w-6 h-6" />
          </button>
          <button
            onClick={() => setActiveTab("chats")}
            className={`flex-1 py-3 text-center font-medium text-sm ${
              activeTab === "chats" ? "border-b-2 border-white" : ""
            }`}
          >
            Conversas
          </button>
          <button
            onClick={() => setActiveTab("updates")}
            className={`flex-1 py-3 text-center font-medium text-sm ${
              activeTab === "updates" ? "border-b-2 border-white" : ""
            }`}
          >
            Atualizações
          </button>
          <button
            onClick={() => setActiveTab("calls")}
            className={`flex-1 py-3 text-center font-medium text-sm ${
              activeTab === "calls" ? "border-b-2 border-white" : ""
            }`}
          >
            Chamadas
          </button>
        </div>

        {/* Conteúdo das Tabs */}
        <div className="flex-1 overflow-y-auto">
          {activeTab === "chats" && (
            <div>
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
                      <Check className="w-4 h-4 text-[#53BDEB] flex-shrink-0" strokeWidth={2.5} />
                      <p className="text-sm text-gray-600 truncate flex-1">
                        {chat.message}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === "updates" && (
            <div>
              {/* Abas Status e Canais */}
              <div className="flex border-b border-gray-200">
                <button 
                  onClick={() => setStatusTab("status")}
                  className={`flex-1 py-3 text-center font-medium ${
                    statusTab === "status" 
                      ? "text-gray-900 bg-[#D5F7DC]" 
                      : "text-gray-600"
                  }`}
                >
                  Status
                </button>
                <button 
                  onClick={() => setStatusTab("channels")}
                  className={`flex-1 py-3 text-center font-medium ${
                    statusTab === "channels" 
                      ? "text-gray-900 bg-[#D5F7DC]" 
                      : "text-gray-600"
                  }`}
                >
                  Canais
                </button>
              </div>

              {statusTab === "status" ? (
                <div className="p-4">
                  {/* Meu Status */}
                  <div className="flex items-center gap-3 mb-6">
                    <div className="relative">
                      <div className="w-14 h-14 rounded-full bg-gray-300 flex items-center justify-center text-2xl">
                        😊
                      </div>
                      <div className="absolute bottom-0 right-0 w-6 h-6 bg-[#25D366] rounded-full flex items-center justify-center border-2 border-white">
                        <Plus className="w-4 h-4 text-white" />
                      </div>
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900 text-[16px]">Meu status</h3>
                      <p className="text-sm text-gray-500">Toque para adicionar atualização de status</p>
                    </div>
                  </div>

                  <h4 className="text-sm text-gray-500 font-medium mb-3">Atualizações recentes</h4>
                  
                  {statusList.map((status) => (
                    <div key={status.id} className="flex items-center gap-3 px-0 py-3">
                      <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-[#25D366] to-[#008069] p-0.5">
                        <div className="w-full h-full rounded-full bg-white flex items-center justify-center text-2xl">
                          {status.avatar}
                        </div>
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900 text-[16px]">{status.name}</h3>
                        <p className="text-sm text-gray-500">{status.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-4">
                  {/* Header Canais */}
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-[15px] text-gray-600">Adicionar canais</h3>
                    <button 
                      onClick={() => setShowChannelMenu(!showChannelMenu)}
                      className="relative"
                    >
                      <Plus className="w-5 h-5 text-gray-900" />
                    </button>
                  </div>

                  {/* Lista de Canais */}
                  {channelsList.map((channel) => (
                    <div key={channel.id} className="flex items-start gap-3 py-3 border-b border-gray-100">
                      <div className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center text-xl flex-shrink-0">
                        {channel.avatar}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-gray-900 text-[16px] mb-1">
                          {channel.name}
                        </h3>
                        <p className="text-sm text-gray-600 line-clamp-2 mb-1">
                          {channel.message}
                        </p>
                        <span className="text-xs text-gray-500">{channel.date}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === "calls" && (
            <div className="p-6 text-center text-gray-500">
              <Phone className="w-16 h-16 mx-auto mb-3 opacity-20" />
              <p className="text-sm">Suas chamadas aparecerão aqui</p>
            </div>
          )}

          {activeTab === "communities" && (
            <div className="p-6 text-center text-gray-500">
              <Users className="w-16 h-16 mx-auto mb-3 opacity-20" />
              <p className="text-sm">Comunidades em breve</p>
            </div>
          )}
        </div>

        {/* Botão Flutuante */}
        <button className="absolute bottom-6 right-6 w-14 h-14 bg-[#25D366] rounded-full shadow-lg flex items-center justify-center text-white z-10">
          {activeTab === "chats" && <MessageCircle className="w-6 h-6" />}
          {activeTab === "updates" && statusTab === "status" && <Camera className="w-6 h-6" />}
          {activeTab === "updates" && statusTab === "channels" && <Plus className="w-6 h-6" />}
          {activeTab === "calls" && <Plus className="w-6 h-6" />}
        </button>

        {/* Menu do botão + dos Canais */}
        <AnimatePresence>
          {showChannelMenu && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.5 }}
                exit={{ opacity: 0 }}
                onClick={() => setShowChannelMenu(false)}
                className="absolute inset-0 bg-black z-40"
              />
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="absolute top-32 right-4 bg-white rounded-lg shadow-2xl z-50 py-2 min-w-[180px]"
              >
                <button
                  onClick={() => {
                    alert("Criar canal");
                    setShowChannelMenu(false);
                  }}
                  className="w-full px-4 py-3 flex items-center gap-3 hover:bg-gray-50"
                >
                  <Plus className="w-5 h-5 text-gray-600" />
                  <span className="text-[15px] text-gray-900">Criar canal</span>
                </button>
                <button
                  onClick={() => {
                    alert("Encontrar canais");
                    setShowChannelMenu(false);
                  }}
                  className="w-full px-4 py-3 flex items-center gap-3 hover:bg-gray-50"
                >
                  <Search className="w-5 h-5 text-gray-600" />
                  <span className="text-[15px] text-gray-900">Encontrar canais</span>
                </button>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </PhoneFrame>
  );
}