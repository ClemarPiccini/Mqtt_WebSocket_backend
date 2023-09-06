const express = require('express');
const cors = require('cors');
const mqtt = require ('./controllers/mqtt-controller');
const WebSocket = require('./controllers/web-socket');

const bodyParser = require('body-parser');
const app = express();
const PORT = 3001;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}.`);
  });
  