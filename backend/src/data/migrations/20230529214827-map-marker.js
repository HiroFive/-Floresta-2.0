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
              'map_marker',
              {
                id: {
                  type: DataTypes.INTEGER,
                  autoIncrement: true,
                  allowNull: false,
                  primaryKey: true,
                },
                hidden: {
                  type: DataTypes.BOOLEAN,
                },
                product_ids: {
                  type: DataTypes.ARRAY(DataTypes.INTEGER),
                  defaultValue: [],
                },
                lat: {
                  type: DataTypes.REAL,
                },
                lng: {
                  type: DataTypes.REAL,
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
        queryInterface.dropTable('map_marker', { transaction }),
      ]);
    });
  },
};
