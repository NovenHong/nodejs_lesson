import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './common/login/login.component';
import {AuthGuardActivate} from "./activate/auth.guard.activate";
import {CookieService} from "ngx-cookie-service";
import { UsernamevalidatorDirective } from './directive/usernamevalidator.directive';
import { ExistvalidatorDirective } from './directive/existvalidator.directive';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatCardModule} from "@angular/material/card";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {SharedModule} from "./shared/shared.module";
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from "@angular/platform-browser";
import { loadSvgResources } from "./utils/svg.util";
import { ConfirmvalidatorDirective } from './directive/confirmvalidator.directive';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UsernamevalidatorDirective,
    ExistvalidatorDirective,
    ConfirmvalidatorDirective,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    ReactiveFormsModule,
    SharedModule
  ],
  providers: [
    AuthGuardActivate,
    CookieService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

  constructor(
    ir: MatIconRegistry,
    ds: DomSanitizer
  ) {
    loadSvgResources(ir, ds);
  }

}
