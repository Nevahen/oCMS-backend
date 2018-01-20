import * as express from 'express';
import * as pagesRoute from './pages';

var router = express.Router();


    router.get('/',(req, res)=>{
        res.send("- Api Index -");
    })

    router.use('/pages', pagesRoute);       



export = router;