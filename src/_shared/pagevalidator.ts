import { Validator } from "./validator";
import { Page } from "../models/page";

export class PageValidator implements Validator{

    readonly MIN_TITLE_LENGTH = 5;

    constructor(){
        
    }


    errors = [];

    validate(page:Page):Promise<any>{
        console.log(page.title)
        return new Promise((resolve, reject)=>{

            if(!page.title || page.title.length < this.MIN_TITLE_LENGTH){
                this.errors.push("Title must be atleast " + this.MIN_TITLE_LENGTH + "characters");
            }

            if(!page.content || page.content.length == 0){
                this.errors.push("Page must have some content!");
            }

            if(this.errors.length > 0){
                reject(this.errors);
            }
            else{
                resolve(page);
            }
        })
    }
}