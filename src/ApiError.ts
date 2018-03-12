export class ApiError{
    public error;

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

export enum ErrorCode{
    OK                    = 200,
    CREATED               = 201,
    NO_CONTENT            = 204,
    BAD_REQUEST           = 400,
    UNAUTHORIZED          = 401,
    ACCEPTED              = 402,
    FORBIDDEN             = 403,
    NOT_FOUND             = 404,
    INTERNAL_ERROR        = 500,
    
    
    
    

}