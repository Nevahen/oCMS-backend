import { DatabaseConnection } from '../db';
import { ApiError } from '../ApiError';

export class QueryUtils{

    public static async PageExists(id:number){

        return new Promise((resolve,reject)=>{

            const sql = "SELECT page_id from ocms_pages where page_id = ?";
            DatabaseConnection.Instance.connection.query(sql,[id], (err,results) => {
                if(err){
                    reject(err.code)
                }
                if(results.length == 1){
                    resolve(true);
                }
                else{
                    reject(new ApiError(400, "Element doesn't exist"));
                }
            });
        })
    }

    public static Query(sql:string, values?:Array<any>):Promise<any>{


        return new Promise((resolve,reject)=>{
            DatabaseConnection.Instance.connection.query(sql,values,
                (err,results)=>{
                    if(err){
                        console.log(err);
                        console.log(err.sql)
                        reject(err);
                    }
                    else{
                        resolve(results);
                    }
            })
       })
    }
}