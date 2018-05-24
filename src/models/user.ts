import { QueryUtils } from "../utils/QueryUtils";
import { UserValidator } from "../_shared/uservalidator"
import * as bcrypt from 'bcrypt';

export class User{

    userid:     number
    username:   string
    email:      string
    firstname:  string
    lastname:   string
    password:   string 
    activated:  boolean
    
    _properties = ['userid', 'username', 'email', 'firstname', 'lastname', 'password', 'activated']

    _requiredProp = ['username', 'firstname', 'lastname', 'password']
    
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
        
        if(!isValid) {
            throw isValid
        }
        else {

        return bcrypt.hash(this.password, 14)
            .then(password => {
                this.password = password
            })
            .then(x => {
                const SQL = "INSERT INTO ocms_users SET ?"
                let obj = {};

                this._properties.forEach(x => {
                    if(this.hasOwnProperty(x)){

                        if(x !== null){
                            obj[x] = this[x];
                        }
                        console.log(this + 'log')
                    }
                })
                return QueryUtils.format(SQL, [obj]);
            })
        }
    }

    resetPassword(){
    }
}