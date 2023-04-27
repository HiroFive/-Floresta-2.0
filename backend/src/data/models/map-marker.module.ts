import { DataTypes, Model, ModelCtor, Sequelize } from 'sequelize';
import { ModelName } from '../../common/enums';
import { IMapMarker } from '~/common/interfaces';

interface mapMarkerInstance extends IMapMarker, Model {}

const createMapMarkerModule = (
  orm: Sequelize,
): ModelCtor<mapMarkerInstance> => {
  return orm.define<mapMarkerInstance>(
    ModelName.MapMarker,
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
      productIds: {
        type: DataTypes.ARRAY(DataTypes.INTEGER),
        defaultValue: [],
      },
      lat: {
        type: DataTypes.REAL,
      },
      lng: {
        type: DataTypes.REAL,
      },
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    },
    {
      tableName: 'map_marker',
      underscored: true,
    },
  );
};
export default createMapMarkerModule;
