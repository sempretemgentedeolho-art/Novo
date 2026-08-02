# Usuários — Base44 Platform

## Visão Geral

A seção **Usuários** do painel de controle da Base44 gerencia todos os usuários da aplicação. A plataforma possui um sistema de autenticação completo, gerenciado automaticamente — não é necessário implementar lógica de auth no backend.

## Entidade User

O `User` é uma entidade **built-in** (nativa) presente em toda aplicação Base44. Não é necessário criá-la — ela já existe.

### Campos Built-in (somente leitura)

| Campo           | Tipo   | Descrição                              |
|-----------------|--------|----------------------------------------|
| `id`            | string | Identificador único                    |
| `created_date`  | date   | Data de criação                        |
| `full_name`     | string | Nome completo                          |
| `email`         | string | E-mail do usuário                      |

### Campos Editáveis

| Campo  | Tipo   | Descrição                                    |
|--------|--------|----------------------------------------------|
| `role` | string | Papel: `'admin'` ou `'user'` (padrão)        |

> O campo `role` pode ser customizado livremente editando `base44/entities/User.jsonc`.

## Papéis (Roles)

| Papel  | Permissões                                              |
|--------|--------------------------------------------------------|
| `admin`| Listar, atualizar e deletar outros usuários; convidar  |
| `user` | Acesso padrão; só pode ver/editar próprios dados       |

## Convite de Usuários

Usuários não são criados diretamente — eles se juntam via **convite por e-mail**:

```javascript
// Convidar um usuário com papel "user"
await base44.users.inviteUser("email@exemplo.com", "user");

// Convidar um usuário com papel "admin"
await base44.users.inviteUser("admin@exemplo.com", "admin");
```

### Regras de Convite

- **App público**: admins podem convidar ambos os papéis; usuários comuns só podem convidar `role="user"`
- O convite envia um e-mail com link de registro
- Não é possível inserir registros de User diretamente (create retorna 405)
- O convite deve ser disparado apenas por usuários autorizados a conceder aquele papel

## SDK de Autenticação

```javascript
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
```

## Segurança de Usuários

- **Apenas admins** podem listar, atualizar e deletar outros usuários
- Usuários comuns só veem seus próprios dados
- Não é necessário adicionar RLS customizado ao User a menos que explicitamente solicitado
- A plataforma gerencia tokens, sessões e verificação de e-mail automaticamente

## Neste Projeto

O projeto **Celular Interativo Forja da Consciência** utiliza um `AuthContext` simplificado (`src/lib/AuthContext.jsx`) que remove dependências de rede para funcionar 100% offline. O contexto:

- Verifica autenticação localmente
- Não depende de chamadas de rede para a plataforma Base44
- Mantém compatibilidade com a estrutura de rotas e providers do app