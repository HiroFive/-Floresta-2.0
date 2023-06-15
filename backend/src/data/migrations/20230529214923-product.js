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
              'product',
              {
                id: {
                  type: DataTypes.INTEGER,
                  autoIncrement: true,
                  allowNull: false,
                  primaryKey: true,
                },
                name: {
                  allowNull: false,
                  type: DataTypes.STRING,
                },
                image: {
                  allowNull: false,
                  type: DataTypes.STRING,
                },
                hidden: {
                  type: DataTypes.BOOLEAN,
                  allowNull: false,
                },
                price: {
                  type: DataTypes.REAL,
                  allowNull: false,
                },
                created_at: DataTypes.DATE,
                updated_at: DataTypes.DATE,
              },
              { transaction },
            ),
          ]),
        ),
      ),

  down: async (queryInterface) => {
    return queryInterface.sequelize.transaction((transaction) => {
      return Promise.all([
        queryInterface.dropTable('product', { transaction }),
      ]);
    });
  },
};
