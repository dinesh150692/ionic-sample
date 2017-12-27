import { FormControl } from '@angular/forms';

export class CustomValidator {

    static isValidEmail(control: FormControl): any {
        let re =  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  
        // skip validation if empty (Validators.required should handle this)
        if(!control.value) {
            return null;
        }
        
        if(!re.test(control.value)) {
            return {
                "invalidEmail": true
            };
        }
  
        return null;
    }
  
    static isValidMobile(control: FormControl): any {
      let re =  /^[7-9]{1}[0-9]{9}$/;
  
      // skip validation if empty (Validators.required should handle this)
      if(!control.value) {
          return null;
      }
      
      if(!re.test(control.value)) {
          return {
              "invalidMobile": true
          };
      }
  
      return null;
  }

}