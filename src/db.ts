import * as mysql from 'mysql';
import { Connection } from 'mysql';
var config = require('../ocms_config.js');


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
            host: config['dbhost'],
            user: config['dbuser'],
            password:config['dbpassword'],
            database:config['database'],
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

