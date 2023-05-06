import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ProductActions } from '../../store/actions';

@Component({
  selector: 'app-catalog-page',
  templateUrl: './catalog-page.component.html',
  styleUrls: ['./catalog-page.component.scss'],
})
export class CatalogPageComponent implements OnInit, OnDestroy {
  constructor(private readonly store: Store<any>) {}
  ngOnInit(): void {
    this.store.dispatch(ProductActions.getCatalog({ id: 21 }));
  }
  ngOnDestroy(): void {}
}
