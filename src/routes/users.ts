import * as express from "express";
import * as bodyParser from "body-parser";
import { QueryUtils } from "../utils/QueryUtils";
import { UserController } from "../models/user-controller";
import User from "../models_sequelize/user";
import Page from "../models_sequelize/page";

var router = express.Router();
const userController = new UserController();
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

router.get("/", (req, res) => {
  res.send("oops: work in progress1");
});

router.get("/:id", (req, res) => {
  User.find({
    where: {
      userid: req.params.id
    }
  })
    .then(user => {
      if (user !== null) {
        res.send(user);
      } else {
        res.status(404).send({ error: "not found" });
      }
    })
    .catch(err => res.send(err));
});

//router.post('/', userController.createUser)

export = router;
