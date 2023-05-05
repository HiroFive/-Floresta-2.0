export abstract class BaseMarker {
  constructor(
    public lat: number = 0,
    public lng: number = 0,
    public hidden: boolean = false,
    public id?: number,
    public productIds?: Array<number>,
  ) {}
}

export class Marker extends BaseMarker {}
