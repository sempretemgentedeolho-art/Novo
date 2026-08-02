# Visão Geral — Base44 Platform

## O que é a Base44

A Base44 é uma plataforma **Backend-as-a-Service (BaaS)** que permite construir, modificar e publicar aplicações web e mobile (iOS/Android) a partir de um único código-fonte React. A plataforma gerencia automaticamente:

- **Autenticação** (tokens, sessões, verificação de e-mail)
- **Banco de dados** (entidades JSON com persistência automática)
- **Integrações** (OAuth, APIs externas, IA)
- **Hosting** (publicação web + empacotamento para iOS/Android)
- **Workflows** (automações multi-etapa com gatilhos)
- **Agentes de IA** (agentes in-app com acesso a dados e funções)

## Arquitetura do Projeto

```
Projeto Base44
├── src/                    # Frontend (React + Tailwind + Vite)
│   ├── pages/              # Páginas da aplicação
│   ├── components/         # Componentes reutilizáveis
│   ├── lib/                # Lógica compartilhada (auth, utils)
│   ├── api/                # Cliente SDK da Base44
│   └── hooks/              # Hooks customizados
├── base44/                 # Backend e configuração
│   ├── entities/           # Esquemas JSON das entidades
│   ├── functions/          # Funções de backend (HTTP handlers)
│   ├── agents/             # Configuração de agentes de IA
│   ├── workflows/          # Automações multi-etapa
│   └── config.jsonc        # Configuração do app
├── public/                 # Assets estáticos (PWA, manifest, service worker)
├── index.html              # HTML raiz (SEO, meta tags, fonts)
├── package.json            # Dependências NPM
├── vite.config.js          # Configuração do Vite
└── tailwind.config.js      # Configuração do Tailwind CSS
```

## Stack Tecnológico

| Camada        | Tecnologia                                    |
|---------------|-----------------------------------------------|
| Frontend      | React 18 + Tailwind CSS + Vite                |
| UI            | shadcn/ui + Radix UI + lucide-react           |
| Roteamento    | react-router-dom                              |
| Estado/Dados  | @tanstack/react-query                         |
| Animações     | framer-motion                                 |
| Mapas         | react-leaflet                                 |
| 3D            | three.js                                      |
| Drag & Drop   | @hello-pangea/dnd                              |
| Backend       | Base44 BaaS (SDK @base44/sdk)                 |
| Auth          | Base44 Auth (gerenciada pela plataforma)      |
| DB            | Base44 Entities (JSON schemas)               |

## Aplicação: Celular Interativo Forja da Consciência

Este projeto é um **celular interativo simulado** — uma aplicação educacional que ensina idosos a usar smartphones através de tutoriais guiados por voz e animações visuais. O app simula uma interface de smartphone completa (tela de bloqueio, tela inicial, apps, configurações) com:

- **Tutoriais passo-a-passo** com narração por voz (Web Speech API)
- **Efeitos visuais de pulso** para guiar o usuário aos botões corretos
- **Informações médicas de emergência (ICE)** acessíveis na tela de bloqueio
- **Persistência local** via LocalStorage (funciona 100% offline)
- **PWA** instalável como app nativo

## Painel de Controle Base44

O painel de controle da Base44 (acessível via navegador) contém as seguintes seções:

1. **Visão Geral** — Resumo do app, métricas, status
2. **Usuários** — Gestão de usuários e convites
3. **Dados** — Entidades e registros do banco de dados
4. **Análises** — Eventos e métricas de uso
5. **Marketing** — SEO, domínios, metadados
6. **Domínios** — Configuração de domínios personalizados
7. **Integrações** — Conectores OAuth e APIs externas
8. **Segurança** — RLS, permissões, autenticação
9. **Código** — Editor de código, arquivos do projeto
10. **Agentes** — Agentes de IA in-app
11. **Fluxos de Trabalho** — Automações e workflows
12. **Logs** — Logs de execução e erros
13. **API** — Endpoints e chaves de API
14. **Configurações** — Configurações gerais do app

Cada uma destas seções está documentada em sua respectiva subpasta neste diretório.