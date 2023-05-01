import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectComponent),
      multi: true,
    },
  ],
})
export class SelectComponent implements ControlValueAccessor {
  @Input() label?: string;
  @Input() placeholder: string;
  @Input() disabled = false;
  @Input() size: 'tiny' | 'small' | 'medium' | 'large' | 'giant' = 'medium';
  @Input() selectOptions: Array<any>;

  onChange!: any;
  onTouched!: any;
  private _value: any;

  public get value() {
    return this._value;
  }

  public set value(v) {
    this._value = v;
    this.onChange(this._value);
    this.onTouched();
  }

  writeValue(obj: any): void {
    this._value = obj;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
}
