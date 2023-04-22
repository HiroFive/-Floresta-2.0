import { userRepository } from '../data/repositories';
import { IUser } from '~/common/interfaces';

class UserService {
  public getUserBySubId(subId: string): Promise<IUser[]> {
    return userRepository.getById(subId);
  }
  public createNewUser(user: IUser): Promise<IUser> {
    return userRepository.createUser(user);
  }

  public async updateUser(id: string, data: IUser): Promise<IUser[]> {
    return userRepository.updateById(id, data);
  }

  public deleteUser(id: string): Promise<number> {
    return userRepository.deleteById(id);
  }
}

export { UserService };
