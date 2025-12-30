import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { PhoneFrame } from '@/components/PhoneFrame';
import { StatusBar } from '@/components/StatusBar';
import { cn } from '@/components/ui/utils';
import { ArrowLeft, Gamepad2, Zap, Target, Trophy, Star } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { motion } from 'framer-motion';

const gameCategories = [
  {
    name: 'Recomendados',
    games: [
      { title: 'PUBG Mobile', image: '🎮', size: '2.1 GB', rating: 4.5, plays: '500M+' },
      { title: 'Free Fire', image: '🔫', size: '1.2 GB', rating: 4.3, plays: '1B+' },
      { title: 'Call of Duty Mobile', image: '🎯', size: '3.5 GB', rating: 4.7, plays: '100M+' },
    ]
  },
  {
    name: 'Ação',
    games: [
      { title: 'Genshin Impact', image: '⚔️', size: '18 GB', rating: 4.6, plays: '50M+' },
      { title: 'Fortnite', image: '🏹', size: '8.5 GB', rating: 4.4, plays: '250M+' },
    ]
  },
  {
    name: 'Aventura',
    games: [
      { title: 'Minecraft', image: '🧱', size: '800 MB', rating: 4.8, plays: '200M+' },
      { title: 'Roblox', image: '🎲', size: '150 MB', rating: 4.4, plays: '500M+' },
    ]
  },
];

export default function AppGames() {
  const navigate = useNavigate();
  const [gameFocusMode, setGameFocusMode] = useState(false);
  const [performanceMode, setPerformanceMode] = useState('balanced');

  return (
    <PhoneFrame>
      <div className="h-full bg-gradient-to-br from-violet-50 via-purple-50 to-fuchsia-50 overflow-hidden flex flex-col">
        <StatusBar variant="light" />

        {/* Header */}
        <div className="bg-gradient-to-r from-violet-600 to-purple-600 text-white px-6 py-4">
          <div className="flex items-center gap-4 mb-4">
            <button onClick={() => navigate(createPageUrl('Home'))}>
              <ArrowLeft className="w-6 h-6" />
            </button>
            <div className="flex-1">
              <h1 className="text-2xl font-bold flex items-center gap-2">
                <Gamepad2 className="w-6 h-6" />
                Gaming Hub
              </h1>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          <Tabs defaultValue="games" className="h-full">
            <div className="sticky top-0 bg-white z-10 px-4 pt-4">
              <TabsList className="w-full">
                <TabsTrigger value="games" className="flex-1">Jogos</TabsTrigger>
                <TabsTrigger value="settings" className="flex-1">Config</TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="games" className="p-4 space-y-6 mt-0">
              {gameCategories.map((category, catIndex) => (
                <div key={catIndex}>
                  <h3 className="font-bold text-gray-900 mb-3">{category.name}</h3>
                  <div className="space-y-3">
                    {category.games.map((game, gameIndex) => (
                      <motion.div
                        key={gameIndex}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: gameIndex * 0.1 }}
                      >
                        <Card className="p-4">
                          <div className="flex gap-4">
                            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-purple-400 to-pink-500 flex items-center justify-center text-4xl shadow-lg">
                              {game.image}
                            </div>
                            <div className="flex-1 min-w-0">
                              <h4 className="font-bold text-gray-900 mb-1">{game.title}</h4>
                              <div className="flex items-center gap-2 mb-2">
                                <div className="flex items-center gap-1">
                                  <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                                  <span className="text-sm font-medium">{game.rating}</span>
                                </div>
                                <Badge variant="secondary" className="text-xs">{game.plays}</Badge>
                              </div>
                              <p className="text-xs text-gray-600 mb-3">{game.size}</p>
                              <Button size="sm" className="w-full bg-violet-600 hover:bg-violet-700">
                                Instalar
                              </Button>
                            </div>
                          </div>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                </div>
              ))}
            </TabsContent>

            <TabsContent value="settings" className="p-4 space-y-4 mt-0">
              {/* Game Focus Mode */}
              <Card className="p-6">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center">
                      <Target className="w-6 h-6 text-purple-600" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900">Modo Foco para Jogos</h3>
                      <p className="text-sm text-gray-600">Bloqueia notificações e otimiza performance</p>
                    </div>
                  </div>
                  <Switch
                    checked={gameFocusMode}
                    onCheckedChange={setGameFocusMode}
                  />
                </div>
              </Card>

              {/* Performance Mode */}
              <Card className="p-6">
                <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Zap className="w-5 h-5 text-orange-500" />
                  Modo de Performance
                </h3>
                <div className="space-y-3">
                  <button
                    onClick={() => setPerformanceMode('power-saving')}
                    className={cn(
                      "w-full p-4 rounded-xl border-2 text-left transition-all",
                      performanceMode === 'power-saving'
                        ? 'border-green-500 bg-green-50'
                        : 'border-gray-200 hover:border-gray-300'
                    )}
                  >
                    <div className="font-semibold text-gray-900">Economia de Bateria</div>
                    <div className="text-sm text-gray-600">Menor consumo, performance reduzida</div>
                  </button>

                  <button
                    onClick={() => setPerformanceMode('balanced')}
                    className={cn(
                      "w-full p-4 rounded-xl border-2 text-left transition-all",
                      performanceMode === 'balanced'
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    )}
                  >
                    <div className="font-semibold text-gray-900">Balanceado</div>
                    <div className="text-sm text-gray-600">Equilíbrio entre bateria e performance</div>
                  </button>

                  <button
                    onClick={() => setPerformanceMode('performance')}
                    className={cn(
                      "w-full p-4 rounded-xl border-2 text-left transition-all",
                      performanceMode === 'performance'
                        ? 'border-purple-500 bg-purple-50'
                        : 'border-gray-200 hover:border-gray-300'
                    )}
                  >
                    <div className="font-semibold text-gray-900">Alta Performance</div>
                    <div className="text-sm text-gray-600">Máxima performance, maior consumo</div>
                  </button>
                </div>
              </Card>

              {/* Tips */}
              <div className="bg-purple-100 border-l-4 border-purple-500 p-4 rounded-r-xl">
                <div className="flex items-start gap-3">
                  <Trophy className="w-5 h-5 text-purple-600 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-purple-900 mb-1">💡 Dica de Jogo</h3>
                    <p className="text-sm text-purple-700">
                      Ative o Modo Foco para evitar interrupções durante partidas competitivas.
                    </p>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </PhoneFrame>
  );
}