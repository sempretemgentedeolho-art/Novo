@echo off
chcp 65001 >nul
echo ========================================
echo CONVERSOR UNIVERSAL PARA STANDALONE
echo ========================================
echo.

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
) > functions\localStorageDb.js

:: Limpar imports do Base44
echo [2/5] Removendo imports do Base44...
for /r pages %%f in (*.js *.jsx) do (
    powershell -Command "$content = Get-Content '%%f' -Raw -Encoding UTF8; $content = $content -replace 'import\s+{\s*base44\s*}\s+from\s+[''\""]@/api/base44Client[''\""];?\s*', ''; $content = $content -replace 'import\s+{\s*base44\s*}\s+from\s+[''\""]@/api/base44Client[''\""]', ''; Set-Content '%%f' -Value $content -Encoding UTF8 -NoNewline" 2>nul
)

for /r components %%f in (*.js *.jsx) do (
    powershell -Command "$content = Get-Content '%%f' -Raw -Encoding UTF8; $content = $content -replace 'import\s+{\s*base44\s*}\s+from\s+[''\""]@/api/base44Client[''\""];?\s*', ''; $content = $content -replace 'import\s+{\s*base44\s*}\s+from\s+[''\""]@/api/base44Client[''\""]', ''; Set-Content '%%f' -Value $content -Encoding UTF8 -NoNewline" 2>nul
)

:: Adicionar import do mock no início dos arquivos que usam base44
echo [3/5] Adicionando sistema local...
for /r pages %%f in (*.js *.jsx) do (
    powershell -Command "$content = Get-Content '%%f' -Raw -Encoding UTF8; if ($content -match 'base44') { if ($content -notmatch 'localStorageDb') { $content = 'import { mockBase44 as base44 } from ''../functions/localStorageDb'';`n' + $content; Set-Content '%%f' -Value $content -Encoding UTF8 -NoNewline } }" 2>nul
)

for /r components %%f in (*.js *.jsx) do (
    powershell -Command "$content = Get-Content '%%f' -Raw -Encoding UTF8; if ($content -match 'base44') { if ($content -notmatch 'localStorageDb') { $content = 'import { mockBase44 as base44 } from ''../../functions/localStorageDb'';`n' + $content; Set-Content '%%f' -Value $content -Encoding UTF8 -NoNewline } }" 2>nul
)

:: Instalar dependências
echo [4/5] Instalando dependências...
call npm install

:: Build
echo [5/5] Compilando aplicativo...
call npm run build

echo.
echo ========================================
echo ✅ CONVERSÃO CONCLUÍDA!
echo ========================================
echo.
echo Abra o arquivo: dist\index.html
echo.
pause