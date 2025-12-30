import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { PhoneFrame } from '@/components/PhoneFrame';
import { StatusBar } from '@/components/StatusBar';
import { ArrowLeft, Mail, Search, Star, Archive, Trash2, Edit, Send } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

const emails = [
  { 
    from: 'Samsung Brasil',
    subject: 'Novos recursos do Galaxy IA',
    preview: 'Descubra como usar a inteligência artificial...',
    time: '10:30',
    unread: true,
    starred: true
  },
  {
    from: 'João Silva',
    subject: 'Reunião de amanhã',
    preview: 'Confirmo minha presença na reunião...',
    time: 'Ontem',
    unread: true,
    starred: false
  },
  {
    from: 'Newsletter Tech',
    subject: 'As melhores novidades da semana',
    preview: 'Confira os lançamentos mais esperados...',
    time: '2 dias',
    unread: false,
    starred: false
  },
];

export default function AppEmail() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');

  return (
    <PhoneFrame>
      <div className="h-full bg-white overflow-hidden flex flex-col">
        <StatusBar variant="light" />

        {/* Header */}
        <div className="bg-teal-600 text-white px-6 py-4">
          <div className="flex items-center gap-4 mb-4">
            <button onClick={() => navigate(createPageUrl('Home'))}>
              <ArrowLeft className="w-6 h-6" />
            </button>
            <h1 className="text-2xl font-bold flex-1">Email</h1>
            <Edit className="w-6 h-6" />
          </div>

          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              type="text"
              placeholder="Pesquisar emails"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 bg-white"
            />
          </div>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="all" className="flex-1 flex flex-col">
          <div className="bg-gray-50 px-4 pt-4">
            <TabsList className="w-full">
              <TabsTrigger value="all" className="flex-1">Todos</TabsTrigger>
              <TabsTrigger value="unread" className="flex-1">Não lidos</TabsTrigger>
              <TabsTrigger value="starred" className="flex-1">Destacados</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="all" className="flex-1 overflow-y-auto mt-0">
            {emails.map((email, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className={cn(
                  "p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer",
                  email.unread && "bg-blue-50"
                )}
              >
                <div className="flex gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-teal-400 to-cyan-500 flex items-center justify-center text-white font-bold">
                    {email.from[0]}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <span className={cn(
                        "font-semibold truncate",
                        email.unread ? "text-gray-900" : "text-gray-600"
                      )}>
                        {email.from}
                      </span>
                      <span className="text-xs text-gray-500 ml-2">{email.time}</span>
                    </div>
                    <p className={cn(
                      "text-sm mb-1 truncate",
                      email.unread ? "font-semibold text-gray-900" : "text-gray-700"
                    )}>
                      {email.subject}
                    </p>
                    <p className="text-sm text-gray-600 line-clamp-2">{email.preview}</p>
                  </div>
                  {email.starred && (
                    <Star className="w-5 h-5 text-yellow-500 fill-yellow-500 mt-1" />
                  )}
                </div>
              </motion.div>
            ))}
          </TabsContent>

          <TabsContent value="unread" className="flex-1 overflow-y-auto mt-0">
            {emails.filter(e => e.unread).map((email, index) => (
              <div key={index} className="p-4 border-b border-gray-100 bg-blue-50">
                <div className="flex gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-teal-400 to-cyan-500 flex items-center justify-center text-white font-bold">
                    {email.from[0]}
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900 mb-1">{email.from}</p>
                    <p className="text-sm font-semibold text-gray-900 mb-1">{email.subject}</p>
                    <p className="text-sm text-gray-600">{email.preview}</p>
                  </div>
                </div>
              </div>
            ))}
          </TabsContent>

          <TabsContent value="starred" className="flex-1 overflow-y-auto mt-0">
            {emails.filter(e => e.starred).map((email, index) => (
              <div key={index} className="p-4 border-b border-gray-100">
                <div className="flex gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-teal-400 to-cyan-500 flex items-center justify-center text-white font-bold">
                    {email.from[0]}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="font-semibold text-gray-900">{email.from}</p>
                      <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                    </div>
                    <p className="text-sm font-semibold text-gray-900 mb-1">{email.subject}</p>
                    <p className="text-sm text-gray-600">{email.preview}</p>
                  </div>
                </div>
              </div>
            ))}
          </TabsContent>
        </Tabs>

        {/* Compose FAB */}
        <button className="absolute bottom-6 right-6 w-14 h-14 bg-teal-600 hover:bg-teal-700 rounded-full shadow-lg flex items-center justify-center text-white">
          <Send className="w-6 h-6" />
        </button>
      </div>
    </PhoneFrame>
  );
}