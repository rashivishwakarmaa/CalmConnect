@echo off
echo Starting CalmConnect Server...
echo.
cd /d "%~dp0CalmChat\calmchat.backend"
python app.py
pause
