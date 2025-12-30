import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { PhoneFrame } from '@/components/PhoneFrame';
import { StatusBar } from '@/components/StatusBar';
import { cn } from '@/components/ui/utils';
import { ArrowLeft, Calendar as CalendarIcon, Plus, Clock, MapPin } from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

const events = [
  { title: 'Reunião de Equipe', time: '10:00', location: 'Sala A', color: 'bg-blue-500' },
  { title: 'Almoço com Cliente', time: '13:00', location: 'Restaurante Central', color: 'bg-green-500' },
  { title: 'Academia', time: '18:00', location: 'Smart Fit', color: 'bg-purple-500' },
];

export default function AppCalendar() {
  const navigate = useNavigate();
  const [date, setDate] = useState(new Date());

  return (
    <PhoneFrame>
      <div className="h-full bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 overflow-hidden flex flex-col">
        <StatusBar variant="light" />

        {/* Header */}
        <div className="bg-gradient-to-r from-amber-600 to-orange-600 text-white px-6 py-4">
          <div className="flex items-center gap-4">
            <button onClick={() => navigate(createPageUrl('Home'))}>
              <ArrowLeft className="w-6 h-6" />
            </button>
            <div className="flex-1">
              <h1 className="text-2xl font-bold">Agenda</h1>
            </div>
            <button>
              <Plus className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Calendar */}
        <div className="bg-white p-4">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            className="rounded-xl"
          />
        </div>

        {/* Events */}
        <div className="flex-1 overflow-y-auto p-6">
          <h3 className="font-bold text-gray-900 mb-4">
            {date.toLocaleDateString('pt-BR', { day: 'numeric', month: 'long' })}
          </h3>

          <div className="space-y-3">
            {events.map((event, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="p-4 border-l-4" style={{ borderLeftColor: event.color.replace('bg-', '') }}>
                  <div className="flex gap-3">
                    <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center text-white", event.color)}>
                      <CalendarIcon className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-gray-900 mb-2">{event.title}</h4>
                      <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
                        <Clock className="w-4 h-4" />
                        <span>{event.time}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <MapPin className="w-4 h-4" />
                        <span>{event.location}</span>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Quick Add */}
          <Button className="w-full mt-4 bg-amber-600 hover:bg-amber-700">
            <Plus className="w-4 h-4 mr-2" />
            Adicionar Evento
          </Button>
        </div>
      </div>
    </PhoneFrame>
  );
}