'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('blockedUsers', {s
      id :{
        type: Sequelize.UUID,
        allowNull: false,
        primaryKey: true
      },
      blockerID :{
        type: Sequelize.UUID,
        allowNull: false
      },
      blockedID: {
        type: Sequelize.UUID,
        allowNull : false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('blockedUsers');
  }
};