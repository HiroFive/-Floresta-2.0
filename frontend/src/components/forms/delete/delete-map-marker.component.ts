import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { BaseMarker } from '../../../common/classes';
import { MapMarkerActions } from '../../../store/actions';
import { ModalService } from '../../../services';

@Component({
  selector: 'app-category-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.scss'],
})
export class DeleteMapMarkerComponent {
  markerId: number;
  message: string;
  constructor(
    private readonly store: Store<any>,
    private readonly modalService: ModalService,
    private readonly injMarker: BaseMarker,
  ) {
    this.markerId = this.injMarker?.id || 0;
    this.message = `Ви справді хочете видалити цю мітку #${this.markerId}? Цей процес не можна буде відмінити`;
  }

  public closeModal(): void {
    this.modalService.changeOpenState(false);
  }
  public delete(): void {
    this.store.dispatch(
      MapMarkerActions.deleteMapMarker({ id: this.markerId }),
    );
    this.modalService.changeOpenState(false);
  }
}
