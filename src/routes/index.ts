import * as express from 'express';
import * as pagesRoute from './pages';
import * as tagsRoute from './tags';
import * as settingsRoute from './settings';
import * as AuthRoute from '../AuthRoute';
import * as UsersRoute from './users';

var router = express.Router();


    router.get('/',(req, res)=>{
        res.send("- Api Index -");
    })

    router.use('/pages', pagesRoute);       
    router.use('/tags', tagsRoute);
    router.use('/settings', settingsRoute);
    router.use('/auth', AuthRoute);
    router.use('/users', UsersRoute)



export = router;