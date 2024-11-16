import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MainComponent} from "./main.component";
import {RouterModule, Routes} from "@angular/router";
import {SidebarComponent} from "../../components/sidebar/sidebar.component";
import {TitlePageComponent} from "./title-page/title-page.component";
import {UsersService} from "./users/users/users.service";
import {StoresService} from "./stores/services/stores.service";
import {CategoriesService} from "./categories/services/categories.service";


const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: '',
        component: TitlePageComponent
      },
      {
        path: 'users',
        loadChildren: () => import('./users/users.module').then(m => m.UsersModule)
      },
      {
        path: 'categories',
        loadChildren: () => import('./categories/categories.module').then(m => m.CategoriesModule)
      },
      {
        path: 'stores',
        loadChildren: () => import('./stores/stores.module').then(m => m.StoresModule)
      },
      {
        path: 'products',
        loadChildren: () => import('./products/products.module').then(m => m.ProductsModule)
      },
      {
        path: 'sales',
        loadChildren: () => import('./sales/sales.module').then(m => m.SalesModule)
      }
    ]
  }
];


@NgModule({
  declarations: [
    MainComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SidebarComponent
  ],
  providers: [
    UsersService,
    StoresService,
    CategoriesService
  ]
})
export class MainModule { }
