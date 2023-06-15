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
              'user',
              {
                id: {
                  type: DataTypes.UUID,
                  defaultValue: DataTypes.UUIDV4,
                  allowNull: false,
                  primaryKey: true,
                },
                name: {
                  allowNull: false,
                  type: DataTypes.STRING,
                },
                email: {
                  allowNull: false,
                  type: DataTypes.STRING,
                  unique: true,
                },
                sub_id: {
                  allowNull: false,
                  type: DataTypes.STRING,
                  unique: true,
                },
                role_id: {
                  allowNull: false,
                  type: DataTypes.INTEGER,
                  defaultValue: 1,
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
      return Promise.all([queryInterface.dropTable('user', { transaction })]);
    });
  },
};
