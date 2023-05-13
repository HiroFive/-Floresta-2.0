import { mapMarkerModule } from '../models';
import { getMapMarketParams } from '../atributes';
import { IMapMarkerDto } from '~/common/interfaces';
import { ParamsTypeEnum } from '~/common/enums';
import { QueryTypes } from 'sequelize';

export class MapMarkerRepository {
  public getById(id: number): Promise<IMapMarkerDto | null> {
    return mapMarkerModule.findByPk(id, getMapMarketParams());
  }

  public getMapMarketWithProducts(id: number): Promise<any> {
    return mapMarkerModule.sequelize.query(
      `SELECT "map_marker"."id", "map_marker"."lat", "map_marker"."lng", "map_marker"."hidden", 
          "products"."id" AS "products.id", "products"."name" AS "products.name", "products"."image" 
          AS "products.image", "products"."price" AS "products.price", 
          "products"."hidden" AS "products.hidden" FROM "map_marker" AS "map_marker" 
          LEFT OUTER JOIN "product" AS "products" ON "products"."id" = ANY("map_marker"."product_ids") 
          WHERE "map_marker"."id" = ${id};`,
      { type: QueryTypes.SELECT, raw: false, nest: true },
    );
  }

  public getAllMarkers(roleId: number): Promise<Array<IMapMarkerDto> | null> {
    return mapMarkerModule.findAll(
      getMapMarketParams(ParamsTypeEnum.GetByRoleId, { roleId: roleId }),
    );
  }

  public createMapMarker(newMapMarker: IMapMarkerDto): Promise<IMapMarkerDto> {
    return mapMarkerModule.create(newMapMarker as any);
  }

  public async updateById(
    id: number,
    data: IMapMarkerDto,
  ): Promise<IMapMarkerDto[]> {
    const result = await mapMarkerModule.update(data, {
      where: { id },
      returning: true,
    });
    return result[1];
  }

  public deleteById(id: number): Promise<number> {
    return mapMarkerModule.destroy({
      where: { id },
    });
  }
}
