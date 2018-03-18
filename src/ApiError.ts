export class ApiError{
    public error;
    public

    /**
     * Creates an instance of ApiError.
     * @param {number} HTTP Error-code 
     * @param {string} Error Message
     * @param {object} Object containing additional information for the error 
     * @memberof ApiError
     */
    constructor(error_code:number, message:string, optional?:object){
       
       this.error = {
            statuscode: error_code,
            message: message,        
        }

        if(optional){
            this.error.additional_info = optional;
        }
    }

    get code(){
        return this.error.statuscode;
    }
}