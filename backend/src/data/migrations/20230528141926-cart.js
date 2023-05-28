'use strict';

const { DataTypes } = require('sequelize');

module.exports = {
  up: async (queryInterface, Sequelize) =>
    queryInterface.sequelize
      .query('CREATE EXTENSION IF NOT EXISTS pgcrypto;')
      .then(() =>
        queryInterface.sequelize.transaction((transaction) =>
          Promise.all([
            queryInterface.createTable(
              'cart',
              {
                id: {
                  type: DataTypes.INTEGER,
                  autoIncrement: true,
                  allowNull: false,
                  primaryKey: true,
                },
                productIds: {
                  type: DataTypes.ARRAY(DataTypes.INTEGER),
                  defaultValue: [],
                },
                userId: {
                  type: DataTypes.UUID,
                },
                createdAt: DataTypes.DATE,
                updatedAt: DataTypes.DATE,
              },
              { transaction },
            ),
          ]),
        ),
      ),

  down: async (queryInterface) => {
    return queryInterface.sequelize.transaction((transaction) => {
      return Promise.all([queryInterface.dropTable('cart', { transaction })]);
    });
  },
};
