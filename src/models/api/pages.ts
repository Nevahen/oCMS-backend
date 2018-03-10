import * as db from '../../db';
import { DatabaseConnection } from '../../db';
import { ApiError } from '../../ApiError';
import { Page } from '../page';
import { ApiResponse } from '../../ApiResponse';
import { Utils } from '../../utils/utils';
import { QueryUtils } from '../../utils/QueryUtils';
import { resolve } from 'path';

export class Pages {

    private db;

    constructor() {
        this.db = DatabaseConnection.Instance.connection;
    }

    /**
     * Get page by id
     * @param id Page ID
     */
    getPageByID(id) {

        let pagedata;
        const sql = 'select * from ocms_pages where page_id = ?';

        return new Promise((resolve, reject) => {
            /*
             * Flow: Check valid int and that page exists
             * Get Basic Pagedata
             * Get possible tags
             * Catch errors and return them if something fails
             */
            Utils.isInt(id)
                .then(() => QueryUtils.PageExists(id))
                .then(() => QueryUtils.Query(sql, [id]))
                .then(results => {
                    pagedata = results;
                    // Init tag array
                    pagedata[0].tags = [];

                })
                .then(() => this.getPageTags(id))
                .then(tags => {
                    tags.forEach(tag => {
                        pagedata[0].tags.push(tag.tag_name);
                    })
                    resolve(pagedata);
                })
                .catch(err => {
                    reject(err);
                })
        })
    }

    /**
     * Returns all pages
     */
    getAllPages() {

        return new Promise((resolve, reject) => {
            const sql = "select * from ocms_pages";
            QueryUtils.Query(sql).
                then((pages) => {
                    resolve(pages);
                })
                .catch((err) => {
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
    updatePage(data: Page) {
        return new Promise((resolve, reject) => {

            let sql = "UPDATE ocms_pages SET content = ?, title = ?, lastedit=now() where page_id = ?";
            QueryUtils.PageExists(data.page_id)
                .then(() => {
                    return QueryUtils.Query(sql,
                        [
                            data.content,
                            data.title, data.page_id
                        ])
                })
                .then(() => {
                    if (data.tags && data.tags.length > 0) {
                        return this.setPageTags(data.tags)
                    }
                    return null;
                })
                //wtf
                .then((tag_ids) => {
                    if (tag_ids) {
                        let array = [];
                        for (let i = 0; i < tag_ids[1].length; i++) {
                            array.push(tag_ids[1][i].tag_id);
                        }

                        return this.setTagRelations(data.page_id, array);
                    }
                    else {
                        return this.removeAllTagRelations(data.page_id);
                    }
                })
                .then(() => {
                    resolve(new ApiResponse(200, "All good!"));
                })
                .catch((err) => {
                    reject(new ApiError(500, err));
                })
        });
    }

    createPage(data: Page) {
        return new Promise((resolve, reject) => {

            let sql = "INSERT into ocms_pages SET content = ?, title = ?";
            let insert_id;

            QueryUtils.Query(sql,
                [
                    data.content,
                    data.title
                ])
                .then((result) =>{

                    insert_id = result.insertId;

                    if (data.tags && data.tags.length > 0) {
                        return this.setPageTags(data.tags)
                    }
                    return null;
                })
                .then((tag_ids) => {
                    if (tag_ids) {
                        let array = [];
                        for (let i = 0; i < tag_ids[1].length; i++) {
                            array.push(tag_ids[1][i].tag_id);
                        }

                        return this.setTagRelations(insert_id, array);
                    }
                        return null;
                })
                .then(() => {
                    resolve(new ApiResponse(200, "All good!"));
                })
                .catch(() => {
                    reject(new ApiError(500, "Internal Server Error"));
                })
        });
    }

    deletePage(page_id: number) {

        const sql = "DELETE from ocms_pages WHERE page_id = ?";

        return new Promise((resolve, reject) => {

            QueryUtils.PageExists(page_id)
                .then(() => {
                    return QueryUtils.Query(sql, [page_id])
                })
                .then(() => {
                    resolve(new ApiResponse(400, "All good!"));
                })
                .catch((err) => {
                    reject(new ApiError(500, err));
                })
        });
    }

    getPageTags(page_id: number) {

        const sql = `
        select tag_name from ocms_tags
        INNER JOIN ocms_page_tags on ocms_page_tags.tag_id = ocms_tags.tag_id
        WHERE ocms_page_tags.page_id = ?`;

        return QueryUtils.Query(sql, [page_id])
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
        console.log(sql);
        return QueryUtils.Query(sql, [page_id, tags]);
    }

    removeAllTagRelations(page_id) {
        const sql = "DELETE from ocms_page_tags where page_id = ?";
        return QueryUtils.Query(sql, [page_id]);
    }

    setPageTags(tags: Array<string>) {
        // Extract this to function..
        let escaped = "";
        for (let i in tags) {
            DatabaseConnection.Instance.connection.escape(tags[i]);
            escaped += "(" + DatabaseConnection.Instance.connection.escape(tags[i]) + "),";
        }
        escaped = escaped.slice(0, -1);
        //

        const sql = "INSERT IGNORE into ocms_tags (tag_name) values " + escaped + "; select tag_id from ocms_tags where tag_name in (?);";

        return QueryUtils.Query(sql, [tags]);
    }
}