import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/users.service';

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

  ngOnInit(): void {
    this.usersService.get()
      .subscribe(response => {
        if (response?.users) {
          this.users = response.users;
        }
      });
  }
}
