import { QueryUtils } from "../utils/QueryUtils";

export class Page{

    get title(){
        if(this.pagedata.title){
            return this.pagedata.title
        } 
        return null
    }

    get content(){
        if(this.pagedata.content){
        return this.pagedata.content
        }
        return null
    }

    
    get page_id(){
        if(this.pagedata.hasOwnProperty('page_id')){
            return this.pagedata.page_id
        }
            return null
    }

    get tags(){
        if(this.pagedata.hasOwnProperty('tags')){
            return this.pagedata.tags
            }
            return null
    }

    _data = {};
    get pagedata():any{
        return this._data
    }

    constructor(data?){

        this._data = {}

        if(data){
           this._data = data;
        }
    }

    generateInsertQuery(){

        const SQL = "INSERT INTO ocms_pages SET ?"

        let properties = ["title", "content"]
        let obj = {};

        properties.forEach(x => {
            if(this._data.hasOwnProperty(x)){
                obj[x] = this.pagedata[x];
            }
            else{
                obj[x] = null
            }
        })
        obj["lastedit"] = new Date()

        console.log(obj);

        return QueryUtils.format(SQL, [obj]);

    }
}