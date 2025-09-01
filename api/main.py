from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import requests
import uuid
import os

# Inicializa la aplicación FastAPI
app = FastAPI()

# Configurar CORS para permitir conexiones desde el frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Define el modelo de datos para la consulta del usuario
class QueryItem(BaseModel):
    sessionId: str | None = None  # opcional, se genera si no llega
    chatInput: str

@app.get("/")
def read_root():
    return {"message": "¡Servicio de investigación listo!"}

@app.get("/health")
def health_check():
    return {"status": "healthy", "service": "jarvis-api"}

@app.post("/test")
def test_endpoint(query_data: QueryItem):
    # Endpoint de prueba sin dependencia de n8n
    session_id = query_data.sessionId or str(uuid.uuid4())
    return {
        "status": "success",
        "sessionId": session_id,
        "n8n_response": {
            "message": f"Mensaje de prueba recibido: {query_data.chatInput}. Este es solo un test sin conectar a n8n."
        }
    }

@app.post("/research")
def research_query(query_data: QueryItem):
    # Generar sessionId si no llega desde el cliente
    session_id = query_data.sessionId or str(uuid.uuid4())

    # La URL del webhook de n8n se obtiene de una variable de entorno.
    # Esto es mucho mejor para usar con Docker Compose.
    n8n_url = os.getenv("N8N_URL", "http://localhost:5678")  # Valor por defecto
    
    # Verificar si n8n está disponible (comentado por ahora)
    # if not n8n_url:
    #     return {"status": "error", "message": "N8N_URL no está configurada como variable de entorno."}

    # Construye la URL completa del webhook
    n8n_webhook_url = f"{n8n_url}/webhook/cc4293f0-7db7-441d-9230-cf983371108b" 

    payload = {
        "sessionId": session_id,
        "chatInput": query_data.chatInput
    }

    # Envía la consulta al webhook de n8n
    try:
        response = requests.post(n8n_webhook_url, json=payload)
        response.raise_for_status()  # Lanza un error si la solicitud falla
        n8n_response = response.json()  # capturamos lo que responde n8n

        return {
            "status": "success",
            "sessionId": session_id,
            "n8n_response": n8n_response
        }
    except requests.exceptions.RequestException as e:
        return {"status": "error", "message": f"Error al enviar la consulta a n8n: {e}"}