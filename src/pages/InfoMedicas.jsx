import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { ArrowLeft, Heart, AlertTriangle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

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

  const handleSave = () => {
    alert("Informações médicas salvas com sucesso!");
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <div className="relative w-full max-w-sm">
        <div className="relative bg-black rounded-[3rem] p-3 shadow-2xl">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-black rounded-b-2xl z-10"></div>
          
          <div className="relative bg-white rounded-[2.5rem] overflow-hidden aspect-[9/19]">
            {/* Header */}
            <div className="bg-red-500 text-white p-6 pb-4">
              <button onClick={() => navigate(createPageUrl("Configuracoes"))} className="mb-4">
                <ArrowLeft className="w-6 h-6" />
              </button>
              <div className="flex items-center gap-2">
                <Heart className="w-6 h-6" />
                <h1 className="text-2xl font-bold">Informações Médicas</h1>
              </div>
            </div>

            {/* Conteúdo */}
            <div className="overflow-y-auto h-[calc(100%-140px)] p-6">
              {/* Alerta */}
              <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 mb-6 rounded-r-xl">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5" />
                  <div>
                    <p className="text-sm text-yellow-800">
                      Estas informações podem ser acessadas na tela de bloqueio em caso de emergência.
                    </p>
                  </div>
                </div>
              </div>

              {/* Formulário */}
              <div className="space-y-4">
                <div>
                  <Label htmlFor="nome">Nome Completo</Label>
                  <Input
                    id="nome"
                    value={formData.nome}
                    onChange={(e) => setFormData({...formData, nome: e.target.value})}
                    placeholder="Seu nome"
                  />
                </div>

                <div>
                  <Label htmlFor="tipo">Tipo Sanguíneo</Label>
                  <select
                    id="tipo"
                    value={formData.tipoSanguineo}
                    onChange={(e) => setFormData({...formData, tipoSanguineo: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  >
                    <option value="">Selecione</option>
                    <option value="A+">A+</option>
                    <option value="A-">A-</option>
                    <option value="B+">B+</option>
                    <option value="B-">B-</option>
                    <option value="AB+">AB+</option>
                    <option value="AB-">AB-</option>
                    <option value="O+">O+</option>
                    <option value="O-">O-</option>
                  </select>
                </div>

                <div>
                  <Label htmlFor="alergias">Alergias</Label>
                  <Textarea
                    id="alergias"
                    value={formData.alergias}
                    onChange={(e) => setFormData({...formData, alergias: e.target.value})}
                    placeholder="Liste suas alergias"
                    rows={3}
                  />
                </div>

                <div>
                  <Label htmlFor="medicamentos">Medicamentos em Uso</Label>
                  <Textarea
                    id="medicamentos"
                    value={formData.medicamentos}
                    onChange={(e) => setFormData({...formData, medicamentos: e.target.value})}
                    placeholder="Medicamentos que você toma regularmente"
                    rows={3}
                  />
                </div>

                <div>
                  <Label htmlFor="condicoes">Condições Médicas</Label>
                  <Textarea
                    id="condicoes"
                    value={formData.condicoes}
                    onChange={(e) => setFormData({...formData, condicoes: e.target.value})}
                    placeholder="Diabetes, hipertensão, etc."
                    rows={3}
                  />
                </div>

                <div className="pt-4 border-t border-gray-200">
                  <h3 className="font-semibold text-gray-900 mb-4">Contato de Emergência</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="contato">Nome do Contato</Label>
                      <Input
                        id="contato"
                        value={formData.contatoEmergencia}
                        onChange={(e) => setFormData({...formData, contatoEmergencia: e.target.value})}
                        placeholder="Nome"
                      />
                    </div>

                    <div>
                      <Label htmlFor="telefone">Telefone</Label>
                      <Input
                        id="telefone"
                        type="tel"
                        value={formData.telefoneEmergencia}
                        onChange={(e) => setFormData({...formData, telefoneEmergencia: e.target.value})}
                        placeholder="(00) 00000-0000"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Botão Salvar Fixo */}
            <div className="absolute bottom-0 left-0 right-0 p-6 bg-white border-t border-gray-200">
              <Button onClick={handleSave} className="w-full bg-red-500 hover:bg-red-600">
                Salvar Informações
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}