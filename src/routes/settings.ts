import * as express from 'express';
import * as bodyParser from 'body-parser'
import { Settings } from '../models/api/settings';
import * as requireAuth from '../lib/requireauth-middleware'
var router = express.Router();
var settings = new Settings();


router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));


router.get('/', (req, res) => {
    res.send("Settings");
})

router.put('/', requireAuth.middleware, (req, res) => {

    // Check body for required elements, maybe extract this to general function
    if (!req.body.setting_value || !req.body.setting_key) {
        res.send({ error: "Need setting_key and setting_value" });
        res.end();
        return
    }

    settings.updateSetting(req.body.setting_key, req.body.setting_value)
        .then(v => {
            res.send(v)
        })
        .catch(err => {
            res.send(err)
        })
})

router.get('/key/:key', (req, res) => {

    // Implement protected setting keys
    settings.getSetting(req.params.key)
    .then(result =>{
        res.send(result)
    })
    .catch(err =>{
        res.send(err)
    })


});

export = router;