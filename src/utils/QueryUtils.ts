import { DatabaseConnection } from '../db';

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
                    resolve(false);
                }
            });
        })
    }

    public static Query(sql:string, values?:Array<any>):Promise<any>{

        return new Promise((resolve,reject)=>{
            DatabaseConnection.Instance.connection.query(sql,values,
                (err,results)=>{
                    if(err){
                        reject(err)
                    }
                    else{
                        resolve(results);
                    }
            })
       })
    }
}