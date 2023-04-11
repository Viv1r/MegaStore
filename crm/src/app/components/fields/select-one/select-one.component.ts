import { Component, ElementRef, forwardRef, HostListener, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";

@Component({
  selector: 'app-select-one',
  templateUrl: './select-one.component.html',
  styleUrls: ['./select-one.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectOneComponent),
      multi: true
    }
  ]
})
export class SelectOneComponent implements ControlValueAccessor {
  constructor(private eRef: ElementRef) {}

  @Input() placeholder?: string;
  @Input() showID?: boolean;

  private _options: any[] = [];
  private _value: any = null;
  touched = false;
  onChange = (foo: any) => {};

  private _active = false;
  activeOption?: any;
  filterInput = '';

  get options() {
    return this._options;
  }

  @Input()
  set options(val) {
    this._options = val;
    if (this.value) {
      this.activeOption = this.options?.find(item => item.id === this.value);
    }
  }

  get value() {
    return this._value;
  }

  @Input()
  set value(val) {
    this._value = val;
    this.onChange(this._value);
    this.active = false;
    this.activeOption = this.options?.find(item => item.id === val);
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

  writeValue(newVal: any): void {
    this.value = newVal;
  }

  registerOnChange(onChange: any): void {
    this.onChange = onChange;
  }

  registerOnTouched(): void {
    this.touched = true;
  }

  clear(): void {
    this.value = null;
  }

  @HostListener('document:click', ['$event'])
  clickOutside(event: Event) {
    if(!this.eRef.nativeElement.contains(event.target)) {
      this.active = false;
    }
  }
}
