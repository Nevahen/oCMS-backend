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

         this.setupHandles(this.connection)
         this._connect();
    }

    private _connect(){

           // No promises..
           this.connection.connect((err) =>{
               if(err){
                   console.log(err.code);
                   console.log("Trying to connect to database again soon..")
                   setTimeout(() =>{
                    this.connection = mysql.createConnection(this.connection.config);
                    this._connect()
                   }, 2000)
               }
               else{
                   this.setupHandles(this.connection)
                   console.log("Connected to database @ " + this.connection.config.host)
               }
           })
    }

    private setupHandles(connection){
        connection.on("disconnect", this.handleDisconnect)
        connection.on("error", this.handleErrors)
    }

    private handleErrors = (error) =>{
        if(error.fatal){
            this._connect();
        }
    }

    private handleDisconnect = () =>{
        console.log("Disconnected from database")
        this._connect();
    }
    /**
     * Returns Singleton Instance of DatabaseConnection
     */
    public static get Instance()
    {
        return this._instance || (this._instance = new this());
    }
    
}

