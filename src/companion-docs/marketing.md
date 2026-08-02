# Marketing — Base44 Platform

## Visão Geral

A seção **Marketing** do painel gerencia metadados de SEO, Open Graph, tags sociais e configurações de divulgação da aplicação.

## Configuração de SEO

Os metadados de SEO são configurados no arquivo `index.html`:

```html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />

  <!-- SEO -->
  <title>Celular Interativo Forja da Consciência</title>
  <meta name="description" content="Aplicativo educacional que ensina idosos a usar smartphones através de tutoriais guiados por voz." />
  <meta name="keywords" content="smartphone, idosos, tutorial, acessibilidade, educação digital" />
  <meta name="author" content="Forja da Consciência" />

  <!-- Open Graph -->
  <meta property="og:title" content="Celular Interativo Forja da Consciência" />
  <meta property="og:description" content="Tutoriais interativos de smartphone para idosos." />
  <meta property="og:type" content="website" />
  <meta property="og:image" content="/og-image.png" />

  <!-- Twitter Card -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="Celular Interativo Forja da Consciência" />
  <meta name="twitter:description" content="Tutoriais interativos de smartphone para idosos." />
</head>
<body>
  <div id="root"></div>
  <script type="module" src="/src/main.jsx"></script>
</body>
</html>
```

## Importante

> Uma vez customizado, o `index.html` é servido **como está** — a plataforma **não** injeta automaticamente tags SEO/social, URLs canônicas ou favicons. Toda configuração deve ser feita manualmente.

## PWA (Progressive Web App)

O projeto é configurado como PWA para instalação como app nativo:

### Manifest (`public/manifest.json`)
```json
{
  "name": "Celular Interativo Forja da Consciência",
  "short_name": "Forja",
  "description": "Tutoriais de smartphone para idosos",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#0EA5E9",
  "theme_color": "#0EA5E9",
  "icons": [
    {
      "src": "/icon-192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "/icon-512.png",
      "sizes": "512x512",
      "type": "image/png"
    }
  ]
}
```

### Service Worker (`public/service-worker.js`)
- Cache offline de assets estáticos
- Funcionamento sem conectividade
- Sincronização quando online

## Meta Tags PWA (injetadas via Layout)

```javascript
// src/Layout.jsx
const metaTags = [
  { name: 'mobile-web-app-capable', content: 'yes' },
  { name: 'apple-mobile-web-app-capable', content: 'yes' },
  { name: 'apple-mobile-web-app-status-bar-style', content: 'black-translucent' },
  { name: 'apple-mobile-web-app-title', content: 'Forja da Consciência' },
  { name: 'theme-color', content: '#0EA5E9' },
];
```

## Neste Projeto

O projeto **Celular Interativo Forja da Consciência** é um app educacional focado em **acessibilidade para idosos**. Os pontos de marketing principais:

- **Público-alvo**: Idosos e pessoas com dificuldade com tecnologia
- **Proposta**: Aprender a usar smartphone de forma guiada e segura
- **Diferencial**: Tutoriais por voz, animações de pulso, simulação realista
- **Plataformas**: Web, iOS e Android (mesmo código)
- **Offline**: Funciona 100% sem internet