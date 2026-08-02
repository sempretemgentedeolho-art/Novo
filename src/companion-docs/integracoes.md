# Integrações — Base44 Platform

## Visão Geral

A seção **Integrações** do painel gerencia conectores OAuth e APIs externas que a aplicação pode utilizar.

## Tipos de Conectores

### 1. Shared (Compartilhado)
O builder conecta sua própria conta; todos os usuários do app compartilham a conexão. Funções de backend agem em nome do builder.

### 2. App User (Por Usuário)
O builder fornece credenciais OAuth (client ID, client secret); cada usuário do app conecta sua própria conta. Funções de backend usam os tokens individuais.

### 3. BYO Shared (Bring Your Own)
O admin do workspace registra seu próprio app OAuth (`OrganizationConnector`); o builder autoriza uma vez; o token é compartilhado entre todos os usuários.

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
| `InvokeLLM`             | Geração de resposta via LLM (GPT, Gemini, Claude)  |
| `UploadFile`            | Upload de arquivo público                          |
| `UploadPrivateFile`     | Upload de arquivo privado                          |
| `CreateFileSignedUrl`   | URL assinada para download de arquivo privado      |
| `ExtractDataFromUploadedFile` | Extração de dados de CSV/Excel/PDF           |
| `GenerateImage`         | Geração de imagem via IA                          |
| `GenerateVideo`         | Geração de vídeo via IA (Google Veo)              |
| `GenerateSpeech`        | Text-to-speech (TTS) com múltiplas vozes          |
| `TranscribeAudio`       | Transcrição de áudio para texto (Whisper)         |
| `SendEmail`             | Envio de e-mail (apenas usuários registrados)     |

### Exemplo: InvokeLLM

```javascript
const res = await base44.integrations.Core.InvokeLLM({
  prompt: "Dê dados sobre a Apple (empresa)",
  add_context_from_internet: true,
  response_json_schema: {
    type: "object",
    properties: { stock_price: { type: "number" } }
  }
});
```

### Modelos Disponíveis

| Modelo              | Uso                              | Custo  |
|---------------------|----------------------------------|--------|
| `automatic`         | Padrão (automático)              | Normal |
| `gpt_5_mini`        | Tarefas simples                  | Normal |
| `gemini_3_flash`    | Web search + visão              | Normal |
| `gpt_5_4`          | Tarefas complexas                | Maior  |
| `claude_sonnet_4_6` | Tarefas complexas                | Maior  |
| `claude_opus_4_8`   | Máxima qualidade                 | Máximo |

> Apenas `gemini_3_flash` e `gemini_3_1_pro` suportam `add_context_from_internet`.

## Neste Projeto

O projeto **Celular Interativo Forja da Consciência** funciona **offline** e não utiliza conectores OAuth. As integrações utilizadas são:

- **Web Speech API** (nativa do navegador) — para narração por voz nos tutoriais
- **LocalStorage** — para persistência de dados offline
- **Service Worker** — para cache e funcionamento offline

> A versão standalone remove todas as dependências de integrações da Base44 para garantir funcionamento 100% offline.