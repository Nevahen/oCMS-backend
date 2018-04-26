import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as apiIndexRoute from './routes/index';
import * as requireAuth from './lib/requireauth-middleware'
import * as path from 'path'
import { DatabaseConnection } from './db';

class App{

    public express: express.Application;

    constructor(){
        this.express = express();
        this.initSettings();
        this.middleware();
        this.routes();
        
        DatabaseConnection.Instance;
    }

    private initSettings(){
        requireAuth.setOptions({secretKey:process.env.SECRET_KEY});
    }

    // App wide middleware here
    private middleware(){
        this.express.use(bodyParser.urlencoded({extended:true}));
        this.express.use(bodyParser.json());
        this.express.use(express.static('dist/build'))
    };
    private routes(){
        let router = express.Router();
        

   
        this.express.use('/api', apiIndexRoute);
        this.express.get('/*', (req, res) => { 
            res.sendFile(path.join(__dirname+'/build/index.html'))
        })
    };   
}

export default new App().express;