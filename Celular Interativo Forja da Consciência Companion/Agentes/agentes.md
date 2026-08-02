# Agentes — Base44 Platform

## Visão Geral

A seção **Agentes** do painel gerencia **agentes de IA in-app** — assistentes inteligentes que podem acessar dados da aplicação, chamar funções de backend e executar workflows complexos.

## O que é um Agente

Um agente é um arquivo de configuração JSON em `base44/agents/` que define:

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

> `InvokeLLM` é mais leve para chamadas simples. Agentes são para tarefas que precisam de acesso a entidades, funções de backend e workflows.

## Configuração de um Agente

```jsonc
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
```

## Permissões de Agente

Os agentes precisam de permissões explícitas para:

| Tipo               | Descrição                                    |
|--------------------|----------------------------------------------|
| `entity`           | Acesso a operações CRUD de entidades         |
| `backend_function` | Permissão para chamar funções de backend     |
| `app_user_connector` | Criar links de conexão para conectores     |

### Operações de Entidade

- `create` — Criar registros
- `read` — Ler registros
- `update` — Atualizar registros
- `delete` — Deletar registros

## Canais

| Canal      | Descrição                                    |
|------------|----------------------------------------------|
| `in_app`   | Conversa dentro do app (requer UI de chat)  |
| `whatsapp` | Bot de WhatsApp (requer configuração)       |
| `telegram` | Bot de Telegram (requer configuração)       |

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
> - Auxilia na configuração de informações médicas de emergência