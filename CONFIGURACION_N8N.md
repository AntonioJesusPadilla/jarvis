# Configuración de n8n para Jarvis

## 📋 Pendiente para Sesión Futura

### 🎯 Objetivo
Conectar Jarvis con n8n para procesamiento de consultas con IA y herramientas externas.

### 🔧 Configuración Necesaria

#### 1. Variables de Entorno
Crear archivo `.env` en la raíz del proyecto:
```bash
# Copiar desde config.env.example
cp config.env.example .env
```

Configurar en `.env`:
```bash
N8N_URL=http://localhost:5678
# O la URL donde esté ejecutándose n8n
```

#### 2. n8n Setup
- [ ] Instalar n8n
- [ ] Configurar workflow de investigación
- [ ] Configurar webhook con ID: `cc4293f0-7db7-441d-9230-cf983371108b`
- [ ] Probar conectividad con el endpoint `/research`

#### 3. Verificación
Una vez configurado n8n:
1. Verificar que responde en la URL configurada
2. Probar el webhook manualmente
3. Usar el frontend para enviar consultas reales

### 📡 Estado Actual del Sistema

#### ✅ Funcionando
- Frontend moderno con Next.js
- Backend FastAPI con CORS configurado
- Toggle de tema sin errores de hidratación
- Gestión de sesiones con sessionId
- Endpoint `/test` para pruebas

#### 🔄 Endpoint Actual
```javascript
// frontend/src/contexts/ChatContext.tsx línea ~49
const response = await fetch('http://localhost:8000/research', {
```

#### ⚠️ Nota Importante
El endpoint `/research` está configurado pero fallará hasta que n8n esté ejecutándose. El sistema mostrará error de conexión, lo cual es esperado sin n8n.

### 🚀 Para Reanudar en Próxima Sesión
1. Configurar n8n según workflow deseado
2. Establecer variable de entorno N8N_URL
3. Probar conectividad completa
4. Documentar el workflow final

### 🛠️ Comandos Útiles
```bash
# Iniciar Jarvis completo
.\start_jarvis.ps1

# Solo backend (para debugging)
.\venv\Scripts\Activate.ps1
uvicorn api.main:app --reload --host 0.0.0.0 --port 8000

# Verificar backend
curl http://localhost:8000/health
```
