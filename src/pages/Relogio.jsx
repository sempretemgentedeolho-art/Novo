import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { ArrowLeft, Plus, Bell, Trash2, Play, Pause, RotateCcw, Flag } from "lucide-react";
import { motion } from "framer-motion";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { PhoneFrame } from "@/components/PhoneFrame";
import { StatusBar } from "@/components/StatusBar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

const initialAlarms = [
  { id: 1, time: "08:00", label: "Medicamento da Manhã", active: true, icon: "☀️", days: ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"] },
  { id: 2, time: "12:00", label: "Medicamento do Almoço", active: true, icon: "🍽️", days: ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"] },
  { id: 3, time: "20:00", label: "Medicamento da Noite", active: true, icon: "🌙", days: ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"] },
];

export default function Relogio() {
  const navigate = useNavigate();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [alarms, setAlarms] = useState(initialAlarms);
  const [showAddAlarm, setShowAddAlarm] = useState(false);
  const [newAlarm, setNewAlarm] = useState({
    time: "08:00",
    label: "",
    active: true,
    icon: "💊",
    days: ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"]
  });

  // Cronômetro
  const [stopwatchTime, setStopwatchTime] = useState(0);
  const [stopwatchRunning, setStopwatchRunning] = useState(false);
  const [laps, setLaps] = useState([]);

  // Timer
  const [timerMinutes, setTimerMinutes] = useState(5);
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [timerRunning, setTimerRunning] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const synth = window.speechSynthesis;
    if (synth) {
      synth.cancel();
      const utter = new SpeechSynthesisUtterance(
        "Aplicativo Relógio. Aqui você pode ver as horas, criar alarmes para lembrar de tomar seus medicamentos, usar o cronômetro e o temporizador. É muito importante não esquecer seus remédios! Vamos aprender: clique no sinal de mais à sua direita no topo da tela."
      );
      utter.lang = "pt-BR";
      utter.rate = 0.9;
      synth.speak(utter);
    }
    return () => window.speechSynthesis.cancel();
  }, []);

  // Cronômetro
  useEffect(() => {
    let interval;
    if (stopwatchRunning) {
      interval = setInterval(() => {
        setStopwatchTime(prev => prev + 10);
      }, 10);
    }
    return () => clearInterval(interval);
  }, [stopwatchRunning]);

  // Timer
  useEffect(() => {
    let interval;
    if (timerRunning && (timerMinutes > 0 || timerSeconds > 0)) {
      interval = setInterval(() => {
        if (timerSeconds > 0) {
          setTimerSeconds(timerSeconds - 1);
        } else if (timerMinutes > 0) {
          setTimerMinutes(timerMinutes - 1);
          setTimerSeconds(59);
        } else {
          setTimerRunning(false);
          alert("Tempo acabou!");
        }
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timerRunning, timerMinutes, timerSeconds]);

  const handleAddAlarm = () => {
    const synth = window.speechSynthesis;
    if (synth) {
      synth.cancel();
      const utter = new SpeechSynthesisUtterance(
        "Vamos criar um alarme para seu medicamento! Primeiro, escolha o horário que você toma o remédio. Depois, escreva o nome do medicamento para lembrar qual é. Você pode escolher os dias da semana que quer o alarme. Muito fácil! Os dias são marcados quando as bolinhas da semana ficarem azuis. De celular para celular pode mudar a cor, mas sempre ficam destacados."
      );
      utter.lang = "pt-BR";
      utter.rate = 0.9;
      synth.speak(utter);
    }
    setShowAddAlarm(true);
  };

  const handleSaveAlarm = () => {
    if (!newAlarm.label) {
      alert("Por favor, escreva o nome do medicamento.");
      return;
    }

    const alarm = {
      id: Math.max(...alarms.map(a => a.id)) + 1,
      ...newAlarm
    };
    setAlarms([...alarms, alarm]);
    setShowAddAlarm(false);
    setNewAlarm({
      time: "08:00",
      label: "",
      active: true,
      icon: "💊",
      days: ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"]
    });

    const synth = window.speechSynthesis;
    if (synth) {
      synth.cancel();
      const utter = new SpeechSynthesisUtterance(
        `Parabéns! Alarme criado para ${newAlarm.time}. Agora você vai receber um lembrete para tomar ${newAlarm.label}. Isso vai te ajudar a não esquecer seus medicamentos!`
      );
      utter.lang = "pt-BR";
      utter.rate = 0.9;
      synth.speak(utter);
    }
  };

  const handleToggleAlarm = (id) => {
    setAlarms(alarms.map(alarm => 
      alarm.id === id ? { ...alarm, active: !alarm.active } : alarm
    ));
  };

  const handleDeleteAlarm = (id) => {
    if (confirm("Deseja excluir este alarme?")) {
      setAlarms(alarms.filter(alarm => alarm.id !== id));
    }
  };

  const formatStopwatchTime = (time) => {
    const minutes = Math.floor(time / 60000);
    const seconds = Math.floor((time % 60000) / 1000);
    const milliseconds = Math.floor((time % 1000) / 10);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${milliseconds.toString().padStart(2, '0')}`;
  };

  const handleStopwatchToggle = () => {
    setStopwatchRunning(!stopwatchRunning);
  };

  const handleStopwatchReset = () => {
    setStopwatchTime(0);
    setStopwatchRunning(false);
    setLaps([]);
  };

  const handleLap = () => {
    setLaps([...laps, stopwatchTime]);
  };

  const medicationPresets = [
    { label: "Medicamento da Manhã", time: "08:00", icon: "☀️" },
    { label: "Medicamento do Almoço", time: "12:00", icon: "🍽️" },
    { label: "Medicamento da Tarde", time: "15:00", icon: "☕" },
    { label: "Medicamento da Noite", time: "20:00", icon: "🌙" },
  ];

  return (
    <PhoneFrame>
      <div className="h-full bg-white flex flex-col">
        <StatusBar variant="light" />

        {/* Header */}
        <div className="bg-indigo-500 text-white p-6 pb-4">
          <div className="flex justify-between items-center mb-4">
            <button onClick={() => navigate(createPageUrl("Home"))}>
              <ArrowLeft className="w-6 h-6" />
            </button>
            {alarms.length > 0 && (
              <div className="relative">
                {!showAddAlarm && (
                  <motion.div
                    animate={{ scale: [1, 1.8, 1.8], opacity: [0.7, 0.2, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5, ease: "easeOut" }}
                    className="absolute -inset-2 rounded-full bg-yellow-400 z-0 pointer-events-none"
                  />
                )}
                <motion.button
                  animate={!showAddAlarm ? { scale: [1, 1.2, 1] } : {}}
                  transition={!showAddAlarm ? { repeat: Infinity, duration: 1, ease: "easeInOut" } : {}}
                  onClick={handleAddAlarm}
                  className="relative z-10"
                >
                  <Plus className="w-6 h-6" />
                </motion.button>
              </div>
            )}
          </div>
          <h1 className="text-2xl font-bold">Relógio</h1>
        </div>

        <Tabs defaultValue="relogio" className="flex-1 flex flex-col min-h-0">
          <TabsList className="w-full grid grid-cols-4 bg-gray-100 rounded-none h-12">
            <TabsTrigger value="relogio">Relógio</TabsTrigger>
            <TabsTrigger value="alarme">Alarmes</TabsTrigger>
            <TabsTrigger value="cronometro">Cronômetro</TabsTrigger>
            <TabsTrigger value="timer">Timer</TabsTrigger>
          </TabsList>

          {/* Relógio */}
          <TabsContent value="relogio" className="flex-1 p-6">
            <div className="text-center">
              <div className="mb-8">
                <h2 className="text-7xl font-light text-gray-800 mb-2">
                  {currentTime.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                </h2>
                <p className="text-3xl text-gray-400">
                  :{currentTime.getSeconds().toString().padStart(2, '0')}
                </p>
              </div>

              <div className="space-y-4">
                <div className="text-lg text-gray-600">
                  {currentTime.toLocaleDateString('pt-BR', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </div>
              </div>

              {/* Relógio Analógico */}
              <div className="mt-12 w-48 h-48 mx-auto relative">
                <div className="w-full h-full rounded-full border-4 border-gray-300 relative">
                  {[...Array(12)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute w-1 h-3 bg-gray-400 left-1/2 -translate-x-1/2"
                      style={{
                        top: '8px',
                        transformOrigin: 'center 88px',
                        transform: `translateX(-50%) rotate(${i * 30}deg)`
                      }}
                    />
                  ))}
                  
                  <div
                    className="absolute w-1.5 h-16 bg-gray-700 rounded-full left-1/2 -translate-x-1/2 origin-bottom"
                    style={{
                      bottom: '50%',
                      transform: `translateX(-50%) rotate(${(currentTime.getHours() % 12) * 30 + currentTime.getMinutes() * 0.5}deg)`
                    }}
                  />
                  
                  <div
                    className="absolute w-1 h-20 bg-gray-600 rounded-full left-1/2 -translate-x-1/2 origin-bottom"
                    style={{
                      bottom: '50%',
                      transform: `translateX(-50%) rotate(${currentTime.getMinutes() * 6}deg)`
                    }}
                  />
                  
                  <div className="absolute w-3 h-3 bg-indigo-500 rounded-full left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" />
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Alarmes */}
          <TabsContent value="alarme" className="flex-1 overflow-y-auto p-4 flex flex-col justify-center">
            {/* Tutorial de Uso */}
            <div className="bg-indigo-50 border-l-4 border-indigo-500 p-4 mb-4">
              <p className="text-sm text-indigo-900 mb-3">
                💊 <strong>📖 VAMOS APRENDER: Como agendar alarmes para medicamentos</strong>
              </p>
              <ol className="text-sm text-indigo-800 space-y-2 ml-4">
                <li>1️⃣ <strong>Clique no sinal de MAIS (+)</strong> à sua direita no topo da tela</li>
                <li>2️⃣ Escolha um horário sugerido ou coloque o horário que você quer</li>
                <li>3️⃣ Escreva o nome do remédio (ex: "Remédio da pressão")</li>
                <li>4️⃣ <strong>Clique nos dias da semana:</strong> Os dias que ficarem AZUIS são os dias que o alarme vai despertar! Se não quiser algum dia, clique nele para tirar.</li>
                <li>5️⃣ Clique em <strong>"Criar Alarme"</strong> no fim da tela</li>
              </ol>
              <p className="text-sm text-indigo-900 mt-3">
                📅 <strong>Para consultas médicas:</strong> Crie um alarme no dia e horário da consulta com o nome do médico!
              </p>
              <p className="text-xs text-indigo-700 mt-2">
                💡 Dica: Para desligar um alarme, clique no botãozinho branco ao lado do horário. Ele fica cinza quando desligado.
              </p>
            </div>
            {alarms.length === 0 ? (
              <div className="text-center py-12 text-gray-500">
                <Bell className="w-16 h-16 mx-auto mb-4 opacity-30" />
                <p className="text-lg font-medium mb-2">Nenhum alarme</p>
                <p className="text-sm mb-4">Crie alarmes para seus medicamentos</p>
                <motion.button
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ repeat: Infinity, duration: 1, ease: "easeInOut" }}
                  onClick={handleAddAlarm}
                  className="px-6 py-2 bg-indigo-500 text-white rounded-full hover:bg-indigo-600 relative"
                >
                  <motion.div
                    animate={{ scale: [1, 1.5, 1.5], opacity: [0.7, 0.2, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5, ease: "easeOut" }}
                    className="absolute -inset-2 rounded-full bg-yellow-400 z-0 pointer-events-none"
                  />
                  <span className="relative z-10">Criar Alarme</span>
                </motion.button>
              </div>
            ) : (
              <div className="space-y-3">
                {alarms.map((alarm) => (
                  <div
                    key={alarm.id}
                    className={`bg-white border-2 rounded-2xl p-4 transition-all ${
                      alarm.active ? 'border-indigo-200' : 'border-gray-200 opacity-60'
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      <div className="text-4xl">{alarm.icon}</div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="text-3xl font-light text-gray-900">{alarm.time}</h3>
                          <label className="relative inline-block w-12 h-6">
                            <input
                              type="checkbox"
                              checked={alarm.active}
                              onChange={() => handleToggleAlarm(alarm.id)}
                              className="sr-only peer"
                            />
                            <div className="w-full h-full bg-gray-300 peer-checked:bg-indigo-500 rounded-full transition-colors cursor-pointer"></div>
                            <div className="absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform peer-checked:translate-x-6"></div>
                          </label>
                        </div>
                        <p className="text-sm font-medium text-gray-900 mb-2">{alarm.label}</p>
                        <div className="flex gap-1 flex-wrap mb-2">
                          {alarm.days.map((day, idx) => (
                            <span key={idx} className="text-xs px-2 py-1 bg-indigo-100 text-indigo-700 rounded-full">
                              {day}
                            </span>
                          ))}
                        </div>
                      </div>
                      <button
                        onClick={() => handleDeleteAlarm(alarm.id)}
                        className="w-8 h-8 rounded-full hover:bg-red-100 flex items-center justify-center"
                      >
                        <Trash2 className="w-4 h-4 text-red-600" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </TabsContent>

          {/* Cronômetro */}
          <TabsContent value="cronometro" className="flex-1 flex flex-col p-6 min-h-0 overflow-hidden">
            <div className="flex-1 flex flex-col items-center justify-center">
              <div className="text-7xl font-light text-gray-900 mb-12">
                {formatStopwatchTime(stopwatchTime)}
              </div>

              <div className="flex gap-4 mb-8">
                <button
                  onClick={handleStopwatchToggle}
                  className={`w-20 h-20 rounded-full flex items-center justify-center shadow-lg transition-all ${
                    stopwatchRunning ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'
                  }`}
                >
                  {stopwatchRunning ? (
                    <Pause className="w-8 h-8 text-white" />
                  ) : (
                    <Play className="w-8 h-8 text-white ml-1" />
                  )}
                </button>
                <button
                  onClick={handleStopwatchReset}
                  className="w-20 h-20 rounded-full bg-gray-500 hover:bg-gray-600 flex items-center justify-center shadow-lg"
                >
                  <RotateCcw className="w-8 h-8 text-white" />
                </button>
                {stopwatchRunning && (
                  <button
                    onClick={handleLap}
                    className="w-20 h-20 rounded-full bg-blue-500 hover:bg-blue-600 flex items-center justify-center shadow-lg"
                  >
                    <Flag className="w-8 h-8 text-white" />
                  </button>
                )}
              </div>

              {laps.length > 0 && (
                <div className="w-full max-h-40 overflow-y-auto">
                  <h3 className="text-sm font-semibold text-gray-600 mb-2">VOLTAS</h3>
                  {laps.map((lap, index) => (
                    <div key={index} className="flex justify-between p-2 border-b border-gray-100">
                      <span className="text-gray-600">Volta {index + 1}</span>
                      <span className="font-mono text-gray-900">{formatStopwatchTime(lap)}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </TabsContent>

          {/* Timer */}
          <TabsContent value="timer" className="flex-1 flex flex-col p-6 min-h-0 overflow-hidden">
            <div className="flex-1 flex flex-col items-center justify-center">
              <div className="text-7xl font-light text-gray-900 mb-12">
                {timerMinutes.toString().padStart(2, '0')}:{timerSeconds.toString().padStart(2, '0')}
              </div>

              {!timerRunning && (
                <div className="grid grid-cols-2 gap-4 mb-8 w-full max-w-xs">
                  <div>
                    <Label>Minutos</Label>
                    <Input
                      type="number"
                      min="0"
                      max="59"
                      value={timerMinutes}
                      onChange={(e) => setTimerMinutes(Math.max(0, parseInt(e.target.value) || 0))}
                      className="text-2xl text-center"
                    />
                  </div>
                  <div>
                    <Label>Segundos</Label>
                    <Input
                      type="number"
                      min="0"
                      max="59"
                      value={timerSeconds}
                      onChange={(e) => setTimerSeconds(Math.max(0, Math.min(59, parseInt(e.target.value) || 0)))}
                      className="text-2xl text-center"
                    />
                  </div>
                </div>
              )}

              <div className="flex gap-4">
                <button
                  onClick={() => setTimerRunning(!timerRunning)}
                  disabled={!timerRunning && timerMinutes === 0 && timerSeconds === 0}
                  className={`w-20 h-20 rounded-full flex items-center justify-center shadow-lg transition-all disabled:opacity-50 ${
                    timerRunning ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'
                  }`}
                >
                  {timerRunning ? (
                    <Pause className="w-8 h-8 text-white" />
                  ) : (
                    <Play className="w-8 h-8 text-white ml-1" />
                  )}
                </button>
                <button
                  onClick={() => {
                    setTimerRunning(false);
                    setTimerMinutes(5);
                    setTimerSeconds(0);
                  }}
                  className="w-20 h-20 rounded-full bg-gray-500 hover:bg-gray-600 flex items-center justify-center shadow-lg"
                >
                  <RotateCcw className="w-8 h-8 text-white" />
                </button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Dialog de Adicionar Alarme */}
      <Dialog open={showAddAlarm} onOpenChange={setShowAddAlarm}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Novo Alarme para Medicamento</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4">
            {/* Horários Sugeridos */}
            <div>
              <Label>Horários Sugeridos</Label>
              <div className="grid grid-cols-2 gap-2 mt-2">
                {medicationPresets.map((preset, idx) => (
                  <button
                    key={idx}
                    onClick={() => setNewAlarm({...newAlarm, time: preset.time, label: preset.label, icon: preset.icon})}
                    className="p-3 border-2 border-gray-200 hover:border-indigo-300 rounded-xl text-left"
                  >
                    <div className="text-2xl mb-1">{preset.icon}</div>
                    <div className="text-xs font-medium">{preset.time}</div>
                    <div className="text-xs text-gray-500">{preset.label}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Horário Personalizado */}
            <div>
              <Label htmlFor="alarm-time">Horário</Label>
              <Input
                id="alarm-time"
                type="time"
                value={newAlarm.time}
                onChange={(e) => setNewAlarm({...newAlarm, time: e.target.value})}
                className="mt-2 text-2xl text-center"
              />
            </div>

            {/* Nome do Medicamento */}
            <div>
              <Label htmlFor="alarm-label">Nome do Medicamento *</Label>
              <Input
                id="alarm-label"
                value={newAlarm.label}
                onChange={(e) => setNewAlarm({...newAlarm, label: e.target.value})}
                placeholder="Ex: Remédio da pressão"
                className="mt-2"
              />
              <p className="text-xs text-gray-500 mt-1">
                💡 Escreva o nome para lembrar qual medicamento tomar
              </p>
            </div>

            {/* Dias da Semana */}
            <div>
              <Label>Repetir nos dias</Label>
              <div className="flex gap-2 mt-2 flex-wrap">
                {["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"].map((day) => (
                  <button
                    key={day}
                    onClick={() => {
                      const days = newAlarm.days.includes(day)
                        ? newAlarm.days.filter(d => d !== day)
                        : [...newAlarm.days, day];
                      setNewAlarm({...newAlarm, days});
                    }}
                    className={`px-3 py-2 rounded-full text-sm font-medium transition-colors ${
                      newAlarm.days.includes(day)
                        ? 'bg-indigo-500 text-white'
                        : 'bg-gray-100 text-gray-600'
                    }`}
                  >
                    {day}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAddAlarm(false)}>
              Cancelar
            </Button>
            <div className="relative">
              {newAlarm.label && (
                <motion.div
                  animate={{ scale: [1, 1.5, 1.5], opacity: [0.7, 0.2, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5, ease: "easeOut" }}
                  className="absolute -inset-2 rounded-full bg-yellow-400 z-0 pointer-events-none"
                />
              )}
              <motion.div
                animate={newAlarm.label ? { scale: [1, 1.12, 1] } : {}}
                transition={newAlarm.label ? { repeat: Infinity, duration: 1, ease: "easeInOut" } : {}}
                className="relative z-10"
              >
                <Button
                  onClick={handleSaveAlarm}
                  className="bg-indigo-500 hover:bg-indigo-600"
                  disabled={!newAlarm.label}
                >
                  Criar Alarme
                </Button>
              </motion.div>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </PhoneFrame>
  );
}