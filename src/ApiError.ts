export class ApiError{

    public error_code;
    public message;
    public additional_info;

    /**
     * Creates an instance of ApiError.
     * @param {number} HTTP Error-code 
     * @param {string} Error Message
     * @param {object} Object containing additional information for the error 
     * @memberof ApiError
     */
    constructor(error_code:number, message:string, optional?:object){
        this.error_code = error_code;
        this.message    = message;
        if(optional){
            this.additional_info = optional;
        }
    }

}