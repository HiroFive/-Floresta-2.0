import { IProductDto } from '~/common/interfaces/product.interface';

export interface ICart {
  id?: number;
  productIds: Array<number>;
  userId: string;
}

export interface IRawCartFullInfo {
  id?: number;
  items: [
    {
      id: number;
      quantity: number;
      product: IProductDto;
    },
  ];
}

export interface ICartFullInfo {
  id?: number;
  items: [
    {
      id: number;
      quantity: number;
      productId: number;
      name: string;
      image: string;
      hidden: boolean;
      price: number;
    },
  ];
}
