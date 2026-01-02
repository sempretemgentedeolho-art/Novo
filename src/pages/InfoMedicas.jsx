import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { ArrowLeft, Heart, Plus, AlertTriangle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { PhoneFrame } from "@/components/PhoneFrame";
import { StatusBar } from "@/components/StatusBar";

export default function InfoMedicas() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nome: "",
    tipoSanguineo: "",
    alergias: "",
    medicamentos: "",
    condicoes: "",
    contatoEmergencia: "",
    telefoneEmergencia: "",
  });

  useEffect(() => {
    const synth = window.speechSynthesis;
    if (synth) {
      synth.cancel();
      const utter = new SpeechSynthesisUtterance(
        "Informações médicas. Aqui você guarda dados importantes sobre sua saúde: tipo sanguíneo, alergias, medicamentos e contato de emergência."
      );
      utter.lang = "pt-BR";
      utter.rate = 0.80;
      synth.speak(utter);

      setTimeout(() => {
        const utter2 = new SpeechSynthesisUtterance(
          "Essas informações podem ser acessadas na tela de bloqueio em caso de emergência, mesmo sem desbloquear o celular."
        );
        utter2.lang = "pt-BR";
        utter2.rate = 0.80;
        synth.speak(utter2);
      }, 7000);
    }
    return () => window.speechSynthesis.cancel();
  }, []);

  const handleSave = () => {
    const synth = window.speechSynthesis;
    if (synth) {
      synth.cancel();
      const utter = new SpeechSynthesisUtterance("Informações médicas salvas com sucesso!");
      utter.lang = "pt-BR";
      utter.rate = 0.80;
      synth.speak(utter);
    }
  };

  return (
    <PhoneFrame>
      <div className="h-full bg-white flex flex-col">
        <StatusBar variant="light" />

        {/* Header */}
        <div className="bg-red-500 text-white px-4 py-3 flex items-center gap-4">
          <button onClick={() => navigate(createPageUrl("Configuracoes"))}>
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div className="flex items-center gap-2">
            <Heart className="w-6 h-6" />
            <h2 className="text-lg font-medium">Informações Médicas</h2>
          </div>
        </div>

        {/* Conteúdo */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-4">
            {/* Alerta */}
            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 mb-4">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-yellow-900 mb-1">Informação importante</h3>
                  <p className="text-sm text-yellow-800">
                    Estas informações podem ser acessadas na tela de bloqueio em caso de emergência, mesmo sem desbloquear o celular.
                  </p>
                </div>
              </div>
            </div>

            {/* Para que serve */}
            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-4">
              <h3 className="font-semibold text-blue-900 mb-2">Para que serve?</h3>
              <ul className="space-y-1 text-sm text-blue-800">
                <li>• Ajudar médicos em emergências</li>
                <li>• Informar sobre alergias importantes</li>
                <li>• Ligar para contato de emergência</li>
                <li>• Evitar medicamentos que fazem mal</li>
              </ul>
            </div>

            {/* Formulário */}
            <div className="space-y-4">
              <div>
                <Label htmlFor="nome" className="text-base">Nome Completo</Label>
                <Input
                  id="nome"
                  value={formData.nome}
                  onChange={(e) => setFormData({...formData, nome: e.target.value})}
                  placeholder="Seu nome"
                  className="mt-1 text-base"
                />
              </div>

              <div>
                <Label htmlFor="tipo" className="text-base">Tipo Sanguíneo</Label>
                <select
                  id="tipo"
                  value={formData.tipoSanguineo}
                  onChange={(e) => setFormData({...formData, tipoSanguineo: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-base mt-1"
                >
                  <option value="">Selecione seu tipo</option>
                  <option value="A+">A+ (A positivo)</option>
                  <option value="A-">A- (A negativo)</option>
                  <option value="B+">B+ (B positivo)</option>
                  <option value="B-">B- (B negativo)</option>
                  <option value="AB+">AB+ (AB positivo)</option>
                  <option value="AB-">AB- (AB negativo)</option>
                  <option value="O+">O+ (O positivo)</option>
                  <option value="O-">O- (O negativo)</option>
                </select>
              </div>

              <div>
                <Label htmlFor="alergias" className="text-base">Alergias</Label>
                <Textarea
                  id="alergias"
                  value={formData.alergias}
                  onChange={(e) => setFormData({...formData, alergias: e.target.value})}
                  placeholder="Ex: Penicilina, amendoim, pólen..."
                  rows={3}
                  className="mt-1 text-base"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Liste todas as alergias que você tem
                </p>
              </div>

              <div>
                <Label htmlFor="medicamentos" className="text-base">Medicamentos em Uso</Label>
                <Textarea
                  id="medicamentos"
                  value={formData.medicamentos}
                  onChange={(e) => setFormData({...formData, medicamentos: e.target.value})}
                  placeholder="Ex: Losartana 50mg (manhã), AAS 100mg (noite)..."
                  rows={3}
                  className="mt-1 text-base"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Liste os remédios que toma todo dia e os horários
                </p>
              </div>

              <div>
                <Label htmlFor="condicoes" className="text-base">Condições Médicas</Label>
                <Textarea
                  id="condicoes"
                  value={formData.condicoes}
                  onChange={(e) => setFormData({...formData, condicoes: e.target.value})}
                  placeholder="Ex: Diabetes tipo 2, Pressão alta, Problemas cardíacos..."
                  rows={3}
                  className="mt-1 text-base"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Liste doenças ou problemas de saúde que você tem
                </p>
              </div>

              <div className="pt-4 border-t border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-3">Contato de Emergência</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Pessoa para ligar se você precisar de ajuda
                </p>
                
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="contato" className="text-base">Nome do Contato</Label>
                    <Input
                      id="contato"
                      value={formData.contatoEmergencia}
                      onChange={(e) => setFormData({...formData, contatoEmergencia: e.target.value})}
                      placeholder="Ex: Maria (filha)"
                      className="mt-1 text-base"
                    />
                  </div>

                  <div>
                    <Label htmlFor="telefone" className="text-base">Telefone</Label>
                    <Input
                      id="telefone"
                      type="tel"
                      value={formData.telefoneEmergencia}
                      onChange={(e) => setFormData({...formData, telefoneEmergencia: e.target.value})}
                      placeholder="(51) 99999-9999"
                      className="mt-1 text-base"
                    />
                  </div>
                </div>
              </div>

              {/* Dicas */}
              <div className="mt-6 space-y-3">
                <div className="bg-green-50 border-l-4 border-green-500 p-4">
                  <h3 className="font-semibold text-green-900 mb-2">💡 Por que preencher?</h3>
                  <ul className="space-y-1 text-sm text-green-800">
                    <li>• Médicos sabem o que fazer em emergência</li>
                    <li>• Evita dar remédios que você tem alergia</li>
                    <li>• Contato de emergência pode ser chamado</li>
                    <li>• Informação acessível mesmo com celular bloqueado</li>
                  </ul>
                </div>

                <div className="bg-blue-50 border-l-4 border-blue-500 p-4">
                  <h3 className="font-semibold text-blue-900 mb-2">Como ver na tela de bloqueio</h3>
                  <ol className="space-y-1 text-sm text-blue-800">
                    <li>1. Com celular bloqueado, toque em "Emergência"</li>
                    <li>2. Depois toque em "Informações médicas"</li>
                    <li>3. Suas informações aparecem</li>
                  </ol>
                </div>
              </div>
            </div>

            {/* Botão Salvar */}
            <div className="p-4 border-t border-gray-200">
              <Button onClick={handleSave} className="w-full bg-red-500 hover:bg-red-600 text-lg py-6">
                Salvar Informações
              </Button>
            </div>
          </div>
        </div>
      </PhoneFrame>
    );
}