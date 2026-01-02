import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { PhoneFrame } from "@/components/PhoneFrame";
import { StatusBar } from "@/components/StatusBar";
import { ArrowLeft, Lock, Hash, Fingerprint, ScanFace } from "lucide-react";

export default function BloqueioTela() {
  const navigate = useNavigate();

  useEffect(() => {
    const synth = window.speechSynthesis;
    if (synth) {
      synth.cancel();
      const utter = new SpeechSynthesisUtterance(
        "Bloqueio de tela. Aqui você configura como desbloquear o celular: senha, padrão, impressão digital ou reconhecimento facial."
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
          <h2 className="text-lg font-medium">Bloqueio de tela</h2>
        </div>

        {/* Conteúdo */}
        <div className="flex-1 overflow-y-auto">
          {/* O que é */}
          <div className="p-4 bg-blue-50 border-b border-blue-200">
            <div className="flex items-center gap-2 mb-2">
              <Lock className="w-5 h-5 text-blue-700" />
              <h3 className="font-semibold text-blue-900">Para que serve?</h3>
            </div>
            <p className="text-sm text-blue-800">
              O bloqueio de tela protege seu celular. Só você consegue desbloquear e ver suas informações.
            </p>
          </div>

          {/* Tipos de bloqueio */}
          <div className="p-4">
            <h3 className="font-semibold text-gray-900 mb-4">Escolha como desbloquear</h3>

            <div className="space-y-3">
              {/* Nenhum */}
              <div className="p-4 border-2 border-gray-200 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                    <span className="text-xl">⚪</span>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900">Nenhum</h4>
                    <p className="text-sm text-gray-600">Celular sem proteção</p>
                  </div>
                </div>
                <p className="text-xs text-red-600 mt-2">
                  ⚠️ Não recomendado - qualquer pessoa pode ver suas informações
                </p>
              </div>

              {/* Padrão */}
              <div className="p-4 border-2 border-blue-500 rounded-lg bg-blue-50">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <Hash className="w-5 h-5 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900">Padrão</h4>
                    <p className="text-sm text-gray-600">Desenhe um padrão com o dedo</p>
                  </div>
                </div>
                <div className="bg-white p-3 rounded mt-2">
                  <p className="text-sm text-gray-700 mb-2"><strong>Como criar:</strong></p>
                  <ol className="text-sm text-gray-700 space-y-1">
                    <li>1. Desenhe um padrão conectando 4 pontos ou mais</li>
                    <li>2. Desenhe novamente para confirmar</li>
                    <li>3. Pronto! Use esse padrão para desbloquear</li>
                  </ol>
                </div>
              </div>

              {/* PIN */}
              <div className="p-4 border-2 border-green-500 rounded-lg bg-green-50">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <span className="text-xl">🔢</span>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900">PIN (Senha numérica)</h4>
                    <p className="text-sm text-gray-600">4 a 16 números</p>
                  </div>
                </div>
                <div className="bg-white p-3 rounded mt-2">
                  <p className="text-sm text-gray-700 mb-2"><strong>Como criar:</strong></p>
                  <ol className="text-sm text-gray-700 space-y-1">
                    <li>1. Escolha 4 números (ex: 1234)</li>
                    <li>2. Digite novamente para confirmar</li>
                    <li>3. Use esses números para desbloquear</li>
                  </ol>
                  <p className="text-xs text-yellow-700 mt-2">
                    💡 Não use datas óbvias como aniversário
                  </p>
                </div>
              </div>

              {/* Senha */}
              <div className="p-4 border-2 border-gray-200 rounded-lg">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                    <Lock className="w-5 h-5 text-gray-600" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900">Senha</h4>
                    <p className="text-sm text-gray-600">Letras, números e símbolos</p>
                  </div>
                </div>
                <p className="text-sm text-gray-700 mt-2">
                  Mais seguro, mas mais difícil de digitar
                </p>
              </div>

              {/* Impressão digital */}
              <div className="p-4 border-2 border-purple-500 rounded-lg bg-purple-50">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                    <Fingerprint className="w-5 h-5 text-purple-600" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900">Impressão digital</h4>
                    <p className="text-sm text-gray-600">Rápido e seguro</p>
                  </div>
                </div>
                <div className="bg-white p-3 rounded mt-2">
                  <p className="text-sm text-gray-700 mb-2"><strong>Como usar:</strong></p>
                  <ol className="text-sm text-gray-700 space-y-1">
                    <li>1. Primeiro configure PIN ou padrão (backup)</li>
                    <li>2. Coloque o dedo no sensor várias vezes</li>
                    <li>3. O celular aprende sua digital</li>
                    <li>4. Depois, só encostar o dedo desbloqueia</li>
                  </ol>
                </div>
              </div>

              {/* Reconhecimento facial */}
              <div className="p-4 border-2 border-gray-200 rounded-lg">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <ScanFace className="w-5 h-5 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900">Reconhecimento facial</h4>
                    <p className="text-sm text-gray-600">Desbloqueia olhando para a câmera</p>
                  </div>
                </div>
                <p className="text-xs text-gray-600 mt-2">
                  Disponível em alguns celulares mais modernos
                </p>
              </div>
            </div>
          </div>

          {/* Dicas */}
          <div className="p-4 space-y-3">
            <div className="bg-green-50 border-l-4 border-green-500 p-4">
              <h3 className="font-semibold text-green-900 mb-2">✓ Recomendações</h3>
              <ul className="space-y-1 text-sm text-green-800">
                <li>• Use sempre algum tipo de bloqueio</li>
                <li>• Impressão digital é rápido e seguro</li>
                <li>• PIN de 6 números é mais seguro que 4</li>
                <li>• Não compartilhe sua senha com ninguém</li>
              </ul>
            </div>

            <div className="bg-red-50 border-l-4 border-red-500 p-4">
              <h3 className="font-semibold text-red-900 mb-2">⚠️ Cuidado</h3>
              <p className="text-sm text-red-800">
                Se esquecer sua senha, pode ser difícil recuperar. Anote em um lugar seguro que só você sabe.
              </p>
            </div>
          </div>
        </div>
      </div>
    </PhoneFrame>
  );
}