import { userRepository } from '../data/repositories';
import { IUserDto } from '~/common/interfaces';

export class UserService {
  public getAllUsers(): Promise<IUserDto[]> {
    return userRepository.getAll();
  }
  public getUserBySubId(subId: string): Promise<Array<IUserDto>> {
    return userRepository.getById(subId);
  }
  public createNewUser(user: IUserDto): Promise<IUserDto> {
    return userRepository.createUser(user);
  }

  public async updateUser(
    id: string,
    data: IUserDto,
  ): Promise<Array<IUserDto>> {
    return userRepository.updateById(id, data);
  }

  public deleteUser(id: string): Promise<number> {
    return userRepository.deleteById(id);
  }
}
