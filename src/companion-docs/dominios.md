# Domínios — Base44 Platform

## Visão Geral

A seção **Domínios** do painel gerencia a configuração de domínios personalizados para a aplicação publicada.

## Domínio Padrão

Toda aplicação Base44 recebe um domínio padrão no formato:
```
https://[app-name].base44.app
```

## Domínios Personalizados

É possível configurar um domínio próprio (ex: `meuapp.com.br`) apontando os registros DNS para a Base44.

### Passos Típicos

1. **Registrar domínio** em um provedor (Registro.br, GoDaddy, etc.)
2. **Configurar DNS**:
   - Registro A ou CNAME apontando para a Base44
   - Verificação de propriedade do domínio
3. **SSL/TLS** é provisionado automaticamente pela plataforma
4. **Propagação DNS** pode levar até 48 horas

## Configuração no index.html

O `index.html` pode conter a URL canônica do domínio:

```html
<link rel="canonical" href="https://meudominio.com.br/" />
```

> **Nota**: A URL canônica não é injetada automaticamente — deve ser configurada manualmente no `index.html`.

## Neste Projeto

O projeto **Celular Interativo Forja da Consciência** é projetado para funcionar **offline** como um app standalone. A configuração de domínio é relevante apenas para a versão web publicada na Base44.

### Versão Standalone (Android)

O projeto inclui scripts para gerar uma versão standalone que não depende da Base44:

- `limpar-e-buildar.py` — Remove referências da Base44 e gera rotas React Router
- `converter-standalone.bat` — Script de build universal
- A versão standalone usa apenas LocalStorage, sem necessidade de domínio

### Versão Web (Base44)

Se publicada na Base44, o app recebe automaticamente um domínio `*.base44.app` e pode ser configurado com domínio personalizado através do painel.