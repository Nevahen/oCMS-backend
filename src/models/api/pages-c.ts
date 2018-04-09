import * as db from '../../db';
import { DatabaseConnection } from '../../db';
import { ApiError } from '../../ApiError';
import { Page } from '../page';
import { ApiResponse } from '../../ApiResponse';
import { Utils } from '../../utils/utils';
import { QueryUtils } from '../../utils/QueryUtils';
import { resolve } from 'path';
import { PageValidator } from '../../_shared/pagevalidator';
import { HTTPCodes } from '../../enums/httpcodes';

export class Pages {

    private db;

    constructor() {
        this.db = DatabaseConnection.Instance.connection;
    }


    getPageByID = (req,res) => {
        var pageID = req.params.id
        var pagedata;
        const sql = 'select * from ocms_pages where page_id = ?';

        /*
        * Flow: Check valid int and that page exists
        * Get Basic Pagedata
        * Get possible tags
        * Catch errors and return them if something fails
        */
        this.idIsNumber(pageID)
        .then(() => QueryUtils.PageExists(pageID))
        .then(() => QueryUtils.Query(sql, [pageID]))
        .then(results => {
            pagedata = results;
            // Init tag array
            pagedata[0].tags = [];
        })
        .then(() =>  this.getPageTags(pageID))
        .then(tags => {
            tags.forEach(tag => {
                pagedata[0].tags.push(tag.tag_name);
            })

            res.json(pagedata);
        })
        .catch(err => {
            res.send(err);
        })
    }
    
    /**
     * Returns all pages
     */
    getAllPages(req, res) {

        const sql = "select * from ocms_pages";
        QueryUtils.Query(sql).
            then((pages) => {
                res.send(pages);
            })
            .catch((err) => {
                res.send(err);
            })
     
    };

    updatePage = (req, res)  => {
        let data = req.body
        QueryUtils.PageExists(data.page_id)
        .then(() => { return this.fetchPage(data.page_id)})
        .then(page => { return new Page(page[0])})
        .then(page => {

            let query = page.generateUpdateQuery(req.body)
            if(query !== null){
                QueryUtils.Query(query)
            }
        })
        .then(() => {
            if (data.tags && data.tags.length > 0) {
                return this.setPageTags(data.tags)
            }
            return null;
        })
        //Process tags
        .then((tag_ids) => {
            if (tag_ids) {
                let array = [];
                /* Index 1 because promise returns multi query response
                / and 1 contains tags */
                tag_ids[1].forEach(element => {
                    array.push(element.tag_id);
                });

                return this.setTagRelations(data.page_id, array);
            }
            else {
                return this.removeAllTagRelations(data.page_id);
            }
        })
        .then(() => {
            res.json(new ApiResponse(200, "All good!"));
        })
        .catch((err) => {
            res.status(err.statuscode).json(err);
        })

    }

    createPage = (req,res) => {
        let data = req.body
        let insert_id;

        let validator = new PageValidator();
        validator.validate(data)
            .then(() => { return new Page(data)})
            .then((page) => QueryUtils.Query(page.generateInsertQuery()))
            .then((result) => {

                insert_id = result.insertId;

                if (data.tags && data.tags.length > 0) {
                    return this.setPageTags(data.tags)
                }
                return null;
            })
            .then((tag_ids) => {

                if (tag_ids) {
                    let array = [];
                    /* Index 1 because promise returns multi query response
                    / and 1 contains tags */
                    tag_ids[1].forEach(element => {
                        array.push(element.tag_id);
                    });
    
                    return this.setTagRelations(insert_id, array);
                }

                return null;
            })
            .then(() => {
                res.status(200).json(new ApiResponse(200,"Page created!"))
            })
            .catch((err) => {
                console.log(err)
                res.send(err)
            })
    }
    

    deletePage(req,res) {

        const page_id = req.params.id

        const sql = "DELETE from ocms_pages WHERE page_id = ?";

        QueryUtils.PageExists(page_id)
            .then(() => 
                QueryUtils.Query('SELECT * from ocms_settings where setting_key = ?',["mainpage"]))
            .then(row =>{
                // Don't delete page which is currently set as main
                if(row[0].setting_value === page_id){
                    return Promise.reject("Can't delete current mainpage")
                }
            })
            .then(()     => QueryUtils.Query(sql, [page_id]))
            .then(()     => res.send(new ApiResponse(400, "All good!")))
            .catch((err) => res.status(HTTPCodes.INTERNAL_ERROR).send(new ApiError(500, err)))
        }

    getPageTags(page_id: number) {

        const sql = `
        select tag_name from ocms_tags
        INNER JOIN ocms_page_tags on ocms_page_tags.tag_id = ocms_tags.tag_id
        WHERE ocms_page_tags.page_id = ?`;

        return QueryUtils.Query(sql, [page_id])
    }

    fetchPage(pageid:number){
        const sql = "SELECT * from ocms_pages where page_id = ?"
        return QueryUtils.Query(sql, [pageid])
    }

    setTagRelations(page_id, tags) {
        // Extract this to function..
        let escaped = "";
        for (let i in tags) {
            DatabaseConnection.Instance.connection.escape(tags[i]);
            escaped += `(${page_id}, ` + DatabaseConnection.Instance.connection.escape(tags[i]) + "),";
        }
        escaped = escaped.slice(0, -1);

        const sql = `
        INSERT IGNORE into ocms_page_tags (page_id, tag_id)
         values  ${escaped}; DELETE from ocms_page_tags
          where page_id = ? and tag_id not in (?)`;
        return QueryUtils.Query(sql, [page_id, tags]);
    }

    removeAllTagRelations(page_id) {
        const sql = "DELETE from ocms_page_tags where page_id = ?";
        return QueryUtils.Query(sql, [page_id]);
    }

    async idIsNumber(input){
        try{
            let value = await Utils.isIntPromise(input)
            return value;
        }
        catch{ 
            return Promise.reject(new ApiError(HTTPCodes.BAD_REQUEST, "Bad request"));
        }
        
    }

    processTags(){

    }

    private setPageTags(tags: Array<string>) {
        // Extract this to function..
        let escaped = QueryUtils.escapeValues(tags);
        const sql = `INSERT IGNORE into ocms_tags (tag_name) values ${escaped} ; select tag_id from ocms_tags where tag_name in (?);`;
        return QueryUtils.Query(sql, [tags]);
    }
}