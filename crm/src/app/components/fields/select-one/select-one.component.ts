import {Component, ElementRef, forwardRef, HostListener, Input} from '@angular/core';
import {ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {FilterByNamePipe} from "../../../pipes/filter-by-name.pipe";

@Component({
    standalone: true,
    selector: 'app-select-one',
    templateUrl: './select-one.component.html',
    styleUrls: ['./select-one.component.scss'],
    imports: [
        CommonModule,
        FormsModule,
        FilterByNamePipe
    ],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => SelectOneComponent),
            multi: true
        }
    ]
})
export class SelectOneComponent implements ControlValueAccessor {

    @Input() placeholder?: string;
    @Input() showID?: boolean;

    touched = false;
    onChange = (_: object) => {};

    activeOption?: any;
    filterInput = '';

    private _options: any[] = [];
    private _value: any = null;
    private _active = false;

    constructor(private eRef: ElementRef) {}

    get options(): any[] {
        return this._options;
    }

    @Input()
    set options(val: any[]) {
        this._options = val;
        if (this.value) {
            this.activeOption = this.options?.find(item => item.id === this.value);
        }
    }

    get value(): any {
        return this._value;
    }

    @Input()
    set value(val) {
        this._value = val;
        this.onChange(this._value);
        this.active = false;
        this.activeOption = this.options?.find(item => item.id === val);
    }

    get active(): boolean {
        return this._active;
    }

    set active(val: boolean) {
        this._active = val;
        if (val === false) {
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
        if (!this.eRef.nativeElement.contains(event.target)) {
            this.active = false;
        }
    }
}
