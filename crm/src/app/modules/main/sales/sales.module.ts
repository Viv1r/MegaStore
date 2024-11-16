import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {SalesComponent} from "./view/sales.component";
import {SalesService} from "./services/sales.service";
import {ItemsTableComponent} from "../../../components/items-table/items-table.component";


const routes: Routes = [
  {
    path: '',
    component: SalesComponent
  }
];


@NgModule({
  declarations: [
    SalesComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ItemsTableComponent
  ],
  providers: [
    SalesService
  ]
})
export class SalesModule {}
