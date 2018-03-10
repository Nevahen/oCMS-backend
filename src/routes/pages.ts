import * as express from 'express';
import {Pages} from '../models/api/pages';
import * as bodyParser from 'body-parser'
import { ApiError } from '../ApiError';

var router = express.Router();
var pages = new Pages();

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended:true}));


router.get('/', (req, res) => {
     pages.getAllPages()
    .then(page => {
        res.send(page);
    })
    .catch(err => {
        res.send(err);
    })
})

router.put('/', (req, res) => {

    pages.updatePage(req.body)
    .then(page => {
       res.json(page);
   })
   .catch(err => {
       res.send(err);
   })
})

router.post('/', (req, res) => {

    pages.createPage(req.body)
    .then(page => {
       res.json(page);
   })
   .catch(err => {
       res.send(err);
   })
})

router.delete('/:id', (req, res) => {

    pages.deletePage(req.params.id)
    .then(page => {
       res.json(page);
   })
   .catch((err:ApiError) => {
       res.status(err.code).send(err);
   })
})

router.get('/:id', (req, res) => {
    pages.getPageByID(req.params.id)
    .then(page => {
        res.json(page);
    }).catch(err => {
        res.send(err);
    })
})


export = router;