import * as db from '../../db';
import { DatabaseConnection } from '../../db';
import {ApiError} from '../../ApiError';
import { Page } from '../page';
import { ApiResponse } from '../../ApiResponse';
import { Utils } from '../../utils/utils';
import { QueryUtils } from '../../utils/QueryUtils';

export class Pages{

 db;

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

            if(!Utils.isInt(id)){
                reject(new ApiError(100, "Invalid DELETE request"));
            }

            QueryUtils.PageExists(id)
            .then((value)=>{
                if(!value){
                    resolve(new ApiError(404, "Element not found"));
                }
            })

            const sql = 'select * from ocms_pages where page_id = ?'
            this.db.query(sql,[id],(err,results)=>{
                if(err){
                    reject(new ApiError(500,"Internal Api Error"));
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
    
    deletePage(page_id:number){
        return new Promise((resolve,reject)=>{

            if(!Utils.isInt(page_id)){
                reject(new ApiError(100, "Invalid DELETE request"));
            }

            QueryUtils.PageExists(page_id)
            .then((value)=>{
                if(!value){
                    resolve(new ApiError(404, "Element not found"));
                }
            })

            let sql = "DELETE from ocms_pages where page_id = ?";
            this.db.query(sql,[page_id],(err,result)=>{
                if(err){
                    console.log(err);
                    reject(new ApiError(500,"Someerror",err.code));
                }
                resolve(new ApiResponse(200,"ok!"));
            });
        });
    }

} 

