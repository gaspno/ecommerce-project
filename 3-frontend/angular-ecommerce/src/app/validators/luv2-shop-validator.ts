import { FormControl, ValidationErrors } from "@angular/forms";

export class Luv2ShopValidator {

    static notOnlyWhiteSpace(control:FormControl):ValidationErrors{
        if((control.value!=null)&&(control.value.trim().length===0))
        {
            return {'notOnlyWhiteSpace':true};
        }else{
        return null as any;
        }
    }
}
