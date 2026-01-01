import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { PhoneFrame } from "@/components/PhoneFrame";
import { StatusBar } from "@/components/StatusBar";
import { ArrowLeft, Users, MessageCircle, Bell, Plus } from "lucide-react";

export default function ComunidadesGuia() {
  const navigate = useNavigate();

  useEffect(() => {
    const synth = window.speechSynthesis;
    if (synth) {
      synth.cancel();
      const utter = new SpeechSynthesisUtterance(
        "Comunidades. Aba Comunidades do WhatsApp. As comunidades servem para organizar vários grupos que tratam de um assunto parecido em um só lugar. É como juntar grupos de vizinhos, da igreja ou da família em um lugar só. Deixa eu explicar melhor. Como identificar? O ícone parece um desenho de várias pessoas juntas. Criar Nova Comunidade: Toque no botão de mais para criar um espaço onde você pode reunir seus grupos e enviar avisos para todos ao mesmo tempo. Grupos de Avisos: Dentro da comunidade, existe um grupo especial chamado Avisos, onde apenas os administradores podem mandar mensagens importantes. Assim, todo mundo vê o recado principal. Grupos Normais: Além dos avisos, você pode ter outros grupos dentro da comunidade, como Grupo Geral, onde todos podem conversar livremente. A comunidade é perfeita para organizar várias conversas sobre o mesmo tema. Por exemplo: você pode ter uma comunidade do condomínio, com um grupo de avisos para informar sobre reuniões, e outros grupos para falar de churrasqueira, piscina, portaria. Tudo em um lugar só! Clique na seta à sua esquerda acima para voltar."
      );
      utter.lang = "pt-BR";
      utter.rate = 0.73;
      synth.speak(utter);
    }
    return () => window.speechSynthesis.cancel();
  }, []);

  return (
    <PhoneFrame>
      <div className="h-full bg-white flex flex-col">
        <StatusBar variant="light" />

        <div className="bg-[#008069] text-white px-4 py-3 flex items-center">
          <button onClick={() => navigate(createPageUrl("WhatsApp"))}>
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-xl font-semibold ml-4">Aba Comunidades</h1>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          {/* Ícone principal */}
          <div className="flex justify-center mb-6">
            <div className="w-32 h-32 rounded-full bg-gradient-to-br from-[#25D366] to-[#128C7E] flex items-center justify-center">
              <Users className="w-16 h-16 text-white" />
            </div>
          </div>

          {/* O que é */}
          <div className="bg-blue-50 rounded-lg p-5 mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-3">🏘️ O que é?</h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              As comunidades servem para <strong>organizar vários grupos</strong> que tratam de um assunto parecido em um só lugar.
            </p>
            <p className="text-gray-700">
              É como juntar grupos de vizinhos, da igreja ou da família em um lugar só!
            </p>
          </div>

          {/* Como identificar */}
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-5 mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-3">👁️ Como identificar:</h2>
            <div className="flex items-center gap-4 bg-white p-4 rounded-lg">
              <Users className="w-12 h-12 text-[#25D366]" />
              <p className="text-gray-700">
                O ícone parece um desenho de <strong>várias pessoas juntas</strong>. Fica na parte de baixo do WhatsApp.
              </p>
            </div>
          </div>

          {/* Nova Comunidade */}
          <div className="bg-white border-2 border-[#25D366] rounded-lg p-5 mb-6">
            <div className="flex items-center gap-3 mb-3">
              <Plus className="w-8 h-8 text-[#25D366]" />
              <h2 className="text-xl font-semibold text-gray-900">Criar Nova Comunidade</h2>
            </div>
            <p className="text-gray-700 mb-3">
              Toque no botão de <strong>mais (+)</strong> para criar um espaço onde você pode reunir seus grupos e enviar avisos para todos ao mesmo tempo.
            </p>
            <div className="bg-green-50 p-3 rounded-lg">
              <p className="text-sm text-gray-800">
                💡 Perfeito para organizar: condomínio, igreja, escola, família, clube ou bairro
              </p>
            </div>
          </div>

          {/* Grupos de Avisos */}
          <div className="bg-orange-50 rounded-lg p-5 mb-6">
            <div className="flex items-center gap-3 mb-3">
              <Bell className="w-8 h-8 text-orange-600" />
              <h2 className="text-xl font-semibold text-gray-900">Grupo de Avisos</h2>
            </div>
            <p className="text-gray-700 mb-4">
              Dentro da comunidade, existe um grupo especial chamado <strong>"Avisos"</strong>.
            </p>

            <div className="bg-white p-4 rounded-lg space-y-3">
              <div>
                <p className="font-medium text-gray-900 mb-1">Só administradores mandam mensagens</p>
                <p className="text-sm text-gray-700">Apenas quem criou a comunidade pode enviar avisos importantes</p>
              </div>
              <div>
                <p className="font-medium text-gray-900 mb-1">Todo mundo recebe</p>
                <p className="text-sm text-gray-700">Todos os membros da comunidade veem os avisos</p>
              </div>
              <div>
                <p className="font-medium text-gray-900 mb-1">Sem bagunça</p>
                <p className="text-sm text-gray-700">Como só os responsáveis podem falar, não tem conversa misturada</p>
              </div>
            </div>
          </div>

          {/* Grupos Normais */}
          <div className="bg-teal-50 rounded-lg p-5 mb-6">
            <div className="flex items-center gap-3 mb-3">
              <MessageCircle className="w-8 h-8 text-teal-600" />
              <h2 className="text-xl font-semibold text-gray-900">Grupos Normais</h2>
            </div>
            <p className="text-gray-700 mb-3">
              Além dos avisos, você pode ter <strong>outros grupos</strong> dentro da comunidade.
            </p>
            <div className="bg-white p-4 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-2">Exemplos de grupos:</h3>
              <ul className="space-y-2 text-gray-700">
                <li>💬 <strong>Geral:</strong> Para todo mundo conversar livremente</li>
                <li>🏊 <strong>Piscina:</strong> Organizar o uso da piscina</li>
                <li>🍖 <strong>Churrasqueira:</strong> Agendar churrascos</li>
                <li>🚗 <strong>Garagem:</strong> Avisar sobre carros</li>
                <li>👨‍👩‍👧 <strong>Pais:</strong> Para os pais conversarem</li>
              </ul>
            </div>
          </div>

          {/* Exemplo prático */}
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-5 mb-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-3">💡 Exemplo prático:</h2>
            <div className="space-y-3">
              <div className="bg-white p-3 rounded-lg">
                <p className="font-semibold text-gray-900 mb-2">🏢 Comunidade do Condomínio</p>
                <ul className="space-y-1 text-sm text-gray-700 ml-4">
                  <li>📢 Grupo Avisos - Síndico manda avisos oficiais</li>
                  <li>💬 Grupo Geral - Moradores conversam</li>
                  <li>🏊 Grupo Piscina - Organizar uso da piscina</li>
                  <li>🍖 Grupo Churrasqueira - Agendar churrascos</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Vantagens */}
          <div className="bg-green-50 rounded-lg p-5">
            <h2 className="text-xl font-semibold text-gray-900 mb-3">💚 Vantagens:</h2>
            <ul className="space-y-2 text-gray-700">
              <li>✓ Tudo organizado em um só lugar</li>
              <li>✓ Avisos importantes separados das conversas</li>
              <li>✓ Vários grupos sobre o mesmo tema</li>
              <li>✓ Fácil de encontrar as conversas</li>
              <li>✓ Administradores controlam os avisos oficiais</li>
            </ul>
          </div>
        </div>
      </div>
    </PhoneFrame>
  );
}