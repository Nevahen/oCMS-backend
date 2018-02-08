import * as express from 'express';
import * as pagesRoute from './pages';
import * as tagsRoute from './tags';

var router = express.Router();


    router.get('/',(req, res)=>{
        res.send("- Api Index -");
    })

    router.use('/pages', pagesRoute);       
    router.use('/tags', tagsRoute);


export = router;