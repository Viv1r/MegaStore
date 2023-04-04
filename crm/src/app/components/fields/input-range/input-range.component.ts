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
  set value(val: any) {
    if (val?.min && val?.max) {
      this._value = val;
    } else {
      this._value = null;
    }
    this.onChange(this._value);
  }

  get valMin() {
    return this._value?.min;
  }

  set valMin(newVal: any) {
    this._value = this._value || {};
    newVal = Number(newVal);
    if (newVal >= 0) {
      this._value.min = newVal;
    } else {
      this._value.min = null;
    }

    this.onChange(this._value);
  }

  get valMax() {
    return this._value?.max;
  }

  set valMax(newVal: any) {
    this._value = this._value || {};
    newVal = Number(newVal);
    if (newVal >= 0) {
      this._value.max = newVal;
    } else {
      this._value.max = null;
    }

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
