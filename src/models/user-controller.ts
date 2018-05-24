import { QueryUtils } from "../utils/QueryUtils";
import { ApiError } from "../ApiError";
import { User } from "./user";

export class UserController{
    

    GetAllUsersBasic(){

        const sql = "select userid, username, firstname from ocms_users";
        return QueryUtils.Query(sql)

    }

    GetUserInfoAll(id){

        const sql = "select userid, username, email, firstname, lastname, activated from ocms_users where userid = ?"
        return QueryUtils.Query(sql, [id])
        .then(result => {
            if (result.length === 0){
                throw new ApiError(404, 'User notfound')
            }
            else{
                return result
            }
        })
    }


    async createUser(req, res){

        let userData = req.body
        console.log(userData)
        let user = new User(userData)

        let isValid = await user.validate()

        if(isValid){

            let query = await user.generateInsertQuery()

            QueryUtils.Query(query)
            .then(result => {
                res.send('User Created!')
            })
            .catch(x => {
                console.log(x)
                res.status(500).send('Internal server error')}
            )

        }
    }




}