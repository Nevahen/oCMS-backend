import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as pagesRoute from './routes/pages';

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
            res.send("Api")
        });
        this.express.use('/pages', pagesRoute);       
    };   
}

export default new App().express;