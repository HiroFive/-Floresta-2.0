import { Component, Injector, OnDestroy, OnInit } from '@angular/core';
import { IProduct } from '../../../common/interfaces';
import { TableTypeEnum } from '../../../common/enums';
import { Subject, takeUntil } from 'rxjs';
import { Store } from '@ngrx/store';
import { ModalService } from '../../../services';
import { ProductActions } from '../../../store/actions';
import { BaseProduct, Product } from '../../../common/classes';
import { AddProductComponent } from '../../../components/forms/product/add-product/add-product.component';
import { ProductSelectors } from '../../../store/selectors';
import { DeleteProductComponent } from '../../../components/delete-dialog/delete-product.component';
import { EditProductComponent } from '../../../components/forms/product/edit-product/edit-product.component';

@Component({
  selector: 'app-products-page',
  templateUrl: './products-page.component.html',
  styleUrls: ['./products-page.component.scss'],
})
export class ProductsPageComponent implements OnInit, OnDestroy {
  products: Array<IProduct>;
  tableColumns = ['id', 'image', 'name', 'price', 'hidden'];
  tableTypeEnum = TableTypeEnum;

  private readonly unsubscribe$ = new Subject();
  constructor(
    private readonly store: Store<any>,
    private readonly modalService: ModalService,
    private inj: Injector,
  ) {}

  ngOnInit() {
    this.store.dispatch(ProductActions.getAllProduct());

    this.store
      .select(ProductSelectors.getAllProducts)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((products) => {
        this.products = products;
      });
  }

  createNewProduct(): void {
    const injector: Injector = Injector.create({
      providers: [
        {
          provide: BaseProduct,
          useValue: {} as Product,
        },
      ],
      parent: this.inj,
    });
    this.modalService.openNewModal(
      AddProductComponent,
      injector,
      'Створити новий продукт',
    );
  }

  updatedSelectedProduct(productData: IProduct): void {
    const injector: Injector = Injector.create({
      providers: [
        {
          provide: BaseProduct,
          useValue: new Product(
            productData.id,
            productData.name,
            productData.image,
            productData.hidden,
            productData.price,
          ),
        },
      ],
      parent: this.inj,
    });
    this.modalService.openNewModal(
      EditProductComponent,
      injector,
      'Редагувати продукт',
    );
  }

  deleteSelectedUser(product: IProduct): void {
    const injector: Injector = Injector.create({
      providers: [
        {
          provide: BaseProduct,
          useValue: new Product(product.id, product.name, '', false, 0),
        },
      ],
      parent: this.inj,
    });
    this.modalService.openNewModal(DeleteProductComponent, injector);
  }

  updateProductVisibility(productData: IProduct): void {
    this.store.dispatch(
      ProductActions.updateProductVisibility({
        id: productData.id || 0,
        isHidden: !productData.hidden,
      }),
    );
  }

  ngOnDestroy() {
    this.unsubscribe$.complete();
    this.unsubscribe$.unsubscribe();
  }
}
