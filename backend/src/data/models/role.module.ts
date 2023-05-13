import { DataTypes, Model, ModelCtor, Sequelize } from 'sequelize';
import { IRoleDto } from '../../common/interfaces';
import { ModelName } from '../../common/enums';

interface roleInstance extends IRoleDto, Model {}

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
      tableName: 'role',
      underscored: true,
    },
  );
};
export default createRoleModule;
