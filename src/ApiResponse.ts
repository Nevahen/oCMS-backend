/**
 * 
 * 
 * @export
 * @class ApiResponse
 */
export class ApiResponse{
    
    statuscode:number;
    message:string;

    constructor(httpcode:number,message:string){

        this.statuscode = httpcode;
        this.message = message;

    }

}