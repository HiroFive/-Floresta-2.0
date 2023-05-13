import { IRoleDto } from '~/common/interfaces';
import { roleRepository } from '~/data/repositories';

export class RoleService {
  public getById(id: number): Promise<IRoleDto> {
    return roleRepository.getById(id);
  }

  public getAllRoles(): Promise<Array<IRoleDto>> {
    return roleRepository.getAll();
  }
}
