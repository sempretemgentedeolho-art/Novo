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
  BarChart3, List, Bell, MessageSquare, Wallpaper, ChevronRight, Settings, X,
  Smartphone, Monitor, QrCode, Shield, AlertCircle, Clock, CreditCard, History
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const initialChats = [
  { 
    id: 1, 
    name: "Grupo da Família",
    message: "Roberto: 🟢 Figurinha",
    time: "29/01/2025", 
    unread: 3,
    avatar: "🏐",
    messages: [
      { id: 1, text: "Bom dia!", sender: "other", time: "10:25" },
      { id: 2, text: "Bom dia! 😊", sender: "me", time: "10:27" },
      { id: 3, text: "Figurinha", sender: "other", time: "20:59" }
    ]
  },
  { 
    id: 2, 
    name: "Turma do Trabalho",
    message: "Carlos: Blzz",
    time: "28/01/2025", 
    unread: 1,
    avatar: "🏐",
    messages: [
      { id: 1, text: "Boa tarde!", sender: "other", time: "14:30" },
      { id: 2, text: "Blzz", sender: "other", time: "14:35" }
    ]
  },
  { 
    id: 3, 
    name: "Tio Fernando",
    message: "✓ 👍",
    time: "24/01/2025", 
    unread: 0,
    avatar: "M",
    messages: []
  },
  { 
    id: 4, 
    name: "Vizinho João",
    message: "Vizinho João usa uma duração padrã...",
    time: "13/08/2024", 
    unread: 0,
    avatar: "📞",
    messages: []
  },
  { 
    id: 5, 
    name: "Dona Marta",
    message: "Olá! 😊 Tudo bem? Não esqueça que hoje...",
    time: "20/01/2025", 
    unread: 2,
    avatar: "🏢",
    messages: []
  },
  { 
    id: 6, 
    name: "Marina Costa",
    message: "Bm dia Eu tenho O carro dai fica ruim dx...",
    time: "17/01/2025", 
    unread: 0,
    avatar: "R",
    messages: []
  },
  { 
    id: 7, 
    name: "Seu Antônio",
    message: "👏 Olá! Tudo certo para o encontro",
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

const businessList = [
  { 
    id: 1, 
    name: "Farmácia São José", 
    category: "Farmácia",
    description: "Farmácia 24 horas com delivery",
    hours: "Aberto 24 horas",
    avatar: "💊",
    verified: true
  },
  { 
    id: 2, 
    name: "Supermercado Bom Preço", 
    category: "Mercado",
    description: "Delivery de mercado em até 1 hora",
    hours: "Seg-Sáb: 7h-22h | Dom: 8h-20h",
    avatar: "🛒",
    verified: true
  },
  { 
    id: 3, 
    name: "Padaria Pão Quente", 
    category: "Padaria",
    description: "Pães frescos e bolos artesanais",
    hours: "Todos os dias: 6h-20h",
    avatar: "🥖",
    verified: true
  },
  { 
    id: 4, 
    name: "Pizzaria Bella Italia", 
    category: "Restaurante",
    description: "Pizzas artesanais com entrega grátis",
    hours: "Ter-Dom: 18h-23h",
    avatar: "🍕",
    verified: true
  },
];

const contactsList = [
  { id: 1, name: "Carlos Mendes", status: "Disponível", avatar: "🏖️" },
  { id: 2, name: "Sandra", status: "🤗", avatar: "👩" },
  { id: 3, name: "Manuela", status: "Não posso falar, somente WhatsApp", avatar: "👩" },
  { id: 4, name: "Dona Rosa", status: "", avatar: "👩" },
  { id: 5, name: "Roberto Serviços", status: "", avatar: "🏢" },
  { id: 6, name: "Cláudio", status: "", avatar: "👨" },
  { id: 7, name: "David", status: "🏐", avatar: "👨" },
  { id: 8, name: "Nilza", status: "Tu te tornas eternamente responsáv...", avatar: "❤️" },
  { id: 9, name: "Camila Souza", status: "", avatar: "👩" },
  { id: 10, name: "Paulo Lima", status: "Ocupado", avatar: "👨" },
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
  const [creatingCommunity, setCreatingCommunity] = useState(false);
  const [communityStep, setCommunityStep] = useState(1);
  const [communityName, setCommunityName] = useState("");
  const [communityMembers, setCommunityMembers] = useState([]);
  const [broadcastList, setBroadcastList] = useState(false);
  const [broadcastStep, setBroadcastStep] = useState(1);
  const [broadcastContacts, setBroadcastContacts] = useState([]);
  const [broadcastName, setBroadcastName] = useState("");
  const [broadcastMessage, setBroadcastMessage] = useState("");
  const [connectedDevices, setConnectedDevices] = useState(false);
  const [deviceStep, setDeviceStep] = useState(1);
  const [devices, setDevices] = useState([]);
  const [showFavorites, setShowFavorites] = useState(false);
  const [favoriteStep, setFavoriteStep] = useState(1);
  const [favoriteContacts, setFavoriteContacts] = useState([]);
  const [findBusiness, setFindBusiness] = useState(false);
  const [businessStep, setBusinessStep] = useState(1);
  const [businessSearch, setBusinessSearch] = useState("");
  const [selectedBusiness, setSelectedBusiness] = useState(null);
  const [showPayments, setShowPayments] = useState(false);
  const [paymentStep, setPaymentStep] = useState(1);
  const [paymentConfigured, setPaymentConfigured] = useState(false);
  const [paymentAmount, setPaymentAmount] = useState("");
  const [selectedPaymentContact, setSelectedPaymentContact] = useState(null);
  const [markAllRead, setMarkAllRead] = useState(false);
  const [markAllReadStep, setMarkAllReadStep] = useState(1);

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
        "Para criar um grupo, clique na bolinha ao lado do nome, ela vai ficar verde, logo abaixo tem uma seta verde do seu lado direito, clique nela."
      );
      utter.lang = "pt-BR";
      utter.rate = 0.85;
      synth.speak(utter);
    }
  };

  const handleNewCommunity = () => {
    setShowMenu(false);
    setCreatingCommunity(true);
    setCommunityStep(1);
    const synth = window.speechSynthesis;
    if (synth) {
      synth.cancel();
      const utter = new SpeechSynthesisUtterance(
        "Vamos criar uma comunidade no WhatsApp. Observe a tela. Logo abaixo do texto, existe um link escrito Exemplos de comunidades. Clique em Exemplos de comunidades."
      );
      utter.lang = "pt-BR";
      utter.rate = 0.85;
      synth.speak(utter);
    }
  };

  const handleCommunityExamples = () => {
    setCommunityStep(2);
    const synth = window.speechSynthesis;
    if (synth) {
      synth.cancel();
      const utter = new SpeechSynthesisUtterance(
        "Nesta tela, o WhatsApp mostra exemplos de como as comunidades podem ser usadas, como condomínio, clube ou bairro. Esta tela é apenas para explicação. Agora, clique na seta para a esquerda, no canto superior, para voltar."
      );
      utter.lang = "pt-BR";
      utter.rate = 0.85;
      synth.speak(utter);
    }
  };

  const handleBackFromExamples = () => {
    setCommunityStep(1);
    const synth = window.speechSynthesis;
    if (synth) {
      synth.cancel();
      const utter = new SpeechSynthesisUtterance(
        "Você voltou para a tela Criar comunidade. Agora, clique no botão verde, escrito Começar, bem embaixo da tela."
      );
      utter.lang = "pt-BR";
      utter.rate = 0.85;
      synth.speak(utter);
    }
  };

  const handleStartCommunity = () => {
    setCommunityStep(3);
    const synth = window.speechSynthesis;
    if (synth) {
      synth.cancel();
      const utter = new SpeechSynthesisUtterance(
        "Agora vamos dar um nome à comunidade. Toque no campo Nome da comunidade e digite o nome desejado. Depois de digitar o nome, clique na seta verde, no canto inferior direito."
      );
      utter.lang = "pt-BR";
      utter.rate = 0.85;
      synth.speak(utter);
    }
  };

  const handleConfirmCommunityName = () => {
    setCommunityStep(4);
    const synth = window.speechSynthesis;
    if (synth) {
      synth.cancel();
      const utter = new SpeechSynthesisUtterance(
        "Pronto. A comunidade foi criada. Nesta tela, você vê dois grupos: Avisos e Geral. Agora, vamos adicionar pessoas à comunidade. Clique em Adicionar membros."
      );
      utter.lang = "pt-BR";
      utter.rate = 0.85;
      synth.speak(utter);
    }
  };

  const handleAddCommunityMembers = () => {
    setCommunityStep(5);
    const synth = window.speechSynthesis;
    if (synth) {
      synth.cancel();
      const utter = new SpeechSynthesisUtterance(
        "Esta é a lista de contatos do seu WhatsApp. Toque nos nomes das pessoas que você deseja adicionar à comunidade. Depois de selecionar as pessoas, clique na seta verde, no canto inferior direito."
      );
      utter.lang = "pt-BR";
      utter.rate = 0.85;
      synth.speak(utter);
    }
  };

  const toggleCommunityMember = (contactId) => {
    if (communityMembers.includes(contactId)) {
      setCommunityMembers(communityMembers.filter(id => id !== contactId));
    } else {
      setCommunityMembers([...communityMembers, contactId]);
    }
  };

  const handleConfirmMembers = () => {
    setCommunityStep(6);
    const synth = window.speechSynthesis;
    if (synth) {
      synth.cancel();
      const utter = new SpeechSynthesisUtterance(
        "Apareceu uma mensagem perguntando se você deseja adicionar as pessoas selecionadas. Para continuar, clique no botão Adicionar."
      );
      utter.lang = "pt-BR";
      utter.rate = 0.85;
      synth.speak(utter);
    }
  };

  const handleAddMembersToCommunity = () => {
    setCommunityStep(7);
    const synth = window.speechSynthesis;
    if (synth) {
      synth.cancel();
      const utter = new SpeechSynthesisUtterance(
        "Parabéns. A comunidade foi criada com sucesso. Esta é a tela Bem-vindo à comunidade. Aqui você pode enviar avisos importantes para todos os membros."
      );
      utter.lang = "pt-BR";
      utter.rate = 0.85;
      synth.speak(utter);
    }
  };

  const handleFinishCommunity = () => {
    const synth = window.speechSynthesis;
    if (synth) {
      synth.cancel();
      const utter = new SpeechSynthesisUtterance(
        "Comunidade criada com sucesso. Agora é só usar o grupo de avisos para comunicar todos os membros."
      );
      utter.lang = "pt-BR";
      utter.rate = 0.85;
      synth.speak(utter);

      setTimeout(() => {
        setCreatingCommunity(false);
        setCommunityStep(1);
        setCommunityName("");
        setCommunityMembers([]);
      }, 3000);
    } else {
      setCreatingCommunity(false);
      setCommunityStep(1);
      setCommunityName("");
      setCommunityMembers([]);
    }
  };

  const handleBroadcastList = () => {
    setShowMenu(false);
    setBroadcastList(true);
    setBroadcastStep(1);
    const synth = window.speechSynthesis;
    if (synth) {
      synth.cancel();
      const utter = new SpeechSynthesisUtterance(
        "Esta é a tela das listas de transmissão. Para criar uma nova lista, clique no botão verde, no canto inferior da tela."
      );
      utter.lang = "pt-BR";
      utter.rate = 0.85;
      synth.speak(utter);
    }
  };

  const handleCreateBroadcast = () => {
    setBroadcastStep(2);
    const synth = window.speechSynthesis;
    if (synth) {
      synth.cancel();
      const utter = new SpeechSynthesisUtterance(
        "Agora você vai escolher as pessoas que receberão suas mensagens. Toque nos nomes das pessoas que você deseja adicionar à lista. Depois de selecionar, clique na seta verde, no canto inferior direito."
      );
      utter.lang = "pt-BR";
      utter.rate = 0.85;
      synth.speak(utter);
    }
  };

  const toggleBroadcastContact = (contactId) => {
    if (broadcastContacts.includes(contactId)) {
      setBroadcastContacts(broadcastContacts.filter(id => id !== contactId));
    } else {
      setBroadcastContacts([...broadcastContacts, contactId]);
    }
  };

  const handleConfirmBroadcastContacts = () => {
    setBroadcastStep(3);
    setBroadcastName("Lista de transmissão");
    const synth = window.speechSynthesis;
    if (synth) {
      synth.cancel();
      const utter = new SpeechSynthesisUtterance(
        "Pronto. A lista de transmissão foi criada. Esta tela parece uma conversa comum, mas a mensagem será enviada para todas as pessoas da lista."
      );
      utter.lang = "pt-BR";
      utter.rate = 0.85;
      synth.speak(utter);
    }
  };

  const handleSendBroadcast = () => {
    if (broadcastMessage.trim()) {
      setBroadcastStep(4);
      const synth = window.speechSynthesis;
      if (synth) {
        synth.cancel();
        const utter = new SpeechSynthesisUtterance(
          "Atenção. As pessoas só recebem a mensagem se tiverem o seu número salvo na agenda delas. Elas recebem a mensagem em conversa individual, e não sabem que foi enviada para outras pessoas."
        );
        utter.lang = "pt-BR";
        utter.rate = 0.85;
        synth.speak(utter);

        setTimeout(() => {
          const utter2 = new SpeechSynthesisUtterance(
            "Lista de transmissão não é grupo. Ninguém conversa entre si. Você envia uma mensagem, e cada pessoa recebe separadamente. Lista de transmissão criada com sucesso. Agora você pode enviar avisos para várias pessoas ao mesmo tempo."
          );
          utter2.lang = "pt-BR";
          utter2.rate = 0.85;
          synth.speak(utter2);

          setTimeout(() => {
            setBroadcastList(false);
            setBroadcastStep(1);
            setBroadcastContacts([]);
            setBroadcastName("");
            setBroadcastMessage("");
          }, 8000);
        }, 6000);
      }
    }
  };

  const handleConnectedDevices = () => {
    setShowMenu(false);
    setConnectedDevices(true);
    setDeviceStep(1);
    const synth = window.speechSynthesis;
    if (synth) {
      synth.cancel();
      const utter = new SpeechSynthesisUtterance(
        "Você está na tela Dispositivos conectados. Esta tela mostra quais computadores ou aparelhos estão usando o seu WhatsApp neste momento. Aqui você pode ver e desconectar dispositivos."
      );
      utter.lang = "pt-BR";
      utter.rate = 0.85;
      synth.speak(utter);

      setTimeout(() => {
        const utter2 = new SpeechSynthesisUtterance(
          "Atenção. Esta tela não conecta sozinha o WhatsApp no computador. Para conectar, precisamos primeiro usar o computador."
        );
        utter2.lang = "pt-BR";
        utter2.rate = 0.85;
        synth.speak(utter2);
      }, 8000);
    }
  };

  const handleConnectDevice = () => {
    setDeviceStep(2);
    const synth = window.speechSynthesis;
    if (synth) {
      synth.cancel();
      const utter = new SpeechSynthesisUtterance(
        "Agora vamos usar esta tela para finalizar a conexão com o computador. Primeiro, vá até o computador. No computador, abra o navegador de internet. Digite: web ponto whatsapp ponto com. Na tela, vai aparecer um quadrado com pontinhos, chamado Código QR. Deixe esta tela aberta."
      );
      utter.lang = "pt-BR";
      utter.rate = 0.85;
      synth.speak(utter);
    }
  };

  const handleScanQR = () => {
    setDeviceStep(3);
    const synth = window.speechSynthesis;
    if (synth) {
      synth.cancel();
      const utter = new SpeechSynthesisUtterance(
        "Agora volte para o celular. Você continua na tela Dispositivos conectados. Observe o botão escrito Conectar um dispositivo. Toque neste botão."
      );
      utter.lang = "pt-BR";
      utter.rate = 0.85;
      synth.speak(utter);
    }
  };

  const handleCameraOpen = () => {
    setDeviceStep(4);
    const synth = window.speechSynthesis;
    if (synth) {
      synth.cancel();
      const utter = new SpeechSynthesisUtterance(
        "A câmera do celular será aberta. Aponte a câmera para o Código QR que está no computador."
      );
      utter.lang = "pt-BR";
      utter.rate = 0.85;
      synth.speak(utter);

      // Simular conexão após 3 segundos
      setTimeout(() => {
        const newDevice = {
          id: Date.now(),
          name: "Google Chrome (Windows)",
          lastActive: "Ativo agora",
          icon: "💻"
        };
        setDevices([...devices, newDevice]);
        setDeviceStep(5);

        const utter2 = new SpeechSynthesisUtterance(
          "Pronto. O computador agora aparece na lista como Ativo agora. Isso confirma que a conexão foi realizada."
        );
        utter2.lang = "pt-BR";
        utter2.rate = 0.85;
        synth.speak(utter2);

        setTimeout(() => {
          const utter3 = new SpeechSynthesisUtterance(
            "Sempre que quiser ver quem está conectado, desconectar um computador, ou conferir segurança, use esta mesma tela: Dispositivos conectados. Conexão concluída com segurança. Quando terminar de usar no computador, volte aqui e desconecte."
          );
          utter3.lang = "pt-BR";
          utter3.rate = 0.85;
          synth.speak(utter3);

          setTimeout(() => {
            setDeviceStep(1);
          }, 12000);
        }, 6000);
      }, 3000);
    }
  };

  const handleDisconnectDevice = (deviceId) => {
    setDevices(devices.filter(d => d.id !== deviceId));
    const synth = window.speechSynthesis;
    if (synth) {
      synth.cancel();
      const utter = new SpeechSynthesisUtterance("Dispositivo desconectado com sucesso");
      utter.lang = "pt-BR";
      utter.rate = 0.85;
      synth.speak(utter);
    }
  };

  const handleFavorites = () => {
    setShowMenu(false);
    setShowFavorites(true);
    setFavoriteStep(1);
    const synth = window.speechSynthesis;
    if (synth) {
      synth.cancel();
      const utter = new SpeechSynthesisUtterance(
        "Você está na tela Favoritas. Aqui ficam as conversas das pessoas mais importantes para você. As conversas favoritas aparecem sempre no topo."
      );
      utter.lang = "pt-BR";
      utter.rate = 0.85;
      synth.speak(utter);

      if (favoriteContacts.length === 0) {
        setTimeout(() => {
          const utter2 = new SpeechSynthesisUtterance(
            "Se esta tela estiver vazia, não se preocupe. Vamos adicionar pessoas agora."
          );
          utter2.lang = "pt-BR";
          utter2.rate = 0.85;
          synth.speak(utter2);
        }, 7000);
      }
    }
  };

  const handleAddToFavorites = () => {
    setFavoriteStep(2);
    const synth = window.speechSynthesis;
    if (synth) {
      synth.cancel();
      const utter = new SpeechSynthesisUtterance(
        "Agora aparece a lista de contatos do seu WhatsApp. Toque no nome da pessoa que você quer colocar como favorita."
      );
      utter.lang = "pt-BR";
      utter.rate = 0.85;
      synth.speak(utter);
    }
  };

  const toggleFavorite = (contactId) => {
    if (favoriteContacts.includes(contactId)) {
      setFavoriteContacts(favoriteContacts.filter(id => id !== contactId));
      const synth = window.speechSynthesis;
      if (synth) {
        synth.cancel();
        const utter = new SpeechSynthesisUtterance("Removido das favoritas");
        utter.lang = "pt-BR";
        utter.rate = 0.85;
        synth.speak(utter);
      }
    } else {
      setFavoriteContacts([...favoriteContacts, contactId]);
      const synth = window.speechSynthesis;
      if (synth) {
        synth.cancel();
        const utter = new SpeechSynthesisUtterance(
          "Pronto. A pessoa foi adicionada às favoritas. A conversa dela ficará sempre em destaque."
        );
        utter.lang = "pt-BR";
        utter.rate = 0.85;
        synth.speak(utter);

        setTimeout(() => {
          const utter2 = new SpeechSynthesisUtterance(
            "Favoritas servem para facilitar. Você encontra rapidamente filhos, netos, familiares ou pessoas importantes."
          );
          utter2.lang = "pt-BR";
          utter2.rate = 0.85;
          synth.speak(utter2);
        }, 5000);
      }
    }
  };

  const handleFindBusiness = () => {
    setShowMenu(false);
    setFindBusiness(true);
    setBusinessStep(1);
    const synth = window.speechSynthesis;
    if (synth) {
      synth.cancel();
      const utter = new SpeechSynthesisUtterance(
        "Você está na tela Encontrar empresas. Aqui você pode procurar lojas, farmácias, mercados e outros serviços que usam WhatsApp."
      );
      utter.lang = "pt-BR";
      utter.rate = 0.85;
      synth.speak(utter);

      setTimeout(() => {
        const utter2 = new SpeechSynthesisUtterance(
          "Observe a parte de cima da tela. Existe um campo para pesquisar empresas. Toque neste campo para digitar o que você procura."
        );
        utter2.lang = "pt-BR";
        utter2.rate = 0.85;
        synth.speak(utter2);
      }, 7000);
    }
  };

  const handleBusinessSearch = () => {
    setBusinessStep(2);
    const synth = window.speechSynthesis;
    if (synth) {
      synth.cancel();
      const utter = new SpeechSynthesisUtterance(
        "Agora digite o nome da empresa ou o tipo de serviço. Por exemplo: farmácia, mercado, padaria ou o nome da loja."
      );
      utter.lang = "pt-BR";
      utter.rate = 0.85;
      synth.speak(utter);
    }
  };

  const handleBusinessResults = () => {
    setBusinessStep(3);
    const synth = window.speechSynthesis;
    if (synth) {
      synth.cancel();
      const utter = new SpeechSynthesisUtterance(
        "Abaixo aparecem empresas relacionadas com o que você digitou. Toque no nome da empresa que você deseja conhecer."
      );
      utter.lang = "pt-BR";
      utter.rate = 0.85;
      synth.speak(utter);
    }
  };

  const handleSelectBusiness = (business) => {
    setSelectedBusiness(business);
    setBusinessStep(4);
    const synth = window.speechSynthesis;
    if (synth) {
      synth.cancel();
      const utter = new SpeechSynthesisUtterance(
        "Esta é a tela da empresa. Aqui você pode ver: o nome, a foto, informações e horário de atendimento."
      );
      utter.lang = "pt-BR";
      utter.rate = 0.85;
      synth.speak(utter);

      setTimeout(() => {
        const utter2 = new SpeechSynthesisUtterance(
          "Para falar com a empresa, toque em Conversar ou Enviar mensagem."
        );
        utter2.lang = "pt-BR";
        utter2.rate = 0.85;
        synth.speak(utter2);
      }, 6000);
    }
  };

  const handleStartBusinessChat = () => {
    setBusinessStep(5);
    const synth = window.speechSynthesis;
    if (synth) {
      synth.cancel();
      const utter = new SpeechSynthesisUtterance(
        "Pronto. Agora você pode escrever e conversar diretamente com a empresa, como em qualquer conversa do WhatsApp."
      );
      utter.lang = "pt-BR";
      utter.rate = 0.85;
      synth.speak(utter);

      setTimeout(() => {
        const utter2 = new SpeechSynthesisUtterance(
          "Atenção. Sempre confirme se a empresa é verdadeira. Empresas confiáveis costumam ter perfil completo e informações claras."
        );
        utter2.lang = "pt-BR";
        utter2.rate = 0.85;
        synth.speak(utter2);
      }, 5000);
    }
  };

  const handlePayments = () => {
    setShowMenu(false);
    setShowPayments(true);
    setPaymentStep(1);
    const synth = window.speechSynthesis;
    if (synth) {
      synth.cancel();
      const utter = new SpeechSynthesisUtterance(
        "Você está na tela Pagamentos do WhatsApp. Aqui você pode enviar e receber dinheiro usando o WhatsApp, de forma simples e segura."
      );
      utter.lang = "pt-BR";
      utter.rate = 0.85;
      synth.speak(utter);

      setTimeout(() => {
        const utter2 = new SpeechSynthesisUtterance(
          "Se esta for a primeira vez, o WhatsApp pode pedir para confirmar seus dados. Isso é normal e serve para sua segurança."
        );
        utter2.lang = "pt-BR";
        utter2.rate = 0.85;
        synth.speak(utter2);
      }, 7000);
    }
  };

  const handleConfigurePayment = () => {
    setPaymentStep(2);
    const synth = window.speechSynthesis;
    if (synth) {
      synth.cancel();
      const utter = new SpeechSynthesisUtterance(
        "Para usar os pagamentos, é necessário cadastrar um cartão ou conta bancária. Siga as instruções que aparecem na tela com calma."
      );
      utter.lang = "pt-BR";
      utter.rate = 0.85;
      synth.speak(utter);

      setTimeout(() => {
        const utter2 = new SpeechSynthesisUtterance(
          "O WhatsApp não guarda seu dinheiro, ele apenas faz a transferência entre as pessoas."
        );
        utter2.lang = "pt-BR";
        utter2.rate = 0.85;
        synth.speak(utter2);
      }, 7000);
    }
  };

  const handlePaymentConfigured = () => {
    setPaymentConfigured(true);
    setPaymentStep(3);
    const synth = window.speechSynthesis;
    if (synth) {
      synth.cancel();
      const utter = new SpeechSynthesisUtterance(
        "Depois de configurado, você verá as opções para Enviar ou Receber dinheiro."
      );
      utter.lang = "pt-BR";
      utter.rate = 0.85;
      synth.speak(utter);
    }
  };

  const handleSendMoney = () => {
    setPaymentStep(4);
    const synth = window.speechSynthesis;
    if (synth) {
      synth.cancel();
      const utter = new SpeechSynthesisUtterance(
        "Para enviar dinheiro, escolha a pessoa da conversa e toque em Pagamento. Digite o valor e confirme."
      );
      utter.lang = "pt-BR";
      utter.rate = 0.85;
      synth.speak(utter);
    }
  };

  const handleConfirmPayment = () => {
    setPaymentStep(5);
    const synth = window.speechSynthesis;
    if (synth) {
      synth.cancel();
      const utter = new SpeechSynthesisUtterance(
        "Antes de finalizar, o WhatsApp pede uma confirmação. Confira o valor com atenção e confirme o pagamento."
      );
      utter.lang = "pt-BR";
      utter.rate = 0.85;
      synth.speak(utter);
    }
  };

  const handlePaymentSent = () => {
    setPaymentStep(7);
    const synth = window.speechSynthesis;
    if (synth) {
      synth.cancel();
      const utter = new SpeechSynthesisUtterance(
        "Pronto. O pagamento foi enviado com sucesso. Você verá a confirmação na conversa."
      );
      utter.lang = "pt-BR";
      utter.rate = 0.85;
      synth.speak(utter);

      setTimeout(() => {
        const utter2 = new SpeechSynthesisUtterance(
          "Atenção. Só envie dinheiro para pessoas que você conhece. Se tiver dúvida, não confirme o pagamento."
        );
        utter2.lang = "pt-BR";
        utter2.rate = 0.85;
        synth.speak(utter2);
      }, 5000);
    }
  };

  const handleMarkAllRead = () => {
    setShowMenu(false);
    setMarkAllRead(true);
    setMarkAllReadStep(1);
    const synth = window.speechSynthesis;
    if (synth) {
      synth.cancel();
      const utter = new SpeechSynthesisUtterance(
        "Você está na tela de Conversas do WhatsApp. Aqui aparecem todas as mensagens recebidas, lidas e não lidas."
      );
      utter.lang = "pt-BR";
      utter.rate = 0.85;
      synth.speak(utter);

      setTimeout(() => {
        const utter2 = new SpeechSynthesisUtterance(
          "Observe as conversas. As mensagens não lidas aparecem com um número ou com destaque em verde."
        );
        utter2.lang = "pt-BR";
        utter2.rate = 0.85;
        synth.speak(utter2);
      }, 7000);
    }
  };

  const handleShowMarkOption = () => {
    setMarkAllReadStep(2);
    const synth = window.speechSynthesis;
    if (synth) {
      synth.cancel();
      const utter = new SpeechSynthesisUtterance(
        "No canto superior da tela, existe a opção Marcar tudo como lida. Essa opção serve para limpar todos os avisos de mensagens novas de uma só vez."
      );
      utter.lang = "pt-BR";
      utter.rate = 0.85;
      synth.speak(utter);
    }
  };

  const handleConfirmMarkAllRead = () => {
    setMarkAllReadStep(3);
    const synth = window.speechSynthesis;
    if (synth) {
      synth.cancel();
      const utter = new SpeechSynthesisUtterance(
        "Ao tocar nessa opção, o WhatsApp pode pedir uma confirmação. Para continuar, confirme a ação."
      );
      utter.lang = "pt-BR";
      utter.rate = 0.85;
      synth.speak(utter);
    }
  };

  const handleExecuteMarkAllRead = () => {
    // Marca todas as conversas como lidas
    setChats(chats.map(chat => ({ ...chat, unread: 0 })));
    setMarkAllReadStep(4);
    const synth = window.speechSynthesis;
    if (synth) {
      synth.cancel();
      const utter = new SpeechSynthesisUtterance(
        "Pronto. Todas as mensagens foram marcadas como lidas. Os números e avisos desapareceram da tela."
      );
      utter.lang = "pt-BR";
      utter.rate = 0.85;
      synth.speak(utter);

      setTimeout(() => {
        const utter2 = new SpeechSynthesisUtterance(
          "Essa função é útil quando você recebeu muitas mensagens e quer organizar a tela rapidamente."
        );
        utter2.lang = "pt-BR";
        utter2.rate = 0.85;
        synth.speak(utter2);
      }, 6000);

      setTimeout(() => {
        const utter3 = new SpeechSynthesisUtterance(
          "Atenção. Marcar como lida não apaga as mensagens. Elas continuam guardadas normalmente."
        );
        utter3.lang = "pt-BR";
        utter3.rate = 0.85;
        synth.speak(utter3);
      }, 11000);

      setTimeout(() => {
        const utter4 = new SpeechSynthesisUtterance(
          "Pronto. Agora sua tela de conversas está organizada novamente. Marcar tudo como lida ajuda a manter o WhatsApp organizado."
        );
        utter4.lang = "pt-BR";
        utter4.rate = 0.85;
        synth.speak(utter4);

        setTimeout(() => {
          setMarkAllRead(false);
          setMarkAllReadStep(1);
        }, 8000);
      }, 16000);
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
      
      setTimeout(() => {
        setCreatingGroup(false);
        setGroupStep(1);
        setSelectedContacts([]);
        setGroupName("");
      }, 2000);
    } else {
      setCreatingGroup(false);
      setGroupStep(1);
      setSelectedContacts([]);
      setGroupName("");
    }
  };

  const handleChatClick = (chat) => {
    setSelectedChat(chat);
    setMessages(chat.messages);
    setChats(chats.map(c => c.id === chat.id ? { ...c, unread: 0 } : c));
    
    // Áudio de introdução
    setTimeout(() => {
      const synth = window.speechSynthesis;
      if (synth) {
        synth.cancel();
        const utter = new SpeechSynthesisUtterance(
          "Aqui você manda mensagem para o grupo ou para uma pessoa, seu filho, seu neto ou amigos. Clique nos três pontinhos à sua direita acima para conhecer melhor."
        );
        utter.lang = "pt-BR";
        utter.rate = 0.80;
        synth.speak(utter);
      }
    }, 300);
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
    { icon: FileText, label: "Documento", color: "bg-purple-500", page: "DocumentoAnexo" },
    { icon: Camera, label: "Câmera", color: "bg-pink-500", page: "CameraConversaGuia" },
    { icon: ImageIcon, label: "Galeria", color: "bg-purple-600", page: "GaleriaAnexo" },
    { icon: Music, label: "Áudio", color: "bg-orange-500", page: "AudioAnexo" },
    { icon: DollarSign, label: "Pagamento", color: "bg-teal-500", page: "PagamentoAnexo" },
    { icon: MapPin, label: "Localização", color: "bg-green-500", page: "LocalizacaoAnexo" },
    { icon: User, label: "Contato", color: "bg-blue-500", page: "ContatoAnexo" },
    { icon: BarChart3, label: "Enquete", color: "bg-indigo-500", page: "EnqueteAnexo" },
    { icon: List, label: "Lista", color: "bg-yellow-600", page: "ListaAnexo" },
  ];

  const chatMenuOptions = [
    { icon: InfoIcon, label: "Ver contato", page: "VerContatoGuia" },
    { icon: ImageIcon, label: "Mídia, links e docs", hasChevron: true, page: "MidiaLinksDocsGuia" },
    { icon: Search, label: "Pesquisar", page: "PesquisarConversaGuia" },
    { icon: Star, label: "Adicionar aos favoritos", page: "AdicionarFavoritosGuia" },
    { icon: Bell, label: "Silenciar notificações", page: "SilenciarNotificacoesGuia" },
    { icon: MessageSquare, label: "Mensagens temporárias", hasChevron: true, page: "MensagensTemporariasGuia" },
    { icon: Wallpaper, label: "Papel de parede", page: "PapelParedeGuia" },
    { icon: MoreVertical, label: "Mais", page: "MenuConversaMais" },
  ];

  const filteredChats = chats.filter(chat => {
    if (chatsFilter === "all") return true;
    if (chatsFilter === "unread") return chat.unread > 0;
    if (chatsFilter === "groups") return chat.isGroup;
    if (chatsFilter === "favorites") return favoriteContacts.includes(chat.id);
    return true;
  });

  // Telas de Marcar tudo como lida
  if (markAllRead && markAllReadStep === 1) {
    return (
      <PhoneFrame>
        <div className="h-full bg-white flex flex-col">
          <StatusBar variant="light" />

          {/* Header */}
          <div className="bg-white px-4 py-3">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <button onClick={() => navigate(createPageUrl("Home"))}>
                  <ArrowLeft className="w-6 h-6 text-gray-700" />
                </button>
                <h1 className="text-2xl font-semibold text-[#008069]">WhatsApp</h1>
              </div>
              <div className="flex gap-5 items-center">
                <button onClick={() => setMarkAllRead(false)}>
                  <X className="w-6 h-6 text-gray-700" />
                </button>
              </div>
            </div>
          </div>

          {/* Lista de Conversas com destaque nas não lidas */}
          <div className="flex-1 overflow-y-auto bg-white">
            <div className="p-4 bg-yellow-50 border-b-2 border-yellow-400">
              <p className="text-sm text-gray-800 text-center">
                👀 <strong>Observe:</strong> Mensagens não lidas aparecem com número verde
              </p>
            </div>

            {chats.slice(0, 5).map((chat) => (
              <div
                key={chat.id}
                className={`flex items-center gap-3 px-4 py-3 border-b border-gray-100 ${
                  chat.unread > 0 ? 'bg-green-50' : ''
                }`}
              >
                <div className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center text-xl flex-shrink-0">
                  {chat.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start mb-0.5">
                    <h3 className={`font-medium text-gray-900 text-[16px] truncate ${
                      chat.unread > 0 ? 'font-bold' : ''
                    }`}>
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
                    {chat.unread > 0 && (
                      <span className="bg-[#25D366] text-white text-xs font-bold px-2 py-0.5 rounded-full flex-shrink-0">
                        {chat.unread}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Botão continuar */}
          <div className="p-4">
            <button
              onClick={handleShowMarkOption}
              className="w-full bg-[#25D366] text-white py-3 rounded-lg font-medium"
            >
              Continuar
            </button>
          </div>
        </div>
      </PhoneFrame>
    );
  }

  if (markAllRead && markAllReadStep === 2) {
    return (
      <PhoneFrame>
        <div className="h-full bg-white flex flex-col">
          <StatusBar variant="light" />

          {/* Header com opção em destaque */}
          <div className="bg-white px-4 py-3">
            <div className="flex justify-between items-center">
              <h1 className="text-2xl font-semibold text-[#008069]">WhatsApp</h1>
              <div className="flex gap-5 items-center">
                <button onClick={() => setMarkAllRead(false)}>
                  <X className="w-6 h-6 text-gray-700" />
                </button>
              </div>
            </div>
          </div>

          {/* Indicador da opção */}
          <div className="p-4 bg-blue-50 border-b-2 border-blue-500">
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-800">
                👆 <strong>Esta é a opção:</strong>
              </p>
              <button
                onClick={handleConfirmMarkAllRead}
                className="px-4 py-2 bg-[#25D366] text-white rounded-lg font-medium text-sm"
              >
                Marcar tudo como lida
              </button>
            </div>
          </div>

          {/* Lista de Conversas */}
          <div className="flex-1 overflow-y-auto bg-white">
            {chats.slice(0, 5).map((chat) => (
              <div
                key={chat.id}
                className={`flex items-center gap-3 px-4 py-3 border-b border-gray-100 ${
                  chat.unread > 0 ? 'bg-green-50' : ''
                }`}
              >
                <div className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center text-xl flex-shrink-0">
                  {chat.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start mb-0.5">
                    <h3 className={`font-medium text-gray-900 text-[16px] truncate ${
                      chat.unread > 0 ? 'font-bold' : ''
                    }`}>
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
                    {chat.unread > 0 && (
                      <span className="bg-[#25D366] text-white text-xs font-bold px-2 py-0.5 rounded-full flex-shrink-0">
                        {chat.unread}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 bg-yellow-50 border-t-2 border-yellow-400">
            <p className="text-sm text-gray-800 text-center">
              💡 Essa opção limpa todos os avisos de mensagens novas de uma só vez
            </p>
          </div>
        </div>
      </PhoneFrame>
    );
  }

  if (markAllRead && markAllReadStep === 3) {
    return (
      <PhoneFrame>
        <div className="h-full bg-black/50 flex items-center justify-center p-6">
          <div className="bg-white rounded-lg p-6 max-w-sm w-full">
            <h3 className="text-lg font-semibold text-gray-900 mb-3 text-center">
              Marcar todas como lidas?
            </h3>
            <p className="text-sm text-gray-600 text-center mb-6">
              Isso irá remover os avisos de mensagens não lidas de todas as conversas. As mensagens não serão apagadas.
            </p>
            <div className="space-y-3">
              <button
                onClick={handleExecuteMarkAllRead}
                className="w-full py-3 bg-[#25D366] text-white rounded-lg font-medium"
              >
                Confirmar
              </button>
              <button
                onClick={() => setMarkAllReadStep(2)}
                className="w-full py-3 border border-gray-300 rounded-lg font-medium text-gray-700"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      </PhoneFrame>
    );
  }

  if (markAllRead && markAllReadStep === 4) {
    return (
      <PhoneFrame>
        <div className="h-full bg-white flex flex-col">
          <StatusBar variant="light" />

          {/* Header */}
          <div className="bg-white px-4 py-3">
            <div className="flex justify-between items-center">
              <h1 className="text-2xl font-semibold text-[#008069]">WhatsApp</h1>
            </div>
          </div>

          {/* Sucesso */}
          <div className="p-6 flex flex-col items-center justify-center bg-green-50">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <Check className="w-12 h-12 text-green-600" strokeWidth={3} />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2 text-center">
              Pronto!
            </h3>
            <p className="text-gray-600 text-center mb-4">
              Todas as mensagens foram marcadas como lidas
            </p>
          </div>

          {/* Lista de Conversas sem avisos */}
          <div className="flex-1 overflow-y-auto bg-white">
            <div className="p-4 bg-blue-50 border-b border-blue-200">
              <p className="text-sm text-gray-800 text-center">
                ✓ Os números e avisos desapareceram da tela
              </p>
            </div>

            {chats.slice(0, 5).map((chat) => (
              <div
                key={chat.id}
                className="flex items-center gap-3 px-4 py-3 border-b border-gray-100"
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
                  <p className="text-sm text-gray-600 truncate">
                    {chat.message}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 space-y-3">
            <div className="bg-green-50 border-l-4 border-green-500 p-4">
              <p className="text-sm text-gray-800">
                ✓ <strong>Útil quando:</strong> Você recebeu muitas mensagens e quer organizar rapidamente
              </p>
            </div>
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
              <p className="text-sm text-gray-800">
                ⚠️ <strong>Lembre-se:</strong> Marcar como lida não apaga as mensagens. Elas continuam guardadas.
              </p>
            </div>
          </div>
        </div>
      </PhoneFrame>
    );
  }

  // Telas de Pagamentos
  if (showPayments && paymentStep === 1) {
    return (
      <PhoneFrame>
        <div className="h-full bg-white flex flex-col">
          <StatusBar variant="light" />

          {/* Header */}
          <div className="bg-[#008069] text-white px-4 py-3 flex items-center gap-4">
            <button onClick={() => setShowPayments(false)}>
              <ArrowLeft className="w-6 h-6" />
            </button>
            <h2 className="text-lg font-medium">Pagamentos</h2>
          </div>

          {/* Conteúdo */}
          <div className="flex-1 flex flex-col items-center justify-center px-6">
            <div className="w-32 h-32 bg-[#25D366]/10 rounded-full flex items-center justify-center mb-6">
              <DollarSign className="w-16 h-16 text-[#25D366]" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3 text-center">
              Pagamentos do WhatsApp
            </h3>
            <p className="text-gray-600 text-center mb-6 leading-relaxed">
              Envie e receba dinheiro usando o WhatsApp, de forma simples e segura
            </p>

            <div className="w-full bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
              <p className="text-sm text-gray-800">
                💡 <strong>Atenção:</strong> O WhatsApp não guarda seu dinheiro, ele apenas faz a transferência entre as pessoas.
              </p>
            </div>

            <button
              onClick={handleConfigurePayment}
              className="w-full bg-[#25D366] text-white py-3 rounded-lg font-medium mb-3"
            >
              Configurar pagamentos
            </button>

            <p className="text-xs text-gray-500 text-center">
              Você precisará adicionar um cartão ou conta bancária
            </p>
          </div>
        </div>
      </PhoneFrame>
    );
  }

  if (showPayments && paymentStep === 2) {
    return (
      <PhoneFrame>
        <div className="h-full bg-white flex flex-col">
          <StatusBar variant="light" />

          {/* Header */}
          <div className="bg-[#008069] text-white px-4 py-3 flex items-center gap-4">
            <button onClick={() => setPaymentStep(1)}>
              <ArrowLeft className="w-6 h-6" />
            </button>
            <h2 className="text-lg font-medium">Configurar pagamentos</h2>
          </div>

          {/* Conteúdo */}
          <div className="flex-1 overflow-y-auto p-6">
            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
              <div className="flex gap-2">
                <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-blue-900 mb-2">Como funciona</h3>
                  <p className="text-sm text-blue-800">
                    O WhatsApp não guarda seu dinheiro. Ele apenas faz a transferência entre as pessoas de forma segura.
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="bg-white rounded-lg border border-gray-200 p-4">
                <div className="flex items-center gap-3 mb-3">
                  <CreditCard className="w-6 h-6 text-[#25D366]" />
                  <h4 className="font-semibold text-gray-900">Adicionar cartão</h4>
                </div>
                <p className="text-sm text-gray-600 mb-3">
                  Cadastre seu cartão de crédito ou débito para fazer pagamentos
                </p>
                <button className="w-full bg-gray-100 text-gray-700 py-2 rounded-lg font-medium">
                  Adicionar cartão
                </button>
              </div>

              <div className="bg-white rounded-lg border border-gray-200 p-4">
                <div className="flex items-center gap-3 mb-3">
                  <Shield className="w-6 h-6 text-[#25D366]" />
                  <h4 className="font-semibold text-gray-900">Conta bancária</h4>
                </div>
                <p className="text-sm text-gray-600 mb-3">
                  Conecte sua conta bancária para transferências
                </p>
                <button className="w-full bg-gray-100 text-gray-700 py-2 rounded-lg font-medium">
                  Adicionar conta
                </button>
              </div>
            </div>

            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mt-6">
              <p className="text-sm text-gray-800">
                ⚠️ Siga as instruções com calma. Seus dados estarão protegidos.
              </p>
            </div>
          </div>

          {/* Botão pular (simular configuração) */}
          <div className="p-4">
            <button
              onClick={handlePaymentConfigured}
              className="w-full bg-[#25D366] text-white py-3 rounded-lg font-medium"
            >
              Continuar (simulação)
            </button>
          </div>
        </div>
      </PhoneFrame>
    );
  }

  if (showPayments && paymentStep === 3) {
    return (
      <PhoneFrame>
        <div className="h-full bg-white flex flex-col">
          <StatusBar variant="light" />

          {/* Header */}
          <div className="bg-[#008069] text-white px-4 py-3 flex items-center gap-4">
            <button onClick={() => {
              const synth = window.speechSynthesis;
              if (synth) {
                synth.cancel();
                const utter = new SpeechSynthesisUtterance(
                  "Para sair da área de pagamentos, clique na seta preta, no canto superior esquerdo. Você volta ao WhatsApp normalmente. Pagamentos no WhatsApp facilitam enviar e receber dinheiro sem sair do aplicativo."
                );
                utter.lang = "pt-BR";
                utter.rate = 0.85;
                synth.speak(utter);
              }
              setTimeout(() => {
                setShowPayments(false);
                setPaymentStep(1);
              }, 2000);
            }}>
              <ArrowLeft className="w-6 h-6" />
            </button>
            <h2 className="text-lg font-medium">Pagamentos</h2>
            <button className="ml-auto">
              <History className="w-6 h-6" />
            </button>
          </div>

          {/* Ações principais */}
          <div className="p-4 space-y-4">
            <button
              onClick={handleSendMoney}
              className="w-full bg-[#25D366] text-white py-4 rounded-lg font-medium flex items-center justify-center gap-3"
            >
              <Send className="w-5 h-5" />
              Enviar dinheiro
            </button>

            <button
              className="w-full bg-white border-2 border-[#25D366] text-[#25D366] py-4 rounded-lg font-medium flex items-center justify-center gap-3"
            >
              <DollarSign className="w-5 h-5" />
              Receber dinheiro
            </button>
          </div>

          {/* Informações */}
          <div className="px-4 py-3 bg-gray-50">
            <h3 className="font-semibold text-gray-900 mb-2">Como funciona</h3>
            <div className="space-y-2 text-sm text-gray-600">
              <p>• Envie dinheiro diretamente nas conversas</p>
              <p>• Receba pagamentos de forma rápida</p>
              <p>• Tudo protegido com criptografia</p>
            </div>
          </div>

          {/* Segurança */}
          <div className="p-4">
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
              <p className="text-sm text-gray-800">
                ⚠️ <strong>Importante:</strong> Só envie dinheiro para pessoas que você conhece. Se tiver dúvida, não confirme o pagamento.
              </p>
            </div>
          </div>

          {/* Histórico (link) */}
          <div className="p-4 border-t border-gray-200">
            <button
              onClick={() => {
                const synth = window.speechSynthesis;
                if (synth) {
                  synth.cancel();
                  const utter = new SpeechSynthesisUtterance(
                    "Nesta tela, você também pode ver o histórico dos pagamentos realizados e recebidos."
                  );
                  utter.lang = "pt-BR";
                  utter.rate = 0.85;
                  synth.speak(utter);
                }
              }}
              className="w-full text-[#00a884] font-medium py-2"
            >
              Ver histórico de pagamentos
            </button>
          </div>
        </div>
      </PhoneFrame>
    );
  }

  if (showPayments && paymentStep === 4) {
    return (
      <PhoneFrame>
        <div className="h-full bg-white flex flex-col">
          <StatusBar variant="light" />

          {/* Header */}
          <div className="bg-[#008069] text-white px-4 py-3 flex items-center gap-4">
            <button onClick={() => setPaymentStep(3)}>
              <ArrowLeft className="w-6 h-6" />
            </button>
            <h2 className="text-lg font-medium">Escolher contato</h2>
            <button>
              <Search className="w-6 h-6" />
            </button>
          </div>

          {/* Lista de contatos */}
          <div className="flex-1 overflow-y-auto">
            <h3 className="px-4 py-2 text-sm text-gray-500 font-medium">Recentes</h3>
            {contactsList.slice(0, 5).map(contact => (
              <div
                key={contact.id}
                onClick={() => {
                  setSelectedPaymentContact(contact);
                  setPaymentStep(5);
                }}
                className="flex items-center gap-3 px-4 py-3 border-b border-gray-100 active:bg-gray-50"
              >
                <div className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center text-xl">
                  {contact.avatar}
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900">{contact.name}</h3>
                  {contact.status && (
                    <p className="text-sm text-gray-600 truncate">{contact.status}</p>
                  )}
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </div>
            ))}
          </div>
        </div>
      </PhoneFrame>
    );
  }

  if (showPayments && paymentStep === 5) {
    return (
      <PhoneFrame>
        <div className="h-full bg-white flex flex-col">
          <StatusBar variant="light" />

          {/* Header */}
          <div className="bg-[#008069] text-white px-4 py-3 flex items-center gap-4">
            <button onClick={() => setPaymentStep(4)}>
              <ArrowLeft className="w-6 h-6" />
            </button>
            <h2 className="text-lg font-medium">Enviar pagamento</h2>
          </div>

          {/* Contato selecionado */}
          <div className="p-6 flex flex-col items-center border-b border-gray-200">
            <div className="w-20 h-20 rounded-full bg-gray-300 flex items-center justify-center text-3xl mb-3">
              {selectedPaymentContact?.avatar || "👤"}
            </div>
            <h3 className="text-lg font-semibold text-gray-900">
              {selectedPaymentContact?.name || "Contato"}
            </h3>
          </div>

          {/* Valor */}
          <div className="p-6 flex-1">
            <label className="text-sm text-gray-600 mb-2 block">Valor a enviar</label>
            <div className="flex items-center gap-2 mb-6">
              <span className="text-2xl font-semibold text-gray-900">R$</span>
              <input
                type="number"
                value={paymentAmount}
                onChange={(e) => setPaymentAmount(e.target.value)}
                placeholder="0,00"
                className="flex-1 text-4xl font-bold outline-none border-b-2 border-[#25D366] py-2"
                autoFocus
              />
            </div>

            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
              <p className="text-sm text-gray-800">
                💡 Confira o valor com atenção antes de confirmar
              </p>
            </div>
          </div>

          {/* Botão próximo */}
          {paymentAmount && parseFloat(paymentAmount) > 0 && (
            <div className="p-4">
              <button
                onClick={handleConfirmPayment}
                className="w-full bg-[#25D366] text-white py-3 rounded-lg font-medium"
              >
                Continuar
              </button>
            </div>
          )}
        </div>
      </PhoneFrame>
    );
  }

  if (showPayments && paymentStep === 7) {
    return (
      <PhoneFrame>
        <div className="h-full bg-white flex flex-col">
          <StatusBar variant="light" />

          {/* Header */}
          <div className="bg-[#008069] text-white px-4 py-3 flex items-center gap-4">
            <button onClick={() => setPaymentStep(5)}>
              <ArrowLeft className="w-6 h-6" />
            </button>
            <h2 className="text-lg font-medium">Confirmar pagamento</h2>
          </div>

          {/* Detalhes do pagamento */}
          <div className="flex-1 p-6">
            <div className="bg-gray-50 rounded-lg p-6 mb-6">
              <div className="flex flex-col items-center mb-6">
                <div className="w-16 h-16 rounded-full bg-gray-300 flex items-center justify-center text-2xl mb-3">
                  {selectedPaymentContact?.avatar}
                </div>
                <h3 className="font-semibold text-gray-900 mb-1">
                  {selectedPaymentContact?.name}
                </h3>
                <p className="text-3xl font-bold text-[#25D366] mb-4">
                  R$ {parseFloat(paymentAmount).toFixed(2)}
                </p>
              </div>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Método de pagamento</span>
                  <span className="font-medium text-gray-900">Cartão •••• 1234</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Taxa</span>
                  <span className="font-medium text-gray-900">R$ 0,00</span>
                </div>
                <div className="border-t border-gray-200 pt-3 flex justify-between">
                  <span className="text-gray-900 font-semibold">Total</span>
                  <span className="font-bold text-gray-900">R$ {parseFloat(paymentAmount).toFixed(2)}</span>
                </div>
              </div>
            </div>

            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-4">
              <p className="text-sm text-gray-800">
                ⚠️ Confira todas as informações antes de confirmar. O pagamento não poderá ser cancelado.
              </p>
            </div>

            <div className="bg-red-50 border-l-4 border-red-500 p-4">
              <p className="text-sm text-gray-800">
                🚨 <strong>Segurança:</strong> Só envie dinheiro para pessoas que você conhece e confia.
              </p>
            </div>
          </div>

          {/* Botões */}
          <div className="p-4 space-y-3">
            <button
              onClick={handlePaymentSent}
              className="w-full bg-[#25D366] text-white py-3 rounded-lg font-medium"
            >
              Confirmar pagamento
            </button>
            <button
              onClick={() => setPaymentStep(5)}
              className="w-full border border-gray-300 text-gray-700 py-3 rounded-lg font-medium"
            >
              Cancelar
            </button>
          </div>
        </div>
      </PhoneFrame>
    );
  }

  if (showPayments && paymentStep === 7) {
    return (
      <PhoneFrame>
        <div className="h-full bg-white flex flex-col">
          <StatusBar variant="light" />

          {/* Header */}
          <div className="bg-[#008069] text-white px-4 py-3 flex items-center gap-4">
            <button onClick={() => setPaymentStep(3)}>
              <ArrowLeft className="w-6 h-6" />
            </button>
            <h2 className="text-lg font-medium">Pagamento enviado</h2>
          </div>

          {/* Sucesso */}
          <div className="flex-1 flex flex-col items-center justify-center p-6">
            <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mb-6">
              <Check className="w-16 h-16 text-green-600" strokeWidth={3} />
            </div>

            <h3 className="text-2xl font-bold text-gray-900 mb-3 text-center">
              Pronto!
            </h3>

            <p className="text-center text-gray-600 mb-2">
              Pagamento enviado com sucesso
            </p>

            <p className="text-3xl font-bold text-[#25D366] mb-6">
              R$ {parseFloat(paymentAmount).toFixed(2)}
            </p>

            <div className="bg-gray-50 rounded-lg p-4 w-full mb-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600">Para</span>
                <span className="font-medium text-gray-900">{selectedPaymentContact?.name}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Data</span>
                <span className="font-medium text-gray-900">
                  {new Date().toLocaleDateString('pt-BR')}
                </span>
              </div>
            </div>

            <div className="bg-green-50 border-l-4 border-green-500 p-4 w-full mb-4">
              <p className="text-sm text-gray-800">
                ✓ Você verá a confirmação na conversa com {selectedPaymentContact?.name}
              </p>
            </div>

            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 w-full">
              <p className="text-sm text-gray-800">
                💡 Para ver todos os pagamentos, acesse o histórico no canto superior da tela de pagamentos
              </p>
            </div>
          </div>

          {/* Botão */}
          <div className="p-4">
            <button
              onClick={() => setPaymentStep(3)}
              className="w-full bg-[#25D366] text-white py-3 rounded-lg font-medium"
            >
              Fazer outro pagamento
            </button>
          </div>
        </div>
      </PhoneFrame>
    );
  }

  // Telas de Encontrar empresas
  if (findBusiness && businessStep === 1) {
    return (
      <PhoneFrame>
        <div className="h-full bg-white flex flex-col">
          <StatusBar variant="light" />

          {/* Header */}
          <div className="bg-[#008069] text-white px-4 py-3 flex items-center gap-4">
            <button onClick={() => setFindBusiness(false)}>
              <ArrowLeft className="w-6 h-6" />
            </button>
            <h2 className="text-lg font-medium">Encontrar empresas</h2>
          </div>

          {/* Campo de pesquisa */}
          <div className="p-4">
            <button
              onClick={handleBusinessSearch}
              className="w-full bg-gray-100 rounded-lg px-4 py-3 text-left text-gray-500 flex items-center gap-2"
            >
              <Search className="w-5 h-5" />
              <span>Pesquisar empresas...</span>
            </button>
          </div>

          {/* Conteúdo informativo */}
          <div className="flex-1 flex flex-col items-center justify-center px-6">
            <div className="w-32 h-32 bg-[#25D366]/10 rounded-full flex items-center justify-center mb-6">
              <Search className="w-16 h-16 text-[#25D366]" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3 text-center">
              Encontre empresas
            </h3>
            <p className="text-gray-600 text-center mb-6 leading-relaxed">
              Procure lojas, farmácias, mercados e outros serviços que usam WhatsApp
            </p>

            <div className="w-full bg-blue-50 border-l-4 border-blue-500 p-4 mb-4">
              <p className="text-sm text-gray-800">
                💡 <strong>Dica:</strong> Digite o tipo de serviço ou o nome da empresa
              </p>
            </div>
          </div>
        </div>
      </PhoneFrame>
    );
  }

  if (findBusiness && businessStep === 2) {
    return (
      <PhoneFrame>
        <div className="h-full bg-white flex flex-col">
          <StatusBar variant="light" />

          {/* Header */}
          <div className="bg-[#008069] text-white px-4 py-3 flex items-center gap-4">
            <button onClick={() => setBusinessStep(1)}>
              <ArrowLeft className="w-6 h-6" />
            </button>
            <h2 className="text-lg font-medium">Pesquisar empresas</h2>
          </div>

          {/* Campo de pesquisa ativo */}
          <div className="p-4 border-b border-gray-200">
            <div className="bg-white rounded-lg px-4 py-3 flex items-center gap-2 border-2 border-[#25D366]">
              <Search className="w-5 h-5 text-gray-500" />
              <input
                type="text"
                value={businessSearch}
                onChange={(e) => {
                  setBusinessSearch(e.target.value);
                  if (e.target.value.length > 2) {
                    handleBusinessResults();
                  }
                }}
                placeholder="Digite o nome ou tipo..."
                className="flex-1 outline-none"
                autoFocus
              />
            </div>
          </div>

          {/* Sugestões */}
          <div className="p-4">
            <h3 className="text-sm text-gray-500 font-medium mb-3">Categorias populares</h3>
            <div className="grid grid-cols-2 gap-3">
              {["Farmácia", "Mercado", "Padaria", "Restaurante", "Loja", "Serviços"].map(cat => (
                <button
                  key={cat}
                  onClick={() => {
                    setBusinessSearch(cat);
                    handleBusinessResults();
                  }}
                  className="bg-gray-100 rounded-lg p-3 text-left hover:bg-gray-200"
                >
                  <p className="font-medium text-gray-900">{cat}</p>
                </button>
              ))}
            </div>
          </div>
        </div>
      </PhoneFrame>
    );
  }

  if (findBusiness && businessStep === 3) {
    const filteredBusinesses = businessList.filter(b => 
      businessSearch.toLowerCase() ? 
        b.name.toLowerCase().includes(businessSearch.toLowerCase()) ||
        b.category.toLowerCase().includes(businessSearch.toLowerCase())
      : true
    );

    return (
      <PhoneFrame>
        <div className="h-full bg-white flex flex-col">
          <StatusBar variant="light" />

          {/* Header */}
          <div className="bg-[#008069] text-white px-4 py-3 flex items-center gap-4">
            <button onClick={() => setBusinessStep(2)}>
              <ArrowLeft className="w-6 h-6" />
            </button>
            <h2 className="text-lg font-medium">Resultados</h2>
          </div>

          {/* Campo de pesquisa */}
          <div className="p-4 border-b border-gray-200">
            <div className="bg-gray-100 rounded-lg px-4 py-2 flex items-center gap-2">
              <Search className="w-5 h-5 text-gray-500" />
              <span className="text-gray-700">{businessSearch}</span>
            </div>
          </div>

          {/* Lista de empresas */}
          <div className="flex-1 overflow-y-auto">
            <div className="px-4 py-2 bg-gray-50">
              <p className="text-sm text-gray-600">
                {filteredBusinesses.length} {filteredBusinesses.length === 1 ? 'resultado encontrado' : 'resultados encontrados'}
              </p>
            </div>
            {filteredBusinesses.map(business => (
              <div
                key={business.id}
                onClick={() => handleSelectBusiness(business)}
                className="flex items-center gap-3 px-4 py-3 border-b border-gray-100 active:bg-gray-50"
              >
                <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center text-2xl">
                  {business.avatar}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-medium text-gray-900">{business.name}</h3>
                    {business.verified && (
                      <Shield className="w-4 h-4 text-[#25D366]" />
                    )}
                  </div>
                  <p className="text-sm text-gray-600">{business.category}</p>
                  <p className="text-xs text-gray-500">{business.description}</p>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </div>
            ))}
          </div>
        </div>
      </PhoneFrame>
    );
  }

  if (findBusiness && businessStep === 4) {
    return (
      <PhoneFrame>
        <div className="h-full bg-white flex flex-col">
          <StatusBar variant="light" />

          {/* Header */}
          <div className="bg-[#008069] text-white px-4 py-3 flex items-center gap-4">
            <button onClick={() => setBusinessStep(3)}>
              <ArrowLeft className="w-6 h-6" />
            </button>
            <h2 className="text-lg font-medium">Perfil da empresa</h2>
            <button className="ml-auto">
              <MoreVertical className="w-6 h-6" />
            </button>
          </div>

          {/* Perfil da empresa */}
          <div className="flex-1 overflow-y-auto">
            {/* Header do perfil */}
            <div className="bg-[#008069] text-white px-4 pb-6 pt-2">
              <div className="flex flex-col items-center">
                <div className="w-32 h-32 rounded-full bg-white/20 flex items-center justify-center text-6xl mb-3">
                  {selectedBusiness?.avatar}
                </div>
                <div className="flex items-center gap-2 mb-1">
                  <h2 className="text-2xl font-semibold">{selectedBusiness?.name}</h2>
                  {selectedBusiness?.verified && (
                    <Shield className="w-6 h-6" />
                  )}
                </div>
                <p className="text-white/80">{selectedBusiness?.category}</p>
              </div>
            </div>

            {/* Informações */}
            <div className="p-4 space-y-4">
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-2">Sobre</h3>
                <p className="text-gray-700">{selectedBusiness?.description}</p>
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <Clock className="w-5 h-5 text-gray-600" />
                  Horário de funcionamento
                </h3>
                <p className="text-gray-700">{selectedBusiness?.hours}</p>
              </div>

              <div className="bg-green-50 border-l-4 border-green-500 p-4">
                <div className="flex gap-2">
                  <Shield className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-800">
                      <strong>Empresa verificada</strong> - Esta conta comercial foi verificada pelo WhatsApp
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
                <p className="text-sm text-gray-800">
                  💡 <strong>Atenção:</strong> Sempre confirme se a empresa é verdadeira. Empresas confiáveis costumam ter perfil completo e informações claras.
                </p>
              </div>
            </div>
          </div>

          {/* Botão conversar */}
          <div className="p-4 border-t border-gray-200">
            <button
              onClick={handleStartBusinessChat}
              className="w-full bg-[#25D366] text-white py-3 rounded-lg font-medium flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-5 h-5" />
              Conversar
            </button>
          </div>
        </div>
      </PhoneFrame>
    );
  }

  if (findBusiness && businessStep === 5) {
    return (
      <PhoneFrame>
        <div className="h-full bg-[#ECE5DD] flex flex-col relative">
          <StatusBar variant="light" />

          {/* Header */}
          <div className="bg-[#008069] text-white px-3 py-2 flex items-center gap-3">
            <button onClick={() => {
              const synth = window.speechSynthesis;
              if (synth) {
                synth.cancel();
                const utter = new SpeechSynthesisUtterance(
                  "Para sair desta tela, clique na seta preta, no canto superior esquerdo. Você volta para o WhatsApp normalmente. Encontrar empresas facilita falar com lojas e serviços pelo WhatsApp."
                );
                utter.lang = "pt-BR";
                utter.rate = 0.85;
                synth.speak(utter);
              }
              setTimeout(() => {
                setFindBusiness(false);
                setBusinessStep(1);
                setBusinessSearch("");
                setSelectedBusiness(null);
              }, 2000);
            }}>
              <ArrowLeft className="w-6 h-6" />
            </button>
            <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center flex-shrink-0 text-xl">
              {selectedBusiness?.avatar}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-1">
                <h2 className="font-medium text-[17px]">{selectedBusiness?.name}</h2>
                {selectedBusiness?.verified && (
                  <Shield className="w-4 h-4" />
                )}
              </div>
              <p className="text-xs text-white/80">{selectedBusiness?.category}</p>
            </div>
            <button>
              <MoreVertical className="w-5 h-5" />
            </button>
          </div>

          {/* Fundo com padrão */}
          <div 
            className="flex-1 overflow-y-auto p-2"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23d9d9d9' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              backgroundColor: '#ECE5DD'
            }}
          >
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-4">
              <p className="text-sm text-gray-800">
                Esta é uma conversa com uma empresa. Você pode fazer pedidos, tirar dúvidas e solicitar informações.
              </p>
            </div>
          </div>

          {/* Input de Mensagem */}
          <div className="bg-[#F0F2F5] px-2 py-1.5 flex items-center gap-1">
            <div className="flex-1 bg-white rounded-full px-4 py-2 flex items-center gap-2">
              <button className="flex-shrink-0">
                <Smile className="w-6 h-6 text-gray-500" />
              </button>
              <input
                placeholder="Mensagem"
                className="flex-1 bg-transparent outline-none text-[15px]"
              />
            </div>
            <button className="w-12 h-12 bg-[#25D366] rounded-full shadow-lg flex items-center justify-center flex-shrink-0">
              <Mic className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>
      </PhoneFrame>
    );
  }

  // Telas de Favoritas
  if (showFavorites && favoriteStep === 1) {
    return (
      <PhoneFrame>
        <div className="h-full bg-white flex flex-col">
          <StatusBar variant="light" />

          {/* Header */}
          <div className="bg-[#008069] text-white px-4 py-3 flex items-center gap-4">
            <button onClick={() => setShowFavorites(false)}>
              <ArrowLeft className="w-6 h-6" />
            </button>
            <h2 className="text-lg font-medium">Favoritas</h2>
            <button onClick={handleAddToFavorites} className="ml-auto">
              <Plus className="w-6 h-6" />
            </button>
          </div>

          {/* Conteúdo */}
          {favoriteContacts.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center px-6">
              <div className="w-32 h-32 bg-[#25D366]/10 rounded-full flex items-center justify-center mb-6">
                <Star className="w-16 h-16 text-[#25D366]" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3 text-center">
                Adicionar aos favoritos
              </h3>
              <p className="text-gray-600 text-center mb-6 leading-relaxed">
                Encontre as pessoas e os grupos mais importantes para você com facilidade.
              </p>
              <button
                onClick={handleAddToFavorites}
                className="text-[#00a884] font-medium"
              >
                Adicionar aos favoritos
              </button>
            </div>
          ) : (
            <div className="flex-1 overflow-y-auto">
              <div className="px-4 py-2 bg-gray-50">
                <p className="text-sm text-gray-600">
                  Toque e segure para remover das favoritas
                </p>
              </div>
              {favoriteContacts.map(contactId => {
                const contact = contactsList.find(c => c.id === contactId);
                if (!contact) return null;
                return (
                  <div
                    key={contactId}
                    onClick={() => {
                      const synth = window.speechSynthesis;
                      if (synth) {
                        synth.cancel();
                        const utter = new SpeechSynthesisUtterance(
                          `Se quiser remover ${contact.name} das favoritas, toque e segure sobre o nome da pessoa e escolha Remover das favoritas.`
                        );
                        utter.lang = "pt-BR";
                        utter.rate = 0.85;
                        synth.speak(utter);
                      }
                    }}
                    onContextMenu={(e) => {
                      e.preventDefault();
                      if (window.confirm(`Remover ${contact.name} das favoritas?`)) {
                        toggleFavorite(contactId);
                      }
                    }}
                    className="flex items-center gap-3 px-4 py-3 border-b border-gray-100 active:bg-gray-50"
                  >
                    <div className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center text-xl">
                      {contact.avatar}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900">{contact.name}</h3>
                      {contact.status && (
                        <p className="text-sm text-gray-600 truncate">{contact.status}</p>
                      )}
                    </div>
                    <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </PhoneFrame>
    );
  }

  if (showFavorites && favoriteStep === 2) {
    return (
      <PhoneFrame>
        <div className="h-full bg-white flex flex-col">
          <StatusBar variant="light" />

          {/* Header */}
          <div className="bg-[#008069] text-white px-4 py-3 flex items-center gap-4">
            <button onClick={() => setFavoriteStep(1)}>
              <ArrowLeft className="w-6 h-6" />
            </button>
            <h2 className="text-lg font-medium">Adicionar aos favoritos</h2>
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

          {/* Lista de contatos */}
          <div className="flex-1 overflow-y-auto">
            <h3 className="px-4 py-2 text-sm text-gray-500 font-medium">Contatos frequentes</h3>
            {contactsList.map(contact => (
              <div
                key={contact.id}
                onClick={() => {
                  toggleFavorite(contact.id);
                  setTimeout(() => setFavoriteStep(1), 2000);
                }}
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
                {favoriteContacts.includes(contact.id) && (
                  <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                )}
              </div>
            ))}
          </div>
        </div>
      </PhoneFrame>
    );
  }

  // Telas de dispositivos conectados
  if (connectedDevices && deviceStep === 1) {
    return (
      <PhoneFrame>
        <div className="h-full bg-white flex flex-col">
          <StatusBar variant="light" />

          {/* Header */}
          <div className="bg-[#008069] text-white px-4 py-3 flex items-center gap-4">
            <button onClick={() => setConnectedDevices(false)}>
              <ArrowLeft className="w-6 h-6" />
            </button>
            <h2 className="text-lg font-medium">Dispositivos conectados</h2>
          </div>

          {/* Ilustração */}
          <div className="p-6 flex flex-col items-center">
            <div className="relative mb-4">
              <Smartphone className="w-20 h-20 text-[#25D366]" />
              <Monitor className="w-20 h-20 text-[#25D366] absolute -right-8 top-4" />
              <div className="absolute top-8 left-8 w-8 h-8 bg-[#25D366] rounded-full flex items-center justify-center">
                <Check className="w-5 h-5 text-white" strokeWidth={3} />
              </div>
            </div>
            <p className="text-center text-gray-600 text-sm">
              Use o WhatsApp no WhatsApp Web, WhatsApp para computador ou em outros dispositivos.{" "}
              <span className="text-[#00a884]">Saiba mais</span>
            </p>
          </div>

          {/* Botão conectar */}
          <div className="px-4 mb-4">
            <button
              onClick={handleConnectDevice}
              className="w-full bg-[#25D366] text-white py-3 rounded-lg font-medium"
            >
              Conectar dispositivo
            </button>
          </div>

          {/* Lista de dispositivos */}
          {devices.length > 0 && (
            <div className="flex-1 overflow-y-auto">
              <div className="px-4 py-2 bg-gray-50">
                <h3 className="text-sm text-gray-600 font-medium">Status do dispositivo</h3>
                <p className="text-xs text-gray-500 mt-1">
                  Toque em um dispositivo para desconectá-lo
                </p>
              </div>
              {devices.map(device => (
                <div
                  key={device.id}
                  onClick={() => {
                    if (window.confirm(`Desconectar ${device.name}?`)) {
                      handleDisconnectDevice(device.id);
                    }
                  }}
                  className="flex items-center gap-3 px-4 py-4 border-b border-gray-100 active:bg-gray-50"
                >
                  <div className="w-12 h-12 rounded-full bg-[#25D366]/10 flex items-center justify-center text-2xl">
                    {device.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900">{device.name}</h3>
                    <p className="text-sm text-gray-600">{device.lastActive}</p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </div>
              ))}
            </div>
          )}

          {/* Info segurança */}
          <div className="p-4 bg-gray-50 border-t border-gray-200">
            <div className="flex gap-2">
              <Shield className="w-4 h-4 text-gray-600 flex-shrink-0 mt-0.5" />
              <p className="text-xs text-gray-600">
                Suas mensagens pessoais são protegidas com a criptografia de ponta a ponta em todos os seus dispositivos.
              </p>
            </div>
          </div>
        </div>
      </PhoneFrame>
    );
  }

  if (connectedDevices && deviceStep === 2) {
    return (
      <PhoneFrame>
        <div className="h-full bg-white flex flex-col">
          <StatusBar variant="light" />

          {/* Header */}
          <div className="bg-[#008069] text-white px-4 py-3 flex items-center gap-4">
            <button onClick={() => setDeviceStep(1)}>
              <ArrowLeft className="w-6 h-6" />
            </button>
            <h2 className="text-lg font-medium">Instruções</h2>
          </div>

          {/* Conteúdo */}
          <div className="flex-1 overflow-y-auto p-6">
            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
              <div className="flex gap-2">
                <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-blue-900 mb-2">Passo a passo</h3>
                  <ol className="space-y-3 text-sm text-blue-800">
                    <li>1. Vá até o computador</li>
                    <li>2. Abra o navegador de internet</li>
                    <li>3. Digite: <strong>web.whatsapp.com</strong></li>
                    <li>4. Aguarde o Código QR aparecer</li>
                    <li>5. Deixe a tela aberta</li>
                    <li>6. Volte para este celular</li>
                  </ol>
                </div>
              </div>
            </div>

            <div className="flex justify-center mb-6">
              <Monitor className="w-32 h-32 text-gray-300" />
            </div>

            <p className="text-center text-gray-600 mb-4">
              Você verá um código QR no computador
            </p>
          </div>

          {/* Botão continuar */}
          <div className="p-4">
            <button
              onClick={handleScanQR}
              className="w-full bg-[#25D366] text-white py-3 rounded-lg font-medium"
            >
              Já abri no computador
            </button>
          </div>
        </div>
      </PhoneFrame>
    );
  }

  if (connectedDevices && deviceStep === 3) {
    return (
      <PhoneFrame>
        <div className="h-full bg-white flex flex-col">
          <StatusBar variant="light" />

          {/* Header */}
          <div className="bg-[#008069] text-white px-4 py-3 flex items-center gap-4">
            <button onClick={() => setDeviceStep(2)}>
              <ArrowLeft className="w-6 h-6" />
            </button>
            <h2 className="text-lg font-medium">Escanear código</h2>
          </div>

          {/* Conteúdo */}
          <div className="flex-1 flex flex-col items-center justify-center p-6">
            <div className="w-32 h-32 border-4 border-[#25D366] rounded-2xl flex items-center justify-center mb-6 animate-pulse">
              <QrCode className="w-20 h-20 text-[#25D366]" />
            </div>

            <h3 className="text-xl font-semibold text-gray-900 mb-3 text-center">
              Pronto para escanear
            </h3>

            <p className="text-center text-gray-600 mb-6">
              Toque no botão abaixo para abrir a câmera e escanear o código QR que está no computador
            </p>

            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 w-full">
              <p className="text-sm text-gray-800">
                💡 <strong>Dica:</strong> Certifique-se de que o código QR está visível na tela do computador
              </p>
            </div>
          </div>

          {/* Botão escanear */}
          <div className="p-4">
            <button
              onClick={handleCameraOpen}
              className="w-full bg-[#25D366] text-white py-3 rounded-lg font-medium flex items-center justify-center gap-2"
            >
              <Camera className="w-5 h-5" />
              Abrir câmera
            </button>
          </div>
        </div>
      </PhoneFrame>
    );
  }

  if (connectedDevices && deviceStep === 4) {
    return (
      <PhoneFrame>
        <div className="h-full bg-black flex flex-col relative">
          <StatusBar variant="dark" />

          {/* Simulação de câmera */}
          <div className="flex-1 flex items-center justify-center relative">
            <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/50" />

            {/* Frame de escaneamento */}
            <div className="relative">
              <div className="w-64 h-64 border-4 border-[#25D366] rounded-3xl relative animate-pulse">
                {/* Cantos do frame */}
                <div className="absolute -top-1 -left-1 w-8 h-8 border-t-4 border-l-4 border-white rounded-tl-lg" />
                <div className="absolute -top-1 -right-1 w-8 h-8 border-t-4 border-r-4 border-white rounded-tr-lg" />
                <div className="absolute -bottom-1 -left-1 w-8 h-8 border-b-4 border-l-4 border-white rounded-bl-lg" />
                <div className="absolute -bottom-1 -right-1 w-8 h-8 border-b-4 border-r-4 border-white rounded-br-lg" />

                {/* Linha de scan */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-[#25D366] animate-scan" />
              </div>

              <p className="text-white text-center mt-6 text-lg font-medium">
                Escaneando...
              </p>
            </div>
          </div>

          {/* Instruções */}
          <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black to-transparent">
            <p className="text-white text-center text-sm">
              Aponte a câmera para o código QR
            </p>
          </div>

          <style>{`
            @keyframes scan {
              0%, 100% { top: 0; }
              50% { top: 100%; }
            }
            .animate-scan {
              animation: scan 2s ease-in-out infinite;
            }
          `}</style>
        </div>
      </PhoneFrame>
    );
  }

  if (connectedDevices && deviceStep === 5) {
    return (
      <PhoneFrame>
        <div className="h-full bg-white flex flex-col">
          <StatusBar variant="light" />

          {/* Header */}
          <div className="bg-[#008069] text-white px-4 py-3 flex items-center gap-4">
            <button onClick={() => setDeviceStep(1)}>
              <ArrowLeft className="w-6 h-6" />
            </button>
            <h2 className="text-lg font-medium">Conexão realizada</h2>
          </div>

          {/* Sucesso */}
          <div className="flex-1 flex flex-col items-center justify-center p-6">
            <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mb-6">
              <Check className="w-16 h-16 text-green-600" strokeWidth={3} />
            </div>

            <h3 className="text-2xl font-bold text-gray-900 mb-3 text-center">
              Pronto!
            </h3>

            <p className="text-center text-gray-600 mb-6">
              O dispositivo foi conectado com sucesso
            </p>

            <div className="bg-green-50 border-l-4 border-green-500 p-4 w-full mb-6">
              <p className="text-sm text-gray-800">
                ✓ Agora você pode usar o WhatsApp no computador
              </p>
            </div>

            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 w-full">
              <p className="text-sm text-gray-800">
                💡 <strong>Lembre-se:</strong> Para desconectar, volte nesta tela e toque no dispositivo
              </p>
            </div>
          </div>

          {/* Botão voltar */}
          <div className="p-4">
            <button
              onClick={() => setDeviceStep(1)}
              className="w-full bg-[#25D366] text-white py-3 rounded-lg font-medium"
            >
              Ver dispositivos conectados
            </button>
          </div>
        </div>
      </PhoneFrame>
    );
  }

  // Telas de lista de transmissão
  if (broadcastList && broadcastStep === 1) {
    return (
      <PhoneFrame>
        <div className="h-full bg-white flex flex-col">
          <StatusBar variant="light" />

          {/* Header */}
          <div className="bg-[#008069] text-white px-4 py-3 flex items-center gap-4">
            <button onClick={() => setBroadcastList(false)}>
              <ArrowLeft className="w-6 h-6" />
            </button>
            <h2 className="text-lg font-medium">Listas de transmissão</h2>
          </div>

          {/* Conteúdo vazio */}
          <div className="flex-1 flex flex-col items-center justify-center px-6">
            <MessageSquare className="w-20 h-20 text-gray-300 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2 text-center">
              Nenhuma lista de transmissão
            </h3>
            <p className="text-sm text-gray-600 text-center">
              Envie mensagens para vários contatos ao mesmo tempo
            </p>
          </div>

          {/* Info */}
          <div className="p-4 bg-gray-50 border-t border-gray-200">
            <p className="text-xs text-gray-600 text-center">
              Somente contatos com seu número salvo receberão suas mensagens de transmissão
            </p>
          </div>

          {/* Botão criar */}
          <button
            onClick={handleCreateBroadcast}
            className="absolute bottom-6 right-6 w-14 h-14 bg-[#25D366] rounded-full shadow-lg flex items-center justify-center z-10"
          >
            <Plus className="w-6 h-6 text-white" />
          </button>
        </div>
      </PhoneFrame>
    );
  }

  if (broadcastList && broadcastStep === 2) {
    return (
      <PhoneFrame>
        <div className="h-full bg-white flex flex-col">
          <StatusBar variant="light" />

          {/* Header */}
          <div className="bg-[#008069] text-white px-4 py-3 flex items-center gap-4">
            <button onClick={() => setBroadcastStep(1)}>
              <ArrowLeft className="w-6 h-6" />
            </button>
            <div className="flex-1">
              <h2 className="text-lg font-medium">Nova transmissão</h2>
              <p className="text-sm text-white/80">
                Selecionados: {broadcastContacts.length} de 256
              </p>
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

          {/* Contatos selecionados (horizontal) */}
          {broadcastContacts.length > 0 && (
            <div className="px-4 py-3 border-b border-gray-200">
              <div className="flex gap-3 overflow-x-auto">
                {broadcastContacts.map(contactId => {
                  const contact = contactsList.find(c => c.id === contactId);
                  return (
                    <div key={contactId} className="flex flex-col items-center gap-1 flex-shrink-0">
                      <div className="relative">
                        <div className="w-14 h-14 rounded-full bg-gray-300 flex items-center justify-center text-xl">
                          {contact.avatar}
                        </div>
                        <button
                          onClick={() => toggleBroadcastContact(contactId)}
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
                onClick={() => toggleBroadcastContact(contact.id)}
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
                  broadcastContacts.includes(contact.id)
                    ? "bg-[#25D366] border-[#25D366]"
                    : "border-gray-300"
                }`}>
                  {broadcastContacts.includes(contact.id) && (
                    <Check className="w-4 h-4 text-white" strokeWidth={3} />
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Botão próximo */}
          {broadcastContacts.length > 0 && (
            <button
              onClick={handleConfirmBroadcastContacts}
              className="absolute bottom-6 right-6 w-14 h-14 bg-[#25D366] rounded-full shadow-lg flex items-center justify-center z-10"
            >
              <Check className="w-6 h-6 text-white" strokeWidth={3} />
            </button>
          )}
        </div>
      </PhoneFrame>
    );
  }

  if (broadcastList && (broadcastStep === 3 || broadcastStep === 4)) {
    return (
      <PhoneFrame>
        <div className="h-full bg-[#ECE5DD] flex flex-col relative">
          <StatusBar variant="light" />

          {/* Header */}
          <div className="bg-[#008069] text-white px-3 py-2 flex items-center gap-3">
            <button onClick={() => {
              if (broadcastStep === 4) return;
              setBroadcastList(false);
              setBroadcastStep(1);
              setBroadcastContacts([]);
            }}>
              <ArrowLeft className="w-6 h-6" />
            </button>
            <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center flex-shrink-0">
              <MessageSquare className="w-5 h-5 text-gray-600" />
            </div>
            <div className="flex-1">
              <h2 className="font-medium text-[17px]">{broadcastName}</h2>
              <p className="text-xs text-white/80">
                Lista de transmissão · {broadcastContacts.length} destinatários
              </p>
            </div>
            <button>
              <MoreVertical className="w-5 h-5" />
            </button>
          </div>

          {/* Fundo com padrão */}
          <div 
            className="flex-1 overflow-y-auto p-2"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23d9d9d9' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              backgroundColor: '#ECE5DD'
            }}
          >
            {broadcastStep === 3 && (
              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-4">
                <p className="text-sm text-gray-800">
                  💡 <strong>Dica:</strong> As mensagens serão enviadas individualmente para cada contato. Eles não verão os outros destinatários.
                </p>
              </div>
            )}

            {broadcastStep === 4 && broadcastMessage && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex justify-end"
              >
                <div className="max-w-[85%] bg-[#D9FDD3] rounded-lg px-3 py-2 shadow-sm rounded-br-none">
                  <p className="text-[15px] text-gray-900 break-words">{broadcastMessage}</p>
                  <div className="flex items-center justify-end gap-1 mt-1">
                    <span className="text-[11px] text-gray-500">
                      {new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                    </span>
                    <Check className="w-4 h-4 text-gray-400" strokeWidth={2.5} />
                  </div>
                </div>
              </motion.div>
            )}
          </div>

          {/* Input de Mensagem */}
          {broadcastStep === 3 && (
            <div className="bg-[#F0F2F5] px-2 py-1.5 flex items-center gap-1">
              <div className="flex-1 bg-white rounded-full px-4 py-2 flex items-center gap-2">
                <button className="flex-shrink-0">
                  <Smile className="w-6 h-6 text-gray-500" />
                </button>
                <input
                  value={broadcastMessage}
                  onChange={(e) => setBroadcastMessage(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSendBroadcast()}
                  placeholder="Mensagem"
                  className="flex-1 bg-transparent outline-none text-[15px]"
                />
              </div>
              <button
                onClick={handleSendBroadcast}
                disabled={!broadcastMessage.trim()}
                className={`w-12 h-12 rounded-full shadow-lg flex items-center justify-center flex-shrink-0 ${
                  broadcastMessage.trim() ? "bg-[#25D366]" : "bg-gray-300"
                }`}
              >
                {broadcastMessage.trim() ? (
                  <Send className="w-5 h-5 text-white ml-1" />
                ) : (
                  <Mic className="w-5 h-5 text-white" />
                )}
              </button>
            </div>
          )}
        </div>
      </PhoneFrame>
    );
  }

  // Telas de criação de comunidade
  if (creatingCommunity && communityStep === 1) {
    return (
      <PhoneFrame>
        <div className="h-full bg-white flex flex-col">
          <StatusBar variant="light" />

          {/* Header */}
          <div className="bg-[#008069] text-white px-4 py-3 flex items-center gap-4">
            <button onClick={() => setCreatingCommunity(false)}>
              <ArrowLeft className="w-6 h-6" />
            </button>
            <h2 className="text-lg font-medium">Criar comunidade</h2>
          </div>

          {/* Conteúdo */}
          <div className="flex-1 flex flex-col items-center justify-center px-6">
            <div className="w-32 h-32 bg-[#25D366]/10 rounded-full flex items-center justify-center mb-6">
              <Users className="w-16 h-16 text-[#25D366]" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3 text-center">
              Criar comunidade
            </h3>
            <p className="text-gray-600 text-center mb-4 leading-relaxed">
              Reúna pessoas do seu bairro, da sua escola e muito mais em um só lugar. Crie grupos para assuntos específicos e envie avisos a todos com facilidade.
            </p>
            <button
              onClick={handleCommunityExamples}
              className="text-[#00a884] font-medium mb-8"
            >
              Exemplos de comunidades →
            </button>
            <button
              onClick={handleStartCommunity}
              className="w-full bg-[#25D366] text-white py-3 rounded-lg font-medium"
            >
              Começar
            </button>
          </div>
        </div>
      </PhoneFrame>
    );
  }

  if (creatingCommunity && communityStep === 2) {
    return (
      <PhoneFrame>
        <div className="h-full bg-white flex flex-col">
          <StatusBar variant="light" />

          {/* Header */}
          <div className="bg-[#008069] text-white px-4 py-3 flex items-center gap-4">
            <button onClick={handleBackFromExamples}>
              <ArrowLeft className="w-6 h-6" />
            </button>
            <h2 className="text-lg font-medium">Exemplos de comunidades</h2>
          </div>

          {/* Conteúdo */}
          <div className="flex-1 overflow-y-auto p-4">
            <div className="space-y-4">
              <div className="bg-white rounded-lg border border-gray-200 p-4">
                <h4 className="font-semibold text-gray-900 mb-2">🏢 Condomínio</h4>
                <p className="text-sm text-gray-600">
                  Organize moradores, compartilhe avisos importantes e facilite a comunicação entre todos.
                </p>
              </div>
              <div className="bg-white rounded-lg border border-gray-200 p-4">
                <h4 className="font-semibold text-gray-900 mb-2">🏫 Escola</h4>
                <p className="text-sm text-gray-600">
                  Conecte pais, alunos e professores. Envie comunicados e organize eventos escolares.
                </p>
              </div>
              <div className="bg-white rounded-lg border border-gray-200 p-4">
                <h4 className="font-semibold text-gray-900 mb-2">🏘️ Bairro</h4>
                <p className="text-sm text-gray-600">
                  Una vizinhos, compartilhe informações locais e fortaleça a comunidade.
                </p>
              </div>
              <div className="bg-white rounded-lg border border-gray-200 p-4">
                <h4 className="font-semibold text-gray-900 mb-2">⚽ Clube</h4>
                <p className="text-sm text-gray-600">
                  Reúna membros do clube, organize atividades e mantenha todos informados.
                </p>
              </div>
            </div>
          </div>
        </div>
      </PhoneFrame>
    );
  }

  if (creatingCommunity && communityStep === 3) {
    return (
      <PhoneFrame>
        <div className="h-full bg-white flex flex-col">
          <StatusBar variant="light" />

          {/* Header */}
          <div className="bg-[#008069] text-white px-4 py-3 flex items-center gap-4">
            <button onClick={() => setCommunityStep(1)}>
              <ArrowLeft className="w-6 h-6" />
            </button>
            <h2 className="text-lg font-medium">Nova comunidade</h2>
          </div>

          {/* Foto e nome */}
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center">
                <Camera className="w-6 h-6 text-gray-500" />
              </div>
              <input
                type="text"
                value={communityName}
                onChange={(e) => setCommunityName(e.target.value)}
                placeholder="Nome da comunidade"
                className="flex-1 border-b-2 border-[#25D366] py-2 outline-none text-lg"
              />
              <button>
                <Smile className="w-6 h-6 text-gray-500" />
              </button>
            </div>
          </div>

          <div className="flex-1" />

          {/* Botão próximo */}
          {communityName.trim() && (
            <button
              onClick={handleConfirmCommunityName}
              className="absolute bottom-6 right-6 w-14 h-14 bg-[#25D366] rounded-full shadow-lg flex items-center justify-center z-10"
            >
              <ArrowLeft className="w-6 h-6 text-white transform rotate-180" />
            </button>
          )}
        </div>
      </PhoneFrame>
    );
  }

  if (creatingCommunity && communityStep === 4) {
    return (
      <PhoneFrame>
        <div className="h-full bg-white flex flex-col">
          <StatusBar variant="light" />

          {/* Header */}
          <div className="bg-[#008069] text-white px-4 py-3 flex items-center gap-4">
            <button onClick={() => setCommunityStep(3)}>
              <ArrowLeft className="w-6 h-6" />
            </button>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center">
                <Users className="w-5 h-5 text-gray-600" />
              </div>
              <div>
                <h2 className="text-base font-medium">{communityName}</h2>
                <p className="text-xs text-white/80">Comunidade · 3 grupos</p>
              </div>
            </div>
            <button className="ml-auto">
              <MoreVertical className="w-6 h-6" />
            </button>
          </div>

          {/* Bem-vindo */}
          <div className="bg-green-50 p-4 border-b border-gray-200">
            <div className="flex items-start gap-3">
              <Users className="w-5 h-5 text-[#25D366] flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Bem-vindo(a) à comunidade!</h3>
                <p className="text-sm text-gray-600">
                  Envie avisos importantes a todos os membros de uma só vez.
                </p>
                <button
                  onClick={handleAddCommunityMembers}
                  className="text-[#00a884] font-medium text-sm mt-2"
                >
                  Adicionar membros
                </button>
              </div>
            </div>
          </div>

          {/* Grupos */}
          <div className="flex-1 overflow-y-auto">
            <div className="px-4 py-3 border-b border-gray-100 flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                <Bell className="w-6 h-6 text-[#25D366]" />
              </div>
              <div className="flex-1">
                <h3 className="font-medium text-gray-900">Avisos</h3>
                <p className="text-sm text-gray-500">Você removeu</p>
              </div>
            </div>

            <div className="px-4 py-3 border-b border-gray-100 flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
                <MessageCircle className="w-6 h-6 text-gray-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-medium text-gray-900">Geral</h3>
                <p className="text-sm text-gray-500">Você mudou as configurações do grupo para...</p>
              </div>
            </div>
          </div>
        </div>
      </PhoneFrame>
    );
  }

  if (creatingCommunity && communityStep === 5) {
    return (
      <PhoneFrame>
        <div className="h-full bg-white flex flex-col">
          <StatusBar variant="light" />

          {/* Header */}
          <div className="bg-[#008069] text-white px-4 py-3 flex items-center gap-4">
            <button onClick={() => setCommunityStep(4)}>
              <ArrowLeft className="w-6 h-6" />
            </button>
            <h2 className="text-lg font-medium">Adicionar membros</h2>
            <button className="ml-auto">
              <Search className="w-6 h-6" />
            </button>
          </div>

          {/* Pesquisa */}
          <div className="px-4 py-3 border-b border-gray-200">
            <input
              type="text"
              placeholder="Pesquisar nome ou número..."
              className="w-full bg-gray-100 rounded-lg px-4 py-2 outline-none text-sm"
            />
          </div>

          {/* Lista de contatos */}
          <div className="flex-1 overflow-y-auto">
            <h3 className="px-4 py-2 text-sm text-gray-500 font-medium">Contatos frequentes</h3>
            {contactsList.map(contact => (
              <div
                key={contact.id}
                onClick={() => toggleCommunityMember(contact.id)}
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
                  communityMembers.includes(contact.id)
                    ? "bg-[#25D366] border-[#25D366]"
                    : "border-gray-300"
                }`}>
                  {communityMembers.includes(contact.id) && (
                    <Check className="w-4 h-4 text-white" strokeWidth={3} />
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Botão próximo */}
          {communityMembers.length > 0 && (
            <button
              onClick={handleConfirmMembers}
              className="absolute bottom-6 right-6 w-14 h-14 bg-[#25D366] rounded-full shadow-lg flex items-center justify-center z-10"
            >
              <ArrowLeft className="w-6 h-6 text-white transform rotate-180" />
            </button>
          )}
        </div>
      </PhoneFrame>
    );
  }

  if (creatingCommunity && communityStep === 6) {
    return (
      <PhoneFrame>
        <div className="h-full bg-black/50 flex items-center justify-center p-6">
          <div className="bg-white rounded-lg p-6 max-w-sm w-full">
            <h3 className="text-lg font-semibold text-gray-900 mb-3 text-center">
              Adicionar membros
            </h3>
            <p className="text-sm text-gray-600 text-center mb-6">
              Adicionar {communityMembers.length} {communityMembers.length === 1 ? 'pessoa' : 'pessoas'} à comunidade?
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setCommunityStep(5)}
                className="flex-1 py-3 border border-gray-300 rounded-lg font-medium text-gray-700"
              >
                Cancelar
              </button>
              <button
                onClick={handleAddMembersToCommunity}
                className="flex-1 py-3 bg-[#25D366] text-white rounded-lg font-medium"
              >
                Adicionar
              </button>
            </div>
          </div>
        </div>
      </PhoneFrame>
    );
  }

  if (creatingCommunity && communityStep === 7) {
    return (
      <PhoneFrame>
        <div className="h-full bg-[#0B141A] flex flex-col relative">
          <StatusBar variant="dark" />

          {/* Header */}
          <div className="bg-[#202C33] text-white px-3 py-2 flex items-center gap-3">
            <button onClick={handleFinishCommunity}>
              <ArrowLeft className="w-6 h-6" />
            </button>
            <div className="w-10 h-10 rounded-full bg-gray-600 flex items-center justify-center text-xl">
              <Users className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <h2 className="font-medium text-[17px]">Avisos</h2>
              <p className="text-xs text-gray-400">Comunidade {communityName}</p>
            </div>
          </div>

          {/* Mensagens */}
          <div className="flex-1 overflow-y-auto p-4">
            <div className="bg-[#202C33] rounded-lg p-4 mb-4">
              <div className="flex items-center gap-2 mb-2">
                <Shield className="w-4 h-4 text-yellow-500" />
                <p className="text-xs text-gray-400">Ontem</p>
              </div>
              <p className="text-sm text-gray-300 leading-relaxed mb-2">
                🔒 As mensagens e as ligações são protegidas com a criptografia de ponta a ponta e ficam somente entre você e os participantes desta conversa. Nem mesmo o WhatsApp pode ler ou ouvi-las.
              </p>
            </div>

            <div className="bg-[#005C4B] rounded-lg p-4">
              <div className="flex flex-col items-center text-center mb-3">
                <Users className="w-12 h-12 text-white mb-2" />
                <h3 className="text-white font-medium">Bem-vindo(a) à comunidade!</h3>
                <p className="text-sm text-gray-300 mt-1">
                  Envie avisos importantes a todos os membros de uma só vez.
                </p>
              </div>
            </div>
          </div>

          {/* Input */}
          <div className="bg-[#202C33] px-2 py-1.5 flex items-center gap-1">
            <div className="flex-1 bg-[#2A3942] rounded-full px-4 py-2 flex items-center gap-2">
              <input
                placeholder="Mensagem"
                className="flex-1 bg-transparent outline-none text-[15px] text-white"
              />
            </div>
            <button className="w-12 h-12 bg-[#25D366] rounded-full flex items-center justify-center">
              <Mic className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>
      </PhoneFrame>
    );
  }

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
              <button onClick={() => navigate(createPageUrl("VideoConversaGuia"))}>
                <Video className="w-5 h-5 mx-2" />
              </button>
              <button onClick={() => navigate(createPageUrl("TelefoneConversaGuia"))}>
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
              <button 
                onClick={() => navigate(createPageUrl("EmojiGuia"))}
                className="flex-shrink-0"
              >
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
                onClick={() => navigate(createPageUrl("ClipeAnexoGuia"))}
                className="flex-shrink-0"
              >
                <Paperclip className="w-5 h-5 text-gray-500" />
              </button>
              {!messageText && (
                <button 
                  onClick={() => navigate(createPageUrl("CameraConversaGuia"))}
                  className="flex-shrink-0"
                >
                  <Camera className="w-5 h-5 text-gray-500" />
                </button>
              )}
            </div>
            <button
              onClick={() => messageText ? handleSendMessage() : navigate(createPageUrl("MicrofoneAudioGuia"))}
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
                            setShowAttachMenu(false);
                            if (option.page) {
                              navigate(createPageUrl(option.page));
                            }
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
                          setShowChatMenu(false);
                          if (option.page) {
                            navigate(createPageUrl(option.page));
                          }
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
            <div className="flex items-center gap-3">
              <button onClick={() => navigate(createPageUrl("Home"))}>
                <ArrowLeft className="w-6 h-6 text-gray-700" />
              </button>
              <h1 className="text-2xl font-semibold text-[#008069]">WhatsApp</h1>
            </div>
            <div className="flex gap-5 items-center">
              <button 
                onClick={() => navigate(createPageUrl("AjudaWhatsApp"))}
                className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center"
              >
                <span className="text-sm font-bold text-gray-700">?</span>
              </button>
              <button onClick={() => navigate(createPageUrl("CameraWhatsApp"))}>
                <Camera className="w-6 h-6 text-gray-700" />
              </button>
              <button onClick={() => setShowMenu(!showMenu)}>
                <MoreVertical className="w-6 h-6 text-gray-700" />
              </button>
            </div>
          </div>
          
          {/* Barra de Pesquisa */}
          <button 
            onClick={() => navigate(createPageUrl("PesquisaWhatsApp"))}
            className="mt-3 bg-gray-100 rounded-lg px-4 py-2 flex items-center gap-2 w-full text-left"
          >
            <Search className="w-5 h-5 text-gray-500" />
            <span className="flex-1 text-sm text-gray-500">Pergunte à Meta AI ou pesquise</span>
          </button>
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
                  {chat.unread > 0 && (
                    <span className="bg-[#25D366] text-white text-xs font-bold px-2 py-0.5 rounded-full flex-shrink-0">
                      {chat.unread}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}

        </div>

        {/* Bottom Navigation */}
        <div className="bg-white border-t border-gray-200 flex justify-around py-2">
          <button 
            onClick={() => navigate(createPageUrl("ConversasGuia"))}
            className={`flex flex-col items-center gap-1 py-1 px-4 ${activeTab === "chats" ? "text-[#008069]" : "text-gray-500"}`}
          >
            <MessageCircle className="w-6 h-6" />
            <span className="text-xs font-medium">Conversas</span>
          </button>
          <button 
            onClick={() => navigate(createPageUrl("AtualizacoesGuia"))}
            className={`flex flex-col items-center gap-1 py-1 px-4 ${activeTab === "updates" ? "text-[#008069]" : "text-gray-500"}`}
          >
            <Bell className="w-6 h-6" />
            <span className="text-xs font-medium">Atualizações</span>
          </button>
          <button 
            onClick={() => navigate(createPageUrl("ComunidadesGuia"))}
            className={`flex flex-col items-center gap-1 py-1 px-4 ${activeTab === "communities" ? "text-[#008069]" : "text-gray-500"}`}
          >
            <Users className="w-6 h-6" />
            <span className="text-xs font-medium">Comunidades</span>
          </button>
          <button 
            onClick={() => navigate(createPageUrl("LigacoesGuia"))}
            className={`flex flex-col items-center gap-1 py-1 px-4 ${activeTab === "calls" ? "text-[#008069]" : "text-gray-500"}`}
          >
            <Phone className="w-6 h-6" />
            <span className="text-xs font-medium">Ligações</span>
          </button>
        </div>

        {/* Botão Flutuante */}
        <button 
          onClick={() => navigate(createPageUrl("BotaoMaisGuia"))}
          className="absolute bottom-20 right-6 w-14 h-14 bg-[#25D366] rounded-full shadow-lg flex items-center justify-center text-white z-10"
        >
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
                  onClick={handleNewCommunity}
                  className="w-full px-4 py-3 flex items-center gap-3 hover:bg-gray-50"
                >
                  <Users className="w-5 h-5 text-gray-600" />
                  <span className="text-[15px] text-gray-900">Nova comunidade</span>
                </button>
                <button
                  onClick={handleBroadcastList}
                  className="w-full px-4 py-3 flex items-center gap-3 hover:bg-gray-50"
                >
                  <MessageSquare className="w-5 h-5 text-gray-600" />
                  <span className="text-[15px] text-gray-900">Listas de transmissão</span>
                </button>
                <button
                  onClick={handleConnectedDevices}
                  className="w-full px-4 py-3 flex items-center gap-3 hover:bg-gray-50"
                >
                  <Smartphone className="w-5 h-5 text-gray-600" />
                  <span className="text-[15px] text-gray-900">Dispositivos conectados</span>
                </button>
                <button
                  onClick={handleFavorites}
                  className="w-full px-4 py-3 flex items-center gap-3 hover:bg-gray-50"
                >
                  <Star className="w-5 h-5 text-gray-600" />
                  <span className="text-[15px] text-gray-900">Favoritas</span>
                </button>
                <button
                  onClick={handleFindBusiness}
                  className="w-full px-4 py-3 flex items-center gap-3 hover:bg-gray-50"
                >
                  <Search className="w-5 h-5 text-gray-600" />
                  <span className="text-[15px] text-gray-900">Encontrar empresas</span>
                </button>
                <button
                  onClick={handlePayments}
                  className="w-full px-4 py-3 flex items-center gap-3 hover:bg-gray-50"
                >
                  <DollarSign className="w-5 h-5 text-gray-600" />
                  <span className="text-[15px] text-gray-900">Pagamentos</span>
                </button>
                <button
                  onClick={handleMarkAllRead}
                  className="w-full px-4 py-3 flex items-center gap-3 hover:bg-gray-50"
                >
                  <Check className="w-5 h-5 text-gray-600" />
                  <span className="text-[15px] text-gray-900">Marcar tudo como lido</span>
                </button>
                <button
                  onClick={() => {
                    navigate(createPageUrl("ConfiguracoesWhatsApp"));
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