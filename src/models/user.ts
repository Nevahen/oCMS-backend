export class User{

    _properties = ['userid', 'username', 'email', 'firstname', 'lastname', 'password', 'activated']

    constructor(data?){

        if(data){
            this.assignProperties(data);
        }
    }

    assignProperties(data){

        let dataProps = Object.getOwnPropertyNames(data)
        dataProps = dataProps.filter(x => {
            return this._properties.includes(x)
        })

        dataProps.forEach(prop => {
            this[prop] = data[prop]
        })

    }













}