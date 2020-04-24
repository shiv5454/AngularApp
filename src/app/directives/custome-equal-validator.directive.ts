import { Directive, Input } from '@angular/core';
import { Validators, NG_VALIDATORS, AbstractControl } from '@angular/forms';

@Directive({
  selector: '[appCustomeEqualValidator]',
  providers:[{
    provide: NG_VALIDATORS,
    useExisting:CustomeEqualValidatorDirective,
    multi:true
  }]
})
export class CustomeEqualValidatorDirective implements Validators {
  @Input() appCustomeEqualValidator:string;
  validate(confirmPswd:AbstractControl):{[key:string]:any}|null{
      const password = confirmPswd.parent.get(this.appCustomeEqualValidator)
      if(password && password.value !== confirmPswd.value){
        return {'notEqual': true};   
      }
      return null;
  }

}
