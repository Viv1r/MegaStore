import {Component, forwardRef, Input} from '@angular/core';
import {ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {FilterByNamePipe} from "../../../pipes/filter-by-name.pipe";

class KeyValuePair {
  key = '';
  value = '';
}

@Component({
  standalone: true,
  selector: 'app-dictionary',
  templateUrl: './dictionary.component.html',
  styleUrls: ['./dictionary.component.scss'],
  imports: [
    CommonModule,
    FormsModule,
    FilterByNamePipe
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DictionaryComponent),
      multi: true
    }
  ]
})
export class DictionaryComponent implements ControlValueAccessor {

  valueRaw: KeyValuePair[] = [];
  touched = false;
  onChange = (foo: any) => {};

  get value(): any {
    const result: any = {};
    this.valueRaw.forEach(item => result[item.key] = item.value);
    return result;
  }

  @Input()
  set value(val: any) {
    if (Array.isArray(val)) {
      this.valueRaw = val;
    } else if (typeof(val) === 'object' && val !== null) {
      this.valueRaw = Object.keys(val).map(key => ({ key: key, value: val[key] }));
    }
    this.onChange(this.value);
  }

  addRow(): void {
    this.valueRaw.push(new KeyValuePair());
  }

  deleteRow(index: number): void {
    this.valueRaw.splice(index, 1);
    this.onChange(this.value);
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
}
