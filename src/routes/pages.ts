import * as express from 'express';
import {Pages} from '../models/api/pages';
import * as bodyParser from 'body-parser'
import { ApiError } from '../ApiError';
import * as requireAuth from '../lib/requireauth-middleware';

var router = express.Router();
var pages = new Pages();

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended:true}));


router.get('/', requireAuth.middleware, (req, res) => {
     pages.getAllPages()
    .then(page => {
        res.send(page);
    })
    .catch(err => {
        res.send(err);
    })
})

router.put('/', requireAuth.middleware, (req, res) => {

    pages.updatePage(req.body)
    .then(page => {
       res.json(page);
   })
   .catch(err => {
       res.send(err);
   })
})

router.post('/', requireAuth.middleware, (req, res) => {

    pages.createPage(req.body)
    .then(page => {
       res.json(page);
   })
   .catch(err => {
       res.send(err);
   })
})

router.delete('/:id', requireAuth.middleware, (req, res) => {

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