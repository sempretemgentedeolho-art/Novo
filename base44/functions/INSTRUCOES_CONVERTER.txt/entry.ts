═══════════════════════════════════════════════════════════
  COMO CONVERTER QUALQUER PROJETO BASE44 PARA STANDALONE
═══════════════════════════════════════════════════════════

📋 PASSO A PASSO:

1. LOCALIZE a pasta RAIZ do projeto
   ➜ É a pasta onde está o arquivo "package.json"
   ➜ Geralmente tem as pastas: src, node_modules, dist
   
   ❌ ERRADO: G:\ebooks\Prontos para a VPS\
   ✅ CERTO:   G:\ebooks\Prontos para a VPS\meu_projeto\

2. COPIE o arquivo "converter-standalone.bat" para essa pasta raiz

3. CLIQUE DUAS VEZES no arquivo "converter-standalone.bat"

4. AGUARDE a conversão (pode demorar 2-5 minutos)

5. ABRA o arquivo "dist/index.html" no navegador

═══════════════════════════════════════════════════════════

✅ FUNCIONA EM:
- Ebook WhatsApp Grátis
- Ebook WhatsApp Premium  
- Ebook WhatsApp Básico
- Qualquer projeto Base44!

═══════════════════════════════════════════════════════════

⚠️ IMPORTANTE:

- Copie o conversor para a PASTA RAIZ (onde tem package.json)
- Você precisa ter Node.js instalado
- O app funcionará 100% offline
- Dados salvos no navegador (localStorage)

═══════════════════════════════════════════════════════════

❓ SE DER ERRO "package.json não encontrado":

Você não está na pasta raiz! Procure a pasta que contém:
- package.json
- pasta "src" 
- pasta "node_modules"

Copie o conversor para ESSA pasta.

═══════════════════════════════════════════════════════════

❓ SE DER ERRO NA COMPILAÇÃO:

Abra o PowerShell na pasta raiz e rode:
   npm install
   npm run build

Se funcionar, o arquivo estará em: dist\index.html

═══════════════════════════════════════════════════════════

📁 ESTRUTURA CORRETA:

meu_projeto\                    ← Pasta raiz (cole aqui!)
├── converter-standalone.bat    ← Arquivo do conversor
├── package.json               
├── src\
│   ├── pages\
│   ├── components\
│   └── functions\
├── node_modules\
└── dist\                       ← Resultado final

═══════════════════════════════════════════════════════════
  EXPORTAR SOMENTE O YOUTUBE + DICAS (versão leve)
═══════════════════════════════════════════════════════════

Use o arquivo "converter-youtube-dicas.bat" quando quiser um
app leve, com APENAS o treinamento do YouTube e o Dicas.

PASSO A PASSO:

1. Copie o "converter-youtube-dicas.bat" para a PASTA RAIZ
   (a mesma pasta onde está o package.json)

2. Clique duas vezes nele

3. Aguarde (2 a 5 minutos). No fim ele mostra "CONCLUIDO!"

4. Abra "dist\index.html" para testar

O QUE ELE FAZ:

- Guarda temporariamente as outras telas (WhatsApp, TikTok,
  Instagram, etc.) fora da pasta src, para que NÃO entrem no
  aplicativo exportado
- Deixa no app somente: Início, Tela de Bloqueio, Tela Inicial
  (Home), YouTube, Dicas e as telas de Configurações/Wi-Fi/
  Bluetooth/Volume que a tela inicial usa
- Compila e gera a pasta "dist" (bem mais leve: cerca de 0,85 MB
  em vez de 1,9 MB)
- No final devolve TODAS as telas para o projeto, igual estava
  antes, para você continuar exportando outras versões depois

IMPORTANTE:

- O visual e o funcionamento são os mesmos: os ícones continuam
  na tela inicial e o app fala qual treinamento faz cada um
- Nada é apagado do projeto: as telas apenas voltam para o lugar
  no fim da conversão
- Se a compilação falhar, o projeto também é devolvido ao normal

═══════════════════════════════════════════════════════════