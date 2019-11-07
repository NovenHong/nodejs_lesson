import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from "@angular/router";
import {Observable, of} from "rxjs";
import {CookieService} from "ngx-cookie-service";
import {Injectable} from "@angular/core";

@Injectable()
export class AuthGuardActivate implements CanActivate {

  constructor(private cookieService:CookieService,private router:Router){};

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      return this.check();
  }

  check(){
    if(this.cookieService.check("user")){
      return of(true);
    }else {
      return  this.router.navigate(['login']);
    }
  }
}
