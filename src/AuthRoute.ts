import { Router } from "express";
import { QueryUtils } from "./utils/QueryUtils";
import { ApiError, ErrorCode } from "./ApiError";

var bodyParser = require('body-parser');
var router = Router();

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended:true}));

router.post('/', (req, res) => {
    console.log(req.body.username);
    getUser(req.body.username)
    .then(response => validatePassword(req.body.password, response["password"]))
    .then(() =>{ res.send("thanks for logging in :)")})
    .catch(err =>{
        let error = <ApiError>err;
        res.status(error.code).send(error);
    })
})

function getUser(username:string){
    const sql = "SELECT * from ocms_users where username = ?";
    return new Promise((resolve, reject) =>{QueryUtils.Query(sql, [username])
        .then(results => {
            if(results.length === 0){
                reject (new ApiError(ErrorCode.NOT_FOUND, "Not found"))
            }
            else {
                resolve(results[0]);
            }
        })
    })
}

function validatePassword(input, target){
    return new Promise((resolve, reject) => {

        // hashing not implemented yet -- bcrypt given password with salt and secrets and compare
        let isRightPassword = input === target;

        if(isRightPassword){
            resolve()
        }
        else{
            reject(new ApiError(ErrorCode.UNAUTHORIZED,"Wrong Password!"));
        }
    }) 
}

export = router;