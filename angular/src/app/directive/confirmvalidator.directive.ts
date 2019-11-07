import { Directive } from '@angular/core';
import {AbstractControl, NG_VALIDATORS, ValidationErrors, Validator, ValidatorFn} from "@angular/forms";

@Directive({
  selector: '[confirm]',
  providers: [{ provide: NG_VALIDATORS, useExisting: ConfirmvalidatorDirective, multi: true }]
})
export class ConfirmvalidatorDirective implements Validator{

  constructor() { }

  validate(control: AbstractControl): ValidationErrors | null {
    let password = control.get("password");
    let confirm_password = control.get("confirm_password");

    return password && confirm_password && password.value == confirm_password.value ? null : {'confirm': {value: confirm_password.value}};
  }

}

export function confirmValidator(): ValidatorFn {
  return (control: AbstractControl) => {
    let password = control.get("password");
    let confirm_password = control.get("confirm_password");
    if(password && confirm_password && password.value == confirm_password.value){
      return null;
    }else {
      confirm_password.setErrors({'confirm': {value: confirm_password.value}});
      return {'confirm': {value: confirm_password.value}};
    }
  };
}
