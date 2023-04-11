import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { FormControl, FormGroup } from "@angular/forms";
import {PopupFormService} from "../../services/popup-form.service";
import {AuthService} from "../../services/auth.service";
import {FilterField} from "../../types/Fields";

@Component({
  selector: 'app-items-table',
  templateUrl: './items-table.component.html',
  styleUrls: ['./items-table.component.scss']
})
export class ItemsTableComponent implements OnInit {
  constructor(private authService: AuthService) {}

  @Input() columns: any[] = [{ tag: 'id', name: 'ID' }, { tag: 'title', name: 'Title' }];
  @Input() filtersFields: FilterField[] = [];
  @Input() itemsPerPage = 10;
  @Input() loading = false;
  @Input() editable? = true;

  @Output() pushFilters = new EventEmitter<any>();
  @Output() add = new EventEmitter<void>();
  @Output() edit = new EventEmitter<number>();
  @Output() delete = new EventEmitter<number>();

  filtersForm = new FormGroup({});

  user = this.authService.user;

  private _items: any[] = [];

  @Input()
  set items(newItems: any[]) {
    // Убираем выделение при изменении списка предметов
    if (JSON.stringify(this.items) !== JSON.stringify(newItems)) {
      this.selectMode = false;
    }
    this._items = newItems;
  }

  get items() {
    return this._items;
  }

  private _selectMode = false;
  selectedItems: number[] = [];

  get selectMode(): boolean {
    return this._selectMode;
  }

  set selectMode(val: boolean) {
    this._selectMode = val;
    if (val === false) {
      this.selectedItems = [];
    }
  }

  ngOnInit(): void {
    this.initForm();
  }

  editItem(id: number): void {
    this.edit.emit(id);
    window.scroll(0, 0);
  }

  initForm(): void {
    const newForm: any = {};

    for (const field of this.filtersFields) {
      const type = field.type;

      if (type === 'number' || type === 'select-one')
        newForm[field.key] = new FormControl(0);

      if (type === 'text')
        newForm[field.key] = new FormControl('');

      if (type === 'select-multiple')
        newForm[field.key] = new FormControl<number[]>([]);

      if (type === 'range')
        newForm[field.key] = new FormControl({ min: 0, max: 0 });
    }

    this.filtersForm = new FormGroup(newForm);
    this.filtersForm.reset();
  }

  selectItem(id: number): void {
    this.selectMode = true;

    if (this.selectedItems.includes(id)) {
      const index = this.selectedItems.findIndex(item => item === id);
      this.selectedItems.splice(index, 1);
    } else {
      this.selectedItems.push(id);
    }

    if (this.selectedItems.length === 0) {
      this.selectMode = false;
    }
  }

  applyFilters(): void {
    this.pushFilters.emit(this.filtersForm.value);
  }

  resetForm(): void {
    if (Object.values(this.filtersForm.value).every(item => !item)) return;
    this.filtersForm.reset();
    this.applyFilters();
  }

}
