import React from 'react';
import { useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { PhoneFrame } from '@/components/PhoneFrame';
import { StatusBar } from '@/components/StatusBar';
import { ArrowLeft, Search, Bell, User, Home, Compass, Video, Library } from 'lucide-react';
import { motion } from 'framer-motion';

const videos = [
  { title: 'Tutorial Samsung Galaxy', channel: 'Tech BR', views: '1.2M', time: '12:34', thumbnail: '📱' },
  { title: 'Top 10 Apps 2024', channel: 'Dicas Tech', views: '890K', time: '15:20', thumbnail: '📲' },
  { title: 'Galaxy IA Recursos', channel: 'Samsung BR', views: '2.1M', time: '8:45', thumbnail: '🤖' },
  { title: 'Fotografia no Celular', channel: 'Foto Pro', views: '650K', time: '20:15', thumbnail: '📸' },
  { title: 'Jogos Android 2024', channel: 'Games Mobile', views: '1.5M', time: '18:30', thumbnail: '🎮' },
];

export default function AppYouTube() {
  const navigate = useNavigate();

  return (
    <PhoneFrame>
      <div className="h-full bg-white overflow-hidden flex flex-col">
        <StatusBar variant="light" />

        {/* Header */}
        <div className="bg-white px-6 py-4 border-b border-gray-200">
          <div className="flex items-center gap-4 mb-4">
            <button onClick={() => navigate(createPageUrl('Home'))}>
              <ArrowLeft className="w-6 h-6" />
            </button>
            <div className="text-2xl font-bold text-red-600">YouTube</div>
            <div className="flex-1" />
            <Bell className="w-6 h-6" />
            <Search className="w-6 h-6" />
            <User className="w-6 h-6" />
          </div>
        </div>

        {/* Videos Feed */}
        <div className="flex-1 overflow-y-auto">
          {videos.map((video, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="mb-4"
            >
              {/* Thumbnail */}
              <div className="relative bg-gray-200 aspect-video flex items-center justify-center text-6xl">
                {video.thumbnail}
                <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded">
                  {video.time}
                </div>
              </div>

              {/* Video Info */}
              <div className="p-4 flex gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-red-400 to-pink-500 flex items-center justify-center text-white font-bold">
                  {video.channel[0]}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-gray-900 line-clamp-2 mb-1">
                    {video.title}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {video.channel} • {video.views} visualizações
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom Navigation */}
        <div className="bg-white border-t border-gray-200 flex justify-around py-2">
          <button className="flex flex-col items-center text-gray-900 py-1">
            <Home className="w-6 h-6" />
            <span className="text-xs mt-1">Início</span>
          </button>
          <button className="flex flex-col items-center text-gray-500 py-1">
            <Compass className="w-6 h-6" />
            <span className="text-xs mt-1">Explorar</span>
          </button>
          <button className="flex flex-col items-center text-gray-500 py-1">
            <Video className="w-6 h-6" />
            <span className="text-xs mt-1">Shorts</span>
          </button>
          <button className="flex flex-col items-center text-gray-500 py-1">
            <Library className="w-6 h-6" />
            <span className="text-xs mt-1">Biblioteca</span>
          </button>
        </div>
      </div>
    </PhoneFrame>
  );
}