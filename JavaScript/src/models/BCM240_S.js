const Sequelize = require('sequelize');
const sequelize = require('./core');

const BCM240_S = sequelize.define('BCM240_S', {
  data: {
    type: Sequelize.JSON,
    allowNull: false,
  },
  limite_min_vibracao: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: 'LimiteBcms',
      key: 'limite_min_vibracao',
    },
    onUpdate: 'CASCADE',
  },
  limite_max_vibracao: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: 'LimiteBcms',
      key: 'limite_max_vibracao',
    },
    onUpdate: 'CASCADE',
  },
  numeroGerado: {
    type: Sequelize.INTEGER,
    allowNull: false,
  }
});

BCM240_S.sync();

module.exports = BCM240_S;
