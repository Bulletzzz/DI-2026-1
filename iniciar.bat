@echo off
if "%~1"=="back" goto back
if "%~1"=="front" goto front
if "%~1"=="ia" goto ia

start "BEAST Backend" cmd /k ""%~f0" back"
start "BEAST IA" cmd /k ""%~f0" ia"
start "BEAST Frontend" cmd /k ""%~f0" front"
exit /b

:back
cd /d "%~dp0backend"
call npm install
call npx prisma generate
npm run start:dev
goto :eof

:front
cd /d "%~dp0frontend"
call npm install
npm run dev
goto :eof

:ia
cd /d "%~dp0IA"
python -c "import flask" 2>nul || pip install -r requirements.txt
if not exist "models\scoring.pkl" python train.py
python api.py
goto :eof
