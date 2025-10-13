import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RegisterComponent} from "./auth/components/register/register.component";
import {LoginComponent} from "./auth/components/login/login.component";

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./modules/main/main.module')
        .then(m => m.MainModule)
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
    loadChildren: () => import('./modules/page-not-found/page-not-found.component').then(m => m.PageNotFoundComponent)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
