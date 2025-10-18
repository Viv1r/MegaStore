import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {ProductsComponent} from "./view/products.component";
import {ProductsService} from "./services/products.service";
import {ItemsTableComponent} from "../../../components/items-table/items-table.component";


const routes: Routes = [
  {
    path: '',
    component: ProductsComponent
  }
];


@NgModule({
  declarations: [
    ProductsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ItemsTableComponent
  ],
  providers: [
    ProductsService
  ]
})
export class ProductsModule {}
