import {Directive, Input} from '@angular/core';
import {AbstractControl, NG_VALIDATORS, ValidationErrors, Validator, ValidatorFn} from "@angular/forms";

@Directive({
  selector: '[username]',
  providers: [{provide:NG_VALIDATORS,useExisting:UsernamevalidatorDirective,multi:true}]
})

export class UsernamevalidatorDirective implements Validator{
  @Input('username')
  private usernameValidator:string;

  constructor() { }

  validate(control: AbstractControl): ValidationErrors | null {
    return new RegExp(this.usernameValidator, 'i').test(control.value) ?
      null : {'username': {value: control.value}};
  }

}

export function usernameValidator(regExp: RegExp): ValidatorFn {
  return (control: AbstractControl) => {
    return regExp.test(control.value) ?
      null : {'username': {value: control.value}};
  }
}
