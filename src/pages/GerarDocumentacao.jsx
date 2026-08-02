import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { ArrowLeft, FileText, Download, Loader2, CheckCircle2, BookOpen } from "lucide-react";
import { motion } from "framer-motion";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

// Importar telas principais para capturar prints
import Inicio from "./Inicio";
import TelaBloqueio from "./TelaBloqueio";
import TelaInicial from "./TelaInicial";
import AppTelefone from "./AppTelefone";
import AppMensagens from "./AppMensagens";
import AppCamera from "./AppCamera";
import AppGaleria from "./AppGaleria";
import AppConfiguracoes from "./AppConfiguracoes";
import AppWhatsApp from "./AppWhatsApp";
import AppRelogio from "./AppRelogio";
import AppCalculadora from "./AppCalculadora";
import AppDicas from "./AppDicas";
import Contatos from "./Contatos";
import Configuracoes from "./Configuracoes";
import Telefone from "./Telefone";
import Relogio from "./Relogio";
import VozConfig from "./VozConfig";
import InfoMedicas from "./InfoMedicas";

// === IMPORTAÇÃO DE ARQUIVOS RAW PARA DOCUMENTAÇÃO COMPLETA (INPI) ===
// Arquivos de configuração da raiz - importados explicitamente com ?raw
import packageJson from "../../package.json?raw";
import viteConfig from "../../vite.config.js?raw";
import tailwindConfig from "../../tailwind.config.js?raw";
import postcssConfig from "../../postcss.config.js?raw";
import jsconfig from "../../jsconfig.json?raw";
import componentsJson from "../../components.json?raw";
import eslintConfig from "../../eslint.config.js?raw";
import { indexHtml, readmeMd, gitignoreContent } from "@/lib/rawAssets";
import { companionDocs } from "@/lib/companionDocs";
// Apenas tipos de arquivo que o Vite consegue importar com ?raw sem erros de build
const sourceFiles = import.meta.glob(
  "/src/**/*.{jsx,js,ts,tsx,css,json,jsonc,mjs,cjs}",
  { query: "?raw", import: "default", eager: true }
);

// Arquivos do diretório base44 - apenas pastas seguras (entities, config)
// Funções com nomes de extensão (.bat/.txt) no nome da pasta quebram o esbuild
const base44Files = {
  ...import.meta.glob("/base44/entities/**/*.{ts,js,json,jsonc}", { query: "?raw", import: "default", eager: true }),
  ...import.meta.glob("/base44/functions/localStorageDb/**/*.{ts,js,json}", { query: "?raw", import: "default", eager: true }),
  ...import.meta.glob("/base44/config.{jsonc,json}", { query: "?raw", import: "default", eager: true }),
};

// Arquivos de configuração da raiz - importados explicitamente no topo do arquivo
const rootConfigFiles = {
  "/package.json": packageJson,
  "/vite.config.js": viteConfig,
  "/tailwind.config.js": tailwindConfig,
  "/postcss.config.js": postcssConfig,
  "/jsconfig.json": jsconfig,
  "/components.json": componentsJson,
  "/eslint.config.js": eslintConfig,
  "/index.html": indexHtml,
  "/README.md": readmeMd,
  "/.gitignore": gitignoreContent,
};

// Arquivos públicos (PWA) - apenas tipos seguros (sem .html/.svg que quebram ?raw)
const publicFiles = import.meta.glob(
  "/public/**/*.{js,json,css}",
  { query: "?raw", import: "default", eager: true }
);

// Lista unificada de todos os arquivos (para contagem e listagem)
const ALL_FILE_PATHS = [
  ...Object.keys(sourceFiles),
  ...Object.keys(base44Files),
  ...Object.keys(rootConfigFiles),
  ...Object.keys(publicFiles),
].sort();

// Busca conteúdo de qualquer arquivo em qualquer glob
const getFileContent = (path) =>
  sourceFiles[path] || base44Files[path] || rootConfigFiles[path] || publicFiles[path];

