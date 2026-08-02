# API — Base44 Platform

## Visão Geral

A seção **API** do painel gerencia endpoints, chaves de API e funções de backend da aplicação.

## Funções de Backend

Funções de backend são **HTTP handlers** em `base44/functions/{functionName}/entry.ts`, usados para integrações com APIs externas que não têm conector built-in.

### Estrutura de uma Função

```typescript
// base44/functions/myFunc/entry.ts
export default async function(req: Request): Promise<Response> {
  const { body } = req;

  // Lógica da função
  const result = await fetch('https://api.externa.com/data', {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${process.env.API_KEY}` },
    body: JSON.stringify(body)
  });

  const data = await result.json();
  return Response.json(data);
}
```

### Prioridade de Integração

1. **Conectores de App** — quando um conector suporta o serviço, use-o exclusivamente
2. **Funções de backend com secrets** — quando conectores não cobrem o serviço

### Secrets

Funções que precisam de API keys/secrets seguem o fluxo de secrets:

1. Declarar secrets necessários via `set_secrets`
2. O usuário fornece os valores de forma segura (out-of-band)
3. A função acessa via variáveis de ambiente

```typescript
// Exemplo de uso de secret
const apiKey = process.env.EXTERNAL_API_KEY;
```

### Invocação do Frontend

```javascript
import { base44 } from '@/api/base44Client';

const result = await base44.functions.invoke('myFunc', {
  param1: 'value1',
  param2: 'value2'
});
```

## SDK Base44

O SDK (`@base44/sdk`) é pré-inicializado em `src/api/base44Client.js`:

```javascript
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
```

## Modos de Acesso ao SDK

| Modo              | Descrição                                    |
|-------------------|----------------------------------------------|
| `asUser`          | Operações em nome do usuário atual (padrão)   |
| `asServiceRole`   | Operações com privilégios de serviço (admin) |

### Exemplo: Service Role
```javascript
const items = await base44.asServiceRole.entities.Leads.filter({ status: 'active' });
return { count: items.length, names: items.map(i => i.name) };
```

## Endpoints REST

Cada entidade expõe automaticamente endpoints REST:

| Método   | Endpoint                  | Descrição                |
|----------|---------------------------|--------------------------|
| `GET`    | `/api/entities/{name}`    | Listar registros         |
| `GET`    | `/api/entities/{name}/{id}`| Obter registro           |
| `POST`   | `/api/entities/{name}`    | Criar registro           |
| `PUT`    | `/api/entities/{name}/{id}`| Atualizar registro      |
| `DELETE` | `/api/entities/{name}/{id}`| Deletar registro        |

## Webhooks

Conectores que suportam webhooks podem disparar workflows:

1. Autorizar o conector
2. Criar workflow com gatilho `connector`
3. O webhook dispara o workflow em eventos externos

## Neste Projeto

O projeto **Celular Interativo Forja da Consciência** funciona offline e substitui a API da Base44 por uma camada local:

### Cliente Mock (`src/api/base44Client.js`)
- Redireciona operações de entidades para LocalStorage
- Remove dependências de rede
- Mantém compatibilidade com a interface do SDK

### Função de Banco Local (`base44/functions/localStorageDb/entry.ts`)
- Implementa operações CRUD via LocalStorage
- Gerencia chaves e serialização
- Fornece interface compatível com entidades Base44

### Scripts de Conversão Standalone
- `limpar-e-buildar.py` — Remove referências Base44
- `converter-standalone.bat` — Build universal standalone
- `INSTRUCOES_CONVERTER.txt` — Instruções de conversão