
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { PhoneFrame } from '@/components/PhoneFrame';
import { StatusBar } from '@/components/StatusBar';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, X, Sun, Volume2, Wifi, Bluetooth, Settings as SettingsIcon, MessageCircle, Mail, Calendar, Heart, ShoppingBag, Music, Bell, Reply, ThumbsUp, Check, Phone as PhoneIcon, Calendar as CalendarIcon, Activity, Flashlight, Plane, Signal } from 'lucide-react';
import { Slider } from '@/components/ui/slider';
import {
  Phone, MessageSquare, Camera, Image, Settings,
  Calculator, Clock, Facebook, Instagram,
  Video, Lightbulb
} from 'lucide-react';

const apps = [
  { id: 'phone', name: 'Telefone', icon: Phone, page: 'Telefone', bgColor: 'bg-green-500', iconColor: 'text-white' },
  { id: 'messages', name: 'Mensagens', icon: MessageSquare, page: 'Mensagens', bgColor: 'bg-gradient-to-br from-blue-400 to-blue-600', iconColor: 'text-white' },
  { id: 'camera', name: 'Câmera', icon: Camera, page: 'Camera', bgColor: 'bg-gradient-to-br from-gray-700 to-gray-900', iconColor: 'text-white' },
  { id: 'gallery', name: 'Galeria', icon: Image, page: 'Galeria', bgColor: 'bg-gradient-to-br from-pink-400 to-red-500', iconColor: 'text-white' },
  { id: 'playstore', name: 'Play Store', icon: ShoppingBag, page: 'PlayStore', bgColor: 'bg-gradient-to-br from-green-400 via-blue-500 to-purple-500', iconColor: 'text-white' },
  { id: 'contacts', name: 'Contatos', icon: Phone, page: 'Contatos', bgColor: 'bg-gradient-to-br from-orange-400 to-orange-600', iconColor: 'text-white' },
  { id: 'clock', name: 'Relógio', icon: Clock, page: 'Relogio', bgColor: 'bg-gradient-to-br from-blue-500 to-indigo-600', iconColor: 'text-white' },
  { id: 'settings', name: 'Configurações', icon: Settings, page: 'Configuracoes', bgColor: 'bg-gradient-to-br from-gray-600 to-gray-800', iconColor: 'text-white' },
  { id: 'whatsapp', name: 'WhatsApp', icon: MessageCircle, page: 'WhatsApp', bgColor: 'bg-gradient-to-br from-green-400 to-green-600', iconColor: 'text-white' },
  { id: 'facebook', name: 'Facebook', icon: Facebook, page: 'Facebook', bgColor: 'bg-gradient-to-br from-blue-600 to-blue-800', iconColor: 'text-white' },
  { id: 'instagram', name: 'Instagram', icon: Instagram, page: 'Instagram', bgColor: 'bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500', iconColor: 'text-white' },
  { id: 'calculator', name: 'Calculadora', icon: Calculator, page: 'Calculadora', bgColor: 'bg-gradient-to-br from-orange-400 to-red-500', iconColor: 'text-white' },
  { id: 'tiktok', name: 'TikTok', icon: Video, page: 'TikTok', bgColor: 'bg-black', iconColor: 'text-white' },
  { id: 'tips', name: 'Dicas', icon: Lightbulb, page: 'AppDicas', bgColor: 'bg-gradient-to-br from-yellow-400 to-amber-500', iconColor: 'text-white' },
];

