import { DatabaseConnection } from '../db';

export class QueryUtils{


    public static async PageExists(id:number){

        return new Promise((resolve,reject)=>{

            const sql = "SELECT page_id from ocms_pages where page_id = ?";
            DatabaseConnection.Instance.connection.query(sql,[id], (err,results) => {

                if(results.length == 1){
                    resolve(true);
                }
                else{
                    resolve(false);
                }
         
            });
        })
    }



}