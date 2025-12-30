import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { PhoneFrame } from '@/components/PhoneFrame';
import { StatusBar } from '@/components/StatusBar';
import { ArrowLeft, Plus, Search, Sparkles } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

const noteColors = [
  { name: 'Amarelo', bg: 'bg-yellow-100', border: 'border-yellow-300' },
  { name: 'Rosa', bg: 'bg-pink-100', border: 'border-pink-300' },
  { name: 'Azul', bg: 'bg-blue-100', border: 'border-blue-300' },
  { name: 'Verde', bg: 'bg-green-100', border: 'border-green-300' },
  { name: 'Roxo', bg: 'bg-purple-100', border: 'border-purple-300' },
];

export default function AppNotes() {
  const navigate = useNavigate();
  const [notes, setNotes] = useState([
    { id: 1, title: 'Lista de Compras', content: 'Leite, Pão, Frutas...', color: 0, date: '2h atrás' },
    { id: 2, title: 'Ideias Projeto', content: 'Adicionar dashboard...', color: 2, date: '1 dia' },
    { id: 3, title: 'Lembrete', content: 'Reunião às 15h', color: 1, date: '3 dias' },
  ]);
  const [showDialog, setShowDialog] = useState(false);
  const [newNote, setNewNote] = useState({ title: '', content: '', color: 0 });
  const [search, setSearch] = useState('');

  const handleSaveNote = () => {
    if (newNote.title || newNote.content) {
      setNotes([
        { ...newNote, id: Date.now(), date: 'Agora' },
        ...notes
      ]);
      setNewNote({ title: '', content: '', color: 0 });
      setShowDialog(false);
    }
  };

  const filteredNotes = notes.filter(note =>
    note.title.toLowerCase().includes(search.toLowerCase()) ||
    note.content.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <PhoneFrame>
      <div className="h-full bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50 overflow-hidden flex flex-col">
        <StatusBar variant="light" />

        {/* Header */}
        <div className="bg-gradient-to-r from-yellow-500 to-amber-500 text-white px-6 py-4">
          <div className="flex items-center gap-4 mb-4">
            <button onClick={() => navigate(createPageUrl('Home'))}>
              <ArrowLeft className="w-6 h-6" />
            </button>
            <h1 className="text-2xl font-bold flex-1">Notas</h1>
            <button onClick={() => setShowDialog(true)}>
              <Plus className="w-6 h-6" />
            </button>
          </div>

          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              type="text"
              placeholder="Buscar notas"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 bg-white/90"
            />
          </div>
        </div>

        {/* Notes Grid */}
        <div className="flex-1 overflow-y-auto p-4">
          <div className="grid grid-cols-2 gap-3">
            {filteredNotes.map((note, index) => {
              const colorScheme = noteColors[note.color];
              return (
                <motion.div
                  key={note.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={cn(
                    "p-4 rounded-2xl border-2 min-h-[150px] cursor-pointer hover:shadow-lg transition-all",
                    colorScheme.bg,
                    colorScheme.border
                  )}
                >
                  <h3 className="font-bold text-gray-900 mb-2 line-clamp-2">{note.title || 'Sem título'}</h3>
                  <p className="text-sm text-gray-700 line-clamp-3 mb-3">{note.content}</p>
                  <p className="text-xs text-gray-600">{note.date}</p>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* New Note Dialog */}
        <Dialog open={showDialog} onOpenChange={setShowDialog}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-yellow-500" />
                Nova Nota
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <Input
                placeholder="Título"
                value={newNote.title}
                onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
              />
              <Textarea
                placeholder="Conteúdo da nota..."
                value={newNote.content}
                onChange={(e) => setNewNote({ ...newNote, content: e.target.value })}
                rows={6}
              />
              <div>
                <label className="text-sm font-medium mb-2 block">Cor</label>
                <div className="flex gap-2">
                  {noteColors.map((color, index) => (
                    <button
                      key={index}
                      onClick={() => setNewNote({ ...newNote, color: index })}
                      className={cn(
                        "w-10 h-10 rounded-full border-2 transition-all",
                        color.bg,
                        newNote.color === index ? 'border-gray-900 scale-110' : 'border-gray-300'
                      )}
                    />
                  ))}
                </div>
              </div>
              <div className="flex gap-2">
                <Button onClick={() => setShowDialog(false)} variant="outline" className="flex-1">
                  Cancelar
                </Button>
                <Button onClick={handleSaveNote} className="flex-1 bg-yellow-500 hover:bg-yellow-600">
                  Salvar
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </PhoneFrame>
  );
}