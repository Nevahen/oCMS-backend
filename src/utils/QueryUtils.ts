import { DatabaseConnection } from '../db';
import { ApiError } from '../ApiError';
import { HTTPCodes } from '../enums/httpcodes';

export class QueryUtils {

    public static async PageExists(id: number) {
        return new Promise((resolve, reject) => {

            const sql = "SELECT page_id from ocms_pages where page_id = ?";
            DatabaseConnection.Instance.connection.query(sql, [id], (err, results) => {
                if (err) {
                    reject(err.code)
                }
                if (results.length == 1) {
                    resolve(true);
                }
                else {
                    reject(new ApiError(400, "Element doesn't exist"));
                }
            });
        })
    }

    public static Query(sql: string, values?: Array<any>): Promise<any> {


        return new Promise((resolve, reject) => {
            DatabaseConnection.Instance.connection.query(sql, values,
                (err, results) => {
                    if (err) {
                        reject(new ApiError(HTTPCodes.BAD_REQUEST, err.message));
                    }
                    else {
                        resolve(results);
                    }
                })
        })
    }

    public static escapeValues(values){
        let escaped = "";
        values.forEach(value => {
            escaped += `(${DatabaseConnection.Instance.connection.escape(value)}),`;
        })
        return escaped = escaped.slice(0, -1);
        //
    }

    public static format(sql, values:Array<any>){
        return DatabaseConnection.Instance.connection.format(sql,values)
    }
}