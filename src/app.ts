import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as apiIndexRoute from './routes/index';
import * as requireAuth from './lib/requireauth-middleware'


class App{

    public express: express.Application;

    constructor(){
        this.express = express();
        this.initSettings();
        this.middleware();
        this.routes();
    }

    private initSettings(){
        requireAuth.setOptions({secretKey:process.env.SECRET_KEY});
    }

    // App wide middleware here
    private middleware(){};

    private routes(){
        let router = express.Router();
        
        this.express.get('/', (req , res)=>{
            res.send("TODO - direct public")
        });
        this.express.use('/api', apiIndexRoute);
    };   
}

export default new App().express;