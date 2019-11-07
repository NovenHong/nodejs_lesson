import {Directive, forwardRef, Injectable} from '@angular/core';
import {UserService} from "../services/user.service";
import {
  AbstractControl,
  AsyncValidator,
  AsyncValidatorFn,
  NG_ASYNC_VALIDATORS,
  ValidationErrors,
} from "@angular/forms";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";

@Directive({
  selector: '[exist]',
  providers: [
    {
      provide: NG_ASYNC_VALIDATORS,
      useExisting: forwardRef(() => ExistvalidatorDirective),
      multi: true
    }
  ]
})

@Injectable({ providedIn: 'root' })
export class ExistvalidatorDirective implements AsyncValidator{

  constructor(private userService:UserService) { }

  validate(control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
    return this.userService.exist(control.value).pipe(
      map(result => (result.status ? { exist: true } : null))
    );
  }


}

export function existValidator(userService:UserService):AsyncValidatorFn {
  return (control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {
    return userService.exist(control.value).pipe(
      map((result:any) => (result.status ? { exist: true } : null))
    );
  }
}
