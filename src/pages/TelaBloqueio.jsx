import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { PhoneFrame } from '@/components/PhoneFrame';
import { StatusBar } from '@/components/StatusBar';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronUp, Lock, Heart, X, Phone, AlertTriangle, Droplet, Pill, User, Contact } from 'lucide-react';

// Dados médicos de emergência (ICE - In Case of Emergency)
// Um socorrista pode acessar estas informações mesmo com o celular bloqueado
const medicalInfo = {
  name: "Maria Oliveira",
  age: 68,
  bloodType: "O+",
  height: "1,62m",
  weight: "68kg",
  organDonor: true,
  allergies: ["Penicilina", "Dipirona", "Frutos do mar"],
  medications: [
    "Losartana 50mg - 1x ao dia (manhã)",
    "Metformina 850mg - 2x ao dia",
    "AAS 100mg - 1x ao dia (após almoço)"
  ],
  conditions: [
    "Hipertensão arterial",
    "Diabetes tipo 2",
    "Cardiopatia leve"
  ],
  emergencyContacts: [
    { name: "Ana Oliveira (Filha)", phone: "(11) 98765-4321", relation: "Filha" },
    { name: "Carlos Oliveira (Marido)", phone: "(11) 97654-3210", relation: "Esposo" },
    { name: "Dra. Patricia Mendes", phone: "(11) 3456-7890", relation: "Médica" }
  ],
  notes: "Paciente faz uso de marcapasso. Em caso de emergência, priorizar contato com a filha Ana."
};

