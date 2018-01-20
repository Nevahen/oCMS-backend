import * as db from '../db';
import { DatabaseConnection } from '../db';
import {ApiError} from '../ApiError';

export class Pages{

    private db;

    constructor(){
        this.db = DatabaseConnection.Instance.connection;
    }

    /**
     * Get page by id
     * @param id Page ID
     * @param cb Callback
     */
    getPageByID(id){

        return new Promise((resolve,reject)=>{

            if(isNaN(id) || !(id % 1 == 0)){
                reject(new ApiError(404,"Test"));
            }
            
            const sql = 'select * from ocms_pages where page_id = ?'
            this.db.query(sql,[id],(err,results)=>{
                if(err){
                    reject(new ApiError(500,"Internal Api Error"));
                }
                if(results.length == 0){
                    resolve(new ApiError(404,"Element not Found!",{
                        Request: id
                    }));
                }
                resolve(results);
            });
        }) 
    };

    /**
     * Returns all pages
     */
    getAllPages(){

    return new Promise((resolve,reject)=>{
        this.db.query('select * from ocms_pages',(err,results)=>{
            if(err){
                reject(err);
            }
            resolve(results);
        });
    }) 
};

} 

