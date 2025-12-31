import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { PhoneFrame } from "@/components/PhoneFrame";
import { StatusBar } from "@/components/StatusBar";
import { ArrowLeft, Lock, X, ChevronRight } from "lucide-react";

export default function Privacidade() {
  const navigate = useNavigate();
  const [showBanner, setShowBanner] = useState(true);
  const [readReceipts, setReadReceipts] = useState(true);
  const [cameraEffects, setCameraEffects] = useState(false);

  useEffect(() => {
    const synth = window.speechSynthesis;
    if (synth) {
      synth.cancel();
      const utter = new SpeechSynthesisUtterance(
        "Privacidade. Nesta tela você controla quem pode ver suas informações e como suas mensagens funcionam. Você pode configurar quem vê seu visto por último, sua foto de perfil, seu recado, seus links, seu status e seu Pix. Também pode ativar ou desativar as confirmações de leitura, configurar mensagens temporárias, controlar sua localização em tempo real, bloquear contatos e muito mais. Role a tela para baixo para ver todas as opções. Clique na seta à sua esquerda acima para voltar."
      );
      utter.lang = "pt-BR";
      utter.rate = 0.85;
      synth.speak(utter);
    }
    return () => window.speechSynthesis.cancel();
  }, []);

  return (
    <PhoneFrame>
      <div className="h-full bg-white flex flex-col">
        <StatusBar variant="light" />

        <div className="bg-white px-4 py-3 border-b border-gray-200 flex items-center">
          <button onClick={() => navigate(createPageUrl("ConfiguracoesWhatsApp"))}>
            <ArrowLeft className="w-6 h-6 text-gray-700" />
          </button>
          <h1 className="text-xl font-semibold text-gray-900 ml-4">Privacidade</h1>
        </div>

        <div className="flex-1 overflow-y-auto">
          {/* Banner de Checkup */}
          {showBanner && (
            <div className="bg-green-100 p-4 mx-4 mt-4 rounded-lg flex items-start gap-3">
              <Lock className="w-5 h-5 text-green-700 flex-shrink-0 mt-1" />
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 mb-1">Checkup de Privacidade</h3>
                <p className="text-sm text-gray-700 mb-2">
                  Você está no controle da sua privacidade e define as configurações da maneira que desejar.
                </p>
                <button className="text-green-700 font-medium text-sm">Configurar</button>
              </div>
              <button onClick={() => setShowBanner(false)}>
                <X className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          )}

          {/* Seção: Quem pode ver meus dados pessoais */}
          <div className="px-4 py-3 border-b-8 border-gray-100">
            <h3 className="text-sm text-gray-500 mb-3">Quem pode ver meus dados pessoais</h3>

            <div className="space-y-4">
              <button onClick={() => navigate(createPageUrl("VistoUltimo"))} className="w-full flex justify-between items-center">
                <div>
                  <h4 className="text-gray-900 text-left">Visto por último e online</h4>
                  <p className="text-sm text-gray-500 text-left">Ninguém, Todos</p>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </button>

              <button onClick={() => navigate(createPageUrl("FotoPerfil"))} className="w-full flex justify-between items-center">
                <div>
                  <h4 className="text-gray-900 text-left">Foto do perfil</h4>
                  <p className="text-sm text-gray-500 text-left">Todos</p>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </button>

              <button onClick={() => navigate(createPageUrl("Recado"))} className="w-full flex justify-between items-center">
                <div>
                  <h4 className="text-gray-900 text-left">Recado</h4>
                  <p className="text-sm text-gray-500 text-left">Todos</p>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </button>

              <button onClick={() => navigate(createPageUrl("LinksPrivacidade"))} className="w-full flex justify-between items-center">
                <div>
                  <h4 className="text-gray-900 text-left">Links</h4>
                  <p className="text-sm text-gray-500 text-left">Meus contatos</p>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </button>

              <button onClick={() => navigate(createPageUrl("StatusPrivacidade"))} className="w-full flex justify-between items-center">
                <div>
                  <h4 className="text-gray-900 text-left">Status</h4>
                  <p className="text-sm text-gray-500 text-left">Meus contatos, compartilhando no Facebook</p>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </button>

              <button onClick={() => navigate(createPageUrl("PixPrivacidade"))} className="w-full flex justify-between items-center">
                <div>
                  <h4 className="text-gray-900 text-left">Pix</h4>
                  <p className="text-sm text-gray-500 text-left">Meus contatos</p>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </button>
            </div>
          </div>

          {/* Confirmações de leitura */}
          <div className="px-4 py-4 border-b border-gray-100">
            <div className="flex items-start justify-between">
              <div className="flex-1 pr-4">
                <h4 className="text-gray-900 mb-1">Confirmações de leitura</h4>
                <p className="text-sm text-gray-600">
                  Se essa opção estiver desativada, você não poderá ver nem exibir confirmações de leitura. As confirmações de leitura sempre são exibidas em conversas em grupo.
                </p>
              </div>
              <div className="relative inline-block w-12 h-7 flex-shrink-0">
                <input
                  type="checkbox"
                  checked={readReceipts}
                  onChange={(e) => setReadReceipts(e.target.checked)}
                  className="sr-only peer"
                />
                <div className={`w-12 h-7 rounded-full ${readReceipts ? 'bg-[#25D366]' : 'bg-gray-300'} after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-6 after:w-6 after:transition-all ${readReceipts ? 'after:translate-x-5' : ''}`}></div>
              </div>
            </div>
          </div>

          {/* Mensagens temporárias */}
          <div className="px-4 py-3 border-b-8 border-gray-100">
            <h3 className="text-sm text-gray-500 mb-3">Mensagens temporárias</h3>

            <div className="space-y-4">
              <button onClick={() => navigate(createPageUrl("DuracaoPadrao"))} className="w-full flex justify-between items-start">
                <div className="flex-1 text-left">
                  <h4 className="text-gray-900 mb-1">Duração padrão</h4>
                  <p className="text-sm text-gray-600">
                    Inicie conversas com mensagens temporárias que desaparecerão após a duração que você definir.
                  </p>
                  <p className="text-sm text-gray-500 mt-1">Desativada</p>
                </div>
              </button>

              <button onClick={() => navigate(createPageUrl("GruposPrivacidade"))} className="w-full flex justify-between items-center">
                <div>
                  <h4 className="text-gray-900 text-left">Grupos</h4>
                  <p className="text-sm text-gray-500 text-left">Todos</p>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </button>
            </div>
          </div>

          {/* Outras opções */}
          <div className="px-4 py-3 border-b-8 border-gray-100">
            <div className="space-y-4">
              <button onClick={() => navigate(createPageUrl("FigurinhasAvatar"))} className="w-full flex justify-between items-center">
                <div>
                  <h4 className="text-gray-900 text-left">Figurinhas de avatar</h4>
                  <p className="text-sm text-gray-500 text-left">Meus contatos</p>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </button>

              <button onClick={() => navigate(createPageUrl("LocalizacaoTempoReal"))} className="w-full flex justify-between items-center">
                <h4 className="text-gray-900 text-left">Localização em tempo real</h4>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </button>

              <button onClick={() => navigate(createPageUrl("LigacoesPrivacidade"))} className="w-full flex justify-between items-center">
                <div>
                  <h4 className="text-gray-900 text-left">Ligações</h4>
                  <p className="text-sm text-gray-500 text-left">Silenciar números desconhecidos</p>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </button>

              <button onClick={() => navigate(createPageUrl("ContatosPrivacidade"))} className="w-full flex justify-between items-center">
                <div>
                  <h4 className="text-gray-900 text-left">Contatos</h4>
                  <p className="text-sm text-gray-500 text-left">Bloquear contatos, contatos do WhatsApp</p>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </button>

              <button onClick={() => navigate(createPageUrl("BloqueioApp"))} className="w-full flex justify-between items-center">
                <div>
                  <h4 className="text-gray-900 text-left">Bloqueio do app</h4>
                  <p className="text-sm text-gray-500 text-left">Desativado</p>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </button>

              <button onClick={() => navigate(createPageUrl("ConversasTrancadas"))} className="w-full flex justify-between items-center">
                <h4 className="text-gray-900 text-left">Conversas trancadas</h4>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </button>
            </div>
          </div>

          {/* Permitir efeitos da câmera */}
          <div className="px-4 py-4 border-b-8 border-gray-100">
            <button
              onClick={() => navigate(createPageUrl("UsarEfeitosCamera"))}
              className="w-full flex items-start justify-between"
            >
              <div className="flex-1 pr-4 text-left">
                <h4 className="text-gray-900 mb-1">Permitir efeitos da câmera</h4>
                <p className="text-sm text-gray-600">
                  Use efeitos na câmera e nas ligações de vídeo.{" "}
                  <span className="text-[#00a884]">Saiba mais</span>
                </p>
              </div>
              <div className="relative inline-block w-12 h-7 flex-shrink-0">
                <input
                  type="checkbox"
                  checked={cameraEffects}
                  onChange={(e) => setCameraEffects(e.target.checked)}
                  className="sr-only peer"
                />
                <div className={`w-12 h-7 rounded-full ${cameraEffects ? 'bg-[#25D366]' : 'bg-gray-300'} after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-6 after:w-6 after:transition-all ${cameraEffects ? 'after:translate-x-5' : ''}`}></div>
              </div>
            </button>
          </div>

          {/* Configurações avançadas */}
          <div className="px-4 py-4 border-b-8 border-gray-100">
            <button onClick={() => navigate(createPageUrl("ConfiguracoesAvancadas"))} className="w-full flex justify-between items-start">
              <div className="flex-1 text-left">
                <h4 className="text-gray-900 mb-1">Configurações avançadas</h4>
                <p className="text-sm text-gray-600">
                  Proteger endereço IP nas ligações, desativar prévia de links
                </p>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400 flex-shrink-0 ml-2" />
            </button>
          </div>

          {/* Checkup de Privacidade (final) */}
          <div className="px-4 py-4">
            <button onClick={() => navigate(createPageUrl("CheckupPrivacidade"))} className="w-full flex justify-between items-start">
              <div className="flex-1 text-left">
                <h4 className="text-gray-900 mb-1">Checkup de Privacidade</h4>
                <p className="text-sm text-gray-600">
                  Você está no controle da sua privacidade e define as configurações da maneira que desejar.
                </p>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400 flex-shrink-0 ml-2" />
            </button>
          </div>
        </div>
      </div>
    </PhoneFrame>
  );
}