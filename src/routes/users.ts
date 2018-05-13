import * as express from 'express';
import * as bodyParser from 'body-parser'
import { QueryUtils } from '../utils/QueryUtils';
import { UserController } from '../models/user-controller';

var router = express.Router();
const userController = new UserController()
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended:true}));

router.get('/', (req, res) => {
 
    userController.GetAllUsersBasic()
    .then(data => {
        res.json(data).end()
    })

})

router.get('/:id', (req, res) => {


    userController.GetUserInfoAll(req.params.id)
    .then(result => {
        res.json(result);
    })
    .catch(err => {
        res.status(err.error.statuscode).send(err)
    })

})

export = router;