const initialNotifications = [
  {
    id: 1,
    app: 'WhatsApp',
    icon: MessageCircle,
    color: 'bg-green-500',
    title: 'Maria Silva',
    message: 'Oi! Tudo bem? Vamos almoçar hoje?',
    time: '10:30',
    unread: true,
    actions: [
      { type: 'reply', label: 'Responder', icon: Reply },
      { type: 'call', label: 'Ligar', icon: PhoneIcon },
    ]
  },
  {
    id: 2,
    app: 'Instagram',
    icon: Instagram,
    color: 'bg-gradient-to-br from-purple-500 to-pink-500',
    title: 'Instagram',
    message: 'João Pedro começou a seguir você',
    time: '09:15',
    unread: true,
    actions: [
      { type: 'like', label: 'Curtir', icon: ThumbsUp },
      { type: 'follow', label: 'Seguir de Volta', icon: Check },
    ]
  },
  {
    id: 3,
    app: 'Email',
    icon: Mail,
    color: 'bg-blue-500',
    title: 'Gmail',
    message: 'Você tem 3 novos e-mails não lidos',
    time: 'Ontem',
    unread: false,
    actions: [
      { type: 'read', label: 'Ler', icon: Mail },
      { type: 'archive', label: 'Arquivar', icon: Check },
    ]
  },
  {
    id: 4,
    app: 'Calendário',
    icon: Calendar,
    color: 'bg-red-500',
    title: 'Calendário',
    message: 'Consulta médica amanhã às 14h',
    time: 'Ontem',
    unread: false,
    actions: [
      { type: 'view', label: 'Ver Detalhes', icon: CalendarIcon },
      { type: 'remind', label: 'Lembrar 1h Antes', icon: Bell },
    ]
  },
  {
    id: 5,
    app: 'Samsung Health',
    icon: Heart,
    color: 'bg-pink-500',
    title: 'Samsung Health',
    message: 'Parabéns! Você alcançou sua meta diária',
    time: '2 dias',
    unread: false,
    actions: [
      { type: 'view', label: 'Ver Progresso', icon: Activity },
      { type: 'share', label: 'Compartilhar', icon: ThumbsUp },
    ]
  },
  {
    id: 6,
    app: 'WhatsApp',
    icon: MessageCircle,
    color: 'bg-green-500',
    title: 'Grupo Família',
    message: 'Ana: Alguém viu minhas chaves?',
    time: '08:45',
    unread: true,
    actions: [
      { type: 'reply', label: 'Responder', icon: Reply },
      { type: 'mute', label: 'Silenciar', icon: Volume2 },
    ]
  },
  {
    id: 7,
    app: 'Facebook',
    icon: Facebook,
    color: 'bg-blue-600',
    title: 'Facebook',
    message: 'Pedro comentou na sua foto',
    time: 'Ontem',
    unread: true,
    actions: [
      { type: 'like', label: 'Curtir', icon: ThumbsUp },
      { type: 'reply', label: 'Responder', icon: Reply },
    ]
  },
  {
    id: 8,
    app: 'TikTok',
    icon: Video,
    color: 'bg-black',
    title: 'TikTok',
    message: 'Seu vídeo alcançou 1000 visualizações!',
    time: '3 dias',
    unread: false,
    actions: [
      { type: 'view', label: 'Ver Vídeo', icon: Video },
      { type: 'share', label: 'Compartilhar', icon: ThumbsUp },
    ]
  },
];

