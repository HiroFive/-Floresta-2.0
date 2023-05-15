export enum RootApiPathEnum {
  Api = '/api',
  User = '/user',
  Role = '/role',
  Cart = '/cart',
  Marker = '/map-marker',
  Products = '/products',
  Order = '/order',
}

export enum ApiSidePathEnum {
  All = '/all',
  GetProducts = '/get-products',
  CreateCartItem = '/add-cart-item',
  UpdateCartItem = '/update-cart-item',
  DeleteCartItem = '/delete-cart-item',
  AddNewOrderItem = '/add-new-order-item',
  UpdateOrderItem = '/update-order-item',
  DeleteOrderItem = '/delete-order-item',
  GetOrderHistory = '/get-order-history',
}
