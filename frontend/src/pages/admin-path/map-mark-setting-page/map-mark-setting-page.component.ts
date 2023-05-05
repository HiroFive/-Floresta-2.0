import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ProductActions } from '../../../store/actions';

@Component({
  selector: 'app-map-mark-setting-page',
  templateUrl: './map-mark-setting-page.component.html',
  styleUrls: ['./map-mark-setting-page.component.scss'],
})
export class MapMarkSettingPageComponent implements OnInit {
  constructor(private readonly store: Store<any>) {}

  ngOnInit(): void {
    this.store.dispatch(ProductActions.getAllProduct());
  }
}
