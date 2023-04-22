import { DataTypes, Model, ModelCtor, Sequelize } from 'sequelize';
import { IRole } from '../../common/interfaces';
import { ModelName } from '../../common/enums';

interface roleInstance extends IRole, Model {}

const createRoleModule = (orm: Sequelize): ModelCtor<roleInstance> => {
  return orm.define<roleInstance>(
    ModelName.Role,
    {
      id: {
        type: DataTypes.INTEGER,
        defaultValue: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      name: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    },
    {
      tableName: 'roles',
      underscored: true,
    },
  );
};
export default createRoleModule;
