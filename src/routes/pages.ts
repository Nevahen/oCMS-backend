import * as express from 'express';
import {Pages} from '../models/api/pages';
import * as bodyParser from 'body-parser'
import { ApiError } from '../ApiError';
import * as requireAuth from '../lib/requireauth-middleware';
import { Page } from '../models/page';

var router = express.Router();
var pages = new Pages();

router.get('/', pages.getAllPages)

router.put('/', requireAuth.middleware, (req, res) => {
    let data:Page = JSON.parse(req.body.data)
    pages.updatePage(data)
    .then(page => {
       res.json(page);
   })
   .catch(err => {
       res.send(err);
   })
})

router.post('/', pages.createPage)

router.delete('/:id', requireAuth.middleware, (req, res) => {

    pages.deletePage(req.params.id)
    .then(page => {
       res.json(page);
   })
   .catch((err:ApiError) => {
       res.status(err.code).send(err);
   })
})

router.get('/:id', pages.getPageByID)


export = router;