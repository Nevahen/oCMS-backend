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

    generateUpdateQuery(updateData){

        // Let's not do hardwork without an ID
        if(!this.pagedata.page_id){
            throw Error("Cannot generate update query if page doesn't have an ID")
        }

        const sql = "UPDATE ocms_pages SET ? WHERE page_id = ?";
        const properties = ["title", "content", "author", "status"]

        let updateObject = {}

        properties.forEach(prop =>{

            if(updateData.hasOwnProperty(prop)){

                // Check if current data has this prop 
                if(this._data.hasOwnProperty(prop)){
                    if(this._data[prop] !== updateData[prop]){
                        updateObject[prop] = updateData[prop]
                    }
                } else{
                    updateObject[prop] = updateData[prop];
                }
            }


        })

        updateObject["lastedit"] = new Date();
        
        console.log(QueryUtils.format(sql,[updateObject,this.page_id]))

        console.log(updateObject)
        return null;
    }
}