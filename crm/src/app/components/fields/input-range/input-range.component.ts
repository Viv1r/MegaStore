import {Component, forwardRef, Input} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";

@Component({
  selector: 'app-input-range',
  templateUrl: './input-range.component.html',
  styleUrls: ['./input-range.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputRangeComponent),
      multi: true
    }
  ]
})
export class InputRangeComponent implements ControlValueAccessor {

  private _value: any = null;
  touched = false;
  onChange = (foo: any) => {};

  get value() {
    return this._value;
  }

  @Input()
  set value(val) {
    this._value = val;
    this.onChange(this._value);
  }

  writeValue(newVal: any): void {
    this.value = newVal;
  }

  registerOnChange(onChange: any) {
    this.onChange = onChange;
  }

  registerOnTouched() {
    this.touched = true;
  }

}
