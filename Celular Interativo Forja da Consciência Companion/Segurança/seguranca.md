# Segurança — Base44 Platform

## Visão Geral

A seção **Segurança** do painel gerencia Row-Level Security (RLS), permissões e configurações de autenticação da aplicação.

## Row-Level Security (RLS)

RLS é o mecanismo que restringe quais usuários podem criar/ler/atualizar/deletar registros de cada entidade. É configurado por entidade, sob a chave `rls` em `base44/entities/<EntityName>.jsonc`.

### Operações Suportadas

| Operação  | Descrição                          |
|-----------|------------------------------------|
| `create`  | Quem pode criar registros          |
| `read`    | Quem pode ler registros            |
| `update`  | Quem pode atualizar registros      |
| `delete`  | Quem pode deletar registros        |

### Padrões Comuns

#### 1. Propriedade (Ownership)
Usuário só vê/edita seus próprios registros:
```jsonc
{
  "rls": {
    "read": "created_by_id == user.id",
    "update": "created_by_id == user.id",
    "delete": "created_by_id == user.id"
  }
}
```

#### 2. Papel (Role)
Apenas admins podem modificar:
```jsonc
{
  "rls": {
    "read": "true",
    "update": "user.role == 'admin'",
    "delete": "user.role == 'admin'"
  }
}
```

#### 3. Multi-tenant (Isolamento por Tenant)
```jsonc
{
  "rls": {
    "read": "tenant_id == user.tenant_id",
    "update": "tenant_id == user.tenant_id",
    "delete": "tenant_id == user.tenant_id && user.role == 'admin'"
  }
}
```

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
- **Logout** via `base44.auth.logout()`

### SDK de Auth

```javascript
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
```

## Segurança de Usuários

- Apenas **admins** podem listar, atualizar e deletar outros usuários
- Usuários comuns só veem seus próprios dados
- Não adicionar RLS customizado ao User a menos que explicitamente solicitado

## Neste Projeto

O projeto **Celular Interativo Forja da Consciência** utiliza um `AuthContext` simplificado que:

- Remove dependências de rede para funcionar offline
- Não depende de chamadas de rede para a plataforma Base44
- Mantém compatibilidade com a estrutura de rotas e providers

### Informações Médicas de Emergência (ICE)

O app inclui um sistema de **Informações Médicas de Emergência** acessível na tela de bloqueio:

- Dados persistidos em LocalStorage (`fc_medical_info`)
- Acessível sem desbloquear o telefone
- Inclui: nome, tipo sanguíneo, alergias, medicações, contatos de emergência
- Disponível na tela de bloqueio (`TelaBloqueio.jsx`)

### Considerações de Segurança Offline

- Dados são armazenados localmente no dispositivo
- Não há transmissão de dados para servidores externos
- O Service Worker garante funcionamento offline
- A limpeza de dados pode ser feita limpando o LocalStorage do navegador