# Configurações — Base44 Platform

## Visão Geral

A seção **Configurações** do painel gerencia as configurações gerais da aplicação, incluindo nome, descrição, ambiente, e opções de publicação.

## Configuração do App (`base44/config.jsonc`)

```jsonc
{
  "app_name": "Celular Interativo Forja da Consciência",
  "description": "Aplicativo educacional que ensina idosos a usar smartphones",
  "version": "1.0.0",
  "main_page": "Inicio",
  "public": true,
  "theme": {
    "primary_color": "#0EA5E9",
    "dark_mode": true
  }
}
```

## Configuração de Páginas (`src/pages.config.js`)

> **Nota**: `pages.config.js` **não é mais auto-gerado** para este app. O `App.jsx` pode ter um loop de `pagesConfig` que renderiza rotas — esse loop contém apenas páginas **antigas**. Novas páginas **não aparecem** em `pagesConfig`.

### Regras de Roteamento
- Cada nova rota deve ser adicionada como um `<Route>` separado ao lado do loop existente
- O loop `pagesConfig` pode envolver cada página em um componente de layout
- Novas rotas fora do loop **não recebem** esse wrapping automaticamente
- Verificar como o loop envolve as páginas e aplicar o mesmo wrapper às novas rotas

## Configuração do Vite (`vite.config.js`)

```javascript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { base44vite } from '@base44/vite-plugin';

export default defineConfig({
  logLevel: 'error',
  plugins: [
    react(),
    base44vite({
      // Configuração do plugin Base44
    })
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  server: {
    port: 3000,
    host: true
  },
  build: {
    outDir: 'dist'
  }
});
```

## Configuração do Tailwind (`tailwind.config.js`)

```javascript
module.exports = {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],
  theme: {
    extend: {
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))'
        },
        // ... mais tokens
      }
    }
  },
  plugins: [require("tailwindcss-animate")]
};
```

## Design Tokens (`src/index.css`)

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 0 0% 3.9%;
    --primary: 0 0% 9%;
    --primary-foreground: 0 0% 98%;
    --radius: 0.5rem;
    /* ... mais tokens */
  }

  .dark {
    --background: 0 0% 3.9%;
    --foreground: 0 0% 98%;
    /* ... tokens dark mode */
  }
}
```

### Alterar Tema
1. Atualizar valores em `src/index.css` (ambos `:root` e `.dark`)
2. Usar classes mapeadas no JSX (`bg-primary`, `font-heading`)
3. Nunca usar valores hardcoded (`bg-[#ffffff]`, `bg-white`)

## Configuração PWA

### Manifest (`public/manifest.json`)
```json
{
  "name": "Celular Interativo Forja da Consciência",
  "short_name": "Forja",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#0EA5E9",
  "theme_color": "#0EA5E9",
  "icons": [...]
}
```

### Service Worker (`public/service-worker.js`)
- Cache de assets estáticos
- Funcionamento offline
- Estratégia cache-first para assets

### Meta Tags PWA (injetadas via `Layout.jsx`)
```javascript
const metaTags = [
  { name: 'mobile-web-app-capable', content: 'yes' },
  { name: 'apple-mobile-web-app-capable', content: 'yes' },
  { name: 'apple-mobile-web-app-status-bar-style', content: 'black-translucent' },
  { name: 'apple-mobile-web-app-title', content: 'Forja da Consciência' },
  { name: 'theme-color', content: '#0EA5E9' },
];
```

## Configuração de Pacotes NPM (`package.json`)

### Pacotes Instalados
- React 18, react-dom, react-router-dom
- Tailwind CSS, shadcn/ui (Radix UI), lucide-react
- framer-motion, recharts, react-leaflet, three.js
- @tanstack/react-query, react-hook-form
- jspdf, html2canvas (para documentação)
- @base44/sdk, @base44/vite-plugin

### Instalar Novo Pacote
Apenas quando o usuário solicitar explicitamente:
```json
[
  { "name": "axios", "semver": "^1.6.0" }
]
```

## Configuração de Build Standalone

O projeto inclui scripts para gerar uma versão standalone (sem Base44):

### `limpar-e-buildar.py`
- Remove imports do `@base44/sdk`
- Remove dependências de rede
- Gera rotas React Router a partir dos arquivos de página
- Configura LocalStorage como persistência

### `converter-standalone.bat`
- Verifica ambiente (Node.js, Python)
- Instala dependências automaticamente
- Executa build de produção
- Gera pasta standalone para deploy

## Publicação

### Web (Base44)
- Publicar via painel da Base44
- Recebe domínio `*.base44.app`
- Pode configurar domínio personalizado

### iOS/Android
- Mesmo código-fonte React
- Empacotamento via plataforma Base44
- Publicação nas lojas (App Store, Google Play)

### Standalone
- Build via script `.bat`
- Deploy em qualquer servidor estático
- Funciona 100% offline