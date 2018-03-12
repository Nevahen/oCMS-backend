import { Router } from "express";
import { QueryUtils } from "./utils/QueryUtils";
import { ApiError, ErrorCode } from "./ApiError";
var jwt = require('jsonwebtoken');
var bodyParser = require('body-parser');
var router = Router();

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended:true}));

router.post('/', (req, res) => {
    console.log(req.body.username);
    getUser(req.body.username)
    .then(user => validatePassword(req.body.password, user))
    .then(user => {
    
    let payload:any = {
        username: user["username"],
        email: user["email"],
        role: user["role"]
    }
    
    let token = jwt.sign(payload,"secret");
    return token;
    })
    .then(token =>{
        res.send(token);
    })
    .catch(err =>{
        console.log(err);
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

function validatePassword(input, user){
    return new Promise((resolve, reject) => {

        // hashing not implemented yet -- bcrypt given password with salt and secrets and compare
        let isRightPassword = input === user.password;

        if(isRightPassword){
            resolve(user)
        }
        else{
            reject(new ApiError(ErrorCode.UNAUTHORIZED,"Wrong Password!"));
        }
    }) 
}

export = router;