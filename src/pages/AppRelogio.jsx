import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { ArrowLeft, Plus, Bell, Clock, Timer, MoreVertical } from "lucide-react";

export default function AppRelogio() {
  const navigate = useNavigate();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [activeTab, setActiveTab] = useState("clock");

  useEffect(() => {
    const synth = window.speechSynthesis;
    if (synth) {
      synth.cancel();
      const utter = new SpeechSynthesisUtterance(
        "Este é o aplicativo Relógio. Aqui você pode ver as horas, configurar alarmes e usar o cronômetro."
      );
      utter.lang = "pt-BR";
      utter.rate = 0.9;
      synth.speak(utter);
    }
    return () => window.speechSynthesis.cancel();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const alarms = [
    { id: 1, time: "07:00", label: "Acordar", enabled: true, days: "Seg-Sex" },
    { id: 2, time: "12:00", label: "Almoço", enabled: false, days: "Todos os dias" },
    { id: 3, time: "20:00", label: "Exercícios", enabled: true, days: "Seg, Qua, Sex" },
  ];

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="relative w-full max-w-sm">
        <div className="relative bg-black rounded-[50px] p-3 shadow-2xl">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-6 bg-black rounded-b-3xl z-10"></div>
          
          <div
            className="relative rounded-[46px] overflow-hidden bg-gray-900"
            style={{ aspectRatio: "9/19.5" }}
          >
            {/* Header */}
            <div className="bg-gray-900 text-white p-4 pt-8">
              <div className="flex items-center gap-4 mb-4">
                <button onClick={() => navigate(createPageUrl("TelaInicial"))}>
                  <ArrowLeft className="w-6 h-6" />
                </button>
                <h1 className="flex-1 text-xl">Relógio</h1>
                {activeTab === "alarm" && (
                  <button>
                    <Plus className="w-6 h-6" />
                  </button>
                )}
                <button>
                  <MoreVertical className="w-5 h-5" />
                </button>
              </div>

              {/* Tabs */}
              <div className="flex gap-6">
                <button
                  onClick={() => setActiveTab("alarm")}
                  className={`pb-2 flex items-center gap-2 ${
                    activeTab === "alarm"
                      ? "border-b-2 border-blue-500 text-blue-500"
                      : "opacity-70"
                  }`}
                >
                  <Bell className="w-4 h-4" />
                  <span>Alarme</span>
                </button>
                <button
                  onClick={() => setActiveTab("clock")}
                  className={`pb-2 flex items-center gap-2 ${
                    activeTab === "clock"
                      ? "border-b-2 border-blue-500 text-blue-500"
                      : "opacity-70"
                  }`}
                >
                  <Clock className="w-4 h-4" />
                  <span>Relógio</span>
                </button>
                <button
                  onClick={() => setActiveTab("timer")}
                  className={`pb-2 flex items-center gap-2 ${
                    activeTab === "timer"
                      ? "border-b-2 border-blue-500 text-blue-500"
                      : "opacity-70"
                  }`}
                >
                  <Timer className="w-4 h-4" />
                  <span>Timer</span>
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="overflow-y-auto" style={{ height: "calc(100% - 120px)" }}>
              {activeTab === "alarm" && (
                <div className="p-4 space-y-3">
                  {alarms.map((alarm) => (
                    <div
                      key={alarm.id}
                      className="bg-gray-800 rounded-2xl p-4 flex items-center gap-4"
                    >
                      <div className="flex-1">
                        <div className="text-white text-3xl mb-1">{alarm.time}</div>
                        <div className="text-gray-400 text-sm mb-1">{alarm.label}</div>
                        <div className="text-gray-500 text-xs">{alarm.days}</div>
                      </div>
                      <label className="relative inline-block w-12 h-6">
                        <input type="checkbox" checked={alarm.enabled} readOnly className="sr-only" />
                        <div
                          className={`w-12 h-6 rounded-full ${
                            alarm.enabled ? "bg-blue-500" : "bg-gray-600"
                          }`}
                        >
                          <div
                            className={`w-5 h-5 rounded-full bg-white shadow-md transition-transform ${
                              alarm.enabled ? "translate-x-6" : "translate-x-0.5"
                            } translate-y-0.5`}
                          />
                        </div>
                      </label>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === "clock" && (
                <div className="text-center py-12 text-white">
                  <div className="text-7xl mb-2">
                    {currentTime.toLocaleTimeString("pt-BR", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </div>
                  <div className="text-gray-400 text-2xl">
                    {currentTime.getSeconds().toString().padStart(2, "0")}
                  </div>
                  <div className="text-gray-500 mt-4 capitalize">
                    {currentTime.toLocaleDateString("pt-BR", {
                      weekday: "long",
                      day: "numeric",
                      month: "long",
                    })}
                  </div>
                </div>
              )}

              {activeTab === "timer" && (
                <div className="flex flex-col items-center justify-center h-full text-white px-6">
                  <div className="w-64 h-64 rounded-full border-8 border-gray-700 flex items-center justify-center mb-8">
                    <div className="text-6xl">00:00</div>
                  </div>
                  <button className="px-8 py-3 bg-blue-500 rounded-full hover:bg-blue-600">
                    Iniciar
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}