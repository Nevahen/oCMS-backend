import * as jwt from 'jsonwebtoken';

export function requireAuth(req, res, next) {

    if (!req.headers.authorization) {
        res.status(400).send("No token provided");
    }
    else {
        // (0)Bearer (1)TokenString
        let token = req.headers.authorization.split(' ');
        token = token[1];
        console.log(token);

        jwt.verify(token, "secret", (err, decoded) => {
            if (err) {
                let message = { error: err.message }
                res.status(401).json(message);
            }
            else {
                next();
            }
        })
    }
}