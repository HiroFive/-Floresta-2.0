import { userModule } from '../models';
import { IUser } from '../../common/interfaces';
import { getUserParams } from '../atributes';

export class UserRepository {
  public getAll(): Promise<Array<IUser>> {
    return userModule.findAll(getUserParams('withRoleName'));
  }

  public getById(subId: string): Promise<IUser[] | null> {
    return userModule.findAll(getUserParams('filter', { subId: subId }));
  }

  public createUser(user: any): Promise<IUser> {
    return userModule.create(user);
  }

  public async updateById(id: string, data: IUser): Promise<IUser[]> {
    const result = await userModule.update(data, {
      where: { id },
      returning: true,
    });
    return result[1];
  }

  public deleteById(id: string): Promise<number> {
    return userModule.destroy({
      where: { id },
    });
  }
}
