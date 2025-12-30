import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { PhoneFrame } from '@/components/PhoneFrame';
import { StatusBar } from '@/components/StatusBar';
import {
  ArrowLeft, Heart, Footprints, Flame, Moon, Droplets,
  Activity, TrendingUp, Target, Award, Calendar
} from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { motion } from 'framer-motion';

export default function AppHealth() {
  const navigate = useNavigate();
  
  const [todayStats] = useState({
    steps: 8547,
    stepsGoal: 10000,
    calories: 425,
    caloriesGoal: 500,
    distance: 6.2,
    distanceGoal: 8,
    water: 6,
    waterGoal: 8,
    sleep: 7.5,
    sleepGoal: 8,
    heartRate: 72
  });

  const weeklySteps = [7500, 9200, 6800, 10500, 8200, 9800, 8547];
  const maxSteps = Math.max(...weeklySteps);

  return (
    <PhoneFrame>
      <div className="h-full bg-gradient-to-br from-red-50 via-pink-50 to-orange-50 overflow-hidden flex flex-col">
        <StatusBar variant="light" />

        {/* Header */}
        <div className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-6 py-4">
          <div className="flex items-center gap-4">
            <button onClick={() => navigate(createPageUrl('Home'))}>
              <ArrowLeft className="w-6 h-6" />
            </button>
            <div className="flex-1">
              <h1 className="text-2xl font-bold flex items-center gap-2">
                <Heart className="w-6 h-6" />
                Samsung Health
              </h1>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          <Tabs defaultValue="today" className="h-full">
            <div className="sticky top-0 bg-white z-10 px-4 pt-4">
              <TabsList className="w-full">
                <TabsTrigger value="today" className="flex-1">Hoje</TabsTrigger>
                <TabsTrigger value="week" className="flex-1">Semana</TabsTrigger>
                <TabsTrigger value="goals" className="flex-1">Metas</TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="today" className="p-4 space-y-4 mt-0">
              {/* Steps Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <Card className="p-6 bg-gradient-to-br from-blue-500 to-cyan-500 text-white">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <p className="text-sm opacity-90">Passos Hoje</p>
                      <p className="text-4xl font-bold mt-1">
                        {todayStats.steps.toLocaleString()}
                      </p>
                      <p className="text-sm opacity-80 mt-1">
                        Meta: {todayStats.stepsGoal.toLocaleString()}
                      </p>
                    </div>
                    <Footprints className="w-12 h-12 opacity-80" />
                  </div>
                  <Progress 
                    value={(todayStats.steps / todayStats.stepsGoal) * 100} 
                    className="h-3 bg-white/20"
                  />
                  <p className="text-sm mt-2 opacity-90">
                    {Math.round((todayStats.steps / todayStats.stepsGoal) * 100)}% da meta diária
                  </p>
                </Card>
              </motion.div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-4">
                {/* Calories */}
                <Card className="p-4">
                  <Flame className="w-8 h-8 text-orange-500 mb-2" />
                  <p className="text-2xl font-bold text-gray-900">{todayStats.calories}</p>
                  <p className="text-sm text-gray-600">Calorias</p>
                  <Progress 
                    value={(todayStats.calories / todayStats.caloriesGoal) * 100} 
                    className="h-2 mt-2"
                  />
                </Card>

                {/* Distance */}
                <Card className="p-4">
                  <TrendingUp className="w-8 h-8 text-green-500 mb-2" />
                  <p className="text-2xl font-bold text-gray-900">{todayStats.distance} km</p>
                  <p className="text-sm text-gray-600">Distância</p>
                  <Progress 
                    value={(todayStats.distance / todayStats.distanceGoal) * 100} 
                    className="h-2 mt-2"
                  />
                </Card>

                {/* Water */}
                <Card className="p-4">
                  <Droplets className="w-8 h-8 text-blue-500 mb-2" />
                  <p className="text-2xl font-bold text-gray-900">{todayStats.water}/{todayStats.waterGoal}</p>
                  <p className="text-sm text-gray-600">Copos de água</p>
                  <Progress 
                    value={(todayStats.water / todayStats.waterGoal) * 100} 
                    className="h-2 mt-2"
                  />
                </Card>

                {/* Sleep */}
                <Card className="p-4">
                  <Moon className="w-8 h-8 text-indigo-500 mb-2" />
                  <p className="text-2xl font-bold text-gray-900">{todayStats.sleep}h</p>
                  <p className="text-sm text-gray-600">Sono</p>
                  <Progress 
                    value={(todayStats.sleep / todayStats.sleepGoal) * 100} 
                    className="h-2 mt-2"
                  />
                </Card>
              </div>

              {/* Heart Rate */}
              <Card className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-14 h-14 rounded-full bg-red-100 flex items-center justify-center">
                      <Activity className="w-7 h-7 text-red-500" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">Frequência Cardíaca</p>
                      <p className="text-sm text-gray-600">Última medição</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-3xl font-bold text-red-500">{todayStats.heartRate}</p>
                    <p className="text-sm text-gray-600">bpm</p>
                  </div>
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="week" className="p-4 space-y-4 mt-0">
              <Card className="p-6">
                <h3 className="font-bold text-gray-900 mb-4">Passos da Semana</h3>
                <div className="flex items-end justify-between gap-2 h-48">
                  {weeklySteps.map((steps, index) => (
                    <div key={index} className="flex-1 flex flex-col items-center gap-2">
                      <div className="w-full bg-gradient-to-t from-blue-500 to-cyan-400 rounded-t-lg" 
                           style={{ height: `${(steps / maxSteps) * 100}%` }}>
                      </div>
                      <span className="text-xs text-gray-600">
                        {['D', 'S', 'T', 'Q', 'Q', 'S', 'S'][index]}
                      </span>
                    </div>
                  ))}
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="font-bold text-gray-900 mb-4">Resumo Semanal</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Total de passos</span>
                    <span className="font-bold text-gray-900">
                      {weeklySteps.reduce((a, b) => a + b, 0).toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Média diária</span>
                    <span className="font-bold text-gray-900">
                      {Math.round(weeklySteps.reduce((a, b) => a + b, 0) / 7).toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Melhor dia</span>
                    <span className="font-bold text-green-600">
                      {Math.max(...weeklySteps).toLocaleString()}
                    </span>
                  </div>
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="goals" className="p-4 space-y-4 mt-0">
              <Card className="p-6">
                <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Target className="w-5 h-5 text-purple-600" />
                  Minhas Metas
                </h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium">Passos Diários</span>
                      <span className="text-sm text-gray-600">{todayStats.stepsGoal.toLocaleString()}</span>
                    </div>
                    <Progress value={85} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium">Calorias</span>
                      <span className="text-sm text-gray-600">{todayStats.caloriesGoal} kcal</span>
                    </div>
                    <Progress value={85} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium">Água</span>
                      <span className="text-sm text-gray-600">{todayStats.waterGoal} copos</span>
                    </div>
                    <Progress value={75} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium">Sono</span>
                      <span className="text-sm text-gray-600">{todayStats.sleepGoal}h</span>
                    </div>
                    <Progress value={94} className="h-2" />
                  </div>
                </div>
              </Card>

              <Card className="p-6 bg-gradient-to-br from-yellow-100 to-orange-100">
                <div className="flex items-start gap-3">
                  <Award className="w-8 h-8 text-orange-600" />
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">Conquistas</h3>
                    <p className="text-sm text-gray-700">
                      🏆 7 dias consecutivos atingindo a meta de passos!
                    </p>
                  </div>
                </div>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </PhoneFrame>
  );
}