export default function TelaBloqueio() {
  const navigate = useNavigate();
  const [time, setTime] = useState(new Date());
  const [showEmergency, setShowEmergency] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const synth = window.speechSynthesis;
    if (synth) {
      synth.cancel();
      const utter = new SpeechSynthesisUtterance(
        "Tela de bloqueio. Deslize o dedo de baixo para cima para desbloquear o aparelho. Se precisar, toque no botão de emergência para ver os dados médicos."
      );
      utter.lang = "pt-BR";
      utter.rate = 0.9;
      synth.speak(utter);
    }
    return () => window.speechSynthesis.cancel();
  }, []);

  const handleUnlock = () => {
    window.speechSynthesis.cancel();
    navigate(createPageUrl('Home'));
  };

  const handleEmergency = () => {
    const synth = window.speechSynthesis;
    if (synth) {
      synth.cancel();
      const utter = new SpeechSynthesisUtterance(
        "Dados médicos de emergência. Um socorrista pode ver estas informações mesmo com o celular bloqueado."
      );
      utter.lang = "pt-BR";
      utter.rate = 0.9;
      synth.speak(utter);
    }
    setShowEmergency(true);
  };

  return (
    <PhoneFrame>
      <div className="h-full bg-gradient-to-br from-cyan-400 via-green-300 to-yellow-200 relative overflow-hidden">
        <StatusBar variant="dark" />

        {/* Clock */}
        <div className="absolute top-1/4 left-0 right-0 text-center px-6">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="text-7xl font-extralight text-white drop-shadow-lg mb-2">
              {time.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
            </div>
            <div className="text-lg text-white/90 font-medium drop-shadow">
              {time.toLocaleDateString('pt-BR', { 
                weekday: 'long', 
                day: 'numeric', 
                month: 'long' 
              })}
            </div>
          </motion.div>
        </div>

        {/* Notifications Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        >
          <div className="flex flex-col items-center gap-3">
            <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-xl flex items-center justify-center shadow-xl">
              <Lock className="w-8 h-8 text-white" />
            </div>
            <p className="text-white/90 text-sm font-medium drop-shadow">
              Forja da Consciência
            </p>
          </div>
        </motion.div>

        {/* Unlock Indicator */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          onClick={handleUnlock}
          className="absolute bottom-28 left-0 right-0 flex flex-col items-center cursor-pointer"
        >
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          >
            <ChevronUp className="w-12 h-12 text-white drop-shadow-lg mb-2" />
          </motion.div>
          <p className="text-white font-medium drop-shadow text-lg">
            Deslize para cima para desbloquear
          </p>
        </motion.div>

        {/* Bottom Icons - Telefone de Emergência e Câmera */}
        <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-8 px-8">
          {/* Botão de Emergência / Dados Médicos */}
          <motion.button
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.7 }}
            onClick={handleEmergency}
            className="w-14 h-14 rounded-full bg-red-500/90 backdrop-blur-xl flex items-center justify-center shadow-xl border-2 border-white/30"
          >
            <Heart className="w-7 h-7 text-white" fill="white" />
          </motion.button>

          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8 }}
            className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-xl flex items-center justify-center"
          >
            <span className="text-2xl">📞</span>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.9 }}
            className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-xl flex items-center justify-center"
          >
            <span className="text-2xl">📷</span>
          </motion.div>
        </div>

        {/* Overlay de Dados Médicos de Emergência */}
        <AnimatePresence>
          {showEmergency && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.6 }}
                exit={{ opacity: 0 }}
                onClick={() => setShowEmergency(false)}
                className="absolute inset-0 bg-black z-40"
              />

              <motion.div
                initial={{ y: '100%' }}
                animate={{ y: 0 }}
                exit={{ y: '100%' }}
                transition={{ type: 'spring', damping: 30, stiffness: 300 }}
                className="absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl shadow-2xl z-50 max-h-[90%] overflow-y-auto"
              >
                {/* Header */}
                <div className="bg-red-500 text-white p-5 rounded-t-3xl sticky top-0 z-10">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                        <Heart className="w-6 h-6" fill="white" />
                      </div>
                      <div>
                        <h2 className="text-xl font-bold">Dados Médicos de Emergência</h2>
                        <p className="text-xs text-white/80">Acessível com celular bloqueado</p>
                      </div>
                    </div>
                    <button
                      onClick={() => setShowEmergency(false)}
                      className="w-9 h-9 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                <div className="p-5 space-y-4">
                  {/* Nome e Idade */}
                  <div className="flex items-center gap-3 pb-3 border-b border-gray-100">
                    <div className="w-14 h-14 rounded-full bg-red-100 flex items-center justify-center">
                      <User className="w-7 h-7 text-red-500" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-900">{medicalInfo.name}</h3>
                      <p className="text-sm text-gray-500">{medicalInfo.age} anos • {medicalInfo.height} • {medicalInfo.weight}</p>
                    </div>
                  </div>

                  {/* Tipo Sanguíneo e Doador */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-red-50 rounded-2xl p-4 flex items-center gap-3">
                      <Droplet className="w-8 h-8 text-red-500" />
                      <div>
                        <p className="text-xs text-gray-500">Tipo Sanguíneo</p>
                        <p className="text-2xl font-bold text-red-600">{medicalInfo.bloodType}</p>
                      </div>
                    </div>
                    <div className="bg-green-50 rounded-2xl p-4 flex items-center gap-3">
                      <Heart className="w-8 h-8 text-green-500" />
                      <div>
                        <p className="text-xs text-gray-500">Doador de Órgãos</p>
                        <p className="text-lg font-bold text-green-600">{medicalInfo.organDonor ? "Sim" : "Não"}</p>
                      </div>
                    </div>
                  </div>

                  {/* Alergias */}
                  <div className="bg-orange-50 rounded-2xl p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <AlertTriangle className="w-5 h-5 text-orange-500" />
                      <h4 className="font-bold text-orange-700">ALERGIAS</h4>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {medicalInfo.allergies.map((allergy, i) => (
                        <span key={i} className="px-3 py-1 bg-orange-200 text-orange-800 rounded-full text-sm font-medium">
                          {allergy}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Medicações */}
                  <div className="bg-blue-50 rounded-2xl p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Pill className="w-5 h-5 text-blue-500" />
                      <h4 className="font-bold text-blue-700">MEDICAÇÕES EM USO</h4>
                    </div>
                    <ul className="space-y-1.5">
                      {medicalInfo.medications.map((med, i) => (
                        <li key={i} className="text-sm text-blue-900 flex items-start gap-2">
                          <span className="text-blue-400 mt-0.5">•</span>
                          <span>{med}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Condições Médicas */}
                  <div className="bg-purple-50 rounded-2xl p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Heart className="w-5 h-5 text-purple-500" />
                      <h4 className="font-bold text-purple-700">CONDIÇÕES MÉDICAS</h4>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {medicalInfo.conditions.map((cond, i) => (
                        <span key={i} className="px-3 py-1 bg-purple-200 text-purple-800 rounded-full text-sm font-medium">
                          {cond}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Contatos de Emergência */}
                  <div className="bg-gray-50 rounded-2xl p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <Contact className="w-5 h-5 text-gray-600" />
                      <h4 className="font-bold text-gray-700">CONTATOS DE EMERGÊNCIA</h4>
                    </div>
                    <div className="space-y-2">
                      {medicalInfo.emergencyContacts.map((contact, i) => (
                        <div key={i} className="flex items-center gap-3 bg-white rounded-xl p-3">
                          <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                            <Phone className="w-5 h-5 text-green-600" />
                          </div>
                          <div className="flex-1">
                            <p className="font-semibold text-gray-900 text-sm">{contact.name}</p>
                            <p className="text-xs text-gray-500">{contact.relation} • {contact.phone}</p>
                          </div>
                          <button
                            onClick={() => alert(`Ligando para ${contact.name}...`)}
                            className="px-3 py-1.5 bg-green-500 text-white rounded-lg text-xs font-medium hover:bg-green-600"
                          >
                            Ligar
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Observações */}
                  {medicalInfo.notes && (
                    <div className="bg-yellow-50 border-l-4 border-yellow-400 rounded-2xl p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <AlertTriangle className="w-5 h-5 text-yellow-600" />
                        <h4 className="font-bold text-yellow-700">OBSERVAÇÕES IMPORTANTES</h4>
                      </div>
                      <p className="text-sm text-yellow-900">{medicalInfo.notes}</p>
                    </div>
                  )}

                  {/* Fechar */}
                  <button
                    onClick={() => setShowEmergency(false)}
                    className="w-full py-3 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-2xl font-medium"
                  >
                    Fechar
                  </button>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </PhoneFrame>
  );
}