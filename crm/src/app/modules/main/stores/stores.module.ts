import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {StoresComponent} from "./view/stores.component";
import {ItemsTableComponent} from "../../../components/items-table/items-table.component";


const routes: Routes = [
  {
    path: '',
    component: StoresComponent
  }
];


@NgModule({
  declarations: [
    StoresComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ItemsTableComponent
  ]
})
export class StoresModule {}
