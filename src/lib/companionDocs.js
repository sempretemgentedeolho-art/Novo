// Companion documentation content - exported as JS strings to avoid ?raw import issues
// (Vite's ?raw query doesn't work for .md files with the Base44 plugin)

export const companionDocs = [
  {
    name: "Visão Geral",
    file: "Visao-geral.md",
    content: `# Visão Geral — Base44 Platform

## O que é a Base44

A Base44 é uma plataforma **Backend-as-a-Service (BaaS)** que permite construir, modificar e publicar aplicações web e mobile (iOS/Android) a partir de um único código-fonte React. A plataforma gerencia automaticamente:

- **Autenticação** (tokens, sessões, verificação de e-mail)
- **Banco de dados** (entidades JSON com persistência automática)
- **Integrações** (OAuth, APIs externas, IA)
- **Hosting** (publicação web + empacotamento para iOS/Android)
- **Workflows** (automações multi-etapa com gatilhos)
- **Agentes de IA** (agentes in-app com acesso a dados e funções)

## Arquitetura do Projeto

\`\`\`
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
\`\`\`

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

Cada uma destas seções está documentada em sua respectiva subpasta neste diretório.`
  },
  {
    name: "Usuários",
    file: "Usuarios.md",
    content: `# Usuários — Base44 Platform

## Visão Geral

A seção **Usuários** do painel de controle da Base44 gerencia todos os usuários da aplicação. A plataforma possui um sistema de autenticação completo, gerenciado automaticamente — não é necessário implementar lógica de auth no backend.

## Entidade User

O \`User\` é uma entidade **built-in** (nativa) presente em toda aplicação Base44. Não é necessário criá-la — ela já existe.

### Campos Built-in (somente leitura)

| Campo           | Tipo   | Descrição                              |
|-----------------|--------|----------------------------------------|
| \`id\`            | string | Identificador único                    |
| \`created_date\`  | date   | Data de criação                        |
| \`full_name\`     | string | Nome completo                          |
| \`email\`         | string | E-mail do usuário                      |

### Campos Editáveis

| Campo  | Tipo   | Descrição                                    |
|--------|--------|----------------------------------------------|
| \`role\` | string | Papel: \`'admin'\` ou \`'user'\` (padrão)        |

> O campo \`role\` pode ser customizado livremente editando \`base44/entities/User.jsonc\`.

## Papéis (Roles)

| Papel  | Permissões                                              |
|--------|--------------------------------------------------------|
| \`admin\`| Listar, atualizar e deletar outros usuários; convidar  |
| \`user\` | Acesso padrão; só pode ver/editar próprios dados       |

## Convite de Usuários

Usuários não são criados diretamente — eles se juntam via **convite por e-mail**:

\`\`\`javascript
// Convidar um usuário com papel "user"
await base44.users.inviteUser("email@exemplo.com", "user");

// Convidar um usuário com papel "admin"
await base44.users.inviteUser("admin@exemplo.com", "admin");
\`\`\`

### Regras de Convite

- **App público**: admins podem convidar ambos os papéis; usuários comuns só podem convidar \`role="user"\`
- O convite envia um e-mail com link de registro
- Não é possível inserir registros de User diretamente (create retorna 405)
- O convite deve ser disparado apenas por usuários autorizados a conceder aquele papel

## SDK de Autenticação

\`\`\`javascript
import { base44 } from '@/api/base44Client';

// Usuário atual
const user = await base44.auth.me();

// Atualizar dados do próprio usuário
await base44.auth.updateMe({ custom_field: "valor" });

// Verificar se está autenticado
const isAuth = await base44.auth.isAuthenticated(); // Promise<boolean>

// Logout
await base44.auth.logout(redirectUrl);

// Redirecionar para login
await base44.auth.redirectToLogin(nextUrl);
\`\`\`

## Segurança de Usuários

- **Apenas admins** podem listar, atualizar e deletar outros usuários
- Usuários comuns só veem seus próprios dados
- Não é necessário adicionar RLS customizado ao User a menos que explicitamente solicitado
- A plataforma gerencia tokens, sessões e verificação de e-mail automaticamente

## Neste Projeto

O projeto **Celular Interativo Forja da Consciência** utiliza um \`AuthContext\` simplificado (\`src/lib/AuthContext.jsx\`) que remove dependências de rede para funcionar 100% offline. O contexto:

- Verifica autenticação localmente
- Não depende de chamadas de rede para a plataforma Base44
- Mantém compatibilidade com a estrutura de rotas e providers do app`
  },
  {
    name: "Dados",
    file: "Dados.md",
    content: `# Dados — Base44 Platform

## Visão Geral

A seção **Dados** do painel gerencia as **entidades** do banco de dados. Entidades são esquemas JSON que definem a estrutura dos dados persistidos. Cada entidade torna-se automaticamente uma coleção no banco de dados com operações CRUD completas.

## Estrutura de uma Entidade

Cada entidade é um arquivo \`.jsonc\` em \`base44/entities/\`:

\`\`\`jsonc
{
  "name": "Task",
  "type": "object",
  "properties": {
    "title": { "type": "string" },
    "description": { "type": "string" },
    "status": {
      "type": "string",
      "enum": ["todo", "in_progress", "done"],
      "default": "todo"
    },
    "priority": {
      "type": "string",
      "enum": ["low", "medium", "high"],
      "default": "medium"
    },
    "due_date": { "type": "string", "format": "date" }
  },
  "required": ["title"]
}
\`\`\`

### Campos Built-in (presentes em todo registro, nunca declarar)

| Campo            | Tipo   | Descrição                          |
|------------------|--------|------------------------------------|
| \`id\`             | string | Identificador único                |
| \`created_date\`   | date   | Data de criação                    |
| \`updated_date\`   | date   | Data da última atualização         |
| \`created_by_id\`  | string | ID do usuário que criou o registro |

## Tipos de Campos Suportados

| Tipo       | Uso                                    |
|------------|----------------------------------------|
| \`string\`   | Texto                                  |
| \`number\`   | Números                                |
| \`boolean\`  | Verdadeiro/falso                       |
| \`date\`     | Datas (\`format: "date"\`)               |
| \`array\`    | Listas                                 |
| \`object\`   | Objetos aninhados                      |
| \`enum\`     | Valores enumerados                     |

## SDK de Entidades

\`\`\`javascript
import { base44 } from '@/api/base44Client';

// Listar
const tasks = await base44.entities.Task.list();
base44.entities.Task.list('-updated_date', 20); // ordenação + limite

// Filtrar
base44.entities.Task.filter({ status: 'active' }, '-created_date', 10);

// Criar
await base44.entities.Task.create({ title: "Nova tarefa" });

// Criar em lote
await base44.entities.Task.bulkCreate([
  { title: "Tarefa 1" },
  { title: "Tarefa 2" }
]);

// Atualizar
await base44.entities.Task.update(id, { status: "done" });

// Atualizar em lote (mesma mudança para todos os matches)
await base44.entities.Task.updateMany(
  { status: "active" },
  { $set: { status: "done" } }
);

// Atualizar em lote (mudanças diferentes por registro)
await base44.entities.Task.bulkUpdate([
  { id: id1, status: "done" },
  { id: id2, status: "open" }
]);

// Deletar
await base44.entities.Task.delete(id);
await base44.entities.Task.deleteMany({ status: "archived" });

// Obter esquema
const schema = await base44.entities.Task.schema();
\`\`\`

## Subscrições em Tempo Real

\`\`\`javascript
useEffect(() => {
  const unsubscribe = base44.entities.Task.subscribe((event) => {
    // event: { id, type: 'create'|'update'|'delete', data }
    // Atualizar estado local a partir do evento
  });
  return unsubscribe;
}, []);
\`\`\`

## Limitações

- **Nunca** armazenar conteúdo grande (base64, PDFs, blobs) em campos de entidade — usar \`UploadFile\` e armazenar a \`file_url\`
- Campos oversized quebram operações de registro
- \`updateMany\` e \`deleteMany\` suportam até 500 registros por chamada

## Neste Projeto

O projeto **Celular Interativo Forja da Consciência** utiliza **LocalStorage** em vez do banco de dados Base44 para funcionar offline. A camada de persistência local está em:

- \`src/api/base44Client.js\` — Cliente mock que redireciona operações para LocalStorage
- \`base44/functions/localStorageDb/entry.ts\` — Lógica de banco de dados local

### Dados Persistidos Localmente

| Chave LocalStorage       | Conteúdo                              |
|--------------------------|---------------------------------------|
| \`fc_contacts\`            | Lista de contatos                     |
| \`fc_medical_info\`        | Informações médicas de emergência     |
| \`fc_alarms\`              | Alarmes de medicação                  |
| \`fc_blocked_numbers\`     | Números bloqueados                    |
| \`fc_voice_config\`        | Configuração de voz                   |
| \`fc_tutorial_completed\`  | Progresso do tutorial                 |`
  },
  {
    name: "Análises",
    file: "Analises.md",
    content: `# Análises — Base44 Platform

## Visão Geral

A seção **Análises** do painel exibe métricas de uso da aplicação, eventos customizados e dados de telemetria coletados automaticamente pela plataforma.

## Eventos Customizados

A Base44 permite rastrear eventos customizados para entender o comportamento dos usuários:

\`\`\`javascript
import { base44 } from '@/api/base44Client';

// Rastrear evento simples
base44.analytics.track({
  eventName: "user_contact_form_submit"
});

// Rastrear evento com propriedades
base44.analytics.track({
  eventName: "tutorial_step_completed",
  properties: {
    step: 3,
    tutorial_name: "telefone",
    completed: true
  }
});
\`\`\`

## Boas Práticas

- Use nomes de eventos **indicativos** (ex: \`user_contact_form_submit\`, \`tutorial_started\`)
- Mantenha as propriedades **mínimas** — apenas o necessário
- **Nunca** inclua PII (dados pessoais identificáveis)
- Tipos suportados nas propriedades: \`string\`, \`number\`, \`boolean\`, \`null\`

## Métricas Disponíveis no Painel

| Métrica              | Descrição                                    |
|----------------------|----------------------------------------------|
| Usuários ativos      | Usuários únicos no período                   |
| Sessões             | Número de sessões de uso                     |
| Páginas visitadas   | Visualizações por página/rota                |
| Eventos customizados| Contagem de eventos rastreados               |
| Tempo de sessão     | Duração média das sessões                    |
| Erros               | Erros de runtime capturados                  |

## Neste Projeto

O projeto **Celular Interativo Forja da Consciência** pode rastrear eventos como:

\`\`\`javascript
// Tutorial iniciado
base44.analytics.track({
  eventName: "tutorial_started",
  properties: { tutorial: "telefone" }
});

// Tutorial concluído
base44.analytics.track({
  eventName: "tutorial_completed",
  properties: { tutorial: "telefone", steps: 8 }
});

// App aberto
base44.analytics.track({
  eventName: "app_opened",
  properties: { app: "whatsapp" }
});

// Informação médica acessada
base44.analytics.track({
  eventName: "medical_info_accessed"
});
\`\`\`

> **Nota**: Como o projeto funciona offline com LocalStorage, os eventos de analytics são coletados quando o dispositivo tem conectividade. Em modo standalone, a telemetria pode não ser enviada.`
  },
  {
    name: "Marketing",
    file: "Marketing.md",
    content: `# Marketing — Base44 Platform

## Visão Geral

A seção **Marketing** do painel gerencia metadados de SEO, Open Graph, tags sociais e configurações de divulgação da aplicação.

## Configuração de SEO

Os metadados de SEO são configurados no arquivo \`index.html\`:

\`\`\`html
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
\`\`\`

## Importante

> Uma vez customizado, o \`index.html\` é servido **como está** — a plataforma **não** injeta automaticamente tags SEO/social, URLs canônicas ou favicons. Toda configuração deve ser feita manualmente.

## PWA (Progressive Web App)

O projeto é configurado como PWA para instalação como app nativo:

### Manifest (\`public/manifest.json\`)
\`\`\`json
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
\`\`\`

### Service Worker (\`public/service-worker.js\`)
- Cache offline de assets estáticos
- Funcionamento sem conectividade
- Sincronização quando online

## Meta Tags PWA (injetadas via Layout)

\`\`\`javascript
// src/Layout.jsx
const metaTags = [
  { name: 'mobile-web-app-capable', content: 'yes' },
  { name: 'apple-mobile-web-app-capable', content: 'yes' },
  { name: 'apple-mobile-web-app-status-bar-style', content: 'black-translucent' },
  { name: 'apple-mobile-web-app-title', content: 'Forja da Consciência' },
  { name: 'theme-color', content: '#0EA5E9' },
];
\`\`\`

## Neste Projeto

O projeto **Celular Interativo Forja da Consciência** é um app educacional focado em **acessibilidade para idosos**. Os pontos de marketing principais:

- **Público-alvo**: Idosos e pessoas com dificuldade com tecnologia
- **Proposta**: Aprender a usar smartphone de forma guiada e segura
- **Diferencial**: Tutoriais por voz, animações de pulso, simulação realista
- **Plataformas**: Web, iOS e Android (mesmo código)
- **Offline**: Funciona 100% sem internet`
  },
  {
    name: "Domínios",
    file: "Dominios.md",
    content: `# Domínios — Base44 Platform

## Visão Geral

A seção **Domínios** do painel gerencia a configuração de domínios personalizados para a aplicação publicada.

## Domínio Padrão

Toda aplicação Base44 recebe um domínio padrão no formato:
\`\`\`
https://[app-name].base44.app
\`\`\`

## Domínios Personalizados

É possível configurar um domínio próprio (ex: \`meuapp.com.br\`) apontando os registros DNS para a Base44.

### Passos Típicos

1. **Registrar domínio** em um provedor (Registro.br, GoDaddy, etc.)
2. **Configurar DNS**:
   - Registro A ou CNAME apontando para a Base44
   - Verificação de propriedade do domínio
3. **SSL/TLS** é provisionado automaticamente pela plataforma
4. **Propagação DNS** pode levar até 48 horas

## Configuração no index.html

O \`index.html\` pode conter a URL canônica do domínio:

\`\`\`html
<link rel="canonical" href="https://meudominio.com.br/" />
\`\`\`

> **Nota**: A URL canônica não é injetada automaticamente — deve ser configurada manualmente no \`index.html\`.

## Neste Projeto

O projeto **Celular Interativo Forja da Consciência** é projetado para funcionar **offline** como um app standalone. A configuração de domínio é relevante apenas para a versão web publicada na Base44.

### Versão Standalone (Android)

O projeto inclui scripts para gerar uma versão standalone que não depende da Base44:

- \`limpar-e-buildar.py\` — Remove referências da Base44 e gera rotas React Router
- \`converter-standalone.bat\` — Script de build universal
- A versão standalone usa apenas LocalStorage, sem necessidade de domínio

### Versão Web (Base44)

Se publicada na Base44, o app recebe automaticamente um domínio \`*.base44.app\` e pode ser configurado com domínio personalizado através do painel.`
  },
  {
    name: "Integrações",
    file: "Integracoes.md",
    content: `# Integrações — Base44 Platform

## Visão Geral

A seção **Integrações** do painel gerencia conectores OAuth e APIs externas que a aplicação pode utilizar.

## Tipos de Conectores

### 1. Shared (Compartilhado)
O builder conecta sua própria conta; todos os usuários do app compartilham a conexão. Funções de backend agem em nome do builder.

### 2. App User (Por Usuário)
O builder fornece credenciais OAuth (client ID, client secret); cada usuário do app conecta sua própria conta. Funções de backend usam os tokens individuais.

### 3. BYO Shared (Bring Your Own)
O admin do workspace registra seu próprio app OAuth (\`OrganizationConnector\`); o builder autoriza uma vez; o token é compartilhado entre todos os usuários.

## Conectores Suportados

| Categoria       | Conectores                                                        |
|-----------------|-------------------------------------------------------------------|
| Google          | Calendar, Drive, Gmail, Sheets, Docs, Slides, Tasks, Analytics, etc. |
| Comunicação     | Slack, Discord, Microsoft Teams, Outlook                          |
| Desenvolvimento | GitHub, GitLab, Bitbucket, Linear                                 |
| CRM/Vendas      | Salesforce, HubSpot, Zoho CRM                                      |
| Projetos        | Asana, ClickUp, Trello, Jira, Basecamp, Wrike                    |
| Documentos      | Notion, Confluence, Box, Dropbox, OneDrive, SharePoint            |
| Social          | Instagram, TikTok, Facebook Pages, LinkedIn                      |
| Pagamentos      | Stripe, QuickBooks, Square, FreshBooks, Wave                      |
| E-mail/Marketing| Mailchimp, Klaviyo, Omnisend                                      |
| Dados           | Snowflake, Databricks, Supabase, Airtable, Google BigQuery         |
| Outros          | Calendly, Typeform, Eventbrite, Sentry, Polar, Twitch, etc.       |

## Integrações Built-in (Core)

Disponíveis sempre, sem configuração OAuth:

| Integração              | Descrição                                          |
|-------------------------|----------------------------------------------------|
| \`InvokeLLM\`             | Geração de resposta via LLM (GPT, Gemini, Claude)  |
| \`UploadFile\`            | Upload de arquivo público                          |
| \`UploadPrivateFile\`     | Upload de arquivo privado                          |
| \`CreateFileSignedUrl\`   | URL assinada para download de arquivo privado      |
| \`ExtractDataFromUploadedFile\` | Extração de dados de CSV/Excel/PDF           |
| \`GenerateImage\`         | Geração de imagem via IA                          |
| \`GenerateVideo\`         | Geração de vídeo via IA (Google Veo)              |
| \`GenerateSpeech\`        | Text-to-speech (TTS) com múltiplas vozes          |
| \`TranscribeAudio\`       | Transcrição de áudio para texto (Whisper)         |
| \`SendEmail\`             | Envio de e-mail (apenas usuários registrados)     |

### Exemplo: InvokeLLM

\`\`\`javascript
const res = await base44.integrations.Core.InvokeLLM({
  prompt: "Dê dados sobre a Apple (empresa)",
  add_context_from_internet: true,
  response_json_schema: {
    type: "object",
    properties: { stock_price: { type: "number" } }
  }
});
\`\`\`

### Modelos Disponíveis

| Modelo              | Uso                              | Custo  |
|---------------------|----------------------------------|--------|
| \`automatic\`         | Padrão (automático)              | Normal |
| \`gpt_5_mini\`        | Tarefas simples                  | Normal |
| \`gemini_3_flash\`    | Web search + visão              | Normal |
| \`gpt_5_4\`          | Tarefas complexas                | Maior  |
| \`claude_sonnet_4_6\` | Tarefas complexas                | Maior  |
| \`claude_opus_4_8\`   | Máxima qualidade                 | Máximo |

> Apenas \`gemini_3_flash\` e \`gemini_3_1_pro\` suportam \`add_context_from_internet\`.

## Neste Projeto

O projeto **Celular Interativo Forja da Consciência** funciona **offline** e não utiliza conectores OAuth. As integrações utilizadas são:

- **Web Speech API** (nativa do navegador) — para narração por voz nos tutoriais
- **LocalStorage** — para persistência de dados offline
- **Service Worker** — para cache e funcionamento offline

> A versão standalone remove todas as dependências de integrações da Base44 para garantir funcionamento 100% offline.`
  },
  {
    name: "Segurança",
    file: "Seguranca.md",
    content: `# Segurança — Base44 Platform

## Visão Geral

A seção **Segurança** do painel gerencia Row-Level Security (RLS), permissões e configurações de autenticação da aplicação.

## Row-Level Security (RLS)

RLS é o mecanismo que restringe quais usuários podem criar/ler/atualizar/deletar registros de cada entidade. É configurado por entidade, sob a chave \`rls\` em \`base44/entities/<EntityName>.jsonc\`.

### Operações Suportadas

| Operação  | Descrição                          |
|-----------|------------------------------------|
| \`create\`  | Quem pode criar registros          |
| \`read\`    | Quem pode ler registros            |
| \`update\`  | Quem pode atualizar registros      |
| \`delete\`  | Quem pode deletar registros        |

### Padrões Comuns

#### 1. Propriedade (Ownership)
Usuário só vê/edita seus próprios registros:
\`\`\`jsonc
{
  "rls": {
    "read": "created_by_id == user.id",
    "update": "created_by_id == user.id",
    "delete": "created_by_id == user.id"
  }
}
\`\`\`

#### 2. Papel (Role)
Apenas admins podem modificar:
\`\`\`jsonc
{
  "rls": {
    "read": "true",
    "update": "user.role == 'admin'",
    "delete": "user.role == 'admin'"
  }
}
\`\`\`

#### 3. Multi-tenant (Isolamento por Tenant)
\`\`\`jsonc
{
  "rls": {
    "read": "tenant_id == user.tenant_id",
    "update": "tenant_id == user.tenant_id",
    "delete": "tenant_id == user.tenant_id && user.role == 'admin'"
  }
}
\`\`\`

### Regras Importantes

- Uma regra **muito restritiva** pode bloquear o próprio usuário de acessar seus dados
- Uma regra **muito permissiva** (ou ausente) deixa registros acessíveis a qualquer usuário autenticado
- **Writes abertos** são o erro mais comum de segurança
- Sempre testar regras RLS após configurar

## Autenticação

A plataforma Base44 gerencia **toda** a autenticação:

- **Tokens** e sessões gerenciados automaticamente
- **Verificação de e-mail** integrada
- **Login** fornecido pela plataforma — nunca criar página de login
- **Logout** via \`base44.auth.logout()\`

### SDK de Auth

\`\`\`javascript
// Usuário atual
const user = await base44.auth.me();

// Verificar autenticação
const isAuth = await base44.auth.isAuthenticated();

// Atualizar próprios dados
await base44.auth.updateMe({ custom_field: "valor" });

// Logout
await base44.auth.logout(redirectUrl);

// Redirecionar para login
await base44.auth.redirectToLogin(nextUrl);
\`\`\`

## Segurança de Usuários

- Apenas **admins** podem listar, atualizar e deletar outros usuários
- Usuários comuns só veem seus próprios dados
- Não adicionar RLS customizado ao User a menos que explicitamente solicitado

## Neste Projeto

O projeto **Celular Interativo Forja da Consciência** utiliza um \`AuthContext\` simplificado que:

- Remove dependências de rede para funcionar offline
- Não depende de chamadas de rede para a plataforma Base44
- Mantém compatibilidade com a estrutura de rotas e providers

### Informações Médicas de Emergência (ICE)

O app inclui um sistema de **Informações Médicas de Emergência** acessível na tela de bloqueio:

- Dados persistidos em LocalStorage (\`fc_medical_info\`)
- Acessível sem desbloquear o telefone
- Inclui: nome, tipo sanguíneo, alergias, medicações, contatos de emergência
- Disponível na tela de bloqueio (\`TelaBloqueio.jsx\`)

### Considerações de Segurança Offline

- Dados são armazenados localmente no dispositivo
- Não há transmissão de dados para servidores externos
- O Service Worker garante funcionamento offline
- A limpeza de dados pode ser feita limpando o LocalStorage do navegador`
  },
  {
    name: "Código",
    file: "Codigo.md",
    content: `# Código — Base44 Platform

## Visão Geral

A seção **Código** do painel é o editor integrado onde todos os arquivos do projeto são gerenciados. O projeto segue a estrutura padrão do Vite + React.

## Estrutura de Arquivos

\`\`\`
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
\`\`\`

## Convenções de Código

### Importações
- Usar alias \`@/\` para imports (nunca caminhos relativos \`src/\`)
- \`cn\` vem de \`@/lib/utils\`
- \`createPageUrl\` vem de \`@/utils\`
- shadcn/ui: importar cada componente de seu próprio arquivo

### Componentes
- Exportar cada página/componente como \`default\`, com mesmo nome do arquivo
- Arquivos focados: componentes de 50 linhas ou menos
- Cada novo componente/page em seu próprio arquivo

### Estilo
- Tailwind CSS para styling
- Classes Tailwind como strings literais (não dinâmicas)
- Design tokens em \`src/index.css\` mapeados em \`tailwind.config.js\`
- Usar classes mapeadas (\`bg-primary\`, \`font-heading\`), nunca valores hardcoded

### Ícones
- \`lucide-react\` apenas
- Apenas ícones que existem — um ícone inexistente quebra o app inteiro

### ESM
- **Apenas ESM** — nunca \`require()\` ou \`module.exports\`
- Vite ESM project: \`require\` não está definido em runtime

## Roteamento (App.jsx)

\`\`\`jsx
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
\`\`\`

### Regras de Roteamento
- \`<Routes>\` contém **apenas** elementos \`<Route>\`
- Página principal em \`"/"\` (não duplicar)
- Cada nova página = um novo \`<Route>\`
- Preservar wrappers da plataforma (AuthProvider, QueryClientProvider, Router, Toaster)

## Neste Projeto

O projeto **Celular Interativo Forja da Consciência** contém:

### Páginas Principais
- \`Inicio.jsx\` — Tela de boas-vindas
- \`TelaBloqueio.jsx\` — Tela de bloqueio com ICE
- \`TelaInicial.jsx\` — Tela inicial (dashboard)
- \`Home.jsx\` — Home alternativa
- \`Telefone.jsx\` — Tutorial de telefone
- \`Contatos.jsx\` — Tutorial de contatos
- \`Relogio.jsx\` — App de relógio/alarmes
- \`Configuracoes.jsx\` — Configurações
- \`VozConfig.jsx\` — Configuração de voz
- \`InfoMedicas.jsx\` — Informações médicas

### Apps Simulados
- \`AppTelefone.jsx\`, \`AppMensagens.jsx\`, \`AppCamera.jsx\`
- \`AppGaleria.jsx\`, \`AppWhatsApp.jsx\`, \`AppRelogio.jsx\`
- \`AppCalculadora.jsx\`, \`AppConfiguracoes.jsx\`, \`AppDicas.jsx\`

### Componentes
- \`PhoneFrame.jsx\` — Moldura de smartphone
- \`StatusBar.jsx\` — Barra de status
- \`PainelRapido.jsx\` — Painel de configurações rápidas
- \`QuickPanel.jsx\` — Painel rápido alternativo

### Guias WhatsApp (40+ páginas)
- \`ConversasGuia.jsx\`, \`LigacoesGuia.jsx\`, \`CameraWhatsApp.jsx\`
- \`ConfiguracoesWhatsApp.jsx\`, \`AjudaWhatsApp.jsx\`, etc.`
  },
  {
    name: "Agentes",
    file: "Agentes.md",
    content: `# Agentes — Base44 Platform

## Visão Geral

A seção **Agentes** do painel gerencia **agentes de IA in-app** — assistentes inteligentes que podem acessar dados da aplicação, chamar funções de backend e executar workflows complexos.

## O que é um Agente

Um agente é um arquivo de configuração JSON em \`base44/agents/\` que define:

- **Personalidade** e instruções do sistema
- **Permissões** de acesso a entidades e funções
- **Canais** de comunicação (WhatsApp, Telegram, in-app)
- **Ferramentas** disponíveis (CRUD de entidades, funções de backend, conectores)

## Quando Usar Agentes

| Situação                          | Usar Agente? |
|-----------------------------------|--------------|
| Chatbot de suporte sobre dados     | ✅ Sim        |
| Assistente de WhatsApp            | ✅ Sim        |
| Relatórios de IA agendados         | ✅ Sim        |
| Resposta simples de LLM           | ❌ Use InvokeLLM |
| Acesso a dados + lógica complexa  | ✅ Sim        |

> \`InvokeLLM\` é mais leve para chamadas simples. Agentes são para tarefas que precisam de acesso a entidades, funções de backend e workflows.

## Configuração de um Agente

\`\`\`jsonc
// base44/agents/SupportAgent.jsonc
{
  "name": "SupportAgent",
  "description": "Assistente de suporte para usuários",
  "system_prompt": "Você é um assistente de suporte...",
  "model": "claude_sonnet_4_6",
  "tools": {
    "entities": {
      "Task": ["read", "create"],
      "User": ["read"]
    },
    "backend_functions": {
      "generateReport": {
        "description": "Gera relatório de uso"
      }
    }
  },
  "channels": {
    "in_app": true,
    "whatsapp": false,
    "telegram": false
  }
}
\`\`\`

## Permissões de Agente

Os agentes precisam de permissões explícitas para:

| Tipo               | Descrição                                    |
|--------------------|----------------------------------------------|
| \`entity\`           | Acesso a operações CRUD de entidades         |
| \`backend_function\` | Permissão para chamar funções de backend     |
| \`app_user_connector\` | Criar links de conexão para conectores     |

### Operações de Entidade

- \`create\` — Criar registros
- \`read\` — Ler registros
- \`update\` — Atualizar registros
- \`delete\` — Deletar registros

## Canais

| Canal      | Descrição                                    |
|------------|----------------------------------------------|
| \`in_app\`   | Conversa dentro do app (requer UI de chat)  |
| \`whatsapp\` | Bot de WhatsApp (requer configuração)       |
| \`telegram\` | Bot de Telegram (requer configuração)       |

## UI de Conversa

Para que um agente seja utilizável fora do painel, é necessária uma **UI de conversa in-app**. Padrões comuns:

- Componente de chat com histórico de mensagens
- Input de texto + botão de envio
- Indicadores de digitação
- Renderização de respostas em markdown

## Workflows com Agentes

Agentes podem ser pareados com workflows para comportamento proativo:

- **Agendado**: Agente executa tarefa em intervalos regulares
- **Event-triggered**: Agente reage a eventos (criação de registro, webhook, etc.)

## Neste Projeto

O projeto **Celular Interativo Forja da Consciência** **não utiliza agentes de IA** da Base44, pois funciona 100% offline. A inteligência do app é baseada em:

- **Web Speech API** — narração por voz nos tutoriais
- **Lógica determinística** — sequências de tutorial pré-definidas
- **Animações visuais** — pulsos para guiar interações

> Para uma versão futura com agentes, poderia ser implementado um agente que:
> - Responde dúvidas sobre como usar o smartphone
> - Sugere tutoriais baseados no progresso do usuário
> - Auxilia na configuração de informações médicas de emergência`
  },
  {
    name: "Fluxos de Trabalho",
    file: "Fluxos-de-trabalho.md",
    content: `# Fluxos de Trabalho — Base44 Platform

## Visão Geral

A seção **Fluxos de Trabalho** (Workflows) do painel gerencia automações multi-etapa orientadas por gatilhos. Workflows permitem implementar lógica do tipo "quando X acontece, faça Y".

## O que é um Workflow

Um workflow é um arquivo \`.jsonc\` em \`base44/workflows/\` que define:

- **Gatilho** — o que inicia o workflow
- **Passos** — sequência de ações (call, wait, switch)
- **Transições** — como passar de um passo ao próximo
- **Dados** — threading de dados entre passos

## Gatilhos (Triggers)

| Gatilho           | Descrição                                              |
|-------------------|--------------------------------------------------------|
| \`scheduled\`       | Cron, intervalo fixo, ou instante futuro único         |
| \`entity\`          | Quando um registro de entidade é criado/atualizado/deletado |
| \`connector\`       | Webhook de conector autorizado (Slack, Google, etc.)  |
| \`in_app_agent\`    | Quando uma conversa com agente in-app começa           |
| \`app_user_auth\`   | Quando um usuário se cadastra ou faz login             |
| \`app_publish\`     | Quando o app é publicado pelo builder                   |

## Atividades (Activities)

| Atividade                | Descrição                                              |
|--------------------------|--------------------------------------------------------|
| \`compute_seconds_until\`  | Calcula segundos até um datetime (para wait dinâmico)  |
| \`invoke_backend_function\`| Executa uma função de backend deployada               |

## Tipos de Passo (Task Types)

### 1. \`call\` — Invocar atividade
\`\`\`jsonc
{
  "type": "call",
  "activity": "invoke_backend_function",
  "with": {
    "function_name": "sendReminder",
    "payload": { "user_id": "\${.user_id}" }
  },
  "then": "next_step"
}
\`\`\`

### 2. \`wait\` — Pausar (durável, sobrevive a restarts)
\`\`\`jsonc
{
  "type": "wait",
  "duration": "PT1H",
  "then": "send_notification"
}
\`\`\`

### 3. \`switch\` — Branch condicional
\`\`\`jsonc
{
  "type": "switch",
  "cases": [
    { "when": "\${ .status == 'active' }", "then": "handle_active" },
    { "when": "\${ .status == 'pending' }", "then": "handle_pending" },
    { "when": "\${ true }", "then": "default_handler" }
  ]
}
\`\`\`

## Formato CNCF SWF

Os workflows seguem o formato **CNCF Serverless Workflow v1.0**:

\`\`\`jsonc
{
  "document": {
    "dsl": "1.0.0",
    "namespace": "default",
    "name": "ReminderWorkflow",
    "version": "1.0.0"
  },
  "do": [
    {
      "name": "wait_until_time",
      "type": "wait",
      "duration": "\${ .wait_duration }"
    },
    {
      "name": "send_reminder",
      "type": "call",
      "activity": "invoke_backend_function",
      "with": {
        "function_name": "sendNotification"
      }
    }
  ]
}
\`\`\`

## Exemplos de Uso

### 1. Lembrete Diário de Medicação
\`\`\`
Gatilho: scheduled (diário às 08:00)
Passos:
  1. call: invoke_backend_function (buscar usuários com alarme)
  2. switch: para cada usuário
  3. call: invoke_backend_function (enviar notificação)
\`\`\`

### 2. Notificação de Novo Usuário
\`\`\`
Gatilho: entity (User created)
Passos:
  1. call: invoke_backend_function (enviar e-mail de boas-vindas)
  2. call: invoke_backend_function (criar registro de onboarding)
\`\`\`

### 3. Relatório Semanal
\`\`\`
Gatilho: scheduled (semanal às segundas 09:00)
Passos:
  1. call: invoke_backend_function (gerar relatório)
  2. call: invoke_backend_function (enviar por e-mail)
\`\`\`

## Gerenciamento de Workflows

| Ação        | Descrição                                    |
|-------------|----------------------------------------------|
| \`activate\`  | Ativa workflow pausado (gatilhos entram em vigor) |
| \`deactivate\`| Pausa workflow (para gatilhos, mantém definição) |
| \`archive\`   | Soft-delete (remove gatilhos e arquivo)     |
| \`unarchive\` | Restaura workflow arquivado                   |

## Neste Projeto

O projeto **Celular Interativo Forja da Consciência** **não utiliza workflows** da Base44, pois funciona offline. A automação de alarmes de medicação é implementada localmente:

- \`Relogio.jsx\` — Gerencia alarmes via \`setInterval\` e LocalStorage
- Alarmes disparados usam \`speechSynthesis\` para narração por voz
- Não há dependência de backend para funcionalidade de alarmes

> Para uma versão com backend, poderia ser implementado um workflow que:
> - Dispara lembretes de medicação em horários agendados
> - Envia notificações push quando o app está em segundo plano
> - Gera relatórios de progresso do tutorial`
  },
  {
    name: "Logs",
    file: "Logs.md",
    content: `# Logs — Base44 Platform

## Visão Geral

A seção **Logs** do painel exibe logs de execução da aplicação, incluindo:

- Logs de funções de backend
- Logs de execução de workflows
- Logs de agentes de IA
- Erros de runtime
- Logs de integrações

## Tipos de Logs

### 1. Logs de Funções de Backend
Cada execução de função de backend (\`base44/functions/*/entry.ts\`) gera logs que incluem:
- Payload de entrada
- Resposta de saída
- Erros (se houver)
- Tempo de execução
- Logs customizados via \`console.log\`/\`console.error\`

### 2. Logs de Workflows
Cada execução de workflow gera um registro detalhado:
- Versão da definição executada
- Passo-a-passo da execução
- Dados threading entre passos
- Erros e transições
- Duração total

### 3. Logs de Agentes
Conversas com agentes de IA geram logs:
- Mensagens do usuário
- Respostas do agente
- Chamadas de ferramentas
- Tokens consumidos

### 4. Logs de Integrações
Chamadas a integrações (InvokeLLM, UploadFile, etc.) geram logs:
- Endpoint chamado
- Parâmetros enviados
- Resposta recebida
- Créditos consumidos

## Debugging

### Funções de Backend
\`\`\`typescript
// base44/functions/myFunc/entry.ts
export default async function(req: Request): Promise<Response> {
  console.log('Payload recebido:', req.body);
  // ... lógica ...
  console.log('Resultado:', result);
  return Response.json(result);
}
\`\`\`

### Workflows
Use \`get_workflow_run\` para inspecionar execuções:
1. Listar execuções recentes (sem \`run_id\`)
2. Carregar detalhes completos (com \`run_id\`)
3. Ver log passo-a-passo
4. Ver versão da definição executada
5. Verificar se o workflow foi atualizado desde a execução

### Teste de Funções
\`\`\`javascript
// Testar função de backend
test_backend_function({
  function_name: "myFunc",
  payload: { key: "value" },
  log_level: "all" // all | error | warn | info
});
\`\`\`

## Níveis de Log

| Nível   | Descrição                          |
|---------|------------------------------------|
| \`error\` | Apenas erros                      |
| \`warn\`  | Erros e avisos                     |
| \`info\`  | Erros, avisos e informações        |
| \`all\`   | Todos os logs                      |

## Neste Projeto

O projeto **Celular Interativo Forja da Consciência** funciona offline e não gera logs na plataforma Base44. A depuração é feita via:

### Console do Navegador
\`\`\`javascript
// Logs de debug em desenvolvimento
console.log('Tutorial step:', currentStep);
console.log('Contatos salvos:', contacts);
console.error('Erro ao acessar LocalStorage:', error);
\`\`\`

### LocalStorage Inspection
Os dados persistidos podem ser inspecionados via DevTools:
- Chrome: Application → Local Storage
- Firefox: Storage → Local Storage

### Chaves de LocalStorage
| Chave                    | Conteúdo                              |
|--------------------------|---------------------------------------|
| \`fc_contacts\`            | Contatos                              |
| \`fc_medical_info\`        | Informações médicas                   |
| \`fc_alarms\`              | Alarmes                               |
| \`fc_blocked_numbers\`     | Números bloqueados                    |
| \`fc_voice_config\`        | Configuração de voz                   |
| \`fc_tutorial_completed\`  | Progresso do tutorial                 |

### Service Worker Logs
\`\`\`javascript
// public/service-worker.js
console.log('Service Worker registrado');
console.log('Cache atualizado');
\`\`\``
  },
  {
    name: "API",
    file: "API.md",
    content: `# API — Base44 Platform

## Visão Geral

A seção **API** do painel gerencia endpoints, chaves de API e funções de backend da aplicação.

## Funções de Backend

Funções de backend são **HTTP handlers** em \`base44/functions/{functionName}/entry.ts\`, usados para integrações com APIs externas que não têm conector built-in.

### Estrutura de uma Função

\`\`\`typescript
// base44/functions/myFunc/entry.ts
export default async function(req: Request): Promise<Response> {
  const { body } = req;

  // Lógica da função
  const result = await fetch('https://api.externa.com/data', {
    method: 'POST',
    headers: { 'Authorization': \`Bearer \${process.env.API_KEY}\` },
    body: JSON.stringify(body)
  });

  const data = await result.json();
  return Response.json(data);
}
\`\`\`

### Prioridade de Integração

1. **Conectores de App** — quando um conector suporta o serviço, use-o exclusivamente
2. **Funções de backend com secrets** — quando conectores não cobrem o serviço

### Secrets

Funções que precisam de API keys/secrets seguem o fluxo de secrets:

1. Declarar secrets necessários via \`set_secrets\`
2. O usuário fornece os valores de forma segura (out-of-band)
3. A função acessa via variáveis de ambiente

\`\`\`typescript
// Exemplo de uso de secret
const apiKey = process.env.EXTERNAL_API_KEY;
\`\`\`

### Invocação do Frontend

\`\`\`javascript
import { base44 } from '@/api/base44Client';

const result = await base44.functions.invoke('myFunc', {
  param1: 'value1',
  param2: 'value2'
});
\`\`\`

## SDK Base44

O SDK (\`@base44/sdk\`) é pré-inicializado em \`src/api/base44Client.js\`:

\`\`\`javascript
import { base44 } from '@/api/base44Client';

// Entidades
base44.entities.EntityName.list();
base44.entities.EntityName.filter(query, sort, limit);
base44.entities.EntityName.create(data);
base44.entities.EntityName.update(id, data);
base44.entities.EntityName.delete(id);

// Integrações
base44.integrations.Core.InvokeLLM({ prompt: "..." });
base44.integrations.Core.UploadFile({ file });
base44.integrations.Core.GenerateImage({ prompt });
base44.integrations.Core.SendEmail({ to, subject, body });

// Auth
base44.auth.me();
base44.auth.isAuthenticated();
base44.auth.logout();
base44.auth.redirectToLogin();

// Users
base44.users.inviteUser(email, role);

// Analytics
base44.analytics.track({ eventName: "..." });

// Conectores (OAuth)
base44.asServiceRole.connectors.getConnection('<type>');
\`\`\`

## Modos de Acesso ao SDK

| Modo              | Descrição                                    |
|-------------------|----------------------------------------------|
| \`asUser\`          | Operações em nome do usuário atual (padrão)   |
| \`asServiceRole\`   | Operações com privilégios de serviço (admin) |

### Exemplo: Service Role
\`\`\`javascript
const items = await base44.asServiceRole.entities.Leads.filter({ status: 'active' });
return { count: items.length, names: items.map(i => i.name) };
\`\`\`

## Endpoints REST

Cada entidade expõe automaticamente endpoints REST:

| Método   | Endpoint                  | Descrição                |
|----------|---------------------------|--------------------------|
| \`GET\`    | \`/api/entities/{name}\`    | Listar registros         |
| \`GET\`    | \`/api/entities/{name}/{id}\`| Obter registro           |
| \`POST\`   | \`/api/entities/{name}\`    | Criar registro           |
| \`PUT\`    | \`/api/entities/{name}/{id}\`| Atualizar registro      |
| \`DELETE\` | \`/api/entities/{name}/{id}\`| Deletar registro        |

## Webhooks

Conectores que suportam webhooks podem disparar workflows:

1. Autorizar o conector
2. Criar workflow com gatilho \`connector\`
3. O webhook dispara o workflow em eventos externos

## Neste Projeto

O projeto **Celular Interativo Forja da Consciência** funciona offline e substitui a API da Base44 por uma camada local:

### Cliente Mock (\`src/api/base44Client.js\`)
- Redireciona operações de entidades para LocalStorage
- Remove dependências de rede
- Mantém compatibilidade com a interface do SDK

### Função de Banco Local (\`base44/functions/localStorageDb/entry.ts\`)
- Implementa operações CRUD via LocalStorage
- Gerencia chaves e serialização
- Fornece interface compatível com entidades Base44

### Scripts de Conversão Standalone
- \`limpar-e-buildar.py\` — Remove referências Base44
- \`converter-standalone.bat\` — Build universal standalone
- \`INSTRUCOES_CONVERTER.txt\` — Instruções de conversão`
  },
  {
    name: "Configurações",
    file: "Configuracoes.md",
    content: `# Configurações — Base44 Platform

## Visão Geral

A seção **Configurações** do painel gerencia as configurações gerais da aplicação, incluindo nome, descrição, ambiente, e opções de publicação.

## Configuração do App (\`base44/config.jsonc\`)

\`\`\`jsonc
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
\`\`\`

## Configuração de Páginas (\`src/pages.config.js\`)

> **Nota**: \`pages.config.js\` **não é mais auto-gerado** para este app. O \`App.jsx\` pode ter um loop de \`pagesConfig\` que renderiza rotas — esse loop contém apenas páginas **antigas**. Novas páginas **não aparecem** em \`pagesConfig\`.

### Regras de Roteamento
- Cada nova rota deve ser adicionada como um \`<Route>\` separado ao lado do loop existente
- O loop \`pagesConfig\` pode envolver cada página em um componente de layout
- Novas rotas fora do loop **não recebem** esse wrapping automaticamente
- Verificar como o loop envolve as páginas e aplicar o mesmo wrapper às novas rotas

## Configuração do Vite (\`vite.config.js\`)

\`\`\`javascript
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
\`\`\`

## Configuração do Tailwind (\`tailwind.config.js\`)

\`\`\`javascript
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
\`\`\`

## Design Tokens (\`src/index.css\`)

\`\`\`css
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
\`\`\`

### Alterar Tema
1. Atualizar valores em \`src/index.css\` (ambos \`:root\` e \`.dark\`)
2. Usar classes mapeadas no JSX (\`bg-primary\`, \`font-heading\`)
3. Nunca usar valores hardcoded (\`bg-[#ffffff]\`, \`bg-white\`)

## Configuração PWA

### Manifest (\`public/manifest.json\`)
\`\`\`json
{
  "name": "Celular Interativo Forja da Consciência",
  "short_name": "Forja",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#0EA5E9",
  "theme_color": "#0EA5E9",
  "icons": [...]
}
\`\`\`

### Service Worker (\`public/service-worker.js\`)
- Cache de assets estáticos
- Funcionamento offline
- Estratégia cache-first para assets

### Meta Tags PWA (injetadas via \`Layout.jsx\`)
\`\`\`javascript
const metaTags = [
  { name: 'mobile-web-app-capable', content: 'yes' },
  { name: 'apple-mobile-web-app-capable', content: 'yes' },
  { name: 'apple-mobile-web-app-status-bar-style', content: 'black-translucent' },
  { name: 'apple-mobile-web-app-title', content: 'Forja da Consciência' },
  { name: 'theme-color', content: '#0EA5E9' },
];
\`\`\`

## Configuração de Pacotes NPM (\`package.json\`)

### Pacotes Instalados
- React 18, react-dom, react-router-dom
- Tailwind CSS, shadcn/ui (Radix UI), lucide-react
- framer-motion, recharts, react-leaflet, three.js
- @tanstack/react-query, react-hook-form
- jspdf, html2canvas (para documentação)
- @base44/sdk, @base44/vite-plugin

### Instalar Novo Pacote
Apenas quando o usuário solicitar explicitamente:
\`\`\`json
[
  { "name": "axios", "semver": "^1.6.0" }
]
\`\`\`

## Configuração de Build Standalone

O projeto inclui scripts para gerar uma versão standalone (sem Base44):

### \`limpar-e-buildar.py\`
- Remove imports do \`@base44/sdk\`
- Remove dependências de rede
- Gera rotas React Router a partir dos arquivos de página
- Configura LocalStorage como persistência

### \`converter-standalone.bat\`
- Verifica ambiente (Node.js, Python)
- Instala dependências automaticamente
- Executa build de produção
- Gera pasta standalone para deploy

## Publicação

### Web (Base44)
- Publicar via painel da Base44
- Recebe domínio \`*.base44.app\`
- Pode configurar domínio personalizado

### iOS/Android
- Mesmo código-fonte React
- Empacotamento via plataforma Base44
- Publicação nas lojas (App Store, Google Play)

### Standalone
- Build via script \`.bat\`
- Deploy em qualquer servidor estático
- Funciona 100% offline`
  },
];