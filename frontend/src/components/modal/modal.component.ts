import { Component, OnInit } from '@angular/core';
import { ModalService } from '../../services';
import { IModalDto } from '../../common/interfaces';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements OnInit {
  modalState!: IModalDto;
  constructor(private readonly modalService: ModalService) {}

  ngOnInit(): void {
    this.modalService.modalCurrentContent.subscribe(
      (value) => (this.modalState = value),
    );
  }

  public closeModal(): void {
    this.modalService.changeOpenState(false);
  }
}
