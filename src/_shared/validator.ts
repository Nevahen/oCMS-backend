export interface Validator{

    validate(object:any): Promise<any>;
    errors:Array<any>; 

}
