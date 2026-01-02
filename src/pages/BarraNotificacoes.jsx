import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { PhoneFrame } from "@/components/PhoneFrame";
import { StatusBar } from "@/components/StatusBar";
import { ArrowLeft, Bell, X, Eye } from "lucide-react";

export default function BarraNotificacoes() {
  const navigate = useNavigate();

  useEffect(() => {
    const synth = window.speechSynthesis;
    if (synth) {
      synth.cancel();
      const utter = new SpeechSynthesisUtterance(
        "Barra de notificações. Aqui você aprende a ver e limpar as notificações do seu celular. Mensagens, avisos de apps e muito mais."
      );
      utter.lang = "pt-BR";
      utter.rate = 0.80;
      synth.speak(utter);
    }
    return () => window.speechSynthesis.cancel();
  }, []);

  return (
    <PhoneFrame>
      <div className="h-full bg-white flex flex-col">
        <StatusBar variant="light" />

        {/* Header */}
        <div className="bg-[#1976D2] text-white px-4 py-3 flex items-center gap-4">
          <button onClick={() => navigate(createPageUrl("Home"))}>
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h2 className="text-lg font-medium">Barra de Notificações</h2>
        </div>

        {/* Conteúdo */}
        <div className="flex-1 overflow-y-auto p-4">
          <div className="mb-6">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
              <Bell className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">O que são notificações?</h3>
            <p className="text-gray-700 leading-relaxed">
              Notificações são avisos que aparecem no topo do celular. Podem ser mensagens do WhatsApp, lembretes, avisos de apps e muito mais.
            </p>
          </div>

          {/* Como ver */}
          <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
            <div className="flex items-center gap-2 mb-3">
              <Eye className="w-5 h-5 text-blue-700" />
              <h3 className="font-semibold text-blue-900">Como ver as notificações</h3>
            </div>
            <ol className="space-y-2 text-sm text-blue-800">
              <li>1. Coloque o dedo no TOPO da tela</li>
              <li>2. ARRASTE o dedo para BAIXO</li>
              <li>3. A barra de notificações desce</li>
              <li>4. Você vê todas as notificações</li>
              <li>5. Toque em uma para abrir o app</li>
            </ol>
          </div>

          {/* Como limpar */}
          <div className="bg-green-50 border-l-4 border-green-500 p-4 mb-6">
            <div className="flex items-center gap-2 mb-3">
              <X className="w-5 h-5 text-green-700" />
              <h3 className="font-semibold text-green-900">Como limpar notificações</h3>
            </div>
            <div className="space-y-3 text-sm text-green-800">
              <div>
                <p className="font-medium mb-1">Limpar uma notificação:</p>
                <ul className="space-y-1 pl-4">
                  <li>• Arraste a notificação para o LADO</li>
                  <li>• Ou toque no X ao lado dela</li>
                </ul>
              </div>
              <div>
                <p className="font-medium mb-1">Limpar todas:</p>
                <ul className="space-y-1 pl-4">
                  <li>• Abra a barra de notificações</li>
                  <li>• Procure o botão "Limpar tudo"</li>
                  <li>• Toque nele - todas somem</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Tipos de notificações */}
          <div className="bg-purple-50 border-l-4 border-purple-500 p-4 mb-6">
            <h3 className="font-semibold text-purple-900 mb-2">Tipos de notificações</h3>
            <ul className="space-y-2 text-sm text-purple-800">
              <li>• <strong>Mensagens:</strong> WhatsApp, SMS, e-mail</li>
              <li>• <strong>Chamadas perdidas:</strong> Ligações que você não atendeu</li>
              <li>• <strong>Atualizações:</strong> Apps que precisam atualizar</li>
              <li>• <strong>Lembretes:</strong> Alarmes, eventos, compromissos</li>
              <li>• <strong>Sistema:</strong> Avisos do próprio celular</li>
            </ul>
          </div>

          {/* Ícones */}
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
            <h3 className="font-semibold text-yellow-900 mb-2">Ícones importantes</h3>
            <div className="space-y-2 text-sm text-yellow-800">
              <p>Quando há notificações, ícones aparecem no topo:</p>
              <ul className="space-y-1 pl-4 mt-2">
                <li>• 💬 Nova mensagem</li>
                <li>• 📞 Chamada perdida</li>
                <li>• 📧 Novo e-mail</li>
                <li>• 🔔 Lembrete ou alarme</li>
              </ul>
            </div>
          </div>

          {/* Dicas */}
          <div className="bg-green-50 border-l-4 border-green-500 p-4">
            <h3 className="font-semibold text-green-900 mb-2">💡 Dicas importantes</h3>
            <ul className="space-y-1 text-sm text-green-800">
              <li>• Limpe as notificações regularmente</li>
              <li>• Não precisa ler todas - só as importantes</li>
              <li>• Se aparecer muitas notificações de um app que não usa, você pode desativar nas Configurações</li>
              <li>• Notificações antigas não fazem mal, mas deixam a tela cheia</li>
            </ul>
          </div>
        </div>
      </div>
    </PhoneFrame>
  );
}