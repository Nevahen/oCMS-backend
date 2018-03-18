import { ApiError } from "../ApiError";

export class Utils{

    static isInt(value:any){
        if(isNaN(value) || !(value % 1 == 0)){
            return false
        }
        else {
            return true
        }
    }

    static isIntPromise(input){
        return new Promise((resolve,reject) => {
            const isInt = this.isInt(input);
            if(isInt){ resolve() }
            else{ reject(); }
        })
    }

}