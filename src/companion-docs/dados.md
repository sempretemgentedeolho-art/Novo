# Dados — Base44 Platform

## Visão Geral

A seção **Dados** do painel gerencia as **entidades** do banco de dados. Entidades são esquemas JSON que definem a estrutura dos dados persistidos. Cada entidade torna-se automaticamente uma coleção no banco de dados com operações CRUD completas.

## Estrutura de uma Entidade

Cada entidade é um arquivo `.jsonc` em `base44/entities/`:

```jsonc
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
```

### Campos Built-in (presentes em todo registro, nunca declarar)

| Campo            | Tipo   | Descrição                          |
|------------------|--------|------------------------------------|
| `id`             | string | Identificador único                |
| `created_date`   | date   | Data de criação                    |
| `updated_date`   | date   | Data da última atualização         |
| `created_by_id`  | string | ID do usuário que criou o registro |

## Tipos de Campos Suportados

| Tipo       | Uso                                    |
|------------|----------------------------------------|
| `string`   | Texto                                  |
| `number`   | Números                                |
| `boolean`  | Verdadeiro/falso                       |
| `date`     | Datas (`format: "date"`)               |
| `array`    | Listas                                 |
| `object`   | Objetos aninhados                      |
| `enum`     | Valores enumerados                     |

## SDK de Entidades

```javascript
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
```

## Subscrições em Tempo Real

```javascript
useEffect(() => {
  const unsubscribe = base44.entities.Task.subscribe((event) => {
    // event: { id, type: 'create'|'update'|'delete', data }
    // Atualizar estado local a partir do evento
  });
  return unsubscribe;
}, []);
```

## Limitações

- **Nunca** armazenar conteúdo grande (base64, PDFs, blobs) em campos de entidade — usar `UploadFile` e armazenar a `file_url`
- Campos oversized quebram operações de registro
- `updateMany` e `deleteMany` suportam até 500 registros por chamada

## Neste Projeto

O projeto **Celular Interativo Forja da Consciência** utiliza **LocalStorage** em vez do banco de dados Base44 para funcionar offline. A camada de persistência local está em:

- `src/api/base44Client.js` — Cliente mock que redireciona operações para LocalStorage
- `base44/functions/localStorageDb/entry.ts` — Lógica de banco de dados local

### Dados Persistidos Localmente

| Chave LocalStorage       | Conteúdo                              |
|--------------------------|---------------------------------------|
| `fc_contacts`            | Lista de contatos                     |
| `fc_medical_info`        | Informações médicas de emergência     |
| `fc_alarms`              | Alarmes de medicação                  |
| `fc_blocked_numbers`     | Números bloqueados                    |
| `fc_voice_config`        | Configuração de voz                   |
| `fc_tutorial_completed`  | Progresso do tutorial                 |