import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from "@angular/material/input";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/views/login/login.component';
import { RegisterComponent } from './components/views/register/register.component';
import { MainComponent } from './components/views/main/main.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ItemsTableComponent } from './components/items-table/items-table.component';
import { ProductsComponent } from './components/views/main/products/products.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { UsersComponent } from './components/views/main/users/users.component';
import { SelectOneComponent } from './components/fields/select-one/select-one.component';
import { SelectMultipleComponent } from './components/fields/select-multiple/select-multiple.component';
import { InputRangeComponent } from './components/fields/input-range/input-range.component';
import { PageNotFoundComponent } from './components/views/page-not-found/page-not-found.component';
import { PopupFormComponent } from './components/popup-form/popup-form.component';
import { TitlePageComponent } from './components/views/main/title-page/title-page.component';
import { StoresComponent } from './components/views/main/stores/stores.component';
import { CategoriesComponent } from './components/views/main/categories/categories.component';
import { FilterByNamePipe } from './pipes/filter-by-name.pipe';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    MainComponent,
    ItemsTableComponent,
    ProductsComponent,
    SidebarComponent,
    UsersComponent,
    SelectOneComponent,
    SelectMultipleComponent,
    InputRangeComponent,
    PageNotFoundComponent,
    PopupFormComponent,
    TitlePageComponent,
    StoresComponent,
    CategoriesComponent,
    FilterByNamePipe
  ],
    imports: [
        BrowserModule,
        HttpClientModule,
        AppRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        MatCardModule,
        MatFormFieldModule,
        MatButtonModule,
        MatSlideToggleModule,
        MatInputModule,
        MatIconModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
