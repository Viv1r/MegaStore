import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {UsersComponent} from "./view/users.component";
import {ItemsTableComponent} from "../../../components/items-table/items-table.component";


const routes: Routes = [
  {
    path: '',
    component: UsersComponent
  }
];


@NgModule({
  declarations: [
    UsersComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ItemsTableComponent
  ]
})
export class UsersModule {}
