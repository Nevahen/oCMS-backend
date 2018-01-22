import * as db from '../../db';
import { DatabaseConnection } from '../../db';
import {ApiError} from '../../ApiError';
import { Page } from '../page';
import { ApiResponse } from '../../ApiResponse';

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
                reject(new ApiError(400,"Bad request"));
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
    /**
     * Method for PUT request /api/pages
     * 
     * 
     * @param {Page} data requests body 
     * @returns ApiError or ApiResponse
     * @memberof Pages
     */
    updatePage(data:Page){
        return new Promise((resolve,reject)=>{

            let sql = "UPDATE ocms_pages SET content = ?, title = ?, lastedit=now() where page_id = ?";

            this.db.query(sql,[data.content,data.title,data.page_id],(err,result)=>{
              
                if(err){
                    console.log("error");
                    reject(new ApiError(500,"Someerror",err.code));
                }
                resolve(new ApiResponse(200,"ok!"));
            });
        });
    }

    createPage(data:Page){
        return new Promise((resolve,reject)=>{

            let sql = "INSERT into ocms_pages SET content = ?, title = ?";

            this.db.query(sql,[data.content,data.title],(err,result)=>{
              
                if(err){
                    console.log(err);
                    reject(new ApiError(500,"Someerror",err.code));
                }
                resolve(new ApiResponse(200,"ok!"));
            });
        });
    }

} 

