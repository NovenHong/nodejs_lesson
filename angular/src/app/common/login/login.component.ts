import { Component, OnInit } from '@angular/core';
import {CookieService} from "ngx-cookie-service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {usernameValidator, UsernamevalidatorDirective} from "../../directive/usernamevalidator.directive";
import {existValidator} from "../../directive/existvalidator.directive";
import {UserService} from "../../services/user.service";
import {User} from "../../model/user";
import {MatDialog} from "@angular/material/dialog";
import {LoadingComponent} from "../../shared/loading/loading.component";
import {SuccessComponent} from "../../shared/success/success.component";
import {ErrorComponent} from "../../shared/error/error.component";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {

  public loginFormGroup:FormGroup;
  public user:User;

  constructor(
    private cookieService:CookieService,
    private userService:UserService,
    private dialog: MatDialog,
    private route: ActivatedRoute,
    private router: Router
  ) {

    this.loginFormGroup = new FormGroup({
      username : new FormControl('',[
          Validators.required,
          usernameValidator(/^[a-zA-Z0-9_-]{4,16}$/i)
        ],[
          //existValidator(this.userService)
        ]),
      password : new FormControl('',[
        Validators.required,
        Validators.minLength(6)
      ])
    });

  }

  ngOnInit() {
    //验证是否登录
    if(this.cookieService.check("user")){
      this.router.navigate(['/']);
    }
  }

  onSubmit(){

    this.user = new class implements User {
      id: number;
      password: string;
      username: string;
    };

    this.user.username = this.loginFormGroup.value.username;
    this.user.password = this.loginFormGroup.value.password;

    this.dialog.open(LoadingComponent);

    this.userService.login(this.user).subscribe(result => {
      this.dialog.closeAll();
      if(result.status){
        let dialogRef = this.dialog.open(SuccessComponent,{data : {title : "登录成功",timeout:1000}});
        let date = new Date();
        date.setTime(date.getTime() + 24*60*60*1000);
        this.cookieService.set("user",JSON.stringify(result.data),date);
        dialogRef.afterClosed().subscribe(() => {
          this.dialog.closeAll();
          this.router.navigate(['/']);
        });
      }else {
        this.dialog.open(ErrorComponent,{data : {title : "账号或者密码错误",timeout:1000}});
      }
    });
  }

  onLogout(){
    //let user = this.cookieService.get("user");
    //console.info(JSON.parse(user));
    //let res = this.cookieService.check("user");
    let res = this.cookieService.check("abc");
    console.info(res);
  }

}
