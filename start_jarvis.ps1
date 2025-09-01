# Script para iniciar Jarvis (Backend + Frontend)
# Ejecutar desde la raíz del proyecto: .\start_jarvis.ps1

Write-Host "🤖 Iniciando Jarvis..." -ForegroundColor Green

# Verificar si estamos en el directorio correcto
if (-not (Test-Path "api\main.py")) {
    Write-Host "❌ Error: No se encontró el archivo api\main.py" -ForegroundColor Red
    Write-Host "Asegúrate de ejecutar este script desde la raíz del proyecto" -ForegroundColor Red
    exit 1
}

# Función para verificar si un puerto está en uso
function Test-Port {
    param($Port)
    try {
        $connection = New-Object System.Net.Sockets.TcpClient
        $connection.Connect("127.0.0.1", $Port)
        $connection.Close()
        return $true
    }
    catch {
        return $false
    }
}

Write-Host "🔍 Verificando puertos..." -ForegroundColor Yellow

# Verificar si el puerto 8000 (FastAPI) está libre
if (Test-Port 8000) {
    Write-Host "⚠️  Puerto 8000 ya está en uso. Parando proceso existente..." -ForegroundColor Yellow
    # Intentar detener el proceso en el puerto 8000
    try {
        $process = Get-NetTCPConnection -LocalPort 8000 -ErrorAction SilentlyContinue | Select-Object -First 1
        if ($process) {
            Stop-Process -Id $process.OwningProcess -Force
            Start-Sleep -Seconds 2
        }
    }
    catch {
        Write-Host "No se pudo detener el proceso automáticamente" -ForegroundColor Yellow
    }
}

# Verificar si el puerto 3000 (Next.js) está libre
if (Test-Port 3000) {
    Write-Host "⚠️  Puerto 3000 ya está en uso. Parando proceso existente..." -ForegroundColor Yellow
    try {
        $process = Get-NetTCPConnection -LocalPort 3000 -ErrorAction SilentlyContinue | Select-Object -First 1
        if ($process) {
            Stop-Process -Id $process.OwningProcess -Force
            Start-Sleep -Seconds 2
        }
    }
    catch {
        Write-Host "No se pudo detener el proceso automáticamente" -ForegroundColor Yellow
    }
}

Write-Host "🚀 Iniciando Backend (FastAPI)..." -ForegroundColor Blue

# Activar entorno virtual y ejecutar FastAPI en segundo plano
Start-Process -FilePath "powershell" -ArgumentList @(
    "-Command", 
    "cd '$PWD'; .\venv\Scripts\Activate.ps1; uvicorn api.main:app --reload --host 0.0.0.0 --port 8000"
) -WindowStyle Minimized

# Esperar a que el backend se inicie
Write-Host "⏳ Esperando a que el backend se inicie..." -ForegroundColor Yellow
Start-Sleep -Seconds 5

# Verificar si el backend está corriendo
$backendReady = $false
for ($i = 1; $i -le 10; $i++) {
    try {
        $response = Invoke-WebRequest -Uri "http://localhost:8000/" -TimeoutSec 3 -ErrorAction SilentlyContinue
        if ($response.StatusCode -eq 200) {
            $backendReady = $true
            break
        }
    }
    catch {
        # Silenciosamente continuar
    }
    Write-Host "Reintentando... ($i/10)" -ForegroundColor Yellow
    Start-Sleep -Seconds 2
}

if ($backendReady) {
    Write-Host "✅ Backend iniciado correctamente en http://localhost:8000" -ForegroundColor Green
} else {
    Write-Host "❌ Error: No se pudo conectar al backend" -ForegroundColor Red
}

Write-Host "🚀 Iniciando Frontend (Next.js)..." -ForegroundColor Blue

# Verificar si node_modules existe en frontend
if (-not (Test-Path "frontend\node_modules")) {
    Write-Host "📦 Instalando dependencias del frontend..." -ForegroundColor Yellow
    cd frontend
    npm install
    cd ..
}

# Ejecutar Frontend en segundo plano
Start-Process -FilePath "powershell" -ArgumentList @(
    "-Command", 
    "cd '$PWD\frontend'; npm run dev"
) -WindowStyle Minimized

Write-Host "⏳ Esperando a que el frontend se inicie..." -ForegroundColor Yellow
Start-Sleep -Seconds 10

# Verificar si el frontend está corriendo
$frontendReady = $false
for ($i = 1; $i -le 10; $i++) {
    try {
        $response = Invoke-WebRequest -Uri "http://localhost:3000/" -TimeoutSec 3 -ErrorAction SilentlyContinue
        if ($response.StatusCode -eq 200) {
            $frontendReady = $true
            break
        }
    }
    catch {
        # Silenciosamente continuar
    }
    Write-Host "Reintentando... ($i/10)" -ForegroundColor Yellow
    Start-Sleep -Seconds 2
}

if ($frontendReady) {
    Write-Host "✅ Frontend iniciado correctamente en http://localhost:3000" -ForegroundColor Green
} else {
    Write-Host "❌ Error: No se pudo conectar al frontend" -ForegroundColor Red
}

Write-Host "`n🎉 ¡Jarvis está listo!" -ForegroundColor Green
Write-Host "Backend:  http://localhost:8000" -ForegroundColor Cyan
Write-Host "Frontend: http://localhost:3000" -ForegroundColor Cyan
Write-Host "`nPara detener Jarvis, cierra ambas ventanas de PowerShell o usa Ctrl+C" -ForegroundColor Yellow

# Abrir el navegador automáticamente
Write-Host "🌐 Abriendo navegador..." -ForegroundColor Green
Start-Process "http://localhost:3000"

# Mantener el script ejecutándose para mostrar información
Write-Host "`nPresiona cualquier tecla para salir..." -ForegroundColor Yellow
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
