from fastapi import FastAPI
from fastapi.websockets import WebSocket
import asyncio
import json
import paho.mqtt.client as mqtt

app = FastAPI()

# Lista de clientes WebSocket conectados
websocket_clients = set()
data = {"message": "Bem-vindo ao servidor WebSocket"}

# Função para enviar dados para todos os clientes WebSocket
async def send_data_to_clients(new_data):
    for client in websocket_clients:
        await client.send_text(json.dumps(new_data))

# Rota WebSocket
@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    print("Novo cliente conectado")

    # Adiciona o cliente à lista
    websocket_clients.add(websocket)

    # Envie os dados iniciais para o novo cliente
    await websocket.send_text(json.dumps(data))

    try:
        while True:
            # Aguarda mensagens do cliente (opcional)
            message = await websocket.receive_text()
            print(f"Mensagem recebida do cliente: {message}")
    except Exception:
        print("Cliente desconectado")

    # Remove o cliente da lista após a desconexão
    websocket_clients.remove(websocket)

# Função para enviar dados MQTT para todos os clientes WebSocket
def on_message(client, userdata, message):
    new_data = json.loads(message.payload)
    asyncio.create_task(send_data_to_clients(new_data))

# Configuração do cliente MQTT
mqtt_client = mqtt.Client()

def on_connect(client, userdata, flags, rc):
    print(f"Conectado ao servidor MQTT com código de resultado {rc}")
    client.subscribe('/topico')

mqtt_client.on_message = on_message
mqtt_client.on_connect = on_connect

mqtt_client.connect('test.mosquitto.org', 1883, 60)
mqtt_client.loop_start()

# Inicie o servidor FastAPI
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8081)
