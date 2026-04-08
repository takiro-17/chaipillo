@echo off
setlocal
set PORT=8088
set ROOT=%~dp0

echo Starting local server on http://localhost:%PORT% ...
start "" "http://localhost:%PORT%/index.html"
cd /d "%ROOT%"
python -m http.server %PORT%
