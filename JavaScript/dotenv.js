const path = require("path");
const dotenv = require('dotenv');

//Carrega as variaveis de ambiente
dotenv.config({
    path: path.join(__dirname, '.env')
  });

module.exports = dotenv;