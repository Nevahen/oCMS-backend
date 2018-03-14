import { Router } from "express";
import { QueryUtils } from "./utils/QueryUtils";
import { ApiError, ErrorCode } from "./ApiError";
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';

var bodyParser = require('body-parser');
var router = Router();

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended:true}));

router.post('/', (req, res) => {

    getUser(req.body.username)
    .then(user => validatePassword(req.body.password, user))
    .then(user => createToken(user))
    .then(token => {
        let payload = {
            token:token,
            message:"Token created"
        }
        res.json(payload);
    })
    .catch(err =>{
        console.log(err);
        let error = <ApiError>err;
        res.status(error.code).send(error);
    })
})

function getUser(username:string){
    const sql = "SELECT * from ocms_users where username = ?";
    return new Promise((resolve, reject) => {QueryUtils.Query(sql, [username])
        .then(results => {
            if(results.length === 0){
                reject (new ApiError(ErrorCode.UNAUTHORIZED, "Wrong username or password"))
            }
            else {
                resolve(results[0]);
            }
        })
    })
}

async function createToken(user){

        let payload:any = {
            username: user["username"],
            email: user["email"],
            role: user["role"],
            exp: Math.floor((Date.now() + (3600 * 1000)) / 1000)
        }
        
        let token = await jwt.sign(payload, process.env.SECRET_KEY);
        return token;
}

/**
 * 
 * @param {any} input = Plaintext password entered by user
 * @param {any} user  = user data fetched from db
 * @returns 
 */
function validatePassword(input, user) {
    return new Promise((resolve, reject) => {

        bcrypt.compare(input,user.password)
        .then(isRightPassword => {
            if(isRightPassword) {
                resolve(user)
            }
            else {
                reject(new ApiError(ErrorCode.UNAUTHORIZED,"Wrong username or password"));
            }
        })     
    }) 
}

export = router;