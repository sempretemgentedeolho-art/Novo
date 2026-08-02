# Análises — Base44 Platform

## Visão Geral

A seção **Análises** do painel exibe métricas de uso da aplicação, eventos customizados e dados de telemetria coletados automaticamente pela plataforma.

## Eventos Customizados

A Base44 permite rastrear eventos customizados para entender o comportamento dos usuários:

```javascript
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
```

## Boas Práticas

- Use nomes de eventos **indicativos** (ex: `user_contact_form_submit`, `tutorial_started`)
- Mantenha as propriedades **mínimas** — apenas o necessário
- **Nunca** inclua PII (dados pessoais identificáveis)
- Tipos suportados nas propriedades: `string`, `number`, `boolean`, `null`

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

```javascript
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
```

> **Nota**: Como o projeto funciona offline com LocalStorage, os eventos de analytics são coletados quando o dispositivo tem conectividade. Em modo standalone, a telemetria pode não ser enviada.