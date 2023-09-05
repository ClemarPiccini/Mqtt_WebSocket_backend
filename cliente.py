import asyncio
import websockets

async def connect_to_websocket_server():
    uri = "ws://localhost:8081/ws"  # Substitua localhost pela URL do servidor se estiver em outra máquina.
    async with websockets.connect(uri) as websocket:
        while True:
            message = await websocket.recv()
            print(f"Mensagem recebida do servidor: {message}")

asyncio.get_event_loop().run_until_complete(connect_to_websocket_server())
