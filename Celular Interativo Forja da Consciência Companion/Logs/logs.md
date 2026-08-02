# Logs — Base44 Platform

## Visão Geral

A seção **Logs** do painel exibe logs de execução da aplicação, incluindo:

- Logs de funções de backend
- Logs de execução de workflows
- Logs de agentes de IA
- Erros de runtime
- Logs de integrações

## Tipos de Logs

### 1. Logs de Funções de Backend
Cada execução de função de backend (`base44/functions/*/entry.ts`) gera logs que incluem:
- Payload de entrada
- Resposta de saída
- Erros (se houver)
- Tempo de execução
- Logs customizados via `console.log`/`console.error`

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
```typescript
// base44/functions/myFunc/entry.ts
export default async function(req: Request): Promise<Response> {
  console.log('Payload recebido:', req.body);
  // ... lógica ...
  console.log('Resultado:', result);
  return Response.json(result);
}
```

### Workflows
Use `get_workflow_run` para inspecionar execuções:
1. Listar execuções recentes (sem `run_id`)
2. Carregar detalhes completos (com `run_id`)
3. Ver log passo-a-passo
4. Ver versão da definição executada
5. Verificar se o workflow foi atualizado desde a execução

### Teste de Funções
```javascript
// Testar função de backend
test_backend_function({
  function_name: "myFunc",
  payload: { key: "value" },
  log_level: "all" // all | error | warn | info
});
```

## Níveis de Log

| Nível   | Descrição                          |
|---------|------------------------------------|
| `error` | Apenas erros                      |
| `warn`  | Erros e avisos                     |
| `info`  | Erros, avisos e informações        |
| `all`   | Todos os logs                      |

## Neste Projeto

O projeto **Celular Interativo Forja da Consciência** funciona offline e não gera logs na plataforma Base44. A depuração é feita via:

### Console do Navegador
```javascript
// Logs de debug em desenvolvimento
console.log('Tutorial step:', currentStep);
console.log('Contatos salvos:', contacts);
console.error('Erro ao acessar LocalStorage:', error);
```

### LocalStorage Inspection
Os dados persistidos podem ser inspecionados via DevTools:
- Chrome: Application → Local Storage
- Firefox: Storage → Local Storage

### Chaves de LocalStorage
| Chave                    | Conteúdo                              |
|--------------------------|---------------------------------------|
| `fc_contacts`            | Contatos                              |
| `fc_medical_info`        | Informações médicas                   |
| `fc_alarms`              | Alarmes                               |
| `fc_blocked_numbers`     | Números bloqueados                    |
| `fc_voice_config`        | Configuração de voz                   |
| `fc_tutorial_completed`  | Progresso do tutorial                 |

### Service Worker Logs
```javascript
// public/service-worker.js
console.log('Service Worker registrado');
console.log('Cache atualizado');
``