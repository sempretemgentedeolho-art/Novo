import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { PhoneFrame } from '@/components/PhoneFrame';
import { StatusBar } from '@/components/StatusBar';
import {
  ArrowLeft, Lightbulb, Smartphone, Camera, Battery,
  Wifi, Shield, BookOpen, ChevronRight, X
} from 'lucide-react';
import { Card } from '@/components/ui/card';
import { motion, AnimatePresence } from 'framer-motion';

const tutorials = {
  primeiros_passos: [
    {
      title: 'Como configurar pela primeira vez',
      content: `Antes de começar, insira o chip da operadora na lateral do aparelho.

Para ligar: pressione e segure o botão lateral por 3 segundos até a tela acender.

Siga os passos na tela:
1. Escolha o idioma Português
2. Aceite os termos
3. Conecte ao Wi-Fi da sua casa
4. Crie ou entre com sua conta

Pronto! Seu aparelho está configurado.`,
    },
    {
      title: 'Conhecendo os botões do aparelho',
      content: `Botão lateral direito: Liga e desliga o aparelho. Aperta uma vez para acender a tela.

Botões de volume: Na lateral esquerda. Sobe e desce o som.

Para desligar: Segure o botão lateral por 3 segundos e escolha "Desligar".

É muito simples!`,
    },
    {
      title: 'Como ligar e desligar',
      content: `LIGAR: Pressione e segure o botão lateral por 3 segundos. A tela vai acender com o logo.

DESLIGAR: Pressione e segure o botão lateral por 3 segundos. Toque em "Desligar".

BLOQUEAR TELA: Aperte o botão lateral uma vez rapidinho.

DESBLOQUEAR: Aperte o botão lateral de novo e deslize o dedo de baixo para cima.`,
    },
  ],
  camera: [
    {
      title: 'Tirar fotos de qualidade',
      content: `Abra o app Câmera.

Aponte para o que você quer fotografar.

Espere o foco ficar nítido.

Toque no botão branco grande no centro da parte de baixo.

Pronto! Sua foto foi salva na Galeria.

DICA: Segure o celular com as duas mãos para não tremer.`,
    },
    {
      title: 'Usar o modo retrato',
      content: `Abra a Câmera.

Deslize o dedo para o lado até aparecer "RETRATO".

Aponte para uma pessoa.

O fundo vai ficar desfocado automaticamente.

Tire a foto tocando no botão branco.

Perfeito para fotos bonitas de pessoas!`,
    },
    {
      title: 'Gravar vídeos',
      content: `Abra a Câmera.

Deslize para o modo "VÍDEO".

Toque no botão vermelho para começar a gravar.

Para parar, toque no botão vermelho de novo.

O vídeo fica salvo na Galeria.

Simples assim!`,
    },
  ],
  bateria: [
    {
      title: 'Economizar bateria',
      content: `Diminua o brilho da tela em Configurações.

Feche apps que não está usando.

Desligue Wi-Fi e Bluetooth quando não precisar.

Ative o Modo Economia de Energia quando a bateria estiver baixa.

Não deixe a bateria chegar a 0%.

Carregue sempre que puder!`,
    },
    {
      title: 'Carregamento rápido',
      content: `Use o carregador original que veio na caixa.

Conecte direto na tomada, não em extensões.

Durante o carregamento, uma mensagem vai aparecer dizendo "Carregamento rápido".

Em 30 minutos, você já tem bastante bateria!

Pode usar o celular enquanto carrega, mas vai demorar mais.`,
    },
    {
      title: 'Modo economia de energia',
      content: `Vá em Configurações > Bateria.

Ative o "Modo economia de energia".

O celular vai usar menos energia.

A tela fica um pouco mais escura.

Apps podem demorar um pouco mais.

Mas a bateria dura muito mais tempo!`,
    },
  ],
  conectividade: [
    {
      title: 'Conectar ao Wi-Fi',
      content: `Vá em Configurações > Wi-Fi.

Ative o Wi-Fi.

Escolha o nome da sua rede (geralmente está escrito no roteador).

Digite a senha (também está no roteador).

Toque em Conectar.

Pronto! Você está conectado à internet sem gastar seus dados móveis.`,
    },
    {
      title: 'Usar dados móveis',
      content: `Quando não tem Wi-Fi, use os dados móveis do seu chip.

Ative em Configurações > Conexões > Dados móveis.

ATENÇÃO: Isso usa seu pacote de internet da operadora.

Veja sempre quanto você tem disponível para não gastar tudo.

Quando estiver em casa, use o Wi-Fi para economizar!`,
    },
    {
      title: 'Compartilhar internet',
      content: `Você pode transformar seu celular num Wi-Fi!

Vá em Configurações > Conexões > Ponto de acesso móvel.

Ative a função.

Outros aparelhos podem se conectar usando a senha que aparece.

CUIDADO: Isso gasta sua internet móvel rapidinho!`,
    },
  ],
  seguranca: [
    {
      title: 'Configurar impressão digital',
      content: `Vá em Configurações > Segurança > Impressão digital.

Siga as instruções na tela.

Coloque o dedo no sensor várias vezes.

Pronto! Agora você desbloqueia o celular só com o dedo.

Muito mais rápido e seguro!`,
    },
    {
      title: 'Criar senha segura',
      content: `Use pelo menos 6 números ou letras.

Não use datas de nascimento óbvias.

Não use 123456 ou 000000.

Crie algo que só você sabe.

Anote em algum lugar seguro caso esqueça.

Nunca conte sua senha para desconhecidos!`,
    },
    {
      title: 'Ativar localização do aparelho',
      content: `Se você perder o celular, pode encontrá-lo!

Vá em Configurações > Segurança > Localizar aparelho.

Ative esta função.

Se perder, pode ver no computador onde ele está.

Também pode fazer ele tocar alto para achar.

Muito importante ativar!`,
    },
  ],
};

