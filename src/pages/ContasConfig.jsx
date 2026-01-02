import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { PhoneFrame } from "@/components/PhoneFrame";
import { StatusBar } from "@/components/StatusBar";
import { ArrowLeft, User, Mail, Chrome, Plus } from "lucide-react";

export default function ContasConfig() {
  const navigate = useNavigate();

  useEffect(() => {
    const synth = window.speechSynthesis;
    if (synth) {
      synth.cancel();
      const utter = new SpeechSynthesisUtterance(
        "Contas. Aqui você gerencia as contas conectadas ao celular: Google, e-mail e outras contas de aplicativos."
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
          <button onClick={() => navigate(createPageUrl("Configuracoes"))}>
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h2 className="text-lg font-medium">Contas</h2>
        </div>

        {/* Conteúdo */}
        <div className="flex-1 overflow-y-auto">
          {/* Explicação */}
          <div className="p-4 bg-blue-50 border-b border-blue-200">
            <h3 className="font-semibold text-blue-900 mb-2">O que são contas?</h3>
            <p className="text-sm text-blue-800">
              Contas são os logins que você usa no celular. A conta Google é a principal - ela sincroniza contatos, e-mails, fotos e backup.
            </p>
          </div>

          {/* Contas adicionadas */}
          <div className="p-4">
            <h3 className="font-semibold text-gray-900 mb-4">Contas no dispositivo</h3>

            <div className="space-y-3">
              {/* Conta Google */}
              <div className="p-4 border-2 border-blue-500 rounded-lg bg-blue-50">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                    <Chrome className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900">Conta Google</h4>
                    <p className="text-sm text-gray-600">usuario@gmail.com</p>
                  </div>
                </div>
                <div className="bg-white p-3 rounded">
                  <p className="text-sm text-gray-700 mb-2"><strong>Sincronizando:</strong></p>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>✓ Contatos</li>
                    <li>✓ Gmail</li>
                    <li>✓ Google Fotos</li>
                    <li>✓ Drive (Backup)</li>
                  </ul>
                </div>
              </div>

              {/* Conta WhatsApp */}
              <div className="p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                    <span className="text-2xl">💬</span>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900">WhatsApp</h4>
                    <p className="text-sm text-gray-600">+55 51 99999-9999</p>
                  </div>
                </div>
              </div>

              {/* Botão adicionar */}
              <button className="w-full p-4 border-2 border-dashed border-gray-300 rounded-lg hover:bg-gray-50">
                <div className="flex items-center justify-center gap-2 text-gray-600">
                  <Plus className="w-5 h-5" />
                  <span className="font-medium">Adicionar conta</span>
                </div>
              </button>
            </div>
          </div>

          {/* O que é conta Google */}
          <div className="p-4 bg-green-50 border-y border-green-200">
            <h3 className="font-semibold text-green-900 mb-2">Para que serve a conta Google?</h3>
            <ul className="space-y-2 text-sm text-green-800">
              <li>• <strong>Backup automático:</strong> Suas fotos e dados ficam salvos na nuvem</li>
              <li>• <strong>Sincroniza contatos:</strong> Se trocar de celular, não perde nada</li>
              <li>• <strong>Gmail:</strong> Acessa seus e-mails</li>
              <li>• <strong>Play Store:</strong> Baixa e atualiza aplicativos</li>
              <li>• <strong>Google Fotos:</strong> Armazena fotos online (15 GB grátis)</li>
            </ul>
          </div>

          {/* Como adicionar conta */}
          <div className="p-4">
            <h3 className="font-semibold text-gray-900 mb-3">Como adicionar uma conta</h3>
            <ol className="space-y-2 text-sm text-gray-700">
              <li>1. Toque em "Adicionar conta"</li>
              <li>2. Escolha o tipo (Google, E-mail, etc.)</li>
              <li>3. Digite seu e-mail e senha</li>
              <li>4. Siga as instruções na tela</li>
              <li>5. Pronto! A conta será adicionada</li>
            </ol>
          </div>

          {/* Como remover conta */}
          <div className="p-4 bg-red-50 border-t border-red-200">
            <h3 className="font-semibold text-red-900 mb-2">Como remover uma conta</h3>
            <ol className="space-y-1 text-sm text-red-800">
              <li>1. Toque na conta que quer remover</li>
              <li>2. Procure "Remover conta" no menu</li>
              <li>3. Confirme</li>
            </ol>
            <p className="text-xs text-red-700 mt-2">
              ⚠️ Cuidado: Ao remover a conta Google, você pode perder acesso aos aplicativos e dados sincronizados.
            </p>
          </div>

          {/* Dicas */}
          <div className="p-4 space-y-3">
            <div className="bg-blue-50 border-l-4 border-blue-500 p-4">
              <h3 className="font-semibold text-blue-900 mb-2">💡 Importante</h3>
              <ul className="space-y-1 text-sm text-blue-800">
                <li>• Sempre tenha uma conta Google configurada</li>
                <li>• Não esqueça sua senha do Google!</li>
                <li>• Você pode ter mais de uma conta</li>
                <li>• Verifique se o backup está ativado</li>
              </ul>
            </div>

            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
              <h3 className="font-semibold text-yellow-900 mb-2">⚠️ Lembre-se</h3>
              <p className="text-sm text-yellow-800">
                A senha da sua conta Google é diferente da senha do celular. Anote em um lugar seguro!
              </p>
            </div>
          </div>
        </div>
      </div>
    </PhoneFrame>
  );
}