import * as express from 'express';
import {Pages} from '../models/api/pages';
import * as bodyParser from 'body-parser'

var router = express.Router();
var pages = new Pages();

router.use(bodyParser.urlencoded({extended:true}));

router.get('/', (req,res)=>{
     pages.getAllPages()
    .then(page =>{
        res.send(page);
    })
    .catch(err =>{
        res.send(err);
    })
})

router.put('/', (req,res )=>{

    pages.updatePage(req.body)
    .then(page =>{
       res.json(page);
   })
   .catch(err =>{
       res.send(err);
   })
})


router.get('/:id', (req,res)=>{
    pages.getPageByID(req.params.id)
    .then(page =>{
        res.json(page);
    }).catch(err =>{
        res.send(err);
    })
})


export = router;