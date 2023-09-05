import json
import random
import time

import paho.mqtt.publish as publish

# Endereço do servidor MQTT
mqtt_host = 'test.mosquitto.org'
mqtt_port = 1883

# Tópico MQTT ao qual você deseja publicar
mqtt_topic = '/ws'

while True:
    # Gerar um valor de temperatura aleatório entre -10 e 40 graus Celsius
    temperatura = round(random.uniform(-10, 40), 2)

    # Criar um dicionário com os dados da temperatura
    data = {"temperatura": temperatura}

    # Converter os dados em formato JSON
    payload = json.dumps(data)

    # Publicar os dados no tópico MQTT
    publish.single(mqtt_topic, payload, hostname=mqtt_host, port=mqtt_port)

    print(f"Temperatura publicada: {temperatura}")

    # Aguardar um intervalo de tempo (por exemplo, 5 segundos) antes de publicar novamente
    time.sleep(5)
