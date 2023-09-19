const Sequelize = require('sequelize');
const sequelize = require('./core');

const LimiteBcm = sequelize.define('LimiteBcm', {
  limite_min_vibracao: {
      type: Sequelize.INTEGER,
      allowNull: false,
      unique: true,
    },
    limite_max_vibracao: {
      type: Sequelize.INTEGER,
      allowNull: false,
      unique: true,
    },
  });
  
  LimiteBcm.sync();
  
module.exports = LimiteBcm
;