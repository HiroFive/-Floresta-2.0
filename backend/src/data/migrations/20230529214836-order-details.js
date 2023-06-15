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
              'order_details',
              {
                id: {
                  type: DataTypes.INTEGER,
                  autoIncrement: true,
                  allowNull: false,
                  primaryKey: true,
                },
                user_id: {
                  type: DataTypes.UUID,
                  allowNull: false,
                },
                total: {
                  type: DataTypes.STRING,
                  allowNull: false,
                },
                payment_id: {
                  type: DataTypes.INTEGER,
                },
                map_marker_id: {
                  type: DataTypes.INTEGER,
                  allowNull: false,
                },
                is_anonymous: {
                  type: DataTypes.BOOLEAN,
                  defaultValue: false,
                },
                status: {
                  type: DataTypes.STRING,
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
        queryInterface.dropTable('order_details', { transaction }),
      ]);
    });
  },
};
