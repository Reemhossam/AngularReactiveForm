import { AbstractControl, ValidationErrors } from "@angular/forms";

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

