import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent {
  @Input() label?: string;
  @Input() icon?: string;
  @Input() iconStatus?: 'primary' | 'success' | 'info' | 'warning' | 'danger' = 'primary';
  @Input() hero = false;
  @Input() shape: 'rectangle' | 'semi-round' | 'round' = 'round';
  @Input() size: 'giant' | 'large' | 'medium' | 'small' | 'tiny' = 'medium';
  @Input() buttonStatus: 'primary' | 'success' | 'info' | 'warning' | 'danger' = 'primary';
  @Input() isGhost: boolean = false;
  @Input() disabled = false;
  @Output() onClick = new EventEmitter();

  onHandleClick(event: Event) {
    if (this.disabled) {
      event.stopPropagation();
    } else {
      this.onClick.emit();
    }
  }
}
