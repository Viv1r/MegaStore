import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
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
import { DictionaryComponent } from './components/fields/dictionary/dictionary.component';
import { SalesComponent } from './components/views/main/sales/sales.component';
import { AuthModule } from "./auth/auth.module";

@NgModule({
  declarations: [
    AppComponent,
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
    FilterByNamePipe,
    DictionaryComponent,
    SalesComponent
  ],
  imports: [
      AuthModule,
      BrowserModule,
      HttpClientModule,
      AppRoutingModule,
      FormsModule,
      ReactiveFormsModule,
      BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
