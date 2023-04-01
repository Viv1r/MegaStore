import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { FormControl, FormGroup } from "@angular/forms";
import { FilterField } from "../../types/FilterField";

interface Range {
  min: number;
  max: number;
}

@Component({
  selector: 'app-items-table',
  templateUrl: './items-table.component.html',
  styleUrls: ['./items-table.component.scss']
})
export class ItemsTableComponent implements OnInit {

  @Input() columns: any[] = [{ tag: 'id', name: 'ID' }, { tag: 'title', name: 'Title' }];
  @Input() items: any[] = [];
  @Input() filtersFields: FilterField[] = [];

  @Output() pushFilters = new EventEmitter<any>();

  filtersForm = new FormGroup({});

  private SelectMode = false;
  selectedItems: number[] = [];

  ngOnInit(): void {
    this.initForm();
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
        newForm[field.key] = new FormControl<Range>({ min: 0, max: 0 });
    }

    this.filtersForm = new FormGroup(newForm);
    this.filtersForm.reset();
  }

  get selectMode(): boolean {
    return this.SelectMode;
  }

  set selectMode(val: boolean) {
    this.SelectMode = val;
    if (val === false) {
      this.selectedItems = [];
    }
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

}
