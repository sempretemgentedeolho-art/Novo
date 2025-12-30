import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { PhoneFrame } from '@/components/PhoneFrame';
import { StatusBar } from '@/components/StatusBar';
import {
  ArrowLeft, Shield, Lock, Fingerprint, Eye, Smartphone,
  FolderLock, MapPin, AlertTriangle, CheckCircle2, Key
} from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { motion } from 'framer-motion';

export default function AppSecurity() {
  const navigate = useNavigate();
  const [biometrics, setBiometrics] = useState(true);
  const [faceUnlock, setFaceUnlock] = useState(false);
  const [findPhone, setFindPhone] = useState(true);
  const [autoLock, setAutoLock] = useState(true);

  const securityScore = 85;

  return (
    <PhoneFrame>
      <div className="h-full bg-gradient-to-br from-teal-50 via-cyan-50 to-blue-50 overflow-hidden flex flex-col">
        <StatusBar variant="light" />

        {/* Header */}
        <div className="bg-gradient-to-r from-teal-600 to-cyan-600 text-white px-6 py-4">
          <div className="flex items-center gap-4">
            <button onClick={() => navigate(createPageUrl('Home'))}>
              <ArrowLeft className="w-6 h-6" />
            </button>
            <div className="flex-1">
              <h1 className="text-2xl font-bold flex items-center gap-2">
                <Shield className="w-6 h-6" />
                Segurança
              </h1>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {/* Security Score */}
          <Card className="p-6 bg-gradient-to-br from-green-500 to-emerald-500 text-white">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-sm opacity-90">Nível de Segurança</p>
                <p className="text-4xl font-bold mt-1">{securityScore}%</p>
              </div>
              <CheckCircle2 className="w-16 h-16 opacity-80" />
            </div>
            <Progress value={securityScore} className="h-3 bg-white/20" />
            <p className="text-sm mt-3 opacity-90">Seu dispositivo está bem protegido</p>
          </Card>

          {/* Biometric Security */}
          <Card className="p-6">
            <h3 className="font-bold text-gray-900 mb-4">Autenticação Biométrica</h3>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center">
                    <Fingerprint className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Impressão Digital</p>
                    <p className="text-sm text-gray-600">2 digitais cadastradas</p>
                  </div>
                </div>
                <Switch checked={biometrics} onCheckedChange={setBiometrics} />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center">
                    <Eye className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Reconhecimento Facial</p>
                    <p className="text-sm text-gray-600">
                      {faceUnlock ? 'Configurado' : 'Não configurado'}
                    </p>
                  </div>
                </div>
                <Switch checked={faceUnlock} onCheckedChange={setFaceUnlock} />
              </div>
            </div>
          </Card>

          {/* Screen Lock */}
          <Card className="p-6">
            <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Lock className="w-5 h-5 text-gray-700" />
              Bloqueio de Tela
            </h3>

            <div className="space-y-3">
              <button className="w-full p-4 bg-blue-50 border-2 border-blue-500 rounded-xl text-left">
                <div className="font-semibold text-gray-900">Padrão</div>
                <div className="text-sm text-gray-600">Atual</div>
              </button>
              <button className="w-full p-4 bg-gray-50 border-2 border-gray-200 rounded-xl text-left">
                <div className="font-semibold text-gray-900">PIN</div>
              </button>
              <button className="w-full p-4 bg-gray-50 border-2 border-gray-200 rounded-xl text-left">
                <div className="font-semibold text-gray-900">Senha</div>
              </button>
            </div>

            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900">Bloqueio Automático</p>
                  <p className="text-sm text-gray-600">Após 30 segundos</p>
                </div>
                <Switch checked={autoLock} onCheckedChange={setAutoLock} />
              </div>
            </div>
          </Card>

          {/* Samsung Knox */}
          <Card className="p-6 bg-gradient-to-br from-red-500 to-pink-500 text-white">
            <div className="flex items-center gap-4">
              <Shield className="w-12 h-12" />
              <div>
                <h3 className="font-bold text-lg">Samsung Knox</h3>
                <p className="text-sm opacity-90">Proteção em camadas ativa</p>
              </div>
            </div>
          </Card>

          {/* Secure Folder */}
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-yellow-100 flex items-center justify-center">
                  <FolderLock className="w-6 h-6 text-yellow-600" />
                </div>
                <div>
                  <p className="font-bold text-gray-900">Pasta Segura</p>
                  <p className="text-sm text-gray-600">Arquivos e apps privados</p>
                </div>
              </div>
              <Button size="sm">Abrir</Button>
            </div>
          </Card>

          {/* Find My Phone */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <p className="font-bold text-gray-900">Buscar Meu Telefone</p>
                  <p className="text-sm text-gray-600">Localizar dispositivo perdido</p>
                </div>
              </div>
              <Switch checked={findPhone} onCheckedChange={setFindPhone} />
            </div>
          </Card>

          {/* Security Tips */}
          <div className="bg-blue-100 border-l-4 border-blue-500 p-4 rounded-r-xl">
            <div className="flex items-start gap-3">
              <Key className="w-5 h-5 text-blue-600 mt-0.5" />
              <div>
                <h3 className="font-semibold text-blue-900 mb-1">💡 Dica de Segurança</h3>
                <p className="text-sm text-blue-700">
                  Use autenticação de dois fatores e senhas únicas para cada serviço.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PhoneFrame>
  );
}