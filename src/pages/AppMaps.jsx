import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { PhoneFrame } from '@/components/PhoneFrame';
import { StatusBar } from '@/components/StatusBar';
import { cn } from '@/components/ui/utils';
import { 
  ArrowLeft, MapPin, Navigation, Search, Clock, 
  Home, Briefcase, TrendingUp
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

const savedPlaces = [
  { name: 'Casa', address: 'Rua das Flores, 123', icon: Home, color: 'text-blue-500' },
  { name: 'Trabalho', address: 'Av. Paulista, 1000', icon: Briefcase, color: 'text-purple-500' },
];

const recentSearches = [
  'Shopping Center Norte',
  'Restaurante Japonês',
  'Farmácia 24h',
  'Academia Smart Fit'
];

export default function AppMaps() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');

  return (
    <PhoneFrame>
      <div className="h-full bg-white overflow-hidden flex flex-col">
        <StatusBar variant="light" />

        {/* Header */}
        <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-4">
          <div className="flex items-center gap-4 mb-4">
            <button onClick={() => navigate(createPageUrl('Home'))}>
              <ArrowLeft className="w-6 h-6" />
            </button>
            <h1 className="text-2xl font-bold flex-1">Maps</h1>
          </div>

          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              type="text"
              placeholder="Buscar local ou endereço"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 bg-white"
            />
          </div>
        </div>

        {/* Map Placeholder */}
        <div className="h-64 bg-gray-200 relative">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <MapPin className="w-16 h-16 text-gray-400 mx-auto mb-2" />
              <p className="text-gray-500">Visualização do mapa</p>
            </div>
          </div>
          
          {/* Current Location Button */}
          <button className="absolute bottom-4 right-4 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center">
            <Navigation className="w-6 h-6 text-green-600" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {/* Saved Places */}
          <div>
            <h3 className="font-bold text-gray-900 mb-3">Locais Salvos</h3>
            <div className="space-y-2">
              {savedPlaces.map((place, index) => {
                const Icon = place.icon;
                return (
                  <Card key={index} className="p-4">
                    <div className="flex items-center gap-3">
                      <Icon className={cn("w-5 h-5", place.color)} />
                      <div className="flex-1">
                        <p className="font-semibold text-gray-900">{place.name}</p>
                        <p className="text-sm text-gray-600">{place.address}</p>
                      </div>
                      <Button size="sm" variant="outline">
                        Ir
                      </Button>
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Recent Searches */}
          <div>
            <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
              <Clock className="w-5 h-5" />
              Buscas Recentes
            </h3>
            <div className="space-y-2">
              {recentSearches.map((item, index) => (
                <button
                  key={index}
                  className="w-full p-3 bg-gray-50 hover:bg-gray-100 rounded-xl flex items-center gap-3 transition-colors text-left"
                >
                  <Search className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-700">{item}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Explore */}
          <div>
            <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              Explorar Próximo
            </h3>
            <div className="grid grid-cols-3 gap-3">
              {['🍔 Restaurantes', '☕ Cafés', '🏪 Lojas', '⛽ Postos', '🏥 Farmácias', '🏋️ Academias'].map((category, index) => (
                <button
                  key={index}
                  className="p-3 bg-white rounded-xl shadow-sm hover:shadow-md transition-all text-center text-sm font-medium"
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </PhoneFrame>
  );
}