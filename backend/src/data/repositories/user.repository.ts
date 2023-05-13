import { userModule } from '../models';
import { IUserDto } from '../../common/interfaces';
import { getUserParams } from '../atributes';

export class UserRepository {
  public getAll(): Promise<Array<IUserDto>> {
    return userModule.findAll(getUserParams('withRoleName'));
  }

  public getById(subId: string): Promise<IUserDto[] | null> {
    return userModule.findAll(getUserParams('filter', { subId: subId }));
  }

  public createUser(user: any): Promise<IUserDto> {
    return userModule.create(user);
  }

  public async updateById(id: string, data: IUserDto): Promise<IUserDto[]> {
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
