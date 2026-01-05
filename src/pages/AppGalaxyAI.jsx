import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { PhoneFrame } from '@/components/PhoneFrame';
import { StatusBar } from '@/components/StatusBar';
import { cn } from '@/components/ui/utils';
import { 
  ArrowLeft, Sparkles, Mic, Image as ImageIcon, Languages, 
  FileText, Wand2, Brain, MessageSquare, Camera, Zap
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';

const aiFeatures = [
  {
    id: 'transcribe',
    icon: Mic,
    title: 'Transcrever Áudio',
    description: 'Converta áudios em texto instantaneamente',
    color: 'from-purple-500 to-purple-700'
  },
  {
    id: 'interpreter',
    icon: Languages,
    title: 'Intérprete',
    description: 'Tradução em tempo real de conversas',
    color: 'from-blue-500 to-blue-700'
  },
  {
    id: 'edit-image',
    icon: ImageIcon,
    title: 'Editar Imagens',
    description: 'Remova objetos e melhore fotos com IA',
    color: 'from-pink-500 to-pink-700'
  },
  {
    id: 'notes-ai',
    icon: FileText,
    title: 'Notas Inteligentes',
    description: 'Resumos automáticos e formatação',
    color: 'from-green-500 to-green-700'
  },
  {
    id: 'call-assist',
    icon: MessageSquare,
    title: 'Assistente de Chamada',
    description: 'Transcrição e resumo de chamadas',
    color: 'from-orange-500 to-orange-700'
  },
  {
    id: 'browser-ai',
    icon: Brain,
    title: 'Navegador IA',
    description: 'Resumos de páginas e tradução',
    color: 'from-cyan-500 to-cyan-700'
  }
];

export default function AppGalaxyAI() {
  const navigate = useNavigate();
  const [selectedFeature, setSelectedFeature] = useState(null);
  const [prompt, setPrompt] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAI = async () => {
    if (!prompt.trim()) return;
    
    setLoading(true);
    setTimeout(() => {
      setResult(`Recurso Galaxy IA: ${selectedFeature.title}\n\nEsta é uma versão demonstrativa. Em um dispositivo real, a IA processaria: "${prompt}"`);
      setLoading(false);
    }, 2000);
  };

  return (
    <PhoneFrame>
      <div className="h-full bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 overflow-hidden flex flex-col">
        <StatusBar variant="light" />

        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-6 py-4">
          <div className="flex items-center gap-4 mb-4">
            <button onClick={() => navigate(createPageUrl('Home'))}>
              <ArrowLeft className="w-6 h-6" />
            </button>
            <div className="flex-1">
              <h1 className="text-2xl font-bold flex items-center gap-2">
                <Sparkles className="w-6 h-6" />
                Galaxy IA
              </h1>
              <p className="text-sm text-purple-100">Inteligência Artificial Avançada</p>
            </div>
          </div>
        </div>

        {selectedFeature ? (
          <div className="flex-1 overflow-y-auto p-6">
            <Button
              variant="ghost"
              onClick={() => setSelectedFeature(null)}
              className="mb-4"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar
            </Button>

            <Card className="p-6 mb-4">
              <h2 className="text-xl font-bold mb-2 flex items-center gap-2">
                {React.createElement(selectedFeature.icon, { className: 'w-6 h-6' })}
                {selectedFeature.title}
              </h2>
              <p className="text-gray-600 mb-4">{selectedFeature.description}</p>

              <Textarea
                placeholder="Digite sua solicitação..."
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                className="mb-4"
                rows={4}
              />

              <Button 
                onClick={handleAI}
                disabled={loading || !prompt.trim()}
                className={cn(
                  "w-full bg-gradient-to-r text-white",
                  selectedFeature.color
                )}
              >
                {loading ? (
                  <>
                    <Wand2 className="w-4 h-4 mr-2 animate-spin" />
                    Processando...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 mr-2" />
                    Processar com IA
                  </>
                )}
              </Button>

              {result && (
                <div className="mt-6 p-4 bg-gray-50 rounded-xl">
                  <h3 className="font-semibold mb-2">Resultado:</h3>
                  <p className="text-gray-700 whitespace-pre-wrap">{result}</p>
                </div>
              )}
            </Card>
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto p-6">
            <div className="grid grid-cols-2 gap-4">
              {aiFeatures.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <motion.button
                    key={feature.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedFeature(feature)}
                    className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all text-left"
                  >
                    <div className={cn(
                      "w-14 h-14 rounded-2xl bg-gradient-to-br flex items-center justify-center mb-4",
                      feature.color
                    )}>
                      <Icon className="w-7 h-7 text-white" />
                    </div>
                    <h3 className="font-bold text-gray-900 mb-2">{feature.title}</h3>
                    <p className="text-sm text-gray-600 leading-relaxed">{feature.description}</p>
                  </motion.button>
                );
              })}
            </div>

            {/* Tips */}
            <div className="mt-6 bg-purple-100 border-l-4 border-purple-500 p-4 rounded-r-xl">
              <div className="flex items-start gap-3">
                <Zap className="w-5 h-5 text-purple-600 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-purple-900 mb-1">💡 Dica Galaxy IA</h3>
                  <p className="text-sm text-purple-700">
                    Use a IA para transcrever reuniões, traduzir conversas em tempo real e editar suas fotos profissionalmente.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </PhoneFrame>
  );
}