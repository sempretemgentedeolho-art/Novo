# Código — Base44 Platform

## Visão Geral

A seção **Código** do painel é o editor integrado onde todos os arquivos do projeto são gerenciados. O projeto segue a estrutura padrão do Vite + React.

## Estrutura de Arquivos

```
Projeto Base44
├── src/                         # Frontend
│   ├── pages/                   # Páginas (componentes React)
│   ├── components/              # Componentes reutilizáveis
│   │   └── ui/                  # Componentes shadcn/ui
│   ├── lib/                     # Lógica compartilhada
│   │   ├── AuthContext.jsx      # Contexto de autenticação
│   │   ├── utils.js             # Utilitários (cn, etc.)
│   │   └── query-client.js      # Cliente React Query
│   ├── api/
│   │   └── base44Client.js      # SDK Base44 inicializado
│   ├── hooks/
│   │   └── use-mobile.jsx       # Hook de detecção mobile
│   ├── utils/
│   │   └── index.ts             # Utils (createPageUrl, etc.)
│   ├── App.jsx                  # Router principal
│   ├── main.jsx                 # Entry point
│   ├── Layout.jsx               # Layout wrapper
│   └── index.css                # Design tokens + Tailwind
├── base44/                      # Backend
│   ├── entities/                # Esquemas JSON das entidades
│   ├── functions/               # Funções de backend
│   │   └── {functionName}/
│   │       └── entry.ts         # HTTP handler
│   ├── agents/                  # Config de agentes de IA
│   ├── workflows/               # Automações (.jsonc)
│   ├── shared/                  # Módulos compartilhados
│   └── config.jsonc             # Configuração do app
├── public/                      # Assets estáticos
│   ├── manifest.json            # PWA manifest
│   └── service-worker.js        # Service Worker
├── index.html                   # HTML raiz
├── package.json                 # Dependências
├── vite.config.js              # Config Vite
├── tailwind.config.js          # Config Tailwind
├── postcss.config.js           # Config PostCSS
├── jsconfig.json               # Config JS (alias @/)
├── components.json             # Config shadcn/ui
└── eslint.config.js            # Config ESLint
```

## Convenções de Código

### Importações
- Usar alias `@/` para imports (nunca caminhos relativos `src/`)
- `cn` vem de `@/lib/utils`
- `createPageUrl` vem de `@/utils`
- shadcn/ui: importar cada componente de seu próprio arquivo

### Componentes
- Exportar cada página/componente como `default`, com mesmo nome do arquivo
- Arquivos focados: componentes de 50 linhas ou menos
- Cada novo componente/page em seu próprio arquivo

### Estilo
- Tailwind CSS para styling
- Classes Tailwind como strings literais (não dinâmicas)
- Design tokens em `src/index.css` mapeados em `tailwind.config.js`
- Usar classes mapeadas (`bg-primary`, `font-heading`), nunca valores hardcoded

### Ícones
- `lucide-react` apenas
- Apenas ícones que existem — um ícone inexistente quebra o app inteiro

### ESM
- **Apenas ESM** — nunca `require()` ou `module.exports`
- Vite ESM project: `require` não está definido em runtime

## Roteamento (App.jsx)

```jsx
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <AuthProvider>
      <QueryClientProvider client={queryClientInstance}>
        <Router>
          <NavigationTracker />
          <AuthenticatedApp />
        </Router>
        <Toaster />
      </QueryClientProvider>
    </AuthProvider>
  );
}
```

### Regras de Roteamento
- `<Routes>` contém **apenas** elementos `<Route>`
- Página principal em `"/"` (não duplicar)
- Cada nova página = um novo `<Route>`
- Preservar wrappers da plataforma (AuthProvider, QueryClientProvider, Router, Toaster)

## Neste Projeto

O projeto **Celular Interativo Forja da Consciência** contém:

### Páginas Principais
- `Inicio.jsx` — Tela de boas-vindas
- `TelaBloqueio.jsx` — Tela de bloqueio com ICE
- `TelaInicial.jsx` — Tela inicial (dashboard)
- `Home.jsx` — Home alternativa
- `Telefone.jsx` — Tutorial de telefone
- `Contatos.jsx` — Tutorial de contatos
- `Relogio.jsx` — App de relógio/alarmes
- `Configuracoes.jsx` — Configurações
- `VozConfig.jsx` — Configuração de voz
- `InfoMedicas.jsx` — Informações médicas

### Apps Simulados
- `AppTelefone.jsx`, `AppMensagens.jsx`, `AppCamera.jsx`
- `AppGaleria.jsx`, `AppWhatsApp.jsx`, `AppRelogio.jsx`
- `AppCalculadora.jsx`, `AppConfiguracoes.jsx`, `AppDicas.jsx`

### Componentes
- `PhoneFrame.jsx` — Moldura de smartphone
- `StatusBar.jsx` — Barra de status
- `PainelRapido.jsx` — Painel de configurações rápidas
- `QuickPanel.jsx` — Painel rápido alternativo

### Guias WhatsApp (40+ páginas)
- `ConversasGuia.jsx`, `LigacoesGuia.jsx`, `CameraWhatsApp.jsx`
- `ConfiguracoesWhatsApp.jsx`, `AjudaWhatsApp.jsx`, etc.