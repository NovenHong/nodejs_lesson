import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MainComponent} from "./main/main.component";

const routes: Routes = [
  {
    path:"",component:MainComponent,
    children:[
      {
        path:"",
        loadChildren:"../home/home.module#HomeModule",
      },
      {
        path:"user",
        loadChildren:"../user/user.module#UserModule",
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
