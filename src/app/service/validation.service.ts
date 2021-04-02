import { FormGroup } from "@angular/forms";
import { ValidatorMapping } from "../model/ValidatorMapping";


export class ValidationService {
  static getValidatorErrorMessage(validatorName: string, validatorValue?: any) {
    const validator: ValidatorMapping = {
      required: 'Required',
      invalidEmailAddress: 'Invalid email address',
      invalidPassword:
        'Invalid password. Password must be at least 6 characters long, and contain a number.',
      minlength: `Minimum length ${validatorValue.requiredLength}`,
      passwordMismatch: 'Password and confirm password do not match!'
    }
    return validator[validatorName];
  }


  static emailValidator(control: any) {
    // RFC 2822 compliant regex
    if (
      control.value.match(
        /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
      )
    ) {
      return null;
    } else {
      return { invalidEmailAddress: true };
    }
  }


  static passwordValidator(control: any) {
    // {6,100}           - Assert password is between 6 and 100 characters
    // (?=.*[0-9])       - Assert a string has at least one number
    if(control.touched){
      if (control.value.match(/^(?=.*[0-9])[a-zA-Z0-9!@#$%^&*]{6,100}$/)) {
        return null;
      } else {
        return { invalidPassword: true };
      }
    }else{
      return null;
    }

  }

  static passwordsMatch(confirmPass: any) {

    return (control: any) => {
      if (confirmPass.password !== control.value) {
        return { passwordMismatch: true }
      } else {
        //it always gets here no matter what
        return  null;
      }
    }
  }


}
