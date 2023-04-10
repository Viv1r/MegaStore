import { Component, EventEmitter, OnInit } from '@angular/core';
import { PopupFormService } from "../../../../services/popup-form.service";
import { columns, filters, constructor } from "../../../../forms/stores";
import { StoresService } from "../../../../services/stores.service";
import {UsersService} from "../../../../services/users.service";
import {AuthService} from "../../../../services/auth.service";

@Component({
  selector: 'app-stores',
  templateUrl: './stores.component.html',
  styleUrls: ['./stores.component.scss']
})
export class StoresComponent implements OnInit {
  constructor(
    private storesService: StoresService,
    private usersService: UsersService,
    private authService: AuthService,
    private popupFormService: PopupFormService
  ) {
    this.createEmitter.subscribe((data: any) => this.createStore(data.item));
    this.updateEmitter.subscribe((data: any) => this.updateStore(data.id, data.item));
  }

  user = this.authService.user;

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

  deleteStore(id: number): void {
    if (!confirm(`Are you sure you want to delete store #${id}?`))
      return;
    this.storesService.delete(id)
      .subscribe(data => {
        if (data.statusCode === 'ok') {
          const index = this.stores.findIndex(item => item.id === id);
          this.stores.splice(index, 1);
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

  loadUsers(): void {
    this.usersService.getShort()
      .subscribe(data => {
        if (data?.items) {
          const target = this.filters.find(item => item.key === 'owner_id');
          if (target) {
            target.options = data.items;
          }
        }
      });
  }


  ngOnInit(): void {
    this.loadStores();
    if (this.user.isAdmin) {
      this.loadUsers();
    }
  }
}
