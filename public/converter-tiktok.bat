@echo off
chcp 65001 >nul
setlocal
echo ============================================
echo  EXPORTAR APENAS O TIKTOK (LEVE)
echo ============================================
echo.

if not exist "package.json" (
    echo ERRO: package.json nao encontrado!
    echo.
    echo Copie este arquivo para a PASTA RAIZ do projeto
    echo ^(a pasta onde esta o package.json^).
    pause
    exit /b 1
)

if not exist "src\pages\AppTikTok.jsx" (
    echo ERRO: nao encontrei src\pages\AppTikTok.jsx
    echo Este nao parece ser o projeto certo.
    pause
    exit /b 1
)

echo Projeto encontrado: %CD%
echo.

:: ------------------------------------------------------------
:: 1) Guardar as outras telas FORA do src (para nao entrarem no app)
:: ------------------------------------------------------------
echo [1/5] Guardando as outras telas...
if exist "_paginas_preservadas\" (
    echo Devolvendo telas de uma execucao anterior...
    move /Y "_paginas_preservadas\*" "src\pages\" >nul
    rmdir /S /Q "_paginas_preservadas"
)
mkdir "_paginas_preservadas"

(
echo Inicio.jsx
echo TelaBloqueio.jsx
echo Home.jsx
echo AppTikTok.jsx
echo Contatos.jsx
echo AppContatos.jsx
echo Configuracoes.jsx
echo ConfiguracoesRapidas.jsx
echo WiFiConfig.jsx
echo BluetoothConfig.jsx
echo VolumeControl.jsx
echo SobreDispositivo.jsx
) > "_lista_leve.txt"

for %%f in (src\pages\*.jsx) do (
    echo %%~nxf| findstr /I /X /G:"_lista_leve.txt" >nul || move "%%f" "_paginas_preservadas\" >nul
)
echo OK.

:: ------------------------------------------------------------
:: 2) Dizer ao app quais telas ele deve carregar
:: ------------------------------------------------------------
echo [2/5] Preparando a lista de telas...
copy /Y "src\pages.config.js" "src\pages.config.js.bak" >nul

(
echo import Inicio from './pages/Inicio';
echo import TelaBloqueio from './pages/TelaBloqueio';
echo import Home from './pages/Home';
echo import AppTikTok from './pages/AppTikTok';
echo import Contatos from './pages/Contatos';
echo import AppContatos from './pages/AppContatos';
echo import Configuracoes from './pages/Configuracoes';
echo import ConfiguracoesRapidas from './pages/ConfiguracoesRapidas';
echo import WiFiConfig from './pages/WiFiConfig';
echo import BluetoothConfig from './pages/BluetoothConfig';
echo import VolumeControl from './pages/VolumeControl';
echo import SobreDispositivo from './pages/SobreDispositivo';
echo import __Layout from './Layout.jsx';
echo.
echo export const PAGES = {
echo     "Inicio": Inicio,
echo     "TelaBloqueio": TelaBloqueio,
echo     "Home": Home,
echo     "AppTikTok": AppTikTok,
echo     "Contatos": Contatos,
echo     "AppContatos": AppContatos,
echo     "Configuracoes": Configuracoes,
echo     "ConfiguracoesRapidas": ConfiguracoesRapidas,
echo     "WiFiConfig": WiFiConfig,
echo     "BluetoothConfig": BluetoothConfig,
echo     "VolumeControl": VolumeControl,
echo     "SobreDispositivo": SobreDispositivo,
echo }
echo.
echo export const pagesConfig = {
echo     mainPage: "Inicio",
echo     Pages: PAGES,
echo     Layout: __Layout,
echo };
) > "src\pages.config.js"
echo OK.

:: ------------------------------------------------------------
:: 3 e 4) Instalar e compilar
:: ------------------------------------------------------------
echo [3/5] Instalando dependencias... ^(pode demorar^)
call npm install >nul 2>&1
if exist "dist" rmdir /S /Q "dist"

echo [4/5] Compilando o aplicativo... ^(2 a 5 minutos^)
call npm run build

:: ------------------------------------------------------------
:: 5) Devolver tudo como estava (projeto preservado)
:: ------------------------------------------------------------
echo [5/5] Devolvendo as outras telas para o projeto...
if exist "_paginas_preservadas\*" move /Y "_paginas_preservadas\*" "src\pages\" >nul
rmdir /S /Q "_paginas_preservadas" 2>nul
if exist "src\pages.config.js.bak" move /Y "src\pages.config.js.bak" "src\pages.config.js" >nul
del "_lista_leve.txt" 2>nul

echo.
if exist "dist\index.html" (
    echo ============================================
    echo  CONCLUIDO! Exportado apenas o TIKTOK
    echo ============================================
    echo  Arquivo pronto: dist\index.html
    echo  Para distribuir: copie a pasta "dist"
    echo  O projeto continua completo, com todas as
    echo  telas, para as proximas exportacoes.
    echo.
) else (
    echo ============================================
    echo  ERRO NA COMPILACAO
    echo ============================================
    echo  Veja as mensagens acima. O projeto ja foi
    echo  devolvido ao normal, nada foi perdido.
    echo.
)
pause
