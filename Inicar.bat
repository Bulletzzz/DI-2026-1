@echo off
wt new-tab --title "Frontend" -d "%CD%\frontend" pwsh -NoExit -Command "npm run dev" ^
; new-tab --title "Backend" -d "%CD%\backend" pwsh -NoExit -Command "npm run start:dev" ^
; new-tab --title "IA" -d "%CD%\IA" pwsh -NoExit -Command "./venv/scripts/activate && python api.py"