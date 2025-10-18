import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {CategoriesComponent} from "./view/categories.component";
import {ItemsTableComponent} from "../../../components/items-table/items-table.component";


const routes: Routes = [
  {
    path: '',
    component: CategoriesComponent
  }
];


@NgModule({
  declarations: [
    CategoriesComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ItemsTableComponent
  ]
})
export class CategoriesModule {}
