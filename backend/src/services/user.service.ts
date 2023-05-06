import { userRepository } from '../data/repositories';
import { IUser } from '~/common/interfaces';

export class UserService {
  public getAllUsers(): Promise<IUser[]> {
    return userRepository.getAll();
  }
  public getUserBySubId(subId: string): Promise<Array<IUser>> {
    return userRepository.getById(subId);
  }
  public createNewUser(user: IUser): Promise<IUser> {
    return userRepository.createUser(user);
  }

  public async updateUser(id: string, data: IUser): Promise<Array<IUser>> {
    return userRepository.updateById(id, data);
  }

  public deleteUser(id: string): Promise<number> {
    return userRepository.deleteById(id);
  }
}
