const Sequelize = require('sequelize');
const sequelize = require('./core');

const LimiteCalibracao = sequelize.define('LimiteCalibracao', {
    limite_min_temp: {
      type: Sequelize.INTEGER,
      allowNull: false,
      unique: true,
    },
    limite_max_temp: {
      type: Sequelize.INTEGER,
      allowNull: false,
      unique: true,
    },
  });
  
LimiteCalibracao.sync();
  
module.exports = LimiteCalibracao
;