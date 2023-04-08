import { Component, EventEmitter, OnInit } from '@angular/core';
import { UsersService } from '../../../../services/users.service';
import { FilterField } from "../../../../types/FilterField";
import { columns, filters, constructor } from "../../../../forms/users";
import { PopupFormService } from "../../../../services/popup-form.service";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  constructor(protected usersService: UsersService, protected popupFormService: PopupFormService) {
    this.updateEmitter.subscribe((data: any) => this.updateUser(data.id, data.item));
  }

  users: any[] = [];
  loading = false;

  columns = columns;
  filters = filters;

  protected updateEmitter = new EventEmitter<any>();

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

  updateUser(id: number, newData: any): void {
    this.usersService.update(id, newData)
      .subscribe(data => {
        if (data.statusCode === 'ok') {
          this.popupFormService.clear();
          this.loadUsers();
        } else if (data.statusCode === 'error') {
          alert(data.statusMessage);
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

  async showPopup(itemID: number): Promise<void> {
    await this.popupFormService.load({
      id: itemID,
      source: this.usersService.getOne(itemID),
      constructor: constructor,
      emitter: this.updateEmitter
    });
    this.popupFormService.active = true;
  }


  ngOnInit(): void {
    this.loadUsers();
  }
}
