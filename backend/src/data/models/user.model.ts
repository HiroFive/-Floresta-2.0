import { DataTypes, Model, ModelCtor, Sequelize } from 'sequelize';
import { IUserDto } from '../../common/interfaces';
import { ModelName } from '../../common/enums';

interface userInstance extends IUserDto, Model {}

const createUserModule = (orm: Sequelize): ModelCtor<userInstance> => {
  return orm.define<userInstance>(
    ModelName.User,
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
      subId: {
        allowNull: false,
        type: DataTypes.STRING,
        unique: true,
      },
      roleId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        defaultValue: 1,
      },
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    },
    {
      tableName: 'user',
      underscored: true,
    },
  );
};
export default createUserModule;
