import * as express from "express";
import * as bodyParser from "body-parser";
import { QueryUtils } from "../utils/QueryUtils";
import { UserController } from "../models/user-controller";
import User from "../models_sequelize/user";

var router = express.Router();
const userController = new UserController();
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

router.get("/", (req, res) => {
  test();
});

function test() {
  let test = User.build({ username: "testi" });
  test.save();
}

router.get("/:id", (req, res) => {
  userController
    .GetUserInfoAll(req.params.id)
    .then(result => {
      res.json(result);
    })
    .catch(err => {
      res.status(err.error.statuscode).send(err);
    });
});

//router.post('/', userController.createUser)

export = router;
