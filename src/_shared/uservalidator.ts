import { Validator } from "./validator";
import { User } from "../models/user";

export class UserValidator implements Validator{

    readonly _requiredProp = ['username', 'firstname', 'lastname', 'password']
    errors = [];

    validate(user:User):Promise<any>{

        return Promise.resolve()
        .then(x => {
            this.checkProperties(user)
        })
        .then(x =>{
            if(this.errors.length > 0){
                return Promise.reject(this.errors)
            }
            else{
                return Promise.resolve(true)
            }
        })

    }

    private checkProperties(user){

        let userProperties = Object.getOwnPropertyNames(user);

        this._requiredProp.forEach(prop =>{
            if(!userProperties.includes(prop)){
                this.errors.push(`Missing property: ${prop}`)
            }            
        })

    }
}