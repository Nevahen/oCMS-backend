import { QueryUtils } from "../utils/QueryUtils";
import { ApiError } from "../ApiError";

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


    CreateUser(data){

        

    }




}