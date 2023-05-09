export abstract class BaseCartItemsForDelete {
  constructor(public cartItemIds: Array<number>) {}
}

export class CartItemsForDelete extends BaseCartItemsForDelete {}
