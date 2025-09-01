# Script para detener Jarvis (Backend + Frontend)
# Ejecutar desde la raíz del proyecto: .\stop_jarvis.ps1

Write-Host "🛑 Deteniendo Jarvis..." -ForegroundColor Yellow

# Función para detener procesos en un puerto específico
function Stop-ProcessOnPort {
    param($Port, $ServiceName)
    
    try {
        $connections = Get-NetTCPConnection -LocalPort $Port -ErrorAction SilentlyContinue
        if ($connections) {
            foreach ($connection in $connections) {
                $process = Get-Process -Id $connection.OwningProcess -ErrorAction SilentlyContinue
                if ($process) {
                    Write-Host "🔴 Deteniendo $ServiceName (PID: $($process.Id))" -ForegroundColor Red
                    Stop-Process -Id $process.Id -Force
                }
            }
            Write-Host "✅ $ServiceName detenido correctamente" -ForegroundColor Green
        } else {
            Write-Host "ℹ️  $ServiceName no estaba ejecutándose" -ForegroundColor Gray
        }
    }
    catch {
        Write-Host "❌ Error al detener $ServiceName`: $($_.Exception.Message)" -ForegroundColor Red
    }
}

# Detener Backend (Puerto 8000)
Stop-ProcessOnPort -Port 8000 -ServiceName "Backend (FastAPI)"

# Detener Frontend (Puerto 3000)
Stop-ProcessOnPort -Port 3000 -ServiceName "Frontend (Next.js)"

# Buscar y detener procesos relacionados con uvicorn y node
Write-Host "🔍 Buscando procesos relacionados..." -ForegroundColor Yellow

# Detener procesos uvicorn
$uvicornProcesses = Get-Process -Name "python" -ErrorAction SilentlyContinue | Where-Object { $_.CommandLine -like "*uvicorn*" }
foreach ($process in $uvicornProcesses) {
    Write-Host "🔴 Deteniendo proceso uvicorn (PID: $($process.Id))" -ForegroundColor Red
    Stop-Process -Id $process.Id -Force
}

# Detener procesos node relacionados con Next.js
$nodeProcesses = Get-Process -Name "node" -ErrorAction SilentlyContinue | Where-Object { $_.CommandLine -like "*next*" }
foreach ($process in $nodeProcesses) {
    Write-Host "🔴 Deteniendo proceso Next.js (PID: $($process.Id))" -ForegroundColor Red
    Stop-Process -Id $process.Id -Force
}

Write-Host "`n✅ Jarvis ha sido detenido completamente" -ForegroundColor Green
Write-Host "Presiona cualquier tecla para salir..." -ForegroundColor Yellow
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
