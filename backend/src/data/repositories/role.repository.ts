import { roleModule } from '../models';
import { getRoleParams } from '../atributes';
import { IRoleDto } from '~/common/interfaces';

export class RoleRepository {
  public getAll(): Promise<Array<IRoleDto>> {
    return roleModule.findAll(getRoleParams());
  }

  public getById(id: number): Promise<IRoleDto | null> {
    return roleModule.findByPk(id, getRoleParams());
  }

  public create(body: IRoleDto): Promise<IRoleDto | null> {
    return roleModule.create(body as any);
  }
}
