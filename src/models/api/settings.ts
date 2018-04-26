import { DatabaseConnection } from "../../db";
import { ApiError } from "../../ApiError";
import { QueryUtils } from "../../utils/QueryUtils";
import { ApiResponse } from "../../ApiResponse";
import { HTTPCodes } from "../../enums/httpcodes";

export class Settings {

    updateSetting(key, value) {

        return new Promise((resolve, reject) => {

            if (typeof key === "undefined" || key === null) {
                reject(new ApiError(400, "Key cannot be empty"));
            }
            
            const sql = `
             INSERT into ocms.ocms_settings set setting_key = ?, setting_value = ?
             ON duplicate key update setting_value = values(setting_value);`;

            QueryUtils.Query(sql, [key, value])
                .then(v => {
                    resolve(new ApiResponse(200, "Updated succesfully!"))
                })
                .catch(error => {
                    reject("Sumthing bad happened");
                })

        })

    }

    getSetting(key) {

        const sql = "SELECT setting_key,setting_value from ocms_settings WHERE setting_key = ?";

        return new Promise((resolve, reject) => {
            if (typeof key === "undefined" || key == null) {
                reject(new ApiError(400,"setting key cannot be empty"));
            }

            QueryUtils.Query(sql,[key])
            .then(results =>{
                if(results[0]){
                resolve(results[0]);
                }
                else{
                    reject("No such setting key");
                }
            })
        })  
    }

    getMultipleSettings(req,res){
        let keys = Object.getOwnPropertyNames(req.query)

        if(keys.length === 0 || keys === null || keys === undefined){
            res.status(HTTPCodes.BAD_REQUEST).json({error:'missing parameters'})
            return
        }

        let keys_string = DatabaseConnection.Instance.connection.escape(keys);
        const sql = `select setting_key,setting_value from ocms_settings WHERE setting_key in (${keys_string})`

        QueryUtils.Query(sql, [keys_string])
        .then(rows => {

            let responseObject = {}

            rows.forEach(element => {
                responseObject[element.setting_key] = element.setting_value
            });

            return responseObject;
        })
        .then((responseObject:object) => {

            keys.forEach(element => {
                if(!responseObject.hasOwnProperty(element)){
                    responseObject[element] = null;
                }
            });

            return responseObject

        })
        .then(responseObject => {
            res.json({settings:responseObject})
        })
        .catch(err =>{
            res.json(err)
        })
    }
}