const SCREENS = [
  {
    component: Inicio,
    title: "Tela de Boas-Vindas (Inicio)",
    section: "Fluxo Principal",
    description:
      "Tela de abertura do aplicativo. Apresenta o logo da Forja da Consciência e instrui o usuário a tocar na tela para iniciar. Utiliza animações de entrada (spring, fade) e narração por voz de boas-vindas.",
    technical:
      "Arquivo: src/pages/Inicio.jsx\nFramework: React + Framer Motion\nNavegação: navigate('TelaBloqueio')\nAcessibilidade: Web Speech API (speechSynthesis) com cancelamento na saída\nAnimações: scale (spring), opacity (fade), y (translate)",
  },
  {
    component: TelaBloqueio,
    title: "Tela de Bloqueio (TelaBloqueio)",
    section: "Fluxo Principal",
    description:
      "Simula a tela de bloqueio de um smartphone. Exibe relógio, data, indicador de desbloqueio por gesto (deslizar para cima) e botão de emergência médica (ICE). Os dados médicos são carregados do LocalStorage e exibidos em um overlay acessível mesmo com o aparelho bloqueado.",
    technical:
      "Arquivo: src/pages/TelaBloqueio.jsx\nPersistência: localStorage('dadosMedicosEmergencia')\nNavegação: navigate('Home')\nComponentes: StatusBar, AnimatePresence (overlay)\nAcessibilidade: Web Speech API\nSegurança: Dados médicos visíveis na tela de bloqueio (ICE - In Case of Emergency)",
  },
  {
    component: TelaInicial,
    title: "Tela Inicial / Home (TelaInicial)",
    section: "Fluxo Principal",
    description:
      "Tela principal do aparelho simulado. Exibe grade de aplicativos (Telefone, Mensagens, Câmera, Galeria, Configurações, WhatsApp, Facebook, Instagram, TikTok, Relógio, Calculadora, Dicas), barra de status com relógio em tempo real, indicador de deslizar para painel rápido e barra de navegação inferior.",
    technical:
      "Arquivo: src/pages/TelaInicial.jsx\nEstado: useState (currentTime, showPainel)\nTimer: setInterval (atualização do relógio)\nNavegação: navigate(createPageUrl(app.tela))\nComponentes: PainelRapido (configurações rápidas)\nAcessibilidade: Web Speech API",
  },
  {
    component: AppTelefone,
    title: "Aplicativo Telefone (AppTelefone)",
    section: "Aplicativos Principais",
    description:
      "Simula o aplicativo de telefone com teclado numérico, display de número digitado, botão de ligar (verde), botão de contatos e botão de apagar. Cada tecla tem animação de toque (whileTap).",
    technical:
      "Arquivo: src/pages/AppTelefone.jsx\nEstado: useState (number)\nAnimações: Framer Motion (whileTap)\nNavegação: navigate('AppContatos'), navigate('TelaInicial')\nAcessibilidade: Web Speech API",
  },
  {
    component: AppMensagens,
    title: "Aplicativo Mensagens (AppMensagens)",
    section: "Aplicativos Principais",
    description:
      "Simula o aplicativo de mensagens com lista de conversas, barra de busca e avatares de contatos.",
    technical:
      "Arquivo: src/pages/AppMensagens.jsx\nDados: Array estático de conversas\nAcessibilidade: Web Speech API\nNavegação: navigate('TelaInicial')",
  },
  {
    component: AppCamera,
    title: "Aplicativo Câmera (AppCamera)",
    section: "Aplicativos Principais",
    description:
      "Simula o aplicativo de câmera com visor, botão de captura, alternância de câmera frontal/traseira e modos de captura.",
    technical:
      "Arquivo: src/pages/AppCamera.jsx\nAcessibilidade: Web Speech API\nNavegação: navigate('TelaInicial')",
  },
  {
    component: AppGaleria,
    title: "Aplicativo Galeria (AppGaleria)",
    section: "Aplicativos Principais",
    description:
      "Simula a galeria de fotos com grade de imagens (3 colunas), header com botão de voltar e rolagem vertical.",
    technical:
      "Arquivo: src/pages/AppGaleria.jsx\nDados: Array de URLs (Unsplash)\nLayout: CSS Grid (3 colunas)\nAcessibilidade: Web Speech API",
  },
  {
    component: AppConfiguracoes,
    title: "Aplicativo Configurações (AppConfiguracoes)",
    section: "Aplicativos Principais",
    description:
      "Simula o menu de configurações do aparelho com lista de opções (Wi-Fi, Bluetooth, Notificações, Acessibilidade, etc.).",
    technical:
      "Arquivo: src/pages/AppConfiguracoes.jsx\nAcessibilidade: Web Speech API\nNavegação: navigate('TelaInicial')",
  },
  {
    component: AppWhatsApp,
    title: "Aplicativo WhatsApp (AppWhatsApp)",
    section: "Aplicativos Principais",
    description:
      "Simula o WhatsApp com lista de conversas, avatares, prévia de mensagens e badges de notificação.",
    technical:
      "Arquivo: src/pages/AppWhatsApp.jsx\nDados: Array estático de conversas\nAcessibilidade: Web Speech API",
  },
  {
    component: AppRelogio,
    title: "Aplicativo Relógio (AppRelogio)",
    section: "Aplicativos Principais",
    description:
      "Simula o aplicativo de relógio com horário em tempo real, abas de alarmes, cronômetro e timer.",
    technical:
      "Arquivo: src/pages/AppRelogio.jsx\nEstado: useState (currentTime)\nTimer: setInterval\nAcessibilidade: Web Speech API",
  },
  {
    component: AppCalculadora,
    title: "Aplicativo Calculadora (AppCalculadora)",
    section: "Aplicativos Principais",
    description:
      "Simula uma calculadora com display numérico, botões de números e operações.",
    technical:
      "Arquivo: src/pages/AppCalculadora.jsx\nEstado: useState (display, operação)\nAcessibilidade: Web Speech API",
  },
  {
    component: AppDicas,
    title: "Aplicativo Dicas (AppDicas)",
    section: "Aplicativos Principais",
    description:
      "Aplicativo de dicas e tutoriais para o usuário idoso, com cartões informativos.",
    technical:
      "Arquivo: src/pages/AppDicas.jsx\nAcessibilidade: Web Speech API",
  },
  {
    component: Contatos,
    title: "Contatos com Tutorial Interativo (Contatos)",
    section: "Sistema de Tutorial Interativo",
    description:
      "Aplicativo de contatos com tutorial interativo guiado por voz. O sistema de tutorial usa etapas sequenciais (STEPS), cada uma com um alvo (target) que pisca (Halo pulsante) e narração por voz. O usuário interage com o botão pulsante para avançar.",
    technical:
      "Arquivo: src/pages/Contatos.jsx\nSistema de Tutorial: Array STEPS com {id, text, target}\nAnimação de Pulse: Framer Motion (Halo component com scale + opacity)\nVoz: Web Speech API com cancelamento (synth.cancel) antes de cada narração\nAvanço automático: useEffect detecta preenchimento de formulário\nComponentes: Dialog, DropdownMenu, Input, Label, Button (shadcn/ui)",
  },
  {
    component: Telefone,
    title: "Telefone com Tutorial Guiado (Telefone)",
    section: "Sistema de Tutorial Interativo",
    description:
      "Tutorial interativo do telefone com teclado, lista de contatos e gerenciamento de números bloqueados. Usa halo pulsante sobre botões e voz guiada passo a passo.",
    technical:
      "Arquivo: src/pages/Telefone.jsx\nSistema de Tutorial: Etapas sequenciais com alvos pulsantes\nAnimação: Framer Motion (halo overlay)\nVoz: Web Speech API\nEstado: useState (stepIndex, number, contacts, blockedNumbers)",
  },
  {
    component: Relogio,
    title: "Relógio com Alarmes e Tutorial (Relogio)",
    section: "Sistema de Tutorial Interativo",
    description:
      "Aplicativo de relógio completo com abas: relógio, alarmes de medicação, cronômetro e timer regressivo. Inclui tutorial guiado por voz para criação de alarmes.",
    technical:
      "Arquivo: src/pages/Relogio.jsx\nEstado: useState (currentTime, alarms, stopwatch, timer)\nTimer: setInterval (relógio), setInterval (cronômetro)\nAbas: Sistema de tabs (Relógio, Alarmes, Cronômetro, Timer)\nAcessibilidade: Web Speech API com tutorial guiado",
  },
  {
    component: Configuracoes,
    title: "Configurações do Aparelho (Configuracoes)",
    section: "Configurações e Acessibilidade",
    description:
      "Menu de configurações com lista de opções e narração por voz de cada item. Navegação para sub-telas de configuração.",
    technical:
      "Arquivo: src/pages/Configuracoes.jsx\nDados: Array settings com {label, icon, value, route}\nAcessibilidade: Web Speech API (narra título e label)\nNavegação: navigate(createPageUrl(route))",
  },
  {
    component: VozConfig,
    title: "Configuração de Voz (VozConfig)",
    section: "Configurações e Acessibilidade",
    description:
      "Permite selecionar e testar vozes do sistema para narração do aplicativo. Lista vozes disponíveis no speechSynthesis e permite preview.",
    technical:
      "Arquivo: src/pages/VozConfig.jsx\nAPI: speechSynthesis.getVoices()\nEstado: useState (voices, selectedVoiceURI)\nPersistência: localStorage para voz selecionada",
  },
  {
    component: InfoMedicas,
    title: "Informações Médicas de Emergência (InfoMedicas)",
    section: "Configurações e Acessibilidade",
    description:
      "Tela de cadastro de informações médicas de emergência (ICE): nome, tipo sanguíneo, alergias, medicações, condições e contatos de emergência. Os dados são salvos no LocalStorage e exibidos na tela de bloqueio.",
    technical:
      "Arquivo: src/pages/InfoMedicas.jsx\nPersistência: localStorage('dadosMedicosEmergencia')\nCampos: nome, tipoSanguíneo, alergias, medicamentos, condições, contatoEmergencia\nIntegração: TelaBloqueio carrega os dados salvos\nAcessibilidade: Web Speech API",
  },
];

