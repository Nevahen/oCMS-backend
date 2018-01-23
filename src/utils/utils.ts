export class Utils{

    static isInt(value:any):boolean {
        if(isNaN(value) || !(value % 1 == 0)){
            return false;
        }

        return true;
    }
}