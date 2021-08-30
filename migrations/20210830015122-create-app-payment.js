'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('app_payments', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      transaction_id: {
        type: Sequelize.INTEGER
      },
      invoice_number: {
        type: Sequelize.STRING
      },
      payment_method: {
        type: Sequelize.STRING
      },
      payment_number: {
        type: Sequelize.STRING
      },
      amount: {
        type: Sequelize.INTEGER
      },
      expiration_date: {
        type: Sequelize.DATE
      },
      xendit_id: {
        type: Sequelize.STRING
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
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('app_payments');
  }
};