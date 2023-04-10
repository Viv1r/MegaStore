import { Component, EventEmitter, OnInit } from '@angular/core';
import { UsersService } from '../../../../services/users.service';
import { FilterField } from "../../../../types/FilterField";
import { columns, filters, constructor } from "../../../../forms/users";
import { PopupFormService } from "../../../../services/popup-form.service";

@Component({
  selector: 'app-users-crm',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  constructor(protected usersService: UsersService, protected popupFormService: PopupFormService) {
    this.createEmitter.subscribe((data: any) => this.createUser(data.item));
    this.updateEmitter.subscribe((data: any) => this.updateUser(data.id, data.item));
  }

  users: any[] = [];
  loading = false;

  columns = columns;
  filters = filters;

  protected updateEmitter = new EventEmitter<any>();
  protected createEmitter = new EventEmitter<any>();

  private filtersData?: any;

  loadUsers(data?: any): void {
    if (!data) {
      data = this.filtersData;
    }
    this.filtersData = data;

    this.loading = true;
    this.usersService.get(data)
      .subscribe(response => {
        this.users = response.users ?? [];
        this.loading = false;
      });
  }

  createUser(item: any): void {
    this.usersService.create(item)
      .subscribe(data => {
        if (data.statusCode === 'ok') {
          this.popupFormService.clear();
          this.loadUsers();
        } else if (data.statusCode === 'error') {
          this.popupFormService.pushError(data.statusMessage);
        }
      });
  }

  updateUser(id: number, newData: any): void {
    this.usersService.update(id, newData)
      .subscribe(data => {
        if (data.statusCode === 'ok') {
          this.popupFormService.clear();
          this.loadUsers();
        } else if (data.statusCode === 'error') {
          this.popupFormService.pushError(data.statusMessage);
        }
      });
  }

  banUser(id: number): void {
    if (!confirm(`Are you sure you want to ban user #${id}?`))
      return;
    this.usersService.ban(id)
      .subscribe(data => {
        if (data.statusCode === 'ok') {
          const target = this.users.find(item => item.id === id);
          target.is_banned = true;
        } else if (data.statusCode === 'error') {
          alert(data.statusMessage);
        }
      });
  }

  showEditForm(itemID: number): void {
    this.popupFormService.load({
      id: itemID,
      source: this.usersService.getOne(itemID),
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
    this.loadUsers();
  }
}
