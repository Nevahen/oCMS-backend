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

        let pagedata;
        const sql = 'select * from ocms_pages where page_id = ?';

        return new Promise((resolve,reject)=>{

            Utils.isInt(id)
            .then(() => { return QueryUtils.PageExists(id)
            })
            .then(() => { return QueryUtils.Query(sql,[id])})
            .then(results =>{
                // If there is no tags init empty array;
                if(!results[0].tags){
                    results[0].tags = [];
                }

                this.getPageTags(id)
                .then(v =>{                   
                    for(let tag of v){
                        results[0].tags.push(tag.tag_name);   
                    }
                   resolve(results);
                })
            })   
            .catch(err =>{
                reject(err);
            })        
        })
}

    /**
     * Returns all pages
     */
    getAllPages(){

        return new Promise((resolve,reject)=>{
            const sql = "select * from ocms_pages";
            QueryUtils.Query(sql).
            then((pages)=>{
                resolve(pages);
            })
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
                resolve(new ApiResponse(200,"All good!"));
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
                resolve(new ApiResponse(200,"All good!"));
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
                return QueryUtils.Query(sql,[page_id])
            })
            .then(()=>{
                resolve(new ApiResponse(400, "All good!"));
            })
            .catch((err)=>{
                reject(new ApiError(500,err));
            })
        });        
    }

    getPageTags(page_id:number){

        const sql = `select tag_name from ocms_tags
        INNER JOIN ocms_page_tags on ocms_page_tags.tag_id = ocms_tags.tag_id
        WHERE ocms_page_tags.page_id = ?`;

        return QueryUtils.Query(sql, [page_id])
    }
}