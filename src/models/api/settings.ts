import { DatabaseConnection } from "../../db";
import { ApiError } from "../../ApiError";
import { QueryUtils } from "../../utils/QueryUtils";
import { ApiResponse } from "../../ApiResponse";

export class Settings {
    private db;

    constructor() {
        this.db = DatabaseConnection.Instance.connection;
    }

    updateSetting(key, value) {

        return new Promise((resolve, reject) => {

            if (typeof key === "undefined" || key === null) {
                reject(new ApiError(400,"Key cannot be empty"));
            }

            const sql = `
             INSERT into ocms.ocms_settings set setting_key = ?, setting_value = ?
             ON duplicate key update setting_value = values(setting_value);`;

             QueryUtils.Query(sql,[key,value])
             .then(v =>{
                 resolve(new ApiResponse(4,"Updated succesfully!"))
             })
             .catch(error =>{
                 reject("Sumthing bad happened");
             })

        })

    }

}