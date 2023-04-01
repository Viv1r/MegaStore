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

  @Input() options?: any[] = [];
  @Input() placeholder?: string;

  private _value: any = null;
  touched = false;
  onChange = (foo: any) => {};

  active = false;
  activeOption?: any;

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

  writeValue(newVal: any): void {
    this.value = newVal;
  }

  registerOnChange(onChange: any) {
    this.onChange = onChange;
  }

  registerOnTouched() {
    this.touched = true;
  }

  toggleActive(): void {
    this.active = !this.active;
  }

  @HostListener('document:click', ['$event'])
  clickOutside(event: Event) {
    if(!this.eRef.nativeElement.contains(event.target)) {
      this.active = false;
    }
  }
}
