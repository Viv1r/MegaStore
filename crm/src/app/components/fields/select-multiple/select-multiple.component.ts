import { Component, ElementRef, forwardRef, HostListener, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";

@Component({
  selector: 'app-select-multiple',
  templateUrl: './select-multiple.component.html',
  styleUrls: ['./select-multiple.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectMultipleComponent),
      multi: true
    }
  ]
})
export class SelectMultipleComponent implements ControlValueAccessor {
  constructor(private eRef: ElementRef) {}

  @Input() options: any[] = [];
  @Input() placeholder?: string;

  private _value: number[] = [];
  touched = false;
  onChange = (foo: any) => {};

  private _active = false;
  filterInput = '';

  get value() {
    return this._value;
  }

  @Input()
  set value(val: number[]) {
    if (Array.isArray(val)) {
      this._value = val;
    } else {
      this._value = [];
    }
    this.onChange(this._value);
  }

  get active() {
    return this._active;
  }

  set active(newVal) {
    this._active = newVal;
    if (newVal === false) {
      this.filterInput = '';
    }
  }

  writeValue(newVal: number[]): void {
    this.value = newVal;
  }

  registerOnChange(onChange: any): void {
    this.onChange = onChange;
  }

  registerOnTouched(): void {
    this.touched = true;
  }

  clear(): void {
    this.value = [];
  }

  selectOption(id: number): void {
    if (this.value.includes(id)) {
      const index = this.value.indexOf(id);
      this.value.splice(index, 1);
    } else {
      this.value.push(id);
    }

    this.onChange(this._value);
  }

  @HostListener('document:click', ['$event'])
  clickOutside(event: Event) {
    if(!this.eRef.nativeElement.contains(event.target)) {
      this.active = false;
    }
  }
}
