import { Component, Input } from '@angular/core';
import { IOrderItem } from '../../common/interfaces';

@Component({
  selector: 'app-order-details-product',
  templateUrl: './order-details-product.component.html',
  styleUrls: ['./order-details-product.component.scss'],
})
export class OrderDetailsProductComponent {
  @Input() product: IOrderItem;
}
