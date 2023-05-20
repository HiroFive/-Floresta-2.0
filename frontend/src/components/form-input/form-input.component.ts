import {
  AfterViewInit,
  Component,
  forwardRef,
  Injector,
  Input,
  OnInit,
} from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  NgControl,
} from '@angular/forms';

@Component({
  selector: 'app-form-input',
  templateUrl: './form-input.component.html',
  styleUrls: ['./form-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FormInputComponent),
      multi: true,
    },
  ],
})
export class FormInputComponent
  implements ControlValueAccessor, OnInit, AfterViewInit
{
  @Input() type: 'text' | 'password' | 'number' = 'text';
  @Input() label = 'Some Label';
  @Input() placeholder = '';
  @Input() disabled = false;

  onChange!: any;
  onTouched!: any;
  private _value: any;
  control: AbstractControl;

  constructor(private inj: Injector) {}

  public get value() {
    return this._value;
  }

  public set value(v) {
    if (this.type === 'number') {
      v = parseFloat(v);
    }
    this._value = v;
    this.onChange(this._value);
    this.onTouched();
  }

  ngOnInit() {}

  ngAfterViewInit() {
    this.control = this.inj.get(NgControl)?.control as AbstractControl;
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

  get getError(): string {
    const error = this.control?.errors;

    if (error?.['required']) {
      return `Обов'язкове поле`;
    } else if (error?.['email']) {
      return `Невірний формат емейлу`;
    }

    return '';
  }
  get isShowError(): boolean {
    return (
      (!!this.getError &&
        this.control?.invalid &&
        this.control?.dirty &&
        this.control?.touched) ??
      false
    );
  }
}
