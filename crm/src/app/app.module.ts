import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {TitlePageComponent} from './modules/main/title-page/title-page.component';
import {AuthModule} from "./auth/auth.module";
import {PageNotFoundComponent} from "./modules/page-not-found/page-not-found.component";
import {PopupFormComponent} from "./components/popup-form/popup-form.component";

@NgModule({
  declarations: [
    AppComponent,
    TitlePageComponent
  ],
  imports: [
    AuthModule,
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    PageNotFoundComponent,
    PopupFormComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
