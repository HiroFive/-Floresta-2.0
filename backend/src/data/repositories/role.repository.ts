import { roleModule } from '../models';
import { getRoleParams } from '../atributes';
import { IRole } from '~/common/interfaces';

class RoleRepository {
  // public getAll(): Promise<IUser[]> {
  //   return userModel.findAll(getFoodParams());
  // }

  public getById(id: number): Promise<IRole | null> {
    return roleModule.findByPk(id, getRoleParams());
  }
}

export { RoleRepository };
