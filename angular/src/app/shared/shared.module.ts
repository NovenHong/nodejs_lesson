import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingComponent } from './loading/loading.component';
import {MatDialogModule} from "@angular/material/dialog";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import { SuccessComponent } from './success/success.component';
import {MatIconModule} from "@angular/material/icon";
import { ErrorComponent } from './error/error.component';



@NgModule({
  declarations: [LoadingComponent, SuccessComponent, ErrorComponent],
  imports: [
    CommonModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    MatIconModule
  ],
  entryComponents: [
    LoadingComponent,
    SuccessComponent,
    ErrorComponent
  ]
})
export class SharedModule { }
