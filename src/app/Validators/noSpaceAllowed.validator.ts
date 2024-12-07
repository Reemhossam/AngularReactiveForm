import { AbstractControl, AsyncValidator, AsyncValidatorFn, ValidationErrors } from "@angular/forms";
import { Observable } from "rxjs";

export const noSpaceAllowed=
  (ctrl: AbstractControl): ValidationErrors | null =>{
    const val = ctrl.value;
    if ( !(val === '') && String(val).includes(' ')) {
      return {
        noSpaceAllowed: true
      }
    }
    return null;
  }

  export class CustomValidtors{

    static noSpaceAllowed(ctrl: AbstractControl): ValidationErrors | null {
      const val = ctrl.value;
      if ( !(val === '') && String(val).includes(' ')) {
        return {
          noSpaceAllowed: true
        }
      }
      return null;
    }
  }

  function userNameAllowed(userName : string){
    const TakenUserName = ['ReemHossam','AhmedSamy','MonaAli'];
    return new Promise ((resolve,reject)=>{
      setTimeout(() => {
         TakenUserName.forEach(user => {
          if (user === userName)
            resolve({usernameAlreadyExists:true});
         });
         TakenUserName.push(userName);
         resolve(null);
      }, 3000);
    })
  }

  export class userNameAllowedValidator {
  
    static createValidator(control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
      return  userNameAllowed(control.value)
    }
  }

  // export class userNameAllowedValidator implements AsyncValidator{
  //   validate(control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
  //     return  userNameAllowed(control.value)
  //   }
  // }



