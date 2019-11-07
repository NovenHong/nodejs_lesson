import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from "./common/login/login.component";
import {AuthGuardActivate} from "./activate/auth.guard.activate";

const routes: Routes = [
  {
    path:"",
    loadChildren:"./main/main.module#MainModule",
    canActivate:[AuthGuardActivate]
  },
  {path:"login",component:LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
