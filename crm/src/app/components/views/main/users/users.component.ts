import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../../../services/users.service';
import { FilterField } from "../../../../types/FilterField";
import { columns, filters } from "../../../../forms/users";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  constructor(protected usersService: UsersService) { }

  users: any[] = [];
  loading = false;

  columns = columns;
  filters = filters;

  loadUsers(data?: any): void {
    this.loading = true;
    this.usersService.get(data)
      .subscribe(response => {
        this.users = response.users ?? [];
        this.loading = false;
      });
  }

  ngOnInit(): void {
    this.loadUsers();
  }
}
