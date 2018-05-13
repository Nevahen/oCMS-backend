import { QueryUtils } from "../utils/QueryUtils";
import { UserValidator } from "../_shared/uservalidator"

export class User{

    _properties = ['userid', 'username', 'email', 'firstname', 'lastname', 'password', 'activated']

    _requiredProp = ['username, firstname, lastname, password']

    constructor(data?){

        if(data){
            this.assignProperties(data);
        }
    }

    private assignProperties(data){

        let dataProps = Object.getOwnPropertyNames(data)
        dataProps = dataProps.filter(x => {
            return this._properties.includes(x)
        })

        dataProps.forEach(prop => {
            this[prop] = data[prop]
        })

    }

    public validate(){
        let validator = new UserValidator();

        return validator.validate(this);
    }

    async generateInsertQuery(){

        const isValid = await this.validate().catch(err =>{
            console.log(err)
        })
        
        if(!isValid){
            throw isValid
        }
        else{

            const SQL = "INSERT INTO ocms_pages SET ?"

            let obj = {};

            this._requiredProp.forEach(x => {
                if(this.hasOwnProperty(x)){
                    obj[x] = this[x];
                }
                else{
                    obj[x] = null
                }
            })


            return QueryUtils.format(SQL, [obj]);
        }

    }

    resetPassword(){
    }
}