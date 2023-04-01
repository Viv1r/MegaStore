import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../../../services/users.service';
import {FilterField} from "../../../../types/FilterField";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  constructor(protected usersService: UsersService) { }

  users: any[] = [];

  columns = [
    {
      tag: 'id',
      name: 'ID'
    },
    {
      tag: 'email',
      name: 'E-mail'
    },
    {
      tag: 'password',
      name: 'Password'
    },
    {
      tag: 'name',
      name: 'Name',
      default: 'Anonymous'
    },
    {
      tag: 'stores_count',
      name: 'Owned stores',
      default: 0
    },
    {
      tag: 'is_banned',
      name: 'Is banned'
    }
  ];

  readonly filters: FilterField[] = [
    {
      key: 'id',
      name: 'ID',
      type: 'number'
    },
    {
      key: 'email',
      name: 'E-mail',
      type: 'text'
    },
    {
      key: 'name',
      type: 'text'
    },
    {
      key: 'is_banned',
      name: 'Status',
      type: 'select-one',
      options: [
        {
          id: 1,
          name: 'Banned'
        },
        {
          id: 0,
          name: 'Not banned'
        }
      ]
    }
  ]

  ngOnInit(): void {
    this.usersService.get()
      .subscribe(response => {
        if (response?.users) {
          this.users = response.users;
        }
      });
  }
}
