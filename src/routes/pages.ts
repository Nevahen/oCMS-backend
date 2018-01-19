import * as express from 'express';

var router = express.Router();

router.get('/', (req,res) =>{
    res.send("Pages end point");
})

export = router;