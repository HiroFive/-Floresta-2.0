export abstract class BaseProduct {
  constructor(
    public id: number = 0,
    public name: string,
    public image: string,
    public hidden: boolean,
    public price: number,
  ) {}
}

export class Product extends BaseProduct {}
