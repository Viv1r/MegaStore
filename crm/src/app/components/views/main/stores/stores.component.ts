import { Component, EventEmitter, OnInit } from '@angular/core';
import { PopupFormService } from "../../../../services/popup-form.service";
import { columns, filters, constructor } from "../../../../forms/stores";
import { StoresService } from "../../../../services/stores.service";

@Component({
  selector: 'app-stores',
  templateUrl: './stores.component.html',
  styleUrls: ['./stores.component.scss']
})
export class StoresComponent implements OnInit {
  constructor(protected storesService: StoresService, protected popupFormService: PopupFormService) {
    this.createEmitter.subscribe((data: any) => this.createStore(data.item));
    this.updateEmitter.subscribe((data: any) => this.updateStore(data.id, data.item));
  }

  stores: any[] = [];
  loading = false;

  columns = columns;
  filters = filters;

  protected updateEmitter = new EventEmitter<any>();
  protected createEmitter = new EventEmitter<any>();

  private filtersData?: any;

  loadStores(data?: any): void {
    if (!data) {
      data = this.filtersData;
    }
    this.filtersData = data;

    this.loading = true;
    this.storesService.get(data)
      .subscribe(response => {
        this.stores = response.items ?? [];
        this.loading = false;
      });
  }

  createStore(item: any): void {
    this.storesService.create(item)
      .subscribe(data => {
        if (data.statusCode === 'ok') {
          this.popupFormService.clear();
          this.loadStores();
        } else if (data.statusCode === 'error') {
          alert(data.statusMessage);
        }
      });
  }

  updateStore(id: number, newData: any): void {
    this.storesService.update(id, newData)
      .subscribe(data => {
        if (data.statusCode === 'ok') {
          this.popupFormService.clear();
          this.loadStores();
        } else if (data.statusCode === 'error') {
          alert(data.statusMessage);
        }
      });
  }

  showEditForm(itemID: number): void {
    this.popupFormService.load({
      id: itemID,
      source: this.storesService.getOne(itemID),
      constructor: constructor,
      emitter: this.updateEmitter
    });
  }

  showCreateForm(): void {
    this.popupFormService.load({
      constructor: constructor,
      emitter: this.createEmitter
    });
  }


  ngOnInit(): void {
    this.loadStores();
  }
}
