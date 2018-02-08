import * as express from 'express';
import * as bodyParser from 'body-parser'

var router = express.Router();

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended:true}));


router.get('/', (req,res)=>{
     res.send("List all tags here:");
})



export = router;