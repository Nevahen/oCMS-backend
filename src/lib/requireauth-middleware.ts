import * as jwt from "jsonwebtoken";
import { HTTPCodes } from "../enums/httpcodes";
import { ApiError } from "../ApiError";

var _options = _defaults;

var _defaults = {
  secretKey: null,
  noToken: "No token provided"
};

export function middleware(req, res, next) {
  if (!req.headers.authorization) {
    const error = new ApiError(HTTPCodes.BAD_REQUEST, _options.noToken);
    res.status(error.code).send(error);
  } else {
    // (0)Bearer (1)TokenString
    let token = req.headers.authorization.split(" ");
    token = token[1];

    jwt.verify(token, _options.secretKey, (err, decoded) => {
      if (err) {
        let message = { error: err.message };
        res.status(401).json(message);
      } else {
        next();
      }
    });
  }
}

export function setOptions(options) {
  _options = Object.assign({}, _defaults, options);
}
