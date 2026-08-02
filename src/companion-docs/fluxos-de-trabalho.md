# Fluxos de Trabalho — Base44 Platform

## Visão Geral

A seção **Fluxos de Trabalho** (Workflows) do painel gerencia automações multi-etapa orientadas por gatilhos. Workflows permitem implementar lógica do tipo "quando X acontece, faça Y".

## O que é um Workflow

Um workflow é um arquivo `.jsonc` em `base44/workflows/` que define:

- **Gatilho** — o que inicia o workflow
- **Passos** — sequência de ações (call, wait, switch)
- **Transições** — como passar de um passo ao próximo
- **Dados** — threading de dados entre passos

## Gatilhos (Triggers)

| Gatilho           | Descrição                                              |
|-------------------|--------------------------------------------------------|
| `scheduled`       | Cron, intervalo fixo, ou instante futuro único         |
| `entity`          | Quando um registro de entidade é criado/atualizado/deletado |
| `connector`       | Webhook de conector autorizado (Slack, Google, etc.)  |
| `in_app_agent`    | Quando uma conversa com agente in-app começa           |
| `app_user_auth`   | Quando um usuário se cadastra ou faz login             |
| `app_publish`     | Quando o app é publicado pelo builder                   |

## Atividades (Activities)

| Atividade                | Descrição                                              |
|--------------------------|--------------------------------------------------------|
| `compute_seconds_until`  | Calcula segundos até um datetime (para wait dinâmico)  |
| `invoke_backend_function`| Executa uma função de backend deployada               |

## Tipos de Passo (Task Types)

### 1. `call` — Invocar atividade
```jsonc
{
  "type": "call",
  "activity": "invoke_backend_function",
  "with": {
    "function_name": "sendReminder",
    "payload": { "user_id": "${.user_id}" }
  },
  "then": "next_step"
}
```

### 2. `wait` — Pausar (durável, sobrevive a restarts)
```jsonc
{
  "type": "wait",
  "duration": "PT1H",
  "then": "send_notification"
}
```

### 3. `switch` — Branch condicional
```jsonc
{
  "type": "switch",
  "cases": [
    { "when": "${ .status == 'active' }", "then": "handle_active" },
    { "when": "${ .status == 'pending' }", "then": "handle_pending" },
    { "when": "${ true }", "then": "default_handler" }
  ]
}
```

## Formato CNCF SWF

Os workflows seguem o formato **CNCF Serverless Workflow v1.0**:

```jsonc
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
      "duration": "${ .wait_duration }"
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
```

## Exemplos de Uso

### 1. Lembrete Diário de Medicação
```
Gatilho: scheduled (diário às 08:00)
Passos:
  1. call: invoke_backend_function (buscar usuários com alarme)
  2. switch: para cada usuário
  3. call: invoke_backend_function (enviar notificação)
```

### 2. Notificação de Novo Usuário
```
Gatilho: entity (User created)
Passos:
  1. call: invoke_backend_function (enviar e-mail de boas-vindas)
  2. call: invoke_backend_function (criar registro de onboarding)
```

### 3. Relatório Semanal
```
Gatilho: scheduled (semanal às segundas 09:00)
Passos:
  1. call: invoke_backend_function (gerar relatório)
  2. call: invoke_backend_function (enviar por e-mail)
```

## Gerenciamento de Workflows

| Ação        | Descrição                                    |
|-------------|----------------------------------------------|
| `activate`  | Ativa workflow pausado (gatilhos entram em vigor) |
| `deactivate`| Pausa workflow (para gatilhos, mantém definição) |
| `archive`   | Soft-delete (remove gatilhos e arquivo)     |
| `unarchive` | Restaura workflow arquivado                   |

## Neste Projeto

O projeto **Celular Interativo Forja da Consciência** **não utiliza workflows** da Base44, pois funciona offline. A automação de alarmes de medicação é implementada localmente:

- `Relogio.jsx` — Gerencia alarmes via `setInterval` e LocalStorage
- Alarmes disparados usam `speechSynthesis` para narração por voz
- Não há dependência de backend para funcionalidade de alarmes

> Para uma versão com backend, poderia ser implementado um workflow que:
> - Dispara lembretes de medicação em horários agendados
> - Envia notificações push quando o app está em segundo plano
> - Gera relatórios de progresso do tutorial