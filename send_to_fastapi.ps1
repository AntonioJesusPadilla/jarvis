Param(
    # Parámetros para la sesión y el texto de entrada.
    [string]$SessionId = "user-323",
    [string]$ChatInput = "Haz una búsqueda en Google sobre las últimas noticias de IA"
)

# Crear un objeto de PowerShell con la estructura JSON deseada
$bodyObject = @{
    sessionId = $SessionId
    chatInput = $ChatInput
}

# Convertir el objeto a JSON y forzar la codificación UTF-8
$bodyJson = $bodyObject | ConvertTo-Json -Compress
$bodyBytes = [System.Text.Encoding]::UTF8.GetBytes($bodyJson)

# Enviar la petición POST a FastAPI
$response = Invoke-RestMethod -Uri "http://localhost:8000/research" `
    -Method POST `
    -ContentType "application/json" `
    -Body $bodyBytes

# Mostrar el resultado
$response

