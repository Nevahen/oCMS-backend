import { ApiError } from "../ApiError";

export class Utils{

    static isInt(value:any):Promise<any> {
        return new Promise((resolve,reject)=>{
            if(isNaN(value) || !(value % 1 == 0)){
                reject(new ApiError(400, "bad request"));
            }
            resolve(true);
        })
    }
}