import * as mysql from 'mysql';
import { Connection } from 'mysql';

/**
 * TODO: Pools
 * 
 * @export
 * @class DatabaseConnection
 */
export class DatabaseConnection{

    /**
     * 
     * 
     * @private
     * @static
     * @type {DatabaseConnection}
     * @memberof DatabaseConnection
     */
    private static _instance: DatabaseConnection;
    public connection:Connection;


    /**
     * Creates an instance of DatabaseConnection.
     * @memberof DatabaseConnection
     */
    private constructor()
    {
       this.connection =  mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASS,
            database: process.env.DB_DATABASE,
            multipleStatements: true
          });

          this.connection.connect();
    }

    /**
     * Returns Singleton Instance of DatabaseConnection
     */
    public static get Instance()
    {
        return this._instance || (this._instance = new this());
    }
    
}

