import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from "./components/views/main/main.component";
import { RegisterComponent } from "./components/views/register/register.component";
import { LoginComponent } from "./components/views/login/login.component";
import { ProductsComponent } from "./components/views/main/products/products.component";
import { UsersComponent } from "./components/views/main/users/users.component";
import { PageNotFoundComponent } from "./components/views/page-not-found/page-not-found.component";
import {TitlePageComponent} from "./components/views/main/title-page/title-page.component";
import {StoresComponent} from "./components/views/main/stores/stores.component";
import {CategoriesComponent} from "./components/views/main/categories/categories.component";
import {SalesComponent} from "./components/views/main/sales/sales.component";

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
        component: UsersComponent
      },
      {
        path: 'categories',
        component: CategoriesComponent
      },
      {
        path: 'stores',
        component: StoresComponent
      },
      {
        path: 'products',
        component: ProductsComponent
      },
      {
        path: 'sales',
        component: SalesComponent
      }
    ]
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: '**',
    pathMatch: 'full',
    component: PageNotFoundComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
