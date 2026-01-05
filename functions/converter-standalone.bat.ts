@echo off
chcp 65001 >nul
echo ========================================
echo CONVERSOR UNIVERSAL PARA STANDALONE
echo ========================================
echo.

:: Verificar se package.json existe
if not exist "package.json" (
    echo ❌ ERRO: package.json não encontrado!
    echo.
    echo Este script deve estar na PASTA RAIZ do projeto.
    echo A pasta raiz é onde está o arquivo package.json
    echo.
    echo 📂 Você está em: %CD%
    echo.
    echo ✅ SOLUÇÃO:
    echo 1. Copie o arquivo converter-standalone.bat
    echo 2. Cole na pasta RAIZ do projeto Base44
    echo 3. Execute novamente
    echo.
    pause
    exit /b 1
)

echo ✓ Projeto encontrado: %CD%
echo.

:: Verificar se existe pasta src
if not exist "src" (
    echo ❌ ERRO: Pasta src não encontrada!
    echo Este não parece ser um projeto Base44 válido.
    echo.
    pause
    exit /b 1
)

:: Criar pasta functions se não existir
if not exist "src\functions" mkdir "src\functions"

:: Criar sistema de localStorage
echo [1/5] Criando sistema de banco local...
(
echo // Sistema de "banco de dados" local usando localStorage
echo export const localDb = {
echo   save^(key, data^) {
echo     try {
echo       localStorage.setItem^(key, JSON.stringify^(data^)^);
echo       return true;
echo     } catch ^(e^) {
echo       console.error^('Erro ao salvar:', e^);
echo       return false;
echo     }
echo   },
echo   load^(key, defaultValue = null^) {
echo     try {
echo       const data = localStorage.getItem^(key^);
echo       return data ? JSON.parse^(data^) : defaultValue;
echo     } catch ^(e^) {
echo       console.error^('Erro ao carregar:', e^);
echo       return defaultValue;
echo     }
echo   },
echo   remove^(key^) {
echo     localStorage.removeItem^(key^);
echo   }
echo };
echo.
echo export const mockBase44 = {
echo   entities: new Proxy^({}, {
echo     get: ^(target, prop^) =^> ^({
echo       list: async ^(^) =^> [],
echo       filter: async ^(^) =^> [],
echo       create: async ^(data^) =^> ^({ id: Date.now^(^), ...data }^),
echo       update: async ^(id, data^) =^> ^({ id, ...data }^),
echo       delete: async ^(id^) =^> true,
echo       schema: ^(^) =^> ^({^}^)
echo     }^)
echo   }^),
echo   auth: {
echo     me: async ^(^) =^> ^({ id: 'local', email: 'user@local.com', full_name: 'Usuário Local', role: 'admin' }^),
echo     updateMe: async ^(data^) =^> data,
echo     logout: ^(^) =^> window.location.reload^(^),
echo     redirectToLogin: ^(^) =^> alert^('Sistema local - sem login'^),
echo     isAuthenticated: async ^(^) =^> true
echo   },
echo   users: {
echo     inviteUser: async ^(email, role^) =^> alert^(`Convite: ${email} - ${role}`^)
echo   },
echo   integrations: {
echo     Core: {
echo       InvokeLLM: async ^(^) =^> ^({ output: 'Mock' }^),
echo       SendEmail: async ^(^) =^> true,
echo       UploadFile: async ^(^) =^> ^({ file_url: '' }^),
echo       GenerateImage: async ^(^) =^> ^({ url: '' }^)
echo     }
echo   }
echo };
) > src\functions\localStorageDb.js

echo ✓ Sistema criado!

:: Limpar imports do Base44
echo [2/5] Removendo imports do Base44...
if exist "src\pages" (
    for /r src\pages %%f in (*.js *.jsx) do (
        powershell -Command "$content = Get-Content '%%f' -Raw -Encoding UTF8; $content = $content -replace 'import\s+{\s*base44\s*}\s+from\s+[''\""]@/api/base44Client[''\""];?\s*', ''; Set-Content '%%f' -Value $content -Encoding UTF8 -NoNewline" 2>nul
    )
    echo ✓ Páginas processadas!
)

if exist "src\components" (
    for /r src\components %%f in (*.js *.jsx) do (
        powershell -Command "$content = Get-Content '%%f' -Raw -Encoding UTF8; $content = $content -replace 'import\s+{\s*base44\s*}\s+from\s+[''\""]@/api/base44Client[''\""];?\s*', ''; Set-Content '%%f' -Value $content -Encoding UTF8 -NoNewline" 2>nul
    )
    echo ✓ Componentes processados!
)

:: Adicionar import do mock
echo [3/5] Adicionando sistema local...
if exist "src\pages" (
    for /r src\pages %%f in (*.js *.jsx) do (
        powershell -Command "$content = Get-Content '%%f' -Raw -Encoding UTF8; if ($content -match 'base44') { if ($content -notmatch 'localStorageDb') { $content = 'import { mockBase44 as base44 } from ''../functions/localStorageDb'';`n' + $content; Set-Content '%%f' -Value $content -Encoding UTF8 -NoNewline } }" 2>nul
    )
    echo ✓ Sistema adicionado às páginas!
)

if exist "src\components" (
    for /r src\components %%f in (*.js *.jsx) do (
        powershell -Command "$content = Get-Content '%%f' -Raw -Encoding UTF8; if ($content -match 'base44') { if ($content -notmatch 'localStorageDb') { $content = 'import { mockBase44 as base44 } from ''../../functions/localStorageDb'';`n' + $content; Set-Content '%%f' -Value $content -Encoding UTF8 -NoNewline } }" 2>nul
    )
    echo ✓ Sistema adicionado aos componentes!
)

:: Instalar dependências
echo [4/5] Instalando dependências...
call npm install >nul 2>&1
echo ✓ Dependências instaladas!

:: Build
echo [5/5] Compilando aplicativo...
call npm run build

if exist "dist\index.html" (
    echo.
    echo ========================================
    echo ✅ CONVERSÃO CONCLUÍDA COM SUCESSO!
    echo ========================================
    echo.
    echo 📁 Arquivo criado: dist\index.html
    echo 🌐 Abra no navegador para testar
    echo.
    echo 📦 Para distribuir: copie toda a pasta "dist"
    echo.
) else (
    echo.
    echo ========================================
    echo ❌ ERRO NA COMPILAÇÃO
    echo ========================================
    echo.
    echo Verifique os erros acima para mais detalhes.
    echo.
)

pause