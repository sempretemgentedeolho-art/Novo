import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { PhoneFrame } from "@/components/PhoneFrame";
import { StatusBar } from "@/components/StatusBar";
import { ArrowLeft, FileText } from "lucide-react";

export default function DocumentoAnexo() {
  const navigate = useNavigate();

  useEffect(() => {
    const synth = window.speechSynthesis;
    if (synth) {
      synth.cancel();
      const utter = new SpeechSynthesisUtterance(
        "Este é o botão de Documento. Use este botão quando você precisa enviar arquivos como: PDF, documentos do Word, planilhas, apresentações ou qualquer tipo de arquivo do celular."
      );
      utter.lang = "pt-BR";
      utter.rate = 0.80;
      synth.speak(utter);

      setTimeout(() => {
        const utter2 = new SpeechSynthesisUtterance(
          "Ao clicar em Documento, o WhatsApp abre seus arquivos. Você escolhe qual documento enviar e confirma. A pessoa recebe e pode abrir direto no WhatsApp."
        );
        utter2.lang = "pt-BR";
        utter2.rate = 0.80;
        synth.speak(utter2);
      }, 9000);
    }
    return () => window.speechSynthesis.cancel();
  }, []);

  return (
    <PhoneFrame>
      <div className="h-full bg-white flex flex-col">
        <StatusBar variant="light" />

        {/* Header */}
        <div className="bg-[#008069] text-white px-4 py-3 flex items-center gap-4">
          <button onClick={() => navigate(createPageUrl("WhatsApp"))}>
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h2 className="text-lg font-medium">Enviar Documento</h2>
        </div>

        {/* Ícone */}
        <div className="p-6 flex justify-center">
          <div className="w-24 h-24 bg-purple-500 rounded-full flex items-center justify-center">
            <FileText className="w-12 h-12 text-white" />
          </div>
        </div>

        {/* Conteúdo */}
        <div className="flex-1 overflow-y-auto px-4">
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">O que você pode enviar</h3>
            <ul className="space-y-2 text-gray-700">
              <li>• <strong>PDF:</strong> Documentos, contas, boletos</li>
              <li>• <strong>Word/Excel:</strong> Textos, planilhas</li>
              <li>• <strong>PowerPoint:</strong> Apresentações</li>
              <li>• <strong>Outros:</strong> Qualquer arquivo do celular</li>
            </ul>
          </div>

          <div className="bg-green-50 border-l-4 border-green-500 p-4 mb-6">
            <h3 className="font-semibold text-green-900 mb-2">Como usar</h3>
            <ol className="space-y-2 text-sm text-green-800">
              <li>1. Abra a conversa</li>
              <li>2. Toque no clipe (📎)</li>
              <li>3. Escolha "Documento"</li>
              <li>4. Selecione o arquivo</li>
              <li>5. Confirme o envio</li>
            </ol>
          </div>

          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
            <h3 className="font-semibold text-yellow-900 mb-2">⚠️ Atenção</h3>
            <p className="text-sm text-yellow-800">
              Arquivos muito grandes (mais de 100 MB) podem não ser enviados. Se conecte ao WiFi para envios maiores.
            </p>
          </div>

          <div className="bg-purple-50 border-l-4 border-purple-500 p-4">
            <h3 className="font-semibold text-purple-900 mb-2">💡 Quando usar</h3>
            <p className="text-sm text-purple-800">
              Use Documento para enviar contas, receitas médicas, boletos ou qualquer arquivo importante que a pessoa precisa ter guardado.
            </p>
          </div>
        </div>
      </div>
    </PhoneFrame>
  );
}