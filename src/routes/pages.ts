import * as express from 'express';
import {Pages} from '../models/api/pages-c';
import * as bodyParser from 'body-parser'
import { ApiError } from '../ApiError';
import * as requireAuth from '../lib/requireauth-middleware';
import { Page } from '../models/page';

var router = express.Router();
var pages = new Pages();

router.get('/', requireAuth.middleware, pages.getAllPages)
router.put('/', requireAuth.middleware, pages.updatePage)
router.post('/', requireAuth.middleware, pages.createPage)

router.delete('/:id', requireAuth.middleware, pages.deletePage)

router.get('/:id', pages.getPageByID)


export = router;