const tipCategories = [
  {
    icon: Smartphone,
    title: 'Primeiros Passos',
    key: 'primeiros_passos',
    color: 'text-blue-600'
  },
  {
    icon: Camera,
    title: 'Câmera',
    key: 'camera',
    color: 'text-purple-600'
  },
  {
    icon: Battery,
    title: 'Bateria',
    key: 'bateria',
    color: 'text-green-600'
  },
  {
    icon: Wifi,
    title: 'Conectividade',
    key: 'conectividade',
    color: 'text-cyan-600'
  },
  {
    icon: Shield,
    title: 'Segurança',
    key: 'seguranca',
    color: 'text-red-600'
  },
];

export default function AppDicas() {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedTutorial, setSelectedTutorial] = useState(null);

  useEffect(() => {
    const synth = window.speechSynthesis;
    if (synth) {
      synth.cancel();
      const utter = new SpeechSynthesisUtterance(
        "Aplicativo Dicas. Aprenda a usar seu aparelho com tutoriais simples e fáceis."
      );
      utter.lang = "pt-BR";
      utter.rate = 0.9;
      synth.speak(utter);
    }
    return () => window.speechSynthesis.cancel();
  }, []);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category.key);
  };

  const handleTutorialClick = (tutorial) => {
    setSelectedTutorial(tutorial);
    
    // Lê o tutorial em voz alta
    const synth = window.speechSynthesis;
    if (synth) {
      synth.cancel();
      const utter = new SpeechSynthesisUtterance(`${tutorial.title}. ${tutorial.content}`);
      utter.lang = "pt-BR";
      utter.rate = 0.9;
      synth.speak(utter);
    }
  };

  const handleCloseTutorial = () => {
    setSelectedTutorial(null);
    window.speechSynthesis.cancel();
  };

  const handleBack = () => {
    if (selectedTutorial) {
      setSelectedTutorial(null);
      window.speechSynthesis.cancel();
    } else if (selectedCategory) {
      setSelectedCategory(null);
    } else {
      navigate(createPageUrl('Home'));
    }
  };

  return (
    <PhoneFrame>
      <div className="h-full bg-gradient-to-br from-yellow-50 to-amber-50 overflow-hidden flex flex-col relative">
        <StatusBar variant="light" />

        {/* Header */}
        <div className="bg-gradient-to-r from-yellow-500 to-amber-500 text-white px-6 py-4">
          <div className="flex items-center gap-4">
            <button onClick={handleBack}>
              <ArrowLeft className="w-6 h-6" />
            </button>
            <div className="flex-1">
              <h1 className="text-2xl font-bold flex items-center gap-2">
                <Lightbulb className="w-6 h-6" />
                {selectedTutorial ? 'Tutorial' : selectedCategory ? tipCategories.find(c => c.key === selectedCategory)?.title : 'Dicas'}
              </h1>
              <p className="text-sm text-yellow-100">
                {selectedTutorial ? 'Ouça e aprenda' : selectedCategory ? 'Escolha um tutorial' : 'Aprenda a usar seu aparelho'}
              </p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {selectedTutorial ? (
            // Tela do Tutorial
            <>
              <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-xl mb-4">
                <p className="text-sm text-blue-900">
                  🔊 <strong>Ouça:</strong> Este tutorial está sendo lido em voz alta para você!
                </p>
              </div>

              <Card className="p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">{selectedTutorial.title}</h2>
                <div className="prose prose-sm">
                  <p className="text-gray-700 whitespace-pre-line leading-relaxed text-base">
                    {selectedTutorial.content}
                  </p>
                </div>
              </Card>

              <button
                onClick={handleCloseTutorial}
                className="w-full py-4 bg-yellow-500 hover:bg-yellow-600 text-white rounded-xl font-bold text-lg shadow-lg"
              >
                Fechar Tutorial
              </button>
            </>
          ) : !selectedCategory ? (
            // Categorias
            <>
              {tipCategories.map((category, index) => {
                const Icon = category.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <button
                      onClick={() => handleCategoryClick(category)}
                      className="w-full"
                    >
                      <Card className="p-5 hover:shadow-lg transition-all">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center">
                            <Icon className={`w-6 h-6 ${category.color}`} />
                          </div>
                          <div className="flex-1 text-left">
                            <h3 className="font-bold text-gray-900 text-lg">{category.title}</h3>
                            <p className="text-sm text-gray-500">
                              {tutorials[category.key].length} tutoriais disponíveis
                            </p>
                          </div>
                          <ChevronRight className="w-5 h-5 text-gray-400" />
                        </div>
                      </Card>
                    </button>
                  </motion.div>
                );
              })}

              {/* Info Card */}
              <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-xl">
                <div className="flex items-start gap-3">
                  <BookOpen className="w-5 h-5 text-blue-600 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-blue-900 mb-1">💡 Dica</h3>
                    <p className="text-sm text-blue-700">
                      Clique em uma categoria para ver os tutoriais. Cada tutorial será lido em voz alta para você!
                    </p>
                  </div>
                </div>
              </div>
            </>
          ) : (
            // Tutoriais da categoria
            <>
              {tutorials[selectedCategory].map((tutorial, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <button
                    onClick={() => handleTutorialClick(tutorial)}
                    className="w-full"
                  >
                    <Card className="p-5 hover:shadow-lg transition-all text-left">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center flex-shrink-0">
                          <BookOpen className="w-5 h-5 text-yellow-600" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900">{tutorial.title}</h3>
                        </div>
                        <ChevronRight className="w-5 h-5 text-gray-400" />
                      </div>
                    </Card>
                  </button>
                </motion.div>
              ))}
            </>
          )}
        </div>
      </div>
    </PhoneFrame>
  );
}