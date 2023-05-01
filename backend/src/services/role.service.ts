import { IRole } from '~/common/interfaces';
import { roleRepository } from '~/data/repositories';

class RoleService {
  public getById(id: number): Promise<IRole> {
    return roleRepository.getById(id);
  }

  public getAllRoles(): Promise<Array<IRole>> {
    return roleRepository.getAll();
  }
}

export { RoleService };
