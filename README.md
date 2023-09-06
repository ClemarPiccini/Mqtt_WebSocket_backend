# Projeto Powermig

Este projeto tem como objetivo criar um sistema de armazenamento e envio simultaneos via MQTT e WebSocket

## DATABASE:

*MySQL*

## FRAMEWORK:

*Docker Compose*  
*Express*  
*Sequelize*  
*body-parser*  
*cors*   
*dotenv*  
*mqtt*  

### Passos para executar o codigo:

-criar arquivo .env na raiz com as seguintes informações:

MYSQL_DATABASE=""  
MYSQL_USER=""  
MYSQL_PASSWORD=""  
MYSQL_ROOT_PASSWORD=""  
MYSQL_PORT= 3306  
ADMINER_PORT= 8080   

-abrir um terminal e executar o comando:

```npm install```   

```docker compose up```

-abrir novo terminal no diretorio app e executar o comando:

```npm start```