export default function Home() {
  const navigate = useNavigate();
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [quickPanelOpen, setQuickPanelOpen] = useState(false);
  const [time, setTime] = useState(new Date());
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const [brightness, setBrightness] = useState([70]);
  const [volume, setVolume] = useState([60]);
  const [notificationList, setNotificationList] = useState(initialNotifications);
  const [wifiEnabled, setWifiEnabled] = useState(true);
  const [bluetoothEnabled, setBluetoothEnabled] = useState(false);
  const [flashlightEnabled, setFlashlightEnabled] = useState(false);
  const [airplaneModeEnabled, setAirplaneModeEnabled] = useState(false);
  const [mobileDataEnabled, setMobileDataEnabled] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const synth = window.speechSynthesis;
    if (synth) {
      synth.cancel();
      const utter = new SpeechSynthesisUtterance(
        "Tela inicial. Escolha o aplicativo que deseja abrir. Deslize do topo para baixo para ver notificações."
      );
      utter.lang = "pt-BR";
      utter.rate = 0.9;
      synth.speak(utter);
    }
    return () => window.speechSynthesis.cancel();
  }, []);

  const minSwipeDistance = 30;

  const onTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientY);
  };

  const onTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientY);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isDownSwipe = distance < -minSwipeDistance;
    
    if (isDownSwipe && touchStart < 200) {
      if (Math.abs(distance) > 100) {
        setQuickPanelOpen(true);
      } else {
        setNotificationsOpen(true);
      }
    }
  };

  const handleAppClick = (app) => {
    const synth = window.speechSynthesis;
    if (synth) {
      synth.cancel();
      const utter = new SpeechSynthesisUtterance(`Abrindo ${app.name}`);
      utter.lang = "pt-BR";
      utter.rate = 0.9;
      synth.speak(utter);
    }
    setTimeout(() => {
      navigate(createPageUrl(app.page));
    }, 500);
  };

  const handleDismissNotification = (id) => {
    setNotificationList(notificationList.filter(n => n.id !== id));
  };

  const handleClearAll = () => {
    setNotificationList([]);
  };

  const handleMarkAllAsRead = () => {
    setNotificationList(notificationList.map(n => ({ ...n, unread: false })));
  };

  const handleNotificationAction = (notificationId, actionType) => {
    const notification = notificationList.find(n => n.id === notificationId);
    
    const actionMessages = {
      reply: `Responder para ${notification.title}`,
      call: `Ligando para ${notification.title}`,
      like: `Curtindo publicação`,
      follow: `Seguindo ${notification.title}`,
      read: `Abrindo e-mails`,
      archive: `E-mails arquivados`,
      view: `Visualizando detalhes`,
      remind: `Lembrete configurado`,
      share: `Compartilhando`,
      mute: `Notificações silenciadas`,
    };

    alert(actionMessages[actionType] || 'Ação executada');
    
    setNotificationList(notificationList.map(n => 
      n.id === notificationId ? { ...n, unread: false } : n
    ));
  };

  const handleQuickToggle = (type) => {
    const synth = window.speechSynthesis;
    if (synth) {
      synth.cancel();
      let message = "";
      
      switch(type) {
        case 'wifi':
          message = wifiEnabled 
            ? "Clique neste botão onde tem uma antena com ondas, escrito Wi-Fi, para abrir as configurações e gerenciar suas redes sem fio."
            : "Wi-Fi desativado. Clique para ativar e configurar.";
          const utter1 = new SpeechSynthesisUtterance(message);
          utter1.lang = "pt-BR";
          utter1.rate = 0.9;
          synth.speak(utter1);
          setTimeout(() => {
            setQuickPanelOpen(false);
            navigate(createPageUrl('WiFiConfig'));
          }, 3000);
          break;
          
        case 'bluetooth':
          message = "Clique neste botão com o símbolo do Bluetooth para conectar fones de ouvido, relógios e outros dispositivos sem fio.";
          const utter2 = new SpeechSynthesisUtterance(message);
          utter2.lang = "pt-BR";
          utter2.rate = 0.9;
          synth.speak(utter2);
          setTimeout(() => {
            setQuickPanelOpen(false);
            navigate(createPageUrl('BluetoothConfig'));
          }, 3000);
          break;
          
        case 'sound':
          message = "Clique neste botão com o alto-falante para ajustar o volume e configurar os sons do seu aparelho.";
          const utter3 = new SpeechSynthesisUtterance(message);
          utter3.lang = "pt-BR";
          utter3.rate = 0.9;
          synth.speak(utter3);
          setTimeout(() => {
            setQuickPanelOpen(false);
            navigate(createPageUrl('VolumeControl'));
          }, 3000);
          break;
          
        case 'flashlight':
          setFlashlightEnabled(!flashlightEnabled);
          message = !flashlightEnabled 
            ? "Clique agora na lanterna. Lanterna ligada! Ótimo para sair da cama à noite ou quando falta luz. Muito útil em emergências." 
            : "Lanterna desligada. Clique novamente quando precisar de luz.";
          const utter4 = new SpeechSynthesisUtterance(message);
          utter4.lang = "pt-BR";
          utter4.rate = 0.9;
          synth.speak(utter4);
          break;
          
        case 'airplane':
          setAirplaneModeEnabled(!airplaneModeEnabled);
          message = !airplaneModeEnabled 
            ? "Modo avião ativado. Todas as conexões sem fio foram desligadas. Use no avião ou quando quiser economizar bateria." 
            : "Modo avião desativado. Conexões sem fio estão disponíveis novamente.";
          const utter5 = new SpeechSynthesisUtterance(message);
          utter5.lang = "pt-BR";
          utter5.rate = 0.9;
          synth.speak(utter5);
          break;
          
        case 'mobiledata':
          setMobileDataEnabled(!mobileDataEnabled);
          message = !mobileDataEnabled 
            ? "Dados móveis ativados. Você pode usar internet pelo chip da operadora. Cuidado para não gastar muito se seu plano tiver limite!" 
            : "Dados móveis desativados. Use Wi-Fi para acessar a internet e economizar seu pacote de dados.";
          const utter6 = new SpeechSynthesisUtterance(message);
          utter6.lang = "pt-BR";
          utter6.rate = 0.9;
          synth.speak(utter6);
          break;
      }
    }
  };

  return (
    <PhoneFrame>
      <div 
        className="h-full bg-gradient-to-br from-cyan-400 via-green-300 to-yellow-200 overflow-hidden relative"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        {/* Status Bar */}
        <div className="relative">
          <StatusBar variant="dark" />
          
          {/* Indicador de swipe */}
          <motion.button
            onClick={() => setNotificationsOpen(true)}
            animate={{ y: [0, 5, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            className="absolute top-2 left-1/2 -translate-x-1/2 z-50"
          >
            <ChevronDown className="w-6 h-6 text-white drop-shadow-lg" />
          </motion.button>
        </div>

        {/* Clock Widget */}
        <div className="px-6 py-6 text-center">
          <div className="text-6xl font-extralight text-white drop-shadow-lg mb-2">
            {time.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
          </div>
          <div className="text-sm text-white/90 font-medium drop-shadow">
            {time.toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long' })}
          </div>
        </div>

        {/* Apps Grid */}
        <div className="px-6 pb-28">
          <div className="grid grid-cols-4 gap-4">
            {apps.map((app, index) => {
              const Icon = app.icon;
              return (
                <motion.button
                  key={app.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => handleAppClick(app)}
                  className="flex flex-col items-center gap-2"
                >
                  <div className={`w-14 h-14 rounded-2xl ${app.bgColor} flex items-center justify-center shadow-lg transition-all hover:scale-105`}>
                    <Icon className={`w-7 h-7 ${app.iconColor}`} />
                  </div>
                  <span className="text-[10px] font-medium text-white drop-shadow text-center leading-tight">
                    {app.name}
                  </span>
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* Bottom Navigation Dock */}
        <div className="absolute bottom-0 left-0 right-0 bg-white/80 backdrop-blur-xl border-t border-gray-200/50 py-3 px-8 flex justify-around items-center rounded-t-3xl shadow-lg">
          <button onClick={() => handleAppClick(apps[0])} className="flex flex-col items-center gap-1">
            <div className="w-12 h-12 rounded-xl bg-green-500 flex items-center justify-center shadow-md">
              <Phone className="w-6 h-6 text-white" />
            </div>
          </button>
          <button onClick={() => handleAppClick(apps[1])} className="flex flex-col items-center gap-1">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center shadow-md">
              <MessageSquare className="w-6 h-6 text-white" />
            </div>
          </button>
          <button onClick={() => handleAppClick(apps[2])} className="flex flex-col items-center gap-1">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center shadow-md">
              <Camera className="w-6 h-6 text-white" />
            </div>
          </button>
          <button onClick={() => handleAppClick(apps[3])} className="flex flex-col items-center gap-1">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-pink-400 to-red-500 flex items-center justify-center shadow-md">
              <Image className="w-6 h-6 text-white" />
            </div>
          </button>
        </div>

        {/* Notifications Panel */}
        <AnimatePresence>
          {notificationsOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.5 }}
                exit={{ opacity: 0 }}
                onClick={() => setNotificationsOpen(false)}
                className="absolute inset-0 bg-black z-40"
              />

              <motion.div
                initial={{ y: '-100%' }}
                animate={{ y: 0 }}
                exit={{ y: '-100%' }}
                transition={{ type: 'spring', damping: 30, stiffness: 300 }}
                className="absolute top-0 left-0 right-0 bg-gradient-to-b from-slate-100 to-slate-200 rounded-b-3xl shadow-2xl z-50 max-h-[85%] overflow-auto"
              >
                {/* Header */}
                <div className="p-6 pt-12 flex justify-between items-center border-b border-slate-300">
                  <div className="flex items-center gap-2">
                    <Bell className="w-5 h-5 text-slate-700" />
                    <h2 className="text-xl font-bold text-slate-900">Notificações</h2>
                    {notificationList.length > 0 && (
                      <span className="bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                        {notificationList.filter(n => n.unread).length}
                      </span>
                    )}
                  </div>
                  <button onClick={() => setNotificationsOpen(false)} className="w-10 h-10 rounded-full bg-slate-300 hover:bg-slate-400 flex items-center justify-center">
                    <X className="w-5 h-5 text-slate-700" />
                  </button>
                </div>

                {/* Notifications List */}
                <div className="p-4">
                  {notificationList.length === 0 ? (
                    <div className="text-center py-12 text-slate-500">
                      <Bell className="w-16 h-16 mx-auto mb-4 opacity-30" />
                      <p className="text-lg font-medium">Nenhuma notificação</p>
                      <p className="text-sm">Você está em dia!</p>
                    </div>
                  ) : (
                    <>
                      <div className="flex justify-between items-center mb-3 px-2">
                        <p className="text-sm font-semibold text-slate-600">RECENTES</p>
                        <div className="flex gap-2">
                          <button 
                            onClick={handleMarkAllAsRead}
                            className="text-xs text-green-600 font-medium hover:text-green-700 flex items-center gap-1"
                          >
                            <Check className="w-3 h-3" />
                            Marcar todas como lidas
                          </button>
                          <button 
                            onClick={handleClearAll}
                            className="text-xs text-blue-600 font-medium hover:text-blue-700"
                          >
                            Limpar tudo
                          </button>
                        </div>
                      </div>
                      <div className="space-y-2">
                        {notificationList.map((notif) => {
                          const Icon = notif.icon;
                          return (
                            <motion.div
                              key={notif.id}
                              layout
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              exit={{ opacity: 0, x: 20 }}
                              className={`bg-white rounded-2xl p-4 shadow-sm border ${
                                notif.unread ? 'border-blue-200 border-l-4 border-l-blue-500' : 'border-slate-200'
                              }`}
                            >
                              <div className="flex gap-3 mb-3">
                                <div className={`w-10 h-10 rounded-xl ${notif.color} flex items-center justify-center flex-shrink-0`}>
                                  <Icon className="w-5 h-5 text-white" />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <div className="flex justify-between items-start mb-1">
                                    <div className="flex items-center gap-2">
                                      <h3 className="font-semibold text-slate-900 text-sm">{notif.title}</h3>
                                      {notif.unread && (
                                        <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                                      )}
                                    </div>
                                    <span className="text-xs text-slate-500">{notif.time}</span>
                                  </div>
                                  <p className="text-sm text-slate-600 leading-snug">{notif.message}</p>
                                </div>
                              </div>

                              {/* Quick Actions */}
                              <div className="flex gap-2 flex-wrap">
                                {notif.actions.map((action, idx) => {
                                  const ActionIcon = action.icon;
                                  return (
                                    <button
                                      key={idx}
                                      onClick={() => handleNotificationAction(notif.id, action.type)}
                                      className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-lg text-xs font-medium transition-colors"
                                    >
                                      <ActionIcon className="w-3.5 h-3.5" />
                                      {action.label}
                                    </button>
                                  );
                                })}
                                <button 
                                  onClick={() => handleDismissNotification(notif.id)}
                                  className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-lg text-xs font-medium transition-colors"
                                >
                                  <X className="w-3.5 h-3.5" />
                                  Dispensar
                                </button>
                              </div>
                            </motion.div>
                          );
                        })}
                      </div>
                    </>
                  )}
                </div>

                {/* Quick Settings Button */}
                <div className="p-4 border-t border-slate-300">
                  <button
                    onClick={() => {
                      setNotificationsOpen(false);
                      setQuickPanelOpen(true);
                    }}
                    className="w-full bg-slate-300 hover:bg-slate-400 rounded-2xl p-4 flex items-center justify-center gap-2 transition-all"
                  >
                    <SettingsIcon className="w-5 h-5 text-slate-700" />
                    <span className="font-medium text-slate-700">Configurações Rápidas</span>
                  </button>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* Quick Panel */}
        <AnimatePresence>
          {quickPanelOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.5 }}
                exit={{ opacity: 0 }}
                onClick={() => setQuickPanelOpen(false)}
                className="absolute inset-0 bg-black z-40"
              />

              <motion.div
                initial={{ y: '-100%' }}
                animate={{ y: 0 }}
                exit={{ y: '-100%' }}
                transition={{ type: 'spring', damping: 30, stiffness: 300 }}
                className="absolute top-0 left-0 right-0 bg-gradient-to-b from-slate-800 to-slate-900 text-white rounded-b-3xl shadow-2xl z-50 max-h-[85%] overflow-auto"
              >
                {/* Header */}
                <div className="p-6 pt-12 flex justify-between items-start">
                  <div>
                    <h2 className="text-2xl font-bold">Configurações Rápidas</h2>
                    <p className="text-sm text-slate-300 mt-1">
                      {new Date().toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long' })}
                    </p>
                  </div>
                  <button onClick={() => setQuickPanelOpen(false)} className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center">
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Brightness */}
                <div className="px-6 pb-4">
                  <div className="bg-white/10 rounded-2xl p-4 backdrop-blur-sm">
                    <div className="flex items-center gap-3 mb-3">
                      <Sun className="w-5 h-5 text-yellow-400" />
                      <span className="font-medium">Brilho</span>
                      <span className="ml-auto text-sm text-slate-300">{brightness[0]}%</span>
                    </div>
                    <Slider
                      value={brightness}
                      onValueChange={setBrightness}
                      max={100}
                      step={1}
                      className="[&_.relative]:bg-white/20 [&_[role=slider]]:bg-white"
                    />
                  </div>
                </div>

                {/* Volume */}
                <div className="px-6 pb-4">
                  <div className="bg-white/10 rounded-2xl p-4 backdrop-blur-sm">
                    <div className="flex items-center gap-3 mb-3">
                      <Volume2 className="w-5 h-5 text-blue-400" />
                      <span className="font-medium">Volume</span>
                      <span className="ml-auto text-sm text-slate-300">{volume[0]}%</span>
                    </div>
                    <Slider
                      value={volume}
                      onValueChange={setVolume}
                      max={100}
                      step={1}
                      className="[&_.relative]:bg-white/20 [&_[role=slider]]:bg-white"
                    />
                  </div>
                </div>

                {/* Quick Toggles */}
                <div className="px-6 pb-4">
                  <div className="grid grid-cols-3 gap-3">
                    <button
                      onClick={() => handleQuickToggle('wifi')}
                      className={`flex flex-col items-center gap-2 p-4 rounded-2xl transition-all ${
                        wifiEnabled ? 'bg-blue-500' : 'bg-white/10'
                      }`}
                    >
                      <Wifi className={`w-6 h-6 ${wifiEnabled ? 'text-white' : 'text-slate-300'}`} />
                      <span className={`text-xs font-medium ${wifiEnabled ? 'text-white' : 'text-slate-300'}`}>Wi-Fi</span>
                    </button>
                    
                    <button
                      onClick={() => handleQuickToggle('bluetooth')}
                      className={`flex flex-col items-center gap-2 p-4 rounded-2xl transition-all ${
                        bluetoothEnabled ? 'bg-blue-500' : 'bg-white/10'
                      }`}
                    >
                      <Bluetooth className={`w-6 h-6 ${bluetoothEnabled ? 'text-white' : 'text-slate-300'}`} />
                      <span className={`text-xs font-medium ${bluetoothEnabled ? 'text-white' : 'text-slate-300'}`}>Bluetooth</span>
                    </button>
                    
                    <button
                      onClick={() => handleQuickToggle('sound')}
                      className="flex flex-col items-center gap-2 p-4 rounded-2xl bg-white/10"
                    >
                      <Volume2 className="w-6 h-6 text-slate-300" />
                      <span className="text-xs font-medium text-slate-300">Som</span>
                    </button>
                    
                    <button
                      onClick={() => handleQuickToggle('flashlight')}
                      className={`flex flex-col items-center gap-2 p-4 rounded-2xl transition-all ${
                        flashlightEnabled ? 'bg-yellow-500' : 'bg-white/10'
                      }`}
                    >
                      <Flashlight className={`w-6 h-6 ${flashlightEnabled ? 'text-white' : 'text-slate-300'}`} />
                      <span className={`text-xs font-medium ${flashlightEnabled ? 'text-white' : 'text-slate-300'}`}>Lanterna</span>
                    </button>
                    
                    <button
                      onClick={() => handleQuickToggle('airplane')}
                      className={`flex flex-col items-center gap-2 p-4 rounded-2xl transition-all ${
                        airplaneModeEnabled ? 'bg-orange-500' : 'bg-white/10'
                      }`}
                    >
                      <Plane className={`w-6 h-6 ${airplaneModeEnabled ? 'text-white' : 'text-slate-300'}`} />
                      <span className={`text-xs font-medium ${airplaneModeEnabled ? 'text-white' : 'text-slate-300'}`}>Avião</span>
                    </button>
                    
                    <button
                      onClick={() => handleQuickToggle('mobiledata')}
                      className={`flex flex-col items-center gap-2 p-4 rounded-2xl transition-all ${
                        mobileDataEnabled ? 'bg-green-500' : 'bg-white/10'
                      }`}
                    >
                      <Signal className={`w-6 h-6 ${mobileDataEnabled ? 'text-white' : 'text-slate-300'}`} />
                      <span className={`text-xs font-medium ${mobileDataEnabled ? 'text-white' : 'text-slate-300'}`}>Dados</span>
                    </button>
                  </div>
                </div>

                {/* Settings Button */}
                <div className="px-6 pb-8">
                  <button
                    onClick={() => {
                      setQuickPanelOpen(false);
                      navigate(createPageUrl('Configuracoes'));
                    }}
                    className="w-full bg-white/10 hover:bg-white/15 rounded-2xl p-4 flex items-center justify-between transition-all"
                  >
                    <div className="flex items-center gap-3">
                      <SettingsIcon className="w-5 h-5" />
                      <span className="font-medium">Todas as Configurações</span>
                    </div>
                    <span className="text-slate-400">›</span>
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
