import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { PhoneFrame } from "@/components/PhoneFrame";
import { StatusBar } from "@/components/StatusBar";
import { 
  ArrowLeft, Search, Key, Lock, User as UserIcon, List, MessageSquare, 
  Send, Bell, HardDrive, Accessibility, Globe, HelpCircle, Users, 
  Download, ChevronRight, QrCode, Plus
} from "lucide-react";

const settingsOptions = [
  {
    id: "account",
    icon: Key,
    label: "Conta",
    description: "Notificações de segurança, mudança de número",
    color: "text-gray-600"
  },
  {
    id: "privacy",
    icon: Lock,
    label: "Privacidade",
    description: "Bloqueio de contatos, mensagens temporárias",
    color: "text-gray-600"
  },
  {
    id: "avatar",
    icon: UserIcon,
    label: "Avatar",
    description: "Criar, editar, foto do perfil",
    color: "text-gray-600"
  },
  {
    id: "lists",
    icon: List,
    label: "Listas",
    description: "Gerenciar pessoas e grupos",
    color: "text-gray-600"
  },
  {
    id: "chats",
    icon: MessageSquare,
    label: "Conversas",
    description: "Tema, papel de parede, histórico de conversas",
    color: "text-gray-600"
  },
  {
    id: "broadcast",
    icon: Send,
    label: "Listas de transmissão",
    description: "Gerencie listas e envie transmissões",
    color: "text-gray-600"
  },
  {
    id: "notifications",
    icon: Bell,
    label: "Notificações",
    description: "Mensagens, grupos, ligações",
    color: "text-gray-600"
  },
  {
    id: "storage",
    icon: HardDrive,
    label: "Armazenamento e dados",
    description: "Uso de rede, download automático",
    color: "text-gray-600"
  },
  {
    id: "accessibility",
    icon: Accessibility,
    label: "Acessibilidade",
    description: "Aumentar o contraste, animação",
    color: "text-gray-600"
  },
  {
    id: "language",
    icon: Globe,
    label: "Idioma do app",
    description: "Português (Brasil) (idioma do dispositivo)",
    color: "text-gray-600"
  },
  {
    id: "help",
    icon: HelpCircle,
    label: "Ajuda e avaliação",
    description: "Central de Ajuda, fale conosco, Política de Privacidade",
    color: "text-gray-600"
  },
  {
    id: "invite",
    icon: Users,
    label: "Convidar amigos",
    description: "",
    color: "text-gray-600"
  },
  {
    id: "updates",
    icon: Download,
    label: "Atualizações do app",
    description: "",
    color: "text-gray-600"
  }
];

export default function ConfiguracoesWhatsApp() {
  const navigate = useNavigate();

  useEffect(() => {
    const synth = window.speechSynthesis;
    if (synth) {
      synth.cancel();
      const utter = new SpeechSynthesisUtterance(
        "Configurações do WhatsApp. Aqui você pode ajustar conta, privacidade, notificações e muito mais."
      );
      utter.lang = "pt-BR";
      utter.rate = 0.85;
      synth.speak(utter);
    }
    return () => window.speechSynthesis.cancel();
  }, []);

  const handleOptionClick = (option) => {
    const synth = window.speechSynthesis;
    if (synth) {
      synth.cancel();
      const utter = new SpeechSynthesisUtterance(option.label);
      utter.lang = "pt-BR";
      utter.rate = 0.85;
      synth.speak(utter);
    }
    
    // Navegar para a página específica
    if (option.id === "account") {
      setTimeout(() => {
        navigate(createPageUrl("ContaWhatsApp"));
      }, 500);
    } else if (option.id === "privacy") {
      setTimeout(() => {
        navigate(createPageUrl("Privacidade"));
      }, 500);
    } else if (option.id === "avatar") {
      setTimeout(() => {
        navigate(createPageUrl("AvatarInicial"));
      }, 500);
    } else if (option.id === "lists") {
      setTimeout(() => {
        navigate(createPageUrl("Listas"));
      }, 500);
    } else if (option.id === "chats") {
      setTimeout(() => {
        navigate(createPageUrl("Conversas"));
      }, 500);
    } else if (option.id === "broadcast") {
      setTimeout(() => {
        navigate(createPageUrl("ListasTransmissao"));
      }, 500);
    } else if (option.id === "notifications") {
      setTimeout(() => {
        navigate(createPageUrl("Notificacoes"));
      }, 500);
    } else if (option.id === "storage") {
      setTimeout(() => {
        navigate(createPageUrl("ArmazenamentoDados"));
      }, 500);
    } else if (option.id === "accessibility") {
      setTimeout(() => {
        navigate(createPageUrl("Acessibilidade"));
      }, 500);
    } else if (option.id === "language") {
      setTimeout(() => {
        navigate(createPageUrl("IdiomaApp"));
      }, 500);
    } else if (option.id === "help") {
      setTimeout(() => {
        navigate(createPageUrl("AjudaAvaliacaoWhatsApp"));
      }, 500);
    } else if (option.id === "invite") {
      setTimeout(() => {
        navigate(createPageUrl("ConvidarAmigos"));
      }, 500);
    } else if (option.id === "updates") {
      setTimeout(() => {
        navigate(createPageUrl("AtualizacoesApp"));
      }, 500);
    }
  };

  return (
    <PhoneFrame>
      <div className="h-full bg-white flex flex-col">
        <StatusBar variant="light" />

        {/* Header */}
        <div className="bg-white px-4 py-3 border-b border-gray-200 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button onClick={() => navigate(createPageUrl("WhatsApp"))}>
              <ArrowLeft className="w-6 h-6 text-gray-700" />
            </button>
            <h1 className="text-xl font-semibold text-gray-900">Configurações</h1>
          </div>
          <button>
            <Search className="w-6 h-6 text-gray-700" />
          </button>
        </div>

        {/* Conteúdo */}
        <div className="flex-1 overflow-y-auto">
          {/* Perfil do usuário */}
          <div className="p-4 border-b border-gray-200 flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-gray-300 flex items-center justify-center text-2xl">
              👤
            </div>
            <div className="flex-1">
              <h2 className="font-semibold text-gray-900 text-lg">Forja da Consciência</h2>
              <p className="text-sm text-gray-600">Disponível</p>
            </div>
            <button className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
              <QrCode className="w-5 h-5 text-[#25D366]" />
            </button>
            <button className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
              <Plus className="w-5 h-5 text-[#25D366]" />
            </button>
          </div>

          {/* Opções de configuração */}
          <div className="py-2">
            {settingsOptions.map((option, index) => {
              const Icon = option.icon;
              return (
                <button
                  key={option.id}
                  onClick={() => handleOptionClick(option)}
                  className="w-full px-4 py-3 flex items-center gap-4 hover:bg-gray-50 border-b border-gray-100"
                >
                  <div className="w-10 h-10 flex items-center justify-center">
                    <Icon className={`w-6 h-6 ${option.color}`} />
                  </div>
                  <div className="flex-1 text-left">
                    <h3 className="font-medium text-gray-900 text-[16px]">{option.label}</h3>
                    {option.description && (
                      <p className="text-sm text-gray-600 mt-0.5">{option.description}</p>
                    )}
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </button>
              );
            })}
          </div>

          {/* Meta section */}
          <div className="p-4 bg-gray-50 mt-4">
            <button
              onClick={() => {
                const synth = window.speechSynthesis;
                if (synth) {
                  synth.cancel();
                  const utter = new SpeechSynthesisUtterance(
                    "Meta é a empresa que criou o WhatsApp. Ela também é dona do Facebook, Instagram e outros aplicativos."
                  );
                  utter.lang = "pt-BR";
                  utter.rate = 0.80;
                  synth.speak(utter);
                }
              }}
              className="mb-4 w-full text-left"
            >
              <div className="flex items-center gap-2 mb-2">
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="#0081FB">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
                </svg>
                <span className="font-semibold text-gray-900">Meta</span>
              </div>
              <h3 className="font-semibold text-gray-900 text-base mb-1">Central de Contas</h3>
              <p className="text-sm text-gray-600">
                Controle sua experiência no WhatsApp, no Facebook, no Instagram e mais.
              </p>
            </button>

            <div className="pt-4 border-t border-gray-200">
              <p className="text-sm text-gray-600 mb-4">Também da Meta</p>
              <button
                onClick={() => navigate(createPageUrl("MetaApps"))}
                className="w-full"
              >
                <div className="grid grid-cols-4 gap-4">
                <div className="flex flex-col items-center gap-2">
                  <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center">
                    <svg className="w-8 h-8" viewBox="0 0 24 24" fill="#0081FB">
                      <circle cx="12" cy="12" r="10"/>
                    </svg>
                  </div>
                  <span className="text-xs text-gray-700 text-center">Meta AI App</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center">
                    <svg className="w-8 h-8" viewBox="0 0 24 24" fill="url(#instagram-gradient)">
                      <defs>
                        <linearGradient id="instagram-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#833AB4"/>
                          <stop offset="50%" stopColor="#E1306C"/>
                          <stop offset="100%" stopColor="#FD1D1D"/>
                        </linearGradient>
                      </defs>
                      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                      <circle cx="12" cy="12" r="4" fill="white"/>
                      <circle cx="17.5" cy="6.5" r="1.5" fill="white"/>
                    </svg>
                  </div>
                  <span className="text-xs text-gray-700 text-center">Instagram</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center">
                    <svg className="w-8 h-8" viewBox="0 0 24 24" fill="#1877F2">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                  </div>
                  <span className="text-xs text-gray-700 text-center">Facebook</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center">
                    <svg className="w-8 h-8" viewBox="0 0 24 24" fill="#000000">
                      <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8z"/>
                      <path d="M12 6c-3.309 0-6 2.691-6 6s2.691 6 6 6 6-2.691 6-6-2.691-6-6-6z"/>
                    </svg>
                  </div>
                  <span className="text-xs text-gray-700 text-center">Threads</span>
                </div>
              </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </PhoneFrame>
  );
}