import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as apiIndexRoute from './routes/index';

class App{

    public express: express.Application;

    constructor(){
        this.express = express();
        this.middleware();
        this.routes();
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