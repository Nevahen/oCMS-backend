import * as db from '../../db';
import { DatabaseConnection } from '../../db';
import {ApiError} from '../../ApiError';
import { Page } from '../page';
import { ApiResponse } from '../../ApiResponse';
import { Utils } from '../../utils/utils';
import { QueryUtils } from '../../utils/QueryUtils';
import { resolve } from 'path';

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

            if(!Utils.isInt(id)){
                reject(new ApiError(100, "Invalid DELETE request"));
            }

            QueryUtils.PageExists(id)
            .then((value)=>{
                if(!value){
                    resolve(new ApiError(404, "Element not found"));
                }
            });

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
            const sql = "select * from ocms_pages";
            QueryUtils.Query(sql)
            .catch((err)=>{
                reject(err);
            })
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
            QueryUtils.PageExists(data.page_id)
            .then(()=>{
            return QueryUtils.Query(sql,
                [
                    data.content,
                    data.title,data.page_id
                ])
            })
            .then(()=>{
                resolve(new ApiResponse(400,"All good!"));
            })
            .catch((err)=>{
                reject(new ApiError(500,err));
            })
        });
    }

    createPage(data:Page){
        return new Promise((resolve,reject)=>{

            let sql = "INSERT into ocms_pages SET content = ?, title = ?";

            QueryUtils.Query(sql,
                [
                    data.content,
                    data.title
                ])                
            .then(()=>{
                resolve(new ApiResponse(400,"All good!"));
            })
            .catch(()=>{
                reject(new ApiError(500,"Internal Server Error"));
            })      
        });
    }
    
    deletePage(page_id:number){
        
        const sql = "DELETE from ocms_pages WHERE page_id = ?";

        return new Promise((resolve,reject)=>{

            QueryUtils.PageExists(page_id)
            .then(()=>{
                return QueryUtils.Query(sql)
            })
            .then(()=>{
                resolve(new ApiResponse(400, "All good!"));
            })
            .catch((err)=>{
                reject(new ApiError(500,err));
            })
        });        
    }
}