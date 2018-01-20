import * as express from 'express';
import {Pages} from '../models/pages';

var router = express.Router();
var pages = new Pages();


router.get('/', (req,res)=>{
     pages.getAllPages()
    .then(page =>{
        res.send(page);
    })
    .catch(err =>{
        res.send(err);
    })
})

router.get('/:id', (req,res)=>{
    pages.getPageByID(req.params.id)
    .then(page =>{
        res.send(page);
    }).catch(err =>{
        res.send(err);
    })
})


export = router;