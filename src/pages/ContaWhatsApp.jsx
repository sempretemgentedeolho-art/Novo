import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { PhoneFrame } from "@/components/PhoneFrame";
import { StatusBar } from "@/components/StatusBar";
import { 
  ArrowLeft, Shield, Key, Mail, MoreHorizontal, Smartphone, FileText, 
  UserPlus, Trash2, ChevronRight
} from "lucide-react";

const accountOptions = [
  {
    id: "security-notifications",
    icon: Shield,
    label: "Notificações de segurança",
    description: "",
    color: "text-gray-600"
  },
  {
    id: "access-keys",
    icon: Key,
    label: "Chaves de acesso",
    description: "",
    color: "text-gray-600"
  },
  {
    id: "email",
    icon: Mail,
    label: "Endereço de e-mail",
    description: "",
    color: "text-gray-600"
  },
  {
    id: "two-step",
    icon: MoreHorizontal,
    label: "Confirmação em duas etapas",
    description: "",
    color: "text-gray-600"
  },
  {
    id: "change-number",
    icon: Smartphone,
    label: "Mudar número",
    description: "",
    color: "text-gray-600"
  },
  {
    id: "request-data",
    icon: FileText,
    label: "Pedir dados da conta",
    description: "",
    color: "text-gray-600"
  },
  {
    id: "add-account",
    icon: UserPlus,
    label: "Adicionar conta",
    description: "",
    color: "text-gray-600"
  },
  {
    id: "delete-account",
    icon: Trash2,
    label: "Apagar conta",
    description: "",
    color: "text-red-600"
  }
];

export default function ContaWhatsApp() {
  const navigate = useNavigate();
  const urlParams = new URLSearchParams(window.location.search);
  const fromCheckup = urlParams.get('from') === 'checkup';

  useEffect(() => {
    const synth = window.speechSynthesis;
    if (synth) {
      synth.cancel();
      const utter = new SpeechSynthesisUtterance(
        "Agora você entrou em Conta. Nesta tela ficam as opções mais importantes de segurança do WhatsApp. Vamos explicar cada opção com calma, na ordem que aparece na tela."
      );
      utter.lang = "pt-BR";
      utter.rate = 0.85;
      synth.speak(utter);
    }
    return () => window.speechSynthesis.cancel();
  }, []);

  const handleOptionClick = (option) => {
    // Navegar para páginas específicas
    if (option.id === "security-notifications") {
      navigate(createPageUrl("NotificacoesSeguranca"));
    } else if (option.id === "access-keys") {
      navigate(createPageUrl("ChavesAcesso"));
    } else if (option.id === "email") {
      navigate(createPageUrl("EnderecoEmail"));
    } else if (option.id === "change-number") {
      navigate(createPageUrl("MudarNumero"));
    } else if (option.id === "request-data") {
      navigate(createPageUrl("PedirDadosConta"));
    } else if (option.id === "add-account") {
      navigate(createPageUrl("AdicionarConta"));
    } else if (option.id === "delete-account") {
      navigate(createPageUrl("ApagarConta"));
    } else {
      // Para outras opções, apenas falar
      const synth = window.speechSynthesis;
      if (synth) {
        synth.cancel();
        
        let message = "";
        if (option.id === "two-step") {
          message = "Confirmação em duas etapas. Aqui você cria um código de segurança. Esse código protege seu WhatsApp se alguém tentar usar seu número em outro celular. É muito importante ativar essa opção.";
        }
        
        const utter = new SpeechSynthesisUtterance(message);
        utter.lang = "pt-BR";
        utter.rate = 0.85;
        synth.speak(utter);
      }
    }
  };

  return (
    <PhoneFrame>
      <div className="h-full bg-white flex flex-col">
        <StatusBar variant="light" />

        {/* Header */}
        <div className="bg-white px-4 py-3 border-b border-gray-200 flex items-center">
          <button onClick={() => navigate(fromCheckup ? createPageUrl("CheckupProtecaoConta") : createPageUrl("ConfiguracoesWhatsApp"))}>
            <ArrowLeft className="w-6 h-6 text-gray-700" />
          </button>
          <h1 className="text-xl font-semibold text-gray-900 ml-4">Conta</h1>
        </div>

        {/* Conteúdo */}
        <div className="flex-1 overflow-y-auto">
          <div className="py-2">
            {accountOptions.map((option) => {
              const Icon = option.icon;
              return (
                <button
                  key={option.id}
                  onClick={() => handleOptionClick(option)}
                  className="w-full px-4 py-4 flex items-center gap-4 hover:bg-gray-50 border-b border-gray-100"
                >
                  <div className="w-10 h-10 flex items-center justify-center">
                    <Icon className={`w-6 h-6 ${option.color}`} />
                  </div>
                  <div className="flex-1 text-left">
                    <h3 className={`font-normal text-gray-900 text-[16px] ${option.id === 'delete-account' ? 'text-red-600' : ''}`}>
                      {option.label}
                    </h3>
                    {option.description && (
                      <p className="text-sm text-gray-600 mt-0.5">{option.description}</p>
                    )}
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </PhoneFrame>
  );
}