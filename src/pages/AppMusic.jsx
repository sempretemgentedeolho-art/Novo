import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { PhoneFrame } from '@/components/PhoneFrame';
import { StatusBar } from '@/components/StatusBar';
import {
  ArrowLeft, Play, Pause, SkipBack, SkipForward,
  Heart, Share2, MoreVertical, Shuffle, Repeat, Music
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

const playlist = [
  { title: 'Blinding Lights', artist: 'The Weeknd', duration: '3:20', cover: '🎵' },
  { title: 'Levitating', artist: 'Dua Lipa', duration: '3:23', cover: '🎶' },
  { title: 'Save Your Tears', artist: 'The Weeknd', duration: '3:35', cover: '🎵' },
  { title: 'Peaches', artist: 'Justin Bieber', duration: '3:18', cover: '🍑' },
  { title: 'Good 4 U', artist: 'Olivia Rodrigo', duration: '2:58', cover: '💜' },
];

export default function AppMusic() {
  const navigate = useNavigate();
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentTrack] = useState(playlist[0]);
  const [liked, setLiked] = useState(false);
  const [progress, setProgress] = useState([45]);
  const [shuffle, setShuffle] = useState(false);
  const [repeat, setRepeat] = useState(false);

  return (
    <PhoneFrame>
      <div className="h-full bg-gradient-to-br from-rose-500 via-pink-500 to-purple-600 text-white overflow-hidden flex flex-col">
        <StatusBar variant="dark" />

        {/* Header */}
        <div className="px-6 py-4 flex items-center justify-between">
          <button onClick={() => navigate(createPageUrl('Home'))}>
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-xl font-bold">Tocando Agora</h1>
          <button>
            <MoreVertical className="w-6 h-6" />
          </button>
        </div>

        {/* Album Art */}
        <div className="flex-1 flex items-center justify-center p-8">
          <motion.div
            animate={{ rotate: isPlaying ? 360 : 0 }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            className="w-72 h-72 rounded-full bg-gradient-to-br from-white/20 to-white/5 backdrop-blur-sm flex items-center justify-center shadow-2xl"
          >
            <Music className="w-32 h-32 opacity-80" />
          </motion.div>
        </div>

        {/* Track Info */}
        <div className="px-8 pb-6">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold mb-2">{currentTrack.title}</h2>
            <p className="text-lg opacity-90">{currentTrack.artist}</p>
          </div>

          {/* Progress Bar */}
          <div className="mb-2">
            <Slider
              value={progress}
              onValueChange={setProgress}
              max={100}
              step={1}
              className="[&_.relative]:bg-white/20 [&_[role=slider]]:bg-white"
            />
          </div>
          <div className="flex justify-between text-sm opacity-80 mb-6">
            <span>1:32</span>
            <span>3:20</span>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center gap-6 mb-6">
            <button
              onClick={() => setShuffle(!shuffle)}
              className={cn("transition-opacity", shuffle ? "opacity-100" : "opacity-50")}
            >
              <Shuffle className="w-6 h-6" />
            </button>

            <button>
              <SkipBack className="w-8 h-8" />
            </button>

            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="w-20 h-20 rounded-full bg-white text-purple-600 flex items-center justify-center shadow-2xl"
            >
              {isPlaying ? (
                <Pause className="w-10 h-10" />
              ) : (
                <Play className="w-10 h-10 ml-1" />
              )}
            </button>

            <button>
              <SkipForward className="w-8 h-8" />
            </button>

            <button
              onClick={() => setRepeat(!repeat)}
              className={cn("transition-opacity", repeat ? "opacity-100" : "opacity-50")}
            >
              <Repeat className="w-6 h-6" />
            </button>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-center gap-8">
            <button onClick={() => setLiked(!liked)}>
              <Heart className={cn("w-7 h-7", liked && "fill-white")} />
            </button>
            <button>
              <Share2 className="w-7 h-7" />
            </button>
          </div>
        </div>

        {/* Bottom Queue */}
        <div className="bg-black/20 backdrop-blur-md p-6">
          <h3 className="font-bold mb-3">Próximas</h3>
          <div className="space-y-2 max-h-32 overflow-y-auto">
            {playlist.slice(1, 4).map((track, index) => (
              <div key={index} className="flex items-center gap-3 text-sm">
                <span className="text-3xl">{track.cover}</span>
                <div className="flex-1 min-w-0">
                  <p className="font-medium truncate">{track.title}</p>
                  <p className="text-xs opacity-80 truncate">{track.artist}</p>
                </div>
                <span className="text-xs opacity-80">{track.duration}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </PhoneFrame>
  );
}