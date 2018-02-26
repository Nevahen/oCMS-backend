import * as express from 'express';
import * as bodyParser from 'body-parser'
import { QueryUtils } from '../utils/QueryUtils';

var router = express.Router();

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended:true}));

router.get('/', (req,res)=>{
    const sql = "select tag_name from ocms_tags";
    QueryUtils.Query(sql)
    .then(result => res.json(result));
})

export = router;