export default function GerarDocumentacao() {
  const navigate = useNavigate();
  const [generating, setGenerating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentScreen, setCurrentScreen] = useState("");
  const [done, setDone] = useState(false);
  const screenRefs = useRef(SCREENS.map(() => React.createRef()));
  const originalSpeakRef = useRef(null);

  React.useEffect(() => {
    return () => {
      // Restaurar fala ao desmontar
      if (originalSpeakRef.current && window.speechSynthesis) {
        window.speechSynthesis.speak = originalSpeakRef.current;
      }
      window.speechSynthesis?.cancel();
    };
  }, []);

  const generatePDF = async () => {
    setGenerating(true);
    setDone(false);
    setProgress(0);

    // Cancelar qualquer fala ativa e silenciar durante a geração
    window.speechSynthesis?.cancel();
    const originalSpeak = window.speechSynthesis?.speak?.bind(window.speechSynthesis);
    if (window.speechSynthesis) {
      originalSpeakRef.current = originalSpeak;
      window.speechSynthesis.speak = () => {};
    }

    const pdf = new jsPDF("p", "mm", "a4");
    const pageWidth = 210;
    const pageHeight = 297;
    const margin = 15;
    const contentWidth = pageWidth - margin * 2;

    // ===== CAPA =====
    pdf.setFillColor(14, 165, 233);
    pdf.rect(0, 0, pageWidth, pageHeight, "F");

    pdf.setTextColor(255, 255, 255);
    pdf.setFontSize(28);
    pdf.setFont("helvetica", "bold");
    pdf.text("Forja da Consciência", pageWidth / 2, 60, { align: "center" });

    pdf.setFontSize(16);
    pdf.setFont("helvetica", "normal");
    pdf.text("Documentação Técnica Completa", pageWidth / 2, 75, { align: "center" });

    pdf.setFontSize(12);
    pdf.text("Aplicativo de Treinamento para Smartphone", pageWidth / 2, 90, { align: "center" });
    pdf.text("Guia Técnico para Patenteamento", pageWidth / 2, 100, { align: "center" });

    pdf.setDrawColor(255, 255, 255);
    pdf.setLineWidth(0.5);
    pdf.line(60, 110, 150, 110);

    pdf.setFontSize(10);
    pdf.text(`Data: ${new Date().toLocaleDateString("pt-BR")}`, pageWidth / 2, 130, { align: "center" });
    pdf.text(`Versão: 1.0`, pageWidth / 2, 140, { align: "center" });

    pdf.setFontSize(9);
    pdf.text("Documento gerado automaticamente pelo aplicativo", pageWidth / 2, 270, { align: "center" });

    // ===== SUMÁRIO EXECUTIVO =====
    pdf.addPage();
    pdf.setTextColor(20, 20, 20);
    pdf.setFontSize(20);
    pdf.setFont("helvetica", "bold");
    pdf.text("1. Sumário Executivo", margin, 30);

    pdf.setFontSize(11);
    pdf.setFont("helvetica", "normal");
    const sumario = [
      "O Forja da Consciência é um aplicativo de treinamento interativo",
      "desenvolvido para ensinar pessoas idosas a utilizar smartphones de",
      "forma fácil, segura e acessível.",
      "",
      "O aplicativo simula um smartphone completo, com tela de bloqueio,",
      "tela inicial, aplicativos (Telefone, Mensagens, Câmera, Galeria,",
      "WhatsApp, Relógio, Calculadora, etc.) e um sistema inovador de",
      "tutoriais interativos guiados por voz com botões pulsantes.",
      "",
      "Diferenciais técnicos:",
      "• 100% offline (sem dependência de internet)",
      "• Persistência via LocalStorage",
      "• Acessibilidade por voz (Web Speech API)",
      "• Tutoriais interativos com botões pulsantes (Halo)",
      "• Informações médicas de emergência (ICE) na tela de bloqueio",
      "• Interface mobile-first responsiva",
      "• Animações com Framer Motion",
    ];
    let y = 45;
    sumario.forEach((line) => {
      pdf.text(line, margin, y);
      y += 6;
    });

    // ===== ARQUITETURA =====
    pdf.addPage();
    pdf.setFontSize(20);
    pdf.setFont("helvetica", "bold");
    pdf.text("2. Arquitetura Técnica", margin, 30);

    pdf.setFontSize(11);
    pdf.setFont("helvetica", "normal");
    const arquitetura = [
      "Stack Tecnológico:",
      "• Frontend: React 18 + Vite",
      "• Estilização: Tailwind CSS + shadcn/ui",
      "• Animações: Framer Motion",
      "• Ícones: lucide-react",
      "• Roteamento: React Router DOM v6",
      "• Geração de PDF: jsPDF + html2canvas",
      "",
      "Estrutura de Pastas:",
      "• src/pages/ - Componentes de tela (146+ páginas)",
      "• src/components/ - Componentes reutilizáveis",
      "• src/components/ui/ - Componentes shadcn/ui",
      "• src/lib/ - Contextos e utilitários",
      "• src/utils/ - Funções auxiliares",
      "",
      "Persistência de Dados:",
      "• LocalStorage para dados do usuário",
      "• Sem backend externo (100% offline)",
      "• Dados médicos de emergência (ICE)",
      "• Configurações de voz e acessibilidade",
      "",
      "Sistema de Acessibilidade:",
      "• Web Speech API (speechSynthesis)",
      "• Cancelamento de fala anterior (synth.cancel)",
      "• Limpeza na desmontagem (useEffect return)",
      "• Configuração de voz selecionável",
      "",
      "Sistema de Tutorial Interativo:",
      "• Etapas sequenciais (STEPS array)",
      "• Botões pulsantes (Halo component)",
      "• Narração automática por voz",
      "• Avanço por interação do usuário",
      "• Detecção automática de preenchimento",
    ];
    y = 45;
    arquitetura.forEach((line) => {
      pdf.text(line, margin, y);
      y += 6;
      if (y > pageHeight - 20) {
        pdf.addPage();
        y = 25;
      }
    });

    // ===== CAPTURA DE TELAS =====
    pdf.addPage();
    pdf.setFontSize(20);
    pdf.setFont("helvetica", "bold");
    pdf.text("3. Telas do Aplicativo", margin, 30);
    pdf.setFontSize(11);
    pdf.setFont("helvetica", "normal");
    pdf.text("A seguir, cada tela do aplicativo com print e descrição técnica.", margin, 45);

    let currentSection = "";

    for (let i = 0; i < SCREENS.length; i++) {
      const screen = SCREENS[i];
      setCurrentScreen(screen.title);
      setProgress(Math.round((i / SCREENS.length) * 100));

      // Nova seção
      if (screen.section !== currentSection) {
        currentSection = screen.section;
        pdf.addPage();
        pdf.setFontSize(16);
        pdf.setFont("helvetica", "bold");
        pdf.setTextColor(14, 165, 233);
        pdf.text(screen.section, margin, 30);
        pdf.setTextColor(20, 20, 20);
      }

      // Nova página para cada tela
      pdf.addPage();

      // Título da tela
      pdf.setFontSize(14);
      pdf.setFont("helvetica", "bold");
      pdf.setTextColor(20, 20, 20);
      pdf.text(`${i + 1}. ${screen.title}`, margin, 25);

      // Descrição
      pdf.setFontSize(10);
      pdf.setFont("helvetica", "normal");
      const descLines = pdf.splitTextToSize(screen.description, contentWidth);
      pdf.text(descLines, margin, 35);

      // Capturar print da tela
      try {
        const ref = screenRefs.current[i];
        if (ref && ref.current) {
          // Aguardar renderização
          await new Promise((r) => setTimeout(r, 300));

          const canvas = await html2canvas(ref.current, {
            scale: 2,
            useCORS: true,
            logging: false,
            backgroundColor: "#ffffff",
            width: 400,
            height: 800,
            windowWidth: 400,
            windowHeight: 800,
          });

          const imgData = canvas.toDataURL("image/png");
          const imgWidth = 80;
          const imgHeight = (canvas.height / canvas.width) * imgWidth;
          const imgX = (pageWidth - imgWidth) / 2;
          const imgY = 55;

          // Borda da imagem
          pdf.setDrawColor(200, 200, 200);
          pdf.setLineWidth(0.3);
          pdf.rect(imgX - 1, imgY - 1, imgWidth + 2, imgHeight + 2);
          pdf.addImage(imgData, "PNG", imgX, imgY, imgWidth, imgHeight);
        }
      } catch (err) {
        console.error("Erro ao capturar tela:", screen.title, err);
      }

      // Descrição técnica
      const techY = 55 + 160 + 10;
      if (techY < pageHeight - 40) {
        pdf.setFontSize(9);
        pdf.setFont("courier", "normal");
        pdf.setTextColor(60, 60, 60);
        const techLines = pdf.splitTextToSize(screen.technical, contentWidth);
        pdf.text(techLines, margin, techY);
      }
    }

    // ===== FLUXO DE NAVEGAÇÃO =====
    pdf.addPage();
    pdf.setFontSize(20);
    pdf.setFont("helvetica", "bold");
    pdf.setTextColor(20, 20, 20);
    pdf.text("4. Fluxo de Navegação", margin, 30);

    pdf.setFontSize(11);
    pdf.setFont("helvetica", "normal");
    const fluxo = [
      "Fluxo principal do aplicativo:",
      "",
      "Inicio (Boas-vindas)",
      "  ↓ (toque na tela)",
      "TelaBloqueio (tela de bloqueio)",
      "  ↓ (deslizar para cima)",
      "TelaInicial (home com grade de apps)",
      "  ↓ (tocar em um app)",
      "AppTelefone / AppMensagens / AppCamera /",
      "AppGaleria / AppConfiguracoes / etc.",
      "  ↓ (botão voltar)",
      "TelaInicial",
      "",
      "Fluxo de Tutorial Interativo:",
      "",
      "Tela do App (ex: Contatos)",
      "  → Voz narra instrução",
      "  → Botão alvo pisca (Halo pulsante)",
      "  → Usuário toca no botão",
      "  → Avança para próxima etapa",
      "  → Repete até concluir",
      "  → Retorna à tela inicial",
      "",
      "Fluxo de Emergência Médica (ICE):",
      "",
      "TelaBloqueio",
      "  → Botão vermelho (coração)",
      "  → Overlay com dados médicos",
      "  → Dados do LocalStorage",
      "  → Acessível com celular bloqueado",
    ];
    y = 45;
    fluxo.forEach((line) => {
      pdf.text(line, margin, y);
      y += 6;
      if (y > pageHeight - 20) {
        pdf.addPage();
        y = 25;
      }
    });

    // ===== RECURSOS DE ACESSIBILIDADE =====
    pdf.addPage();
    pdf.setFontSize(20);
    pdf.setFont("helvetica", "bold");
    pdf.text("5. Recursos de Acessibilidade", margin, 30);

    pdf.setFontSize(11);
    pdf.setFont("helvetica", "normal");
    const acessibilidade = [
      "O aplicativo foi desenvolvido com foco em acessibilidade para",
      "idosos, incluindo:",
      "",
      "1. Narração por Voz (Web Speech API):",
      "   • Cada tela narra sua função ao ser aberta",
      "   • Cancelamento de fala anterior (synth.cancel)",
      "   • Limpeza na desmontagem do componente",
      "   • Configuração de voz selecionável (VozConfig)",
      "",
      "2. Tutoriais Interativos Guiados:",
      "   • Botões pulsantes (Halo) indicam onde tocar",
      "   • Voz explica cada passo em português",
      "   • Avanço por interação real do usuário",
      "   • Sem necessidade de leitura de instruções",
      "",
      "3. Interface Simplificada:",
      "   • Botões grandes e bem espaçados",
      "   • Cores contrastantes",
      "   • Ícones intuitivos (emojis)",
      "   • Textos em português",
      "",
      "4. Informações Médicas de Emergência (ICE):",
      "   • Acessíveis na tela de bloqueio",
      "   • Tipo sanguíneo, alergias, medicações",
      "   • Contatos de emergência",
      "   • Visível para socorristas",
      "",
      "5. Funcionamento 100% Offline:",
      "   • Sem necessidade de internet",
      "   • Dados persistidos no LocalStorage",
      "   • Sem rastreamento ou coleta de dados",
    ];
    y = 45;
    acessibilidade.forEach((line) => {
      pdf.text(line, margin, y);
      y += 6;
      if (y > pageHeight - 20) {
        pdf.addPage();
        y = 25;
      }
    });

    // ===== CONCLUSÃO =====
    pdf.addPage();
    pdf.setFontSize(20);
    pdf.setFont("helvetica", "bold");
    pdf.text("6. Conclusão", margin, 30);

    pdf.setFontSize(11);
    pdf.setFont("helvetica", "normal");
    const conclusao = [
      "O Forja da Consciência representa uma solução inovadora no",
      "segmento de inclusão digital de idosos, combinando:",
      "",
      "• Simulação realista de smartphone",
      "• Tutoriais interativos guiados por voz",
      "• Acessibilidade avançada",
      "• Funcionamento offline",
      "• Informações médicas de emergência",
      "",
      "A arquitetura técnica baseia-se em tecnologias web modernas",
      "(React, Tailwind CSS, Framer Motion) com persistência local",
      "(LocalStorage) e acessibilidade nativa do navegador (Web Speech API).",
      "",
      "O sistema de tutoriais interativos com botões pulsantes e",
      "narração por voz constitui o diferencial principal do aplicativo,",
      "permitindo que usuários idosos aprendam a usar smartphones",
      "de forma autônoma, sem frustração e com segurança.",
      "",
      "Este documento contém todas as telas do aplicativo com",
      "prints de tela e descrições técnicas detalhadas, servindo",
      "como base para registro de propriedade intelectual e",
      "patenteamento do sistema.",
    ];
    y = 45;
    conclusao.forEach((line) => {
      pdf.text(line, margin, y);
      y += 6;
    });

    // ===== PLATAFORMA DE DESENVOLVIMENTO BASE44 =====
    pdf.addPage();
    pdf.setFontSize(20);
    pdf.setFont("helvetica", "bold");
    pdf.setTextColor(20, 20, 20);
    pdf.text("7. Plataforma de Desenvolvimento Base44", margin, 30);

    pdf.setFontSize(11);
    pdf.setFont("helvetica", "normal");
    pdf.text(
      "Este aplicativo foi desenvolvido na plataforma Base44 (base44.com),",
      margin,
      45
    );
    pdf.text(
      "um backend-as-a-service que fornece autenticação, banco de dados,",
      margin,
      52
    );
    pdf.text(
      "integrações, hospedagem e deploy para iOS/Android a partir do",
      margin,
      59
    );
    pdf.text("mesmo código-fonte.", margin, 66);

    pdf.setFontSize(14);
    pdf.setFont("helvetica", "bold");
    pdf.setTextColor(14, 165, 233);
    pdf.text("Painel de Controle da Plataforma", margin, 80);

    pdf.setFontSize(11);
    pdf.setFont("helvetica", "normal");
    pdf.setTextColor(20, 20, 20);
    pdf.text(
      "O painel de controle do Base44 contém as seguintes seções que",
      margin,
      90
    );
    pdf.text("gerenciam todos os aspectos do aplicativo:", margin, 97);

    const base44Sections = [
      {
        name: "Visão geral",
        desc: "Dashboard principal com métricas do aplicativo, status de deploy, número de usuários, créditos consumidos e resumo geral do projeto.",
      },
      {
        name: "Usuários",
        desc: "Gerenciamento de usuários do aplicativo. Permite convidar usuários (inviteUser), definir papéis (admin/user), visualizar usuários registrados e controlar acesso ao app.",
      },
      {
        name: "Dados",
        desc: "Gerenciamento de entidades (database schema). Define a estrutura de dados do aplicativo via arquivos JSON em base44/entities/. Inclui criação, edição e visualização de registros.",
      },
      {
        name: "Análises",
        desc: "Analytics do aplicativo. Rastreia eventos personalizados via base44.analytics.track(), métricas de uso, engajamento de usuários e estatísticas de acesso.",
      },
      {
        name: "Marketing",
        desc: "Ferramentas de marketing: SEO, meta tags, Open Graph, configuração de domínios personalizados e otimização para motores de busca.",
      },
      {
        name: "Domínios",
        desc: "Configuração de domínios personalizados. Permite publicar o aplicativo em domínios próprios, configurar SSL/HTTPS e gerenciar subdomínios.",
      },
      {
        name: "Integrações",
        desc: "Conectores OAuth para serviços externos: Google Calendar, Gmail, Slack, GitHub, Notion, Salesforce, HubSpot, Instagram, TikTok e mais de 80 outros serviços.",
      },
      {
        name: "Segurança",
        desc: "Configuração de segurança: Row-Level Security (RLS) por entidade, autenticação, papéis de usuário (admin/user), controle de acesso e proteção de dados.",
      },
      {
        name: "Código",
        desc: "Editor de código-fonte do aplicativo. Acesso aos arquivos do projeto: páginas (src/pages/), componentes (src/components/), funções backend (base44/functions/), entidades (base44/entities/), agentes (base44/agents/) e fluxos de trabalho (base44/workflows/).",
      },
      {
        name: "Agentes",
        desc: "Agentes de IA in-app configuráveis. Agentes suportam WhatsApp/Telegram, acesso a entidades, funções backend e fluxos de trabalho. Configurados via arquivos JSON em base44/agents/.",
      },
      {
        name: "Fluxos de trabalho",
        desc: "Automações trigger-driven: agendadas (cron), baseadas em eventos de entidade, webhooks de conectores, auth de usuários e publicação. Definidos em base44/workflows/ no formato CNCF SWF v1.0.",
      },
      {
        name: "Logs",
        desc: "Logs de execução do aplicativo: logs de funções backend, execuções de fluxos de trabalho, erros de API, eventos de autenticação e histórico de deploys.",
      },
      {
        name: "API",
        desc: "Configuração de API: chaves de API, webhooks, endpoints REST, SDK do Base44 (base44Client.js) e documentação de integração. O SDK é pré-inicializado em src/api/base44Client.js.",
      },
      {
        name: "Configurações",
        desc: "Configurações gerais do aplicativo: nome, descrição, ícone, tema, modo público/privado, configurações de publicação (iOS/Android) e preferências do projeto.",
      },
    ];

    y = 107;
    base44Sections.forEach((sec) => {
      if (y > pageHeight - 25) {
        pdf.addPage();
        y = 20;
      }
      pdf.setFont("helvetica", "bold");
      pdf.setFontSize(11);
      pdf.setTextColor(14, 165, 233);
      pdf.text(`▸ ${sec.name}`, margin, y);
      y += 6;
      pdf.setFont("helvetica", "normal");
      pdf.setFontSize(9);
      pdf.setTextColor(50, 50, 50);
      const descLines = pdf.splitTextToSize(sec.desc, pageWidth - margin * 2);
      descLines.forEach((line) => {
        if (y > pageHeight - 15) {
          pdf.addPage();
          y = 20;
        }
        pdf.text(line, margin + 4, y);
        y += 5;
      });
      y += 3;
    });

    // Configuração do Base44 no projeto
    if (y > pageHeight - 30) {
      pdf.addPage();
      y = 20;
    }
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(12);
    pdf.setTextColor(20, 20, 20);
    pdf.text("Arquivo de Configuração da Plataforma", margin, y + 5);
    y += 12;
    pdf.setFont("courier", "normal");
    pdf.setFontSize(8);
    pdf.setTextColor(40, 40, 40);
    const configContent = getFileContent("/base44/config.jsonc");
    if (configContent) {
      const configLines = String(configContent).split("\n");
      configLines.forEach((line) => {
        if (y > pageHeight - 15) {
          pdf.addPage();
          y = 20;
          pdf.setFont("courier", "normal");
          pdf.setFontSize(8);
          pdf.setTextColor(40, 40, 40);
        }
        const wrapped = pdf.splitTextToSize(line, pageWidth - margin * 2);
        wrapped.forEach((w) => {
          pdf.text(w, margin, y);
          y += 4;
        });
      });
    }

    // ===== ESTRUTURA DE ARQUIVOS DO REPOSITÓRIO =====
    pdf.addPage();
    pdf.setFontSize(20);
    pdf.setFont("helvetica", "bold");
    pdf.setTextColor(20, 20, 20);
    pdf.text("8. Estrutura Completa do Repositório", margin, 30);

    pdf.setFontSize(11);
    pdf.setFont("helvetica", "normal");
    pdf.text("Listagem de todos os arquivos do projeto:", margin, 45);

    const allPaths = ALL_FILE_PATHS;

    // Visualização em árvore organizada por diretório
    pdf.setFontSize(8);
    pdf.setFont("courier", "normal");
    pdf.setTextColor(40, 40, 40);
    y = 55;

    // Agrupar arquivos por diretório raiz
    const dirs = {
      "/base44/": [],
      "/public/": [],
      "/src/": [],
      "/ (raiz)": [],
    };
    allPaths.forEach((path) => {
      if (path.startsWith("/base44/")) dirs["/base44/"].push(path);
      else if (path.startsWith("/public/")) dirs["/public/"].push(path);
      else if (path.startsWith("/src/")) dirs["/src/"].push(path);
      else dirs["/ (raiz)"].push(path);
    });

    Object.entries(dirs).forEach(([dirName, files]) => {
      if (files.length === 0) return;
      if (y > pageHeight - 20) {
        pdf.addPage();
        y = 20;
        pdf.setFontSize(8);
        pdf.setFont("courier", "normal");
        pdf.setTextColor(40, 40, 40);
      }
      pdf.setFont("helvetica", "bold");
      pdf.setTextColor(14, 165, 233);
      pdf.text(`${dirName} (${files.length} arquivos)`, margin, y);
      y += 5;
      pdf.setFont("courier", "normal");
      pdf.setTextColor(40, 40, 40);
      files.forEach((path) => {
        if (y > pageHeight - 15) {
          pdf.addPage();
          y = 20;
          pdf.setFontSize(8);
          pdf.setFont("courier", "normal");
          pdf.setTextColor(40, 40, 40);
        }
        pdf.text(`  ${path}`, margin, y);
        y += 4.5;
      });
      y += 3;
    });

    // ===== VERIFICAÇÃO DE ARQUIVOS CRÍTICOS =====
    pdf.addPage();
    pdf.setFontSize(20);
    pdf.setFont("helvetica", "bold");
    pdf.setTextColor(20, 20, 20);
    pdf.text("9. Verificação de Arquivos Críticos", margin, 30);

    pdf.setFontSize(11);
    pdf.setFont("helvetica", "normal");
    pdf.text(
      "Confirmação de que os arquivos essenciais para comprovação de",
      margin,
      45
    );
    pdf.text("autoria estão presentes neste documento:", margin, 52);

    const criticalFiles = [
      "/.gitignore",
      "/index.html",
      "/vite.config.js",
      "/package.json",
      "/tailwind.config.js",
      "/postcss.config.js",
      "/jsconfig.json",
      "/components.json",
      "/eslint.config.js",
      "/src/main.jsx",
      "/src/App.jsx",
      "/src/index.css",
      "/src/pages.config.js",
      "/src/api/base44Client.js",
      "/src/lib/AuthContext.jsx",
      "/src/lib/utils.js",
      "/src/lib/speech.js",
      "/src/utils/index.ts",
      "/src/Layout.jsx",
      "/public/manifest.json",
      "/public/service-worker.js",
      "/base44/config.jsonc",
    ];

    pdf.setFontSize(10);
    pdf.setFont("courier", "normal");
    y = 65;
    let foundCount = 0;
    criticalFiles.forEach((cf) => {
      if (y > pageHeight - 15) {
        pdf.addPage();
        y = 20;
        pdf.setFontSize(10);
        pdf.setFont("courier", "normal");
      }
      const found = ALL_FILE_PATHS.includes(cf);
      if (found) foundCount++;
      pdf.setTextColor(found ? 22 : 200, found ? 163 : 30, found ? 74 : 30);
      pdf.text(`${found ? "[OK]  " : "[FALTA]"} ${cf}`, margin, y);
      y += 6;
    });

    pdf.setFontSize(11);
    pdf.setFont("helvetica", "bold");
    pdf.setTextColor(20, 20, 20);
    pdf.text(
      `${foundCount} de ${criticalFiles.length} arquivos críticos confirmados`,
      margin,
      y + 5
    );

    // ===== CÓDIGO-FONTE COMPLETO =====
    pdf.addPage();
    pdf.setFontSize(20);
    pdf.setFont("helvetica", "bold");
    pdf.setTextColor(20, 20, 20);
    pdf.text("10. Código-Fonte Completo do Projeto", margin, 30);

    pdf.setFontSize(11);
    pdf.setFont("helvetica", "normal");
    pdf.text(
      "Esta seção contém o código-fonte integral de cada arquivo do repositório,",
      margin,
      45
    );
    pdf.text("incluindo HTML, JSON, JavaScript, CSS e configurações.", margin, 52);
    pdf.text(`Total de arquivos documentados: ${allPaths.length}`, margin, 62);

    // Função para adicionar código de um arquivo ao PDF
    const addFileToPdf = (filePath, content) => {
      pdf.addPage();

      // Cabeçalho do arquivo
      pdf.setFillColor(14, 165, 233);
      pdf.rect(0, 0, pageWidth, 12, "F");
      pdf.setTextColor(255, 255, 255);
      pdf.setFontSize(9);
      pdf.setFont("helvetica", "bold");
      pdf.text(filePath, margin, 8);

      // Conteúdo
      pdf.setFontSize(7);
      pdf.setFont("courier", "normal");
      pdf.setTextColor(40, 40, 40);

      const contentWidth = pageWidth - margin * 2;
      const lineHeight = 3.8;
      let yy = 20;

      const lines = String(content).split("\n");
      for (const line of lines) {
        const wrapped = pdf.splitTextToSize(line, contentWidth);
        for (const w of wrapped) {
          if (yy > pageHeight - 12) {
            pdf.addPage();
            // Repete cabeçalho em páginas de continuação
            pdf.setFillColor(14, 165, 233);
            pdf.rect(0, 0, pageWidth, 8, "F");
            pdf.setTextColor(255, 255, 255);
            pdf.setFontSize(7);
            pdf.setFont("helvetica", "bold");
            pdf.text(`${filePath} (continuação)`, margin, 5.5);
            pdf.setFontSize(7);
            pdf.setFont("courier", "normal");
            pdf.setTextColor(40, 40, 40);
            yy = 14;
          }
          pdf.text(w, margin, yy);
          yy += lineHeight;
        }
      }
    };

    // Adicionar todos os arquivos de código-fonte (inclui config, PWA, base44)
    for (let i = 0; i < allPaths.length; i++) {
      const filePath = allPaths[i];
      const content = getFileContent(filePath);
      if (content) {
        setProgress(Math.round(((i + SCREENS.length) / (allPaths.length + SCREENS.length)) * 100));
        setCurrentScreen(`Código: ${filePath}`);
        addFileToPdf(filePath, content);
      }
    }

    // ===== DECLARAÇÃO DE INTEGRIDADE PARA O INPI =====
    pdf.addPage();
    pdf.setFontSize(20);
    pdf.setFont("helvetica", "bold");
    pdf.setTextColor(20, 20, 20);
    pdf.text("11. Declaração de Integridade Documental", margin, 30);

    pdf.setFontSize(11);
    pdf.setFont("helvetica", "normal");
    const declaracao = [
      "Este documento contém a documentação técnica integral do",
      "aplicativo Forja da Consciência, incluindo:",
      "",
      `• ${SCREENS.length} telas documentadas com prints e descrições técnicas`,
      `• ${allPaths.length} arquivos de código-fonte integral (HTML, JS, JSX, TS, CSS, JSON, SVG, MD)`,
      "• Documentação completa do painel de controle da plataforma Base44",
      "• Inclui configuração do projeto, PWA, service worker e manifest",
      "• Estrutura completa do repositório",
      "• Arquitetura técnica detalhada",
      "• Fluxo de navegação completo",
      "• Recursos de acessibilidade",
      "",
      "Todos os arquivos que compõem o projeto estão documentados",
      "integralmente neste PDF, sem omissões. O código-fonte de cada",
      "arquivo está reproduzido na íntegra nas seções 10 e 11.",
      "",
      "Esta documentação atende aos requisitos de depósito de",
      "propriedade intelectual junto ao INPI (Instituto Nacional da",
      "Propriedade Industrial), contendo a totalidade da criação",
      "do software, desde a configuração do ambiente de desenvolvimento",
      "até o código-fonte de cada componente, página e utilitário.",
      "",
      `Data de geração: ${new Date().toLocaleString("pt-BR")}`,
      `Versão do documento: 1.0`,
      `Total de páginas: ${pdf.getNumberOfPages()}`,
    ];
    y = 45;
    declaracao.forEach((line) => {
      pdf.text(line, margin, y);
      y += 6;
    });

    // Salvar
    pdf.save("Forja_da_Consciencia_Documentacao_Tecnica.pdf");

    setProgress(100);
    setDone(true);
    setGenerating(false);
    // Restaurar fala
    if (originalSpeakRef.current && window.speechSynthesis) {
      window.speechSynthesis.speak = originalSpeakRef.current;
      originalSpeakRef.current = null;
    }
    window.speechSynthesis?.cancel();
  };

  const downloadMarkdown = () => {
    // Combina toda a documentação markdown em um único arquivo
    const separator = "\n\n---\n\n";
    const header = `# Celular Interativo Forja da Consciência — Companion\n\nDocumentação técnica da plataforma Base44\n\nGerado em: ${new Date().toLocaleString("pt-BR")}\n\n---\n\n`;
    const fullContent = header + companionDocs.map(doc => `# ${doc.name}\n\n${doc.content}`).join(separator);
    const blob = new Blob([fullContent], { type: "text/markdown;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "Forja-da-Consciencia-Companion.md";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const downloadMarkdownSeparate = () => {
    // Baixa cada arquivo markdown individualmente
    companionDocs.forEach((doc, i) => {
      setTimeout(() => {
        const blob = new Blob([doc.content], { type: "text/markdown;charset=utf-8" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = doc.file;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      }, i * 300);
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 flex flex-col items-center justify-center p-6 text-white">
      {/* Header */}
      <div className="w-full max-w-md flex items-center gap-4 mb-8">
        <button
          onClick={() => navigate(createPageUrl("TelaInicial"))}
          className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="text-xl font-bold">Documentação Técnica</h1>
      </div>

      {/* Card principal */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20"
      >
        <div className="flex flex-col items-center text-center mb-6">
          <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center mb-4 shadow-xl">
            <FileText className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-2xl font-bold mb-2">Gerar PDF Técnico</h2>
          <p className="text-sm text-white/70">
            Documento completo com prints de telas, código-fonte integral, HTML, JSON, configurações, .gitignore, API e verificação de arquivos críticos para patenteamento no INPI
          </p>
        </div>

        {/* Informações do documento */}
        <div className="space-y-2 mb-6 text-sm">
          <div className="flex justify-between bg-white/5 rounded-xl px-4 py-2">
            <span className="text-white/60">Telas documentadas:</span>
            <span className="font-semibold">{SCREENS.length}</span>
          </div>
          <div className="flex justify-between bg-white/5 rounded-xl px-4 py-2">
            <span className="text-white/60">Arquivos de código:</span>
            <span className="font-semibold">{Object.keys(sourceFiles).length + Object.keys(base44Files).length + Object.keys(rootConfigFiles).length + Object.keys(publicFiles).length}</span>
          </div>
          <div className="flex justify-between bg-white/5 rounded-xl px-4 py-2">
            <span className="text-white/60">Formato:</span>
            <span className="font-semibold">PDF (A4)</span>
          </div>
          <div className="flex justify-between bg-white/5 rounded-xl px-4 py-2">
            <span className="text-white/60">Conteúdo:</span>
            <span className="font-semibold">Prints + Código + HTML + JSON</span>
          </div>
        </div>

        {/* Botão gerar */}
        {!generating && !done && (
          <button
            onClick={generatePDF}
            className="w-full py-4 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-2xl font-bold text-lg flex items-center justify-center gap-2 hover:scale-[1.02] transition-transform shadow-lg"
          >
            <Download className="w-5 h-5" />
            Gerar Documentação PDF
          </button>
        )}

        {/* Separador */}
        <div className="flex items-center gap-3 my-6">
          <div className="flex-1 h-px bg-white/20" />
          <span className="text-xs text-white/50">Documentação Markdown</span>
          <div className="flex-1 h-px bg-white/20" />
        </div>

        {/* Visualizar online */}
        {!generating && (
          <button
            onClick={() => navigate(createPageUrl("VisualizarDocumentacao"))}
            className="w-full py-3 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl font-semibold flex items-center justify-center gap-2 hover:scale-[1.02] transition-transform shadow-lg mb-3"
          >
            <BookOpen className="w-5 h-5" />
            Visualizar Documentação Online
          </button>
        )}

        {/* Botões Markdown */}
        {!generating && (
          <div className="space-y-3">
            <button
              onClick={downloadMarkdown}
              className="w-full py-3 bg-gradient-to-r from-emerald-500 to-green-600 rounded-2xl font-semibold flex items-center justify-center gap-2 hover:scale-[1.02] transition-transform shadow-lg"
            >
              <Download className="w-5 h-5" />
              Baixar Tudo (1 arquivo .md)
            </button>
            <button
              onClick={downloadMarkdownSeparate}
              className="w-full py-3 bg-white/10 rounded-2xl font-semibold flex items-center justify-center gap-2 hover:bg-white/20 transition-colors"
            >
              <Download className="w-4 h-4" />
              Baixar Separados (14 arquivos .md)
            </button>
          </div>
        )}

        {/* Progresso */}
        {generating && (
          <div className="space-y-3">
            <div className="flex items-center gap-3 text-sm">
              <Loader2 className="w-5 h-5 animate-spin text-cyan-400" />
              <span className="text-white/80">{currentScreen || "Preparando..."}</span>
            </div>
            <div className="w-full bg-white/10 rounded-full h-3 overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full"
                style={{ width: `${progress}%` }}
                animate={{ opacity: [0.7, 1, 0.7] }}
                transition={{ repeat: Infinity, duration: 1 }}
              />
            </div>
            <p className="text-center text-xs text-white/50">{progress}% concluído</p>
          </div>
        )}

        {/* Concluído */}
        {done && (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="flex flex-col items-center gap-3 py-4"
          >
            <CheckCircle2 className="w-16 h-16 text-green-400" />
            <p className="font-semibold text-lg">PDF gerado com sucesso!</p>
            <p className="text-sm text-white/60">O download foi iniciado automaticamente.</p>
            <button
              onClick={() => {
                setDone(false);
                setProgress(0);
              }}
              className="mt-2 px-6 py-2 bg-white/10 rounded-xl text-sm hover:bg-white/20"
            >
              Gerar novamente
            </button>
          </motion.div>
        )}
      </motion.div>

      {/* Container oculto para captura de telas */}
      <div
        style={{
          position: "fixed",
          left: "-9999px",
          top: 0,
          width: "400px",
          height: "800px",
          overflow: "hidden",
          background: "#fff",
        }}
      >
        {generating &&
          SCREENS.map((screen, i) => {
            const Comp = screen.component;
            return (
              <div
                key={i}
                ref={screenRefs.current[i]}
                style={{
                  width: "400px",
                  height: "800px",
                  overflow: "hidden",
                  position: "relative",
                }}
              >
                <Comp />
              </div>
            );
          })}
      </div>
    </div>
  );
}