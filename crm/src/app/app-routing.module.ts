import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from "./components/views/main/main.component";
import { RegisterComponent } from "./components/views/register/register.component";
import { LoginComponent } from "./components/views/login/login.component";
import { ProductsComponent } from "./components/views/main/products/products.component";
import { UsersComponent } from "./components/views/main/users/users.component";
import { DetailedViewComponent } from "./components/views/detailed-view/detailed-view.component";

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: 'products',
        component: ProductsComponent
      },
      {
        path: 'products/:id',
        component: DetailedViewComponent
      },
      {
        path: 'users',
        component: UsersComponent